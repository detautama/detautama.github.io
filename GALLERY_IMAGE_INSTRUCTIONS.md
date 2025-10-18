# Gallery Image Addition - Temple Photo

## ⚠️ Important: Placeholder Image

The file `public/images/gallery/temple-2025.jpg` currently contains a **placeholder image**. This placeholder was created because the actual temple image could not be automatically downloaded due to network restrictions in the build environment.

## 📸 Actual Image Location

The actual Balinese temple image that should be added is available at:
**https://github.com/user-attachments/assets/10ba1dd5-ce0e-435c-a4a5-ada53f842a77**

## 🔄 How to Replace the Placeholder

### Option 1: Using the Compression Script (Recommended)

A Python script has been prepared to compress the image optimally:

```bash
# 1. Download the actual image
curl -L -o temple-original.jpg "https://github.com/user-attachments/assets/10ba1dd5-ce0e-435c-a4a5-ada53f842a77"

# 2. Install Pillow if not already installed
pip install Pillow

# 3. Run the compression script
python3 compress_temple_image.py temple-original.jpg

# 4. Replace the placeholder
mv temple-original-compressed.jpg public/images/gallery/temple-2025.jpg

# 5. Verify the changes
npm run build
npm run dev  # Visit http://localhost:3000/gallery
```

### Option 2: Manual Compression

If you prefer to compress manually:

1. Download the original image from the URL above
2. Use an image editing tool to:
   - Resize to max dimension of 1200px (maintaining aspect ratio)
   - Export as JPEG with quality 70-85
   - Target file size: ~80-100KB (similar to other gallery images)
3. Save as `public/images/gallery/temple-2025.jpg`

## 📊 Target Image Specifications

Based on existing gallery images:
- **Format**: JPEG
- **Max Dimension**: 800-1200px (width or height)
- **File Size**: 48-92KB (current range)
- **Target Size**: ~80-100KB
- **Quality**: 70-85% JPEG quality
- **Progressive**: Yes (recommended for web)

## ✅ Current Status

- ✅ Gallery page updated to include temple-2025.jpg
- ✅ Placeholder image created (40KB, 900x1200px)
- ✅ Image compression script prepared
- ⏳ **Pending**: Replace placeholder with actual temple photo

## 🔍 Verification Checklist

After replacing the placeholder, verify:

1. [ ] Image file size is appropriate (50-100KB)
2. [ ] Image displays correctly in the gallery grid
3. [ ] Image opens in fullscreen modal when clicked
4. [ ] Image has good visual quality (not over-compressed)
5. [ ] Build completes successfully: `npm run build`
6. [ ] No console errors in browser
7. [ ] Gallery layout looks good on mobile and desktop

## 📝 File Locations

- **Placeholder Image**: `public/images/gallery/temple-2025.jpg` (40KB)
- **Gallery Page**: `app/(wide-layout)/gallery/page.tsx` (updated)
- **Compression Script**: Available in repository root or `/tmp/compress_temple_image.py`

## 💡 Technical Details

The compression script (`compress_temple_image.py`):
- Automatically resizes images to max 1200px dimension
- Converts RGBA to RGB if needed
- Tries multiple quality levels (85, 80, 75, 70, 65, 60, 55, 50)
- Stops when target size (~90KB) is reached
- Uses LANCZOS resampling for high quality
- Enables progressive JPEG and optimization

## 🎨 Gallery Structure

The gallery is organized by year. The new temple image has been added to the 2025 section:

```typescript
const galleryData = [
  {
    year: 2025,
    images: [
      "/images/gallery/feb-2025.jpg",
      "/images/gallery/temple-2025.jpg",  // ← New image
    ],
  },
  // ... other years
];
```
