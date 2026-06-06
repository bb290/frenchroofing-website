#!/usr/bin/env bash
# scripts/normalize-photos.sh
#
# Bake EXIF orientation into pixel data. Idempotent.
#
# Why: Satori (the renderer behind /api/og) ignores EXIF orientation, so
# iPhone portrait JPEGs render sideways unless their pixels are pre-rotated.
# This script reads each file's EXIF orientation tag and physically rotates
# the pixels to match, then resets the tag to "normal" so re-runs don't
# double-rotate.
#
# Runs on macOS via `sips`. For Linux/CI, install ImageMagick and use
# `magick <file> -auto-orient <file>` instead.
#
# Usage:
#   scripts/normalize-photos.sh <file.jpg> [<file.jpg> ...]
#   scripts/normalize-photos.sh public/images/*.{jpg,jpeg,png}
#   scripts/normalize-photos.sh social/instagram/evergreen/*/photos/*.{jpg,jpeg,png}

if [ $# -lt 1 ]; then
  cat <<'USAGE'
Usage: scripts/normalize-photos.sh <file> [<file> ...]

Bakes EXIF orientation into pixel data using macOS sips. Idempotent.
USAGE
  exit 1
fi

if ! command -v sips >/dev/null 2>&1; then
  echo "ERROR: sips not found. This script requires macOS." >&2
  exit 1
fi

fixed=0
skipped=0

for file in "$@"; do
  case "$file" in
    *.jpg | *.jpeg | *.JPG | *.JPEG | *.png | *.PNG) ;;
    *)
      echo "  skip non-image: $file"
      skipped=$((skipped + 1))
      continue
      ;;
  esac

  if [ ! -f "$file" ]; then
    echo "  skip missing:   $file"
    skipped=$((skipped + 1))
    continue
  fi

  # Parse EXIF orientation from `file` command output. Examples:
  #   orientation=upper-left   (1, normal)        -> no rotation
  #   orientation=upper-right  (6, rotate 90 CW)  -> rotate 90 CW
  #   orientation=lower-right  (3, rotate 180)    -> rotate 180
  #   orientation=lower-left   (8, rotate 270 CW) -> rotate 270 CW
  orient=$(file "$file" 2>/dev/null | grep -oE 'orientation=[a-z-]+' | head -1 | cut -d= -f2)

  case "$orient" in
    "" | "upper-left")
      skipped=$((skipped + 1))
      ;;
    "upper-right")
      sips -r 90 "$file" >/dev/null 2>&1
      echo "  rotated  90 CW: $file"
      fixed=$((fixed + 1))
      ;;
    "lower-right")
      sips -r 180 "$file" >/dev/null 2>&1
      echo "  rotated 180:    $file"
      fixed=$((fixed + 1))
      ;;
    "lower-left")
      sips -r 270 "$file" >/dev/null 2>&1
      echo "  rotated 270 CW: $file"
      fixed=$((fixed + 1))
      ;;
    *)
      echo "  unknown orientation '$orient' (mirrored?): $file"
      skipped=$((skipped + 1))
      ;;
  esac
done

echo ""
echo "normalized $fixed file(s), skipped $skipped"
