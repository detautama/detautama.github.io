#!/usr/bin/env python3
"""
Image compression script for the Balinese temple gallery image.
This script compresses the temple image to optimal web size.

Usage:
    python3 compress_temple_image.py <input_image.jpg>

The script will create an optimally compressed version suitable for the gallery.
"""
from PIL import Image
import sys
import os

def compress_image_for_gallery(input_path, output_path=None, target_size_kb=90, max_dimension=1200):
    """
    Compress an image to optimal size for web gallery.
    
    Args:
        input_path: Path to the input image
        output_path: Path to save the compressed image (default: adds -compressed suffix)
        target_size_kb: Target file size in KB (default 90KB, similar to existing gallery images)
        max_dimension: Maximum width or height in pixels (default 1200px)
    """
    if not os.path.exists(input_path):
        print(f"Error: Input file '{input_path}' not found")
        sys.exit(1)
    
    if output_path is None:
        base, ext = os.path.splitext(input_path)
        output_path = f"{base}-compressed{ext}"
    
    print(f"Opening image: {input_path}")
    original_size = os.path.getsize(input_path) / 1024
    print(f"Original size: {original_size:.1f} KB")
    
    # Open and process the image
    img = Image.open(input_path)
    print(f"Original dimensions: {img.size[0]}x{img.size[1]}")
    
    # Convert RGBA to RGB if necessary
    if img.mode in ('RGBA', 'LA', 'P'):
        background = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode == 'P':
            img = img.convert('RGBA')
        background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
        img = background
    
    # Calculate new dimensions maintaining aspect ratio
    width, height = img.size
    if width > max_dimension or height > max_dimension:
        ratio = min(max_dimension / width, max_dimension / height)
        new_width = int(width * ratio)
        new_height = int(height * ratio)
        print(f"Resizing to: {new_width}x{new_height}")
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Try different quality settings to achieve target size
    print("\nCompression attempts:")
    for quality in range(85, 49, -5):
        img.save(output_path, 'JPEG', quality=quality, optimize=True, progressive=True)
        file_size = os.path.getsize(output_path) / 1024
        print(f"  Quality {quality}: {file_size:.1f} KB")
        
        if file_size <= target_size_kb * 1.1:  # Allow 10% tolerance
            print(f"\n✓ Success! Compressed to {file_size:.1f} KB at quality {quality}")
            print(f"✓ Saved to: {output_path}")
            print(f"✓ Size reduction: {original_size - file_size:.1f} KB ({((original_size - file_size) / original_size * 100):.1f}%)")
            return output_path
    
    # If we couldn't hit target, use the last attempt
    file_size = os.path.getsize(output_path) / 1024
    print(f"\n⚠ Could not reach target size. Final size: {file_size:.1f} KB")
    print(f"✓ Saved to: {output_path}")
    return output_path

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 compress_temple_image.py <input_image.jpg>")
        print("\nThis script will compress the image to ~90KB, suitable for the gallery.")
        print("The compressed image will be saved with '-compressed' suffix.")
        sys.exit(1)
    
    input_file = sys.argv[1]
    compress_image_for_gallery(input_file)
