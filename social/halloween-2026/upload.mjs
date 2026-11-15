import { put } from "@vercel/blob";
import { readFileSync } from "fs";
const { url } = await put("social/halloween-2026/skeleton.jpg", readFileSync(process.argv[2]), { access: "public", contentType: "image/jpeg", allowOverwrite: true });
console.log(url);
