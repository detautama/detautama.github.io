# Gallery Image Scripts

This directory contains scripts to help you add and manage gallery images.

## Scripts Overview

### 1. `compress-gallery-image.py` ⭐ (Recommended)

**Python script to compress images to optimal size for the gallery**

```bash
python3 scripts/compress-gallery-image.py <input-image> <output-filename> [target-size-kb]
```

**Examples:**
```bash
# Compress a downloaded image
python3 scripts/compress-gallery-image.py ~/Downloads/photo.jpg mar-2025.jpg

# Compress with a specific target size
python3 scripts/compress-gallery-image.py ~/Downloads/photo.jpg apr-2025.jpg 60
```

**What it does:**
- ✓ Compresses images to ~80KB (or your target size)
- ✓ Automatically resizes if needed (max 2000px)
- ✓ Optimizes JPEG quality (60-85)
- ✓ Saves to `public/images/gallery/`
- ✓ Shows compression statistics

**Requirements:**
- Python 3
- Pillow (auto-installed if missing)

---

### 2. `download-and-add-image.sh`

**Bash script for complete workflow: download → compress → guide you to update gallery**

```bash
./scripts/download-and-add-image.sh <image-url-or-path> <output-filename> [year]
```

**Examples:**
```bash
# From a direct image URL
./scripts/download-and-add-image.sh https://example.com/photo.jpg mar-2025.jpg 2025

# From a local file
./scripts/download-and-add-image.sh ~/Downloads/photo.jpg mar-2025.jpg 2025
```

**What it does:**
- ✓ Downloads image from URL or copies from local path
- ✓ Calls the compression script
- ✓ Provides instructions for updating the gallery page

**Requirements:**
- Bash
- wget or curl (for downloading from URLs)
- Python 3 + Pillow

---

### 3. `google-photos-helper.html`

**Interactive HTML tool to help extract direct links from Google Photos**

**How to use:**
1. Open `scripts/google-photos-helper.html` in your browser
2. Follow the on-screen instructions
3. Extract the direct image URL
4. Use the URL with the download script

**Alternative (simpler):**
Just follow the instructions in the page for the right-click method.

---

## Quick Start Guide

### For Google Photos Images

1. **Get the image:**
   - Option A: Open Google Photos link → Right-click image → "Open in new tab" → Right-click → "Save as"
   - Option B: Use `google-photos-helper.html` to extract direct URL

2. **Compress the image:**
   ```bash
   python3 scripts/compress-gallery-image.py ~/Downloads/your-image.jpg new-name.jpg
   ```

3. **Update gallery page:**
   Edit `app/(wide-layout)/gallery/page.tsx` and add the image path to the appropriate year.

### For Direct Image URLs

```bash
./scripts/download-and-add-image.sh https://example.com/image.jpg new-name.jpg 2025
```

Then follow the on-screen instructions.

---

## Gallery Image Guidelines

- **File size:** Target 50-80KB (max 100KB)
- **Dimensions:** Max 2000px on longest side
- **Format:** JPEG
- **Naming:** Use descriptive names like `mar-2025.jpg`, `village-ceremony-2025.jpg`, etc.
- **Location:** All images go in `public/images/gallery/`

---

## Troubleshooting

### "Pillow not found"
```bash
pip3 install Pillow
```

### "Permission denied" on scripts
```bash
chmod +x scripts/*.sh
```

### Image still too large
Adjust the target size:
```bash
python3 scripts/compress-gallery-image.py input.jpg output.jpg 50
```

### Can't download from Google Photos
Google Photos blocks direct downloads. Use the manual download method:
1. Open link in browser
2. Right-click on image
3. "Open image in new tab"
4. Right-click again → "Save as"

---

## After Adding an Image

1. **Test locally:**
   ```bash
   npm run dev
   # Visit http://localhost:3000/gallery
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Commit:**
   ```bash
   git add public/images/gallery/your-image.jpg
   git add app/(wide-layout)/gallery/page.tsx
   git commit -m "Add new gallery image"
   git push
   ```

---

## Need More Help?

See the main documentation:
- `GOOGLE_PHOTOS_IMAGE_INSTRUCTIONS.md` - Specific instructions for Google Photos
- `ADDING_GALLERY_IMAGE.md` - General guide for adding images
- `README.md` - Project overview
