#!/usr/bin/env python3
"""
gmail_draft.py

Creates a Gmail DRAFT (never sends) from a send-as alias, with optional attachments, through
the Composio proxy. Composio's GMAIL_CREATE_EMAIL_DRAFT tool has no From field, so this builds
the MIME message itself and posts it to the Gmail API's drafts endpoint.

The body file is plain text. The draft carries that text plus an HTML version made from it, in
which a line like "Click here for 1 Question Survey: https://..." becomes a link that reads
"Click here for 1 Question Survey". Mail apps without HTML show the plain text, URL included.

--update <draft id> replaces an existing draft in place instead of creating a new one.

    python3 gmail_draft.py --to customer@example.com \
        --subject "Thank you for trusting French Roofing" \
        --body-file /path/body.txt \
        --attach "/path/French Roofing Workmanship Warranty - 123 Main St.pdf"

Defaults send from team@frenchexteriors.com through the brittany@frenchexteriors.com Gmail
connection. The alias must be a verified send-as address on that account, or Gmail falls back
to the account's own address; the script checks the saved draft and fails loudly if it did.
Prints the draft id and the From address Gmail stored.
"""

import argparse
import base64
import json
import html
import mimetypes
import re
import subprocess
import sys
import tempfile
from email.message import EmailMessage
from pathlib import Path

ACCOUNT = "gmail_bend-tucket"  # brittany@frenchexteriors.com. Never the Sagareus or Unbound24 connections.
FROM = "French Roofing <team@frenchexteriors.com>"
DRAFTS = "https://gmail.googleapis.com/gmail/v1/users/me/drafts"


def proxy(url: str, method: str = "GET", data: dict | None = None) -> dict:
    """POST through the Composio proxy. (Proxy GETs can hang indefinitely, so reads use execute().)"""
    cmd = ["composio", "proxy", url, "--toolkit", "gmail", "--account", ACCOUNT, "--method", method]
    with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as f:
        if data is not None:
            json.dump(data, f)
            cmd += ["--header", "Content-Type: application/json", "--data", f"@{f.name}"]
    out = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    Path(f.name).unlink(missing_ok=True)
    try:
        return json.loads(out.stdout)
    except json.JSONDecodeError:
        sys.exit(f"Gmail proxy call failed:\n{out.stdout[-800:]}\n{out.stderr[-800:]}")


LINK_LINE = re.compile(r"^(?P<label>[^:\n]+?):\s*(?P<url>https?://\S+)\s*$")
BARE_URL = re.compile(r"(https?://[^\s<]+)")


def to_html(text: str) -> str:
    """Plain body → simple HTML: one <p> per paragraph, "Label: URL" lines become a linked label."""
    paras = []
    for block in re.split(r"\n\s*\n", text.strip()):
        lines = []
        for line in block.split("\n"):
            m = LINK_LINE.match(line.strip())
            if m:
                lines.append(f'<a href="{html.escape(m["url"], quote=True)}">{html.escape(m["label"])}</a>')
            else:
                lines.append(BARE_URL.sub(lambda u: f'<a href="{u[1]}">{u[1]}</a>', html.escape(line)))
        paras.append("<p>" + "<br>".join(lines) + "</p>")
    return '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5">' + "\n".join(paras) + "</div>"


def draft_headers(draft_id: str) -> dict:
    """Read back the saved draft's From/To/Subject with the Gmail tool (not the proxy)."""
    cmd = ["composio", "execute", "GMAIL_GET_DRAFT", "--account", ACCOUNT, "-d", json.dumps({"draft_id": draft_id, "format": "metadata"})]
    try:
        out = json.loads(subprocess.run(cmd, capture_output=True, text=True, timeout=90).stdout)
    except (subprocess.TimeoutExpired, json.JSONDecodeError):
        sys.exit(f"Draft {draft_id} was created, but reading it back failed. Check the From address in Gmail Drafts.")
    found: dict = {}

    def walk(o):
        if isinstance(o, dict):
            if o.get("name") in ("From", "To", "Subject") and "value" in o:
                found.setdefault(o["name"].lower(), o["value"])
            for v in o.values():
                walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)

    walk(out)
    return found


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--to", required=True)
    p.add_argument("--subject", required=True)
    p.add_argument("--body-file", required=True)
    p.add_argument("--attach", action="append", default=[])
    p.add_argument("--from", dest="sender", default=FROM)
    p.add_argument("--update", metavar="DRAFT_ID", help="replace this existing draft instead of creating a new one")
    a = p.parse_args()

    msg = EmailMessage()
    msg["From"] = a.sender
    msg["To"] = a.to
    msg["Subject"] = a.subject
    body = Path(a.body_file).read_text()
    msg.set_content(body)
    msg.add_alternative(to_html(body), subtype="html")
    for path in map(Path, a.attach):
        ctype = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        major, minor = ctype.split("/", 1)
        msg.add_attachment(path.read_bytes(), maintype=major, subtype=minor, filename=path.name)

    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    if a.update:
        draft = proxy(f"{DRAFTS}/{a.update}", "PUT", {"id": a.update, "message": {"raw": raw}})
    else:
        draft = proxy(DRAFTS, "POST", {"message": {"raw": raw}})
    if "id" not in draft:
        sys.exit(f"Draft not created: {json.dumps(draft)[:800]}")

    headers = draft_headers(draft["id"])
    stored_from = headers.get("from", "")
    print(json.dumps({"draftId": draft["id"], "from": stored_from, "to": headers.get("to", ""), "attachments": [Path(x).name for x in a.attach]}))
    if "team@frenchexteriors.com" in a.sender and "team@frenchexteriors.com" not in stored_from:
        sys.exit("Gmail did not keep the team@ alias as the sender. Check Gmail Settings > Accounts > Send mail as.")


if __name__ == "__main__":
    main()
