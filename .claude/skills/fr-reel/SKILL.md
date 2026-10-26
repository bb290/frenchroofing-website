---
name: fr-reel
description: Make a French Roofing reel / YouTube Short (B-roll photos and clips from disk, voiceover, word-by-word captions, brand graphics, music bed) and load it into Metricool as DRAFTS for Instagram Reel, Facebook Reel, LinkedIn, YouTube Short and Google Business. Use for "make a reel", "make a short", "/fr-reel", "turn this FAQ into a video". Built from the 2026-10-26 pilot "What's in a new roof?".
---

# FR Reel: photos on disk → 9:16 reel → Metricool drafts

Read `.claude/BRAND.md` before writing any copy. Brand rules from `.claude/CLAUDE.md` win over
`social/platforms.md` where they conflict: **no phone number and no "family-owned" anywhere on social**
(platforms.md still shows phone CTAs for Facebook and GMB; ignore them).

Autonomy is `tight`. Four human gates, in order. Stop at each one and wait:

1. **Script** approved by Brittany.
2. **Storyboard** (posed stills) approved.
3. **Rendered video** approved.
4. **Metricool drafts**: Brittany approves and publishes in Metricool. This skill never sets `draft: false`.

Pilot project to copy from: `social/reels/2026-10-26-whats-in-a-new-roof/` (build.py, STORYBOARD.md,
boards/, post/, renders/). Load the `hyperframes` skill before building; it holds the render contract.

## 1. Topic and script

- Best source: an **Approved** row in the Notion Customer FAQ (`401a644c-bd9a-8199-b57e-e03b6c47125f`,
  account `notion_koala-benab`, check `users/me` first). Sean's "Final answer (Sean)" is the fact base.
  Every claim in the script must trace to Sean's answer or to Brittany's words. Never take facts from
  the BRAND.md voice description ("20 years" there is a persona sketch, not a fact; it got cut from the pilot).
- About 70 words for ~25-30 s. One line per shot. Hook line first, CTA last:
  "Get your Instant Roof Quote at French Roofing dot com."
- Hand Brittany a recording script: numbered lines, delivery note, "3 seconds of silence first, two full takes".
  She may ad-lib smoother wording when recording; keep her version and re-time to it.

## 2. Footage

- Pick from `assets/images/` using the `.txt` sidecar notes, then **open every image** before using it
  (lesson 2026-09-17: the note is not the photo). Write a sidecar for any new photo Brittany sends.
- Hard rules: crew on a roof must show fall protection (the pilot dropped "Tear off in action.mov" for this);
  no house numbers or identifiable home fronts; never name the sidecar city unless it is on the BRAND.md §9
  list (job photos filed as Portland are fine to show, never to name).
- Soften unwanted text (hats, signs) with a feathered blur baked into the asset, never a hard box:
  `ffmpeg -i in.jpg -f lavfi -i "color=black:s=WxH,format=gray" -filter_complex "[0]split[a][b];[b]gblur=sigma=14[bb];[1]drawbox=x=..:y=..:w=..:h=..:color=white:t=fill,gblur=sigma=7[m];[bb][m]alphamerge[fg];[a][fg]overlay" out.jpg`
- Clips: most phone clips are low-res; convert to H.264 (`-vf scale=-2:1080`) and keep them short.

## 3. Build (HyperFrames)

- `npx hyperframes init <slug> --example blank --resolution portrait --non-interactive` under `social/reels/`.
  Copy `template/build.py`, edit `SCENES`, `CHUNKS`, `TIMES`, `TOTAL`, then `python3 -I build.py`.
- Look decisions Brittany made on the pilot (keep them):
  - **No color overlay on photos.** Captions carry their own dark outline and shadow.
  - **Landscape photos: show the whole photo** full-width with a blurred fill behind (`hold` kind),
    gentle 3% push only. No big zooms, no pans across the photo.
  - Step chips (yellow number, blue pill), hook card on frame 0, end card on cream with logo,
    "Instant Roof Quote", frenchroofing.com pill.
