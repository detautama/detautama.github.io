# Example: Before and After

## Current Gallery Page Code

```typescript
const galleryData = [
  {
    year: 2025,
    images: ["/images/gallery/feb-2025.jpg"],
  },
  {
    year: 2020,
    images: ["/images/gallery/jan-2020.jpg", "/images/gallery/mei-2020.jpg"],
  },
];
```

## After Adding Your New Image

```typescript
const galleryData = [
  {
    year: 2025,
    images: [
      "/images/gallery/feb-2025.jpg",
      "/images/gallery/YOUR-NEW-IMAGE.jpg",  // ← Add this line
    ],
  },
  {
    year: 2020,
    images: ["/images/gallery/jan-2020.jpg", "/images/gallery/mei-2020.jpg"],
  },
];
```

Replace `YOUR-NEW-IMAGE.jpg` with whatever filename you used in the compression script.

## Example Filenames

Based on the existing pattern, good names would be:
- `mar-2025.jpg` (March 2025)
- `apr-2025.jpg` (April 2025)
- `oct-2025.jpg` (October 2025)

Or use descriptive names:
- `village-ceremony-2025.jpg`
- `temple-2025.jpg`
- `celuk-street-2025.jpg`

## Complete Example Workflow

```bash
# 1. After downloading the image from Google Photos to ~/Downloads/photo.jpg
python3 scripts/compress-gallery-image.py ~/Downloads/photo.jpg mar-2025.jpg 80

# 2. The script will save to: public/images/gallery/mar-2025.jpg

# 3. Edit app/(wide-layout)/gallery/page.tsx and add:
#    "/images/gallery/mar-2025.jpg"

# 4. Test
npm run dev

# 5. Commit
git add public/images/gallery/mar-2025.jpg
git add app/(wide-layout)/gallery/page.tsx
git commit -m "Add March 2025 gallery image"
git push
```

## File Location

The image MUST be in this exact location after compression:
```
public/images/gallery/YOUR-FILENAME.jpg
```

And referenced in the gallery page as:
```
"/images/gallery/YOUR-FILENAME.jpg"
```

The filenames must match exactly!
