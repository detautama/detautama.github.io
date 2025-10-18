# Adding New Gallery Images

This guide explains how to add new images to the gallery and compress them to optimal size.

## Quick Steps

### 1. Download the Image

For Google Photos shared links:
1. Open the link in your browser
2. Right-click on the image
3. Select "Open image in new tab"
4. Right-click in the new tab and select "Save image as..."
5. Save the image with a descriptive filename (e.g., `mar-2025.jpg`)

### 2. Compress the Image

We have a Python script to compress images to the optimal size (~50-80KB):

```bash
# Install Pillow if not already installed
pip3 install Pillow

# Compress the image
python3 scripts/compress-gallery-image.py <input-image> <output-filename> [target-size-kb]

# Example:
python3 scripts/compress-gallery-image.py ~/Downloads/my-photo.jpg mar-2025.jpg 80
```

This will:
- Resize the image if it's too large (max 2000px)
- Optimize JPEG compression (quality 60-85)
- Save the image to `public/images/gallery/`

### 3. Update the Gallery Page

Edit `app/(wide-layout)/gallery/page.tsx` and add your image to the appropriate year:

```typescript
const galleryData = [
  {
    year: 2025,
    images: [
      "/images/gallery/feb-2025.jpg",
      "/images/gallery/mar-2025.jpg", // Add your new image here
    ],
  },
  // ... other years
];
```

### 4. Test the Changes

```bash
# Run the development server
npm run dev

# Visit http://localhost:3000/gallery to see your image
```

### 5. Build and Deploy

```bash
# Ensure the build works
npm run build

# Commit your changes
git add public/images/gallery/mar-2025.jpg
git add app/(wide-layout)/gallery/page.tsx
git commit -m "Add new gallery image for March 2025"
git push
```

## Current Gallery Images

- `feb-2025.jpg` (79KB) - 2025
- `jan-2020.jpg` (48KB) - 2020
- `mei-2020.jpg` (92KB) - 2020

Target size for new images: **50-80KB**

## Troubleshooting

### Image is too large after compression

The script will automatically adjust quality and resize if needed. If you still need manual control:

```bash
python3 scripts/compress-gallery-image.py input.jpg output.jpg 50  # Target 50KB instead
```

### Image looks too compressed

Increase the target size:

```bash
python3 scripts/compress-gallery-image.py input.jpg output.jpg 100  # Allow up to 100KB
```

### Manual compression with ImageMagick

If you prefer ImageMagick:

```bash
convert input.jpg -quality 85 -sampling-factor 4:2:0 -strip output.jpg
```