- Storyboard: snapshot one still per shot (`npx hyperframes snapshot --at ... -o boards/stills`),
  write `boards/storyboard.html` + `STORYBOARD.md`, open it, **stop for Gate 2**.

## 4. Voiceover and timing

- Put takes in `assets/audio/`. Find where speech really starts with the loudness envelope, not the
  transcript (the pilot's Take 2 had 3 s of room noise that whisper labeled as words):
  `ffmpeg -i vo.wav -af "astats=metadata=1:reset=1:length=0.1,ametadata=print:key=lavfi.astats.Overall.RMS_level" -f null -`
- Clean: `afftdn=nf=-25,highpass=f=80,loudnorm=I=-16:TP=-1.5:LRA=7`. Prefer one whole take over splicing.
- Word timings: `npx hyperframes transcribe vo.wav -e parakeet` (more accurate than whisper here).
  Then **hand-check `TIMES`** against it: ASR misheard "any rotten" as "the new rod and" and "CertainTeed"
  as "certainty". Caption words are the corrected words.
- Music: ElevenLabs Music via `composio proxy "https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128" -t elevenlabs --account elevenlabs_lisper-moaria -X POST -d '{"prompt":...,"music_length_ms":28000,"force_instrumental":true}'`.
  The response holds `binary_data.url`; download it with curl within the hour. Mix at `data-volume="0.16"`.
- Cut scene boundaries just before each phrase starts. Move captions off faces per scene if needed.
- `npx hyperframes check --json` must be clean; snapshot and look before rendering.

## 5. Render

- Two renders: `<slug>_ig-fb.mp4` (end card "Link in bio") and `<slug>_yt-li-gbp.mp4` (end card note
  swapped, since "Link in bio" means nothing on YouTube/LinkedIn/GMB). `npx hyperframes render -q delivery -o renders/...`
- Cover: `ffmpeg -ss 1.5 -i renders/<slug>_ig-fb.mp4 -frames:v 1 renders/cover.jpg`.
- Open it for Brittany. **Stop for Gate 3.**

## 6. Metricool drafts

- Web copies: `-c:v libx264 -crf 20 -preset slow -maxrate 12M -bufsize 24M -c:a aac -b:a 192k -movflags +faststart`.
- Upload to Vercel Blob (public URLs, as the weekly Kewl does):
  `node --env-file=.env.local --input-type=module -e "import {put} from '@vercel/blob'; ..."` with
  path `social/reels/<slug>/<file>`.
- Captions in `<reel>/post/`: `caption-instagram.md` (no hashtags, dashes CTA block), `caption-facebook.md`
  (frenchroofing.com CTA), `caption-linkedin.md` (100-180 words, CCB #203933 OK), `youtube.md` (title + description),
  `context-note.txt`. Run `npm run kewl:lint -- social/reels/<slug>/post` (must be 0 FAIL) and read every caption.
- `getScheduledPosts` for brand 6211784; pick a day with nothing scheduled. Pilot times: GBP 07:12,
  LinkedIn 08:23, Facebook 09:37, YouTube 10:07, Instagram 13:07 (America/Los_Angeles).
- One `createScheduledPost` per network, all `"draft": true`:
  - Instagram: `instagramData {"type":"REEL","showReelOnFeed":true,"isAiGenerated":false}`, `videoCoverMilliseconds`.
  - Facebook: `facebookData {"type":"REEL"}`.
  - LinkedIn: `linkedinData {"type":"post"}` (Sean's personal profile).
  - YouTube: `youtubeData {"title":..., "type":"short", "privacy":"public", "madeForKids":false, "category":"HOWTO_STYLE", "isAiGeneratedContent":false, "tags":[...]}`.
  - Google Business: `gmbData {"type":"photo"}`, no text (video only goes to GBP as a gallery item).
- Write `post/schedule.json` with each `metricool_id`, give Brittany the planner links, **stop for Gate 4**.

## Never

- Publish, approve, or set `draft: false`. Push or `npm run deploy`.
- Use the tear-off clip or any rooftop shot without visible fall protection.
- Name a city outside BRAND.md §9, show a phone number, or put "family-owned" on social.
