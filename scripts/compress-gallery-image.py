#!/usr/bin/env python3

"""
Compress and optimize gallery images
Usage: python3 compress-gallery-image.py <input-image> <output-filename> [target-size-kb]
"""

import sys
import os
from pathlib import Path

def compress_image(input_path, output_filename, target_size_kb=80, max_dimension=2000):
    """Compress image to target size and save to gallery directory"""
    try:
        from PIL import Image
    except ImportError:
        print("Error: Pillow is not installed.")
        print("Install it with: pip3 install Pillow")
        sys.exit(1)
    
    # Determine output path
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent
    gallery_dir = repo_root / "public" / "images" / "gallery"
    output_path = gallery_dir / output_filename
    
    # Ensure gallery directory exists
    gallery_dir.mkdir(parents=True, exist_ok=True)
    
    if not os.path.exists(input_path):
        print(f"Error: Input file '{input_path}' not found")
        return False
    
    # Get original size
    original_size_kb = os.path.getsize(input_path) / 1024
    print(f"Original image size: {original_size_kb:.1f} KB")
    
    # Open image
    img = Image.open(input_path)
    print(f"Original dimensions: {img.size[0]}x{img.size[1]}")
    
    # Convert to RGB if needed (handles PNG, transparent images, etc.)
    if img.mode in ('RGBA', 'LA', 'P'):
        background = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode == 'P':
            img = img.convert('RGBA')
        if img.mode in ('RGBA', 'LA'):
            background.paste(img, mask=img.split()[-1])
        else:
            background.paste(img)
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Resize if too large
    width, height = img.size
    if width > max_dimension or height > max_dimension:
        print(f"Resizing from {width}x{height} to fit within {max_dimension}x{max_dimension}...")
        img.thumbnail((max_dimension, max_dimension), Image.Resampling.LANCZOS)
        width, height = img.size
        print(f"New dimensions: {width}x{height}")
    
    # Try different quality levels to reach target size
    quality = 85
    best_quality = quality
    
    print("\nCompressing...")
    while quality >= 60:
        img.save(output_path, 'JPEG', quality=quality, optimize=True, progressive=True)
        compressed_size_kb = os.path.getsize(output_path) / 1024
        print(f"  Quality {quality}: {compressed_size_kb:.1f} KB")
        
        if compressed_size_kb <= target_size_kb:
            best_quality = quality
            break
        
        if quality == 60:
            # At minimum quality, accept the result
            best_quality = quality
            break
            
        quality -= 5
    
    # Save with best quality found
    if best_quality != quality:
        img.save(output_path, 'JPEG', quality=best_quality, optimize=True, progressive=True)
    
    final_size_kb = os.path.getsize(output_path) / 1024
    compression_ratio = (1 - final_size_kb / original_size_kb) * 100 if original_size_kb > 0 else 0
    
    print(f"\n✓ Image saved to: {output_path}")
    print(f"✓ Final size: {final_size_kb:.1f} KB (target was {target_size_kb} KB)")
    print(f"✓ Compression ratio: {compression_ratio:.1f}%")
    print(f"✓ Quality setting: {best_quality}")
    
    if final_size_kb > target_size_kb * 1.5:
        print(f"\n⚠ Warning: Final size is {final_size_kb:.1f} KB, which is significantly larger than target {target_size_kb} KB")
        print("  Consider using a lower target size or a smaller source image.")
    
    return True

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 compress-gallery-image.py <input-image> <output-filename> [target-size-kb]")
        print("\nExamples:")
        print("  python3 compress-gallery-image.py ~/Downloads/photo.jpg mar-2025.jpg")
        print("  python3 compress-gallery-image.py ~/Downloads/photo.jpg mar-2025.jpg 60")
        print("\nDefault target size is 80 KB")
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_filename = sys.argv[2]
    target_size_kb = int(sys.argv[3]) if len(sys.argv) > 3 else 80
    
    # Validate output filename
    if not output_filename.lower().endswith('.jpg'):
        print("Warning: Output filename should end with .jpg")
        output_filename = output_filename.rsplit('.', 1)[0] + '.jpg'
        print(f"Using: {output_filename}")
    
    # Compress image
    if compress_image(input_path, output_filename, target_size_kb):
        print("\n" + "="*60)
        print("Next steps:")
        print("="*60)
        print("1. Update app/(wide-layout)/gallery/page.tsx")
        print("2. Add this to the appropriate year's images array:")
        print(f'   "/images/gallery/{output_filename}"')
        print("3. Run 'npm run dev' to preview")
        print("4. Run 'npm run build' to verify")
        print("="*60)
    else:
        print("\nFailed to compress image")
        sys.exit(1)

if __name__ == "__main__":
    main()
