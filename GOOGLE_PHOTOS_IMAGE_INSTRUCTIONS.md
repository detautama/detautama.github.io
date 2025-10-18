# How to Add the Google Photos Image

## The Image URL
https://photos.google.com/share/AF1QipN7oK9SE5P1hvGLR8vrG-xI3-YxmzrsPa8LgggSyO-jiwMVgJSkN_B6dYc8qiD_uw/photo/AF1QipNv3ZfC2bHaK5avTVxqj0t7g8AafOXCq-d3VWf6?key=cU1fd3hremRBbVdyakVpZjZxUzJaN3ZnaTZVSy13

## Step-by-Step Instructions

### Step 1: Download the Image

1. Open the Google Photos URL in your browser
2. Right-click on the image
3. Select "Open image in new tab" 
4. In the new tab with the full-size image, right-click again
5. Select "Save image as..."
6. Save it to your Downloads folder (any filename is fine)

### Step 2: Compress and Add to Gallery

From the repository root directory, run:

```bash
# Example if the downloaded file is named photo.jpg in Downloads
python3 scripts/compress-gallery-image.py ~/Downloads/photo.jpg new-gallery-2025.jpg 80

# Or adjust the filename and path as needed
```

This will:
- ✓ Compress the image to ~80KB (optimal size)
- ✓ Resize if needed (max 2000px)
- ✓ Save to `public/images/gallery/new-gallery-2025.jpg`
- ✓ Optimize for web (progressive JPEG)

### Step 3: Update the Gallery Page

Edit `app/(wide-layout)/gallery/page.tsx`:

```typescript
const galleryData = [
  {
    year: 2025,
    images: [
      "/images/gallery/feb-2025.jpg",
      "/images/gallery/new-gallery-2025.jpg",  // ← Add this line
    ],
  },
  {
    year: 2020,
    images: ["/images/gallery/jan-2020.jpg", "/images/gallery/mei-2020.jpg"],
  },
];
```

**Note:** Choose an appropriate filename based on the content/date of the photo (e.g., `mar-2025.jpg`, `apr-2025.jpg`, etc.)

### Step 4: Preview and Build

```bash
# Start development server
npm run dev

# Visit http://localhost:3000/gallery in your browser
# Verify the new image appears correctly

# Build to ensure everything works
npm run build
```

### Step 5: Commit and Push

```bash
git add public/images/gallery/new-gallery-2025.jpg
git add app/(wide-layout)/gallery/page.tsx
git commit -m "Add new gallery image for 2025"
git push
```

## Recommended Filename

Based on the existing naming pattern (month-year.jpg), suggested filenames:
- `mar-2025.jpg` - if photo is from March 2025
- `apr-2025.jpg` - if photo is from April 2025
- Or any other descriptive name following the pattern

## Troubleshooting

### Can't download from Google Photos
- Try using a different browser
- Make sure you're logged into Google
- Check if the share link has expired

### Image is blurry/low quality
- Make sure you're opening the full-size image (right-click → open in new tab)
- Don't use the thumbnail from the gallery view

### Script fails
Make sure Pillow is installed:
```bash
pip3 install Pillow
```

## Alternative: Manual Compression

If the script doesn't work, you can use online tools:
1. Download the image
2. Use https://tinyjpg.com or https://squoosh.app
3. Target ~50-80KB size
4. Save to `public/images/gallery/`
5. Update gallery page

## Need Help?

Check `ADDING_GALLERY_IMAGE.md` for general gallery image instructions.
