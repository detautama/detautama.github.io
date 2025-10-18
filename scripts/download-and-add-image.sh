#!/bin/bash

# Complete workflow for adding a gallery image from a URL
# Usage: ./download-and-add-image.sh <image-url> <output-filename> <year>

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Gallery Image Download & Add Script  ${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check arguments
if [ "$#" -lt 2 ]; then
    echo -e "${RED}Error: Missing arguments${NC}"
    echo ""
    echo "Usage: $0 <image-url> <output-filename> [year]"
    echo ""
    echo "Examples:"
    echo "  $0 https://example.com/photo.jpg mar-2025.jpg 2025"
    echo "  $0 ~/Downloads/photo.jpg mar-2025.jpg 2025"
    echo ""
    exit 1
fi

IMAGE_SOURCE="$1"
OUTPUT_FILENAME="$2"
YEAR="${3:-2025}"  # Default to 2025 if not specified

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
TEMP_DIR="/tmp/gallery-image-$$"
TEMP_IMAGE="${TEMP_DIR}/downloaded-image.jpg"

# Ensure output filename has .jpg extension
if [[ ! "$OUTPUT_FILENAME" =~ \.jpg$ ]]; then
    echo -e "${YELLOW}Warning: Adding .jpg extension to filename${NC}"
    OUTPUT_FILENAME="${OUTPUT_FILENAME%.}.jpg"
fi

# Create temp directory
mkdir -p "$TEMP_DIR"

# Download or copy the image
echo -e "${BLUE}Step 1: Downloading/copying image...${NC}"

if [[ "$IMAGE_SOURCE" =~ ^https?:// ]]; then
    # It's a URL, try to download
    echo "  Downloading from URL..."
    if command -v wget &> /dev/null; then
        wget -q "$IMAGE_SOURCE" -O "$TEMP_IMAGE" || {
            echo -e "${RED}Failed to download with wget${NC}"
            exit 1
        }
    elif command -v curl &> /dev/null; then
        curl -sL "$IMAGE_SOURCE" -o "$TEMP_IMAGE" || {
            echo -e "${RED}Failed to download with curl${NC}"
            exit 1
        }
    else
        echo -e "${RED}Error: Neither wget nor curl is available${NC}"
        exit 1
    fi
else
    # It's a file path, copy it
    if [ ! -f "$IMAGE_SOURCE" ]; then
        echo -e "${RED}Error: File '$IMAGE_SOURCE' not found${NC}"
        exit 1
    fi
    echo "  Copying from local file..."
    cp "$IMAGE_SOURCE" "$TEMP_IMAGE"
fi

if [ ! -f "$TEMP_IMAGE" ]; then
    echo -e "${RED}Error: Failed to get image${NC}"
    exit 1
fi

echo -e "${GREEN}  ✓ Image retrieved${NC}"
echo ""

# Compress the image
echo -e "${BLUE}Step 2: Compressing image...${NC}"

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: python3 is required but not found${NC}"
    exit 1
fi

# Check if Pillow is installed
python3 -c "import PIL" 2>/dev/null || {
    echo "  Installing Pillow..."
    python3 -m pip install --user Pillow -q
}

# Run the compression script
python3 "${SCRIPT_DIR}/compress-gallery-image.py" "$TEMP_IMAGE" "$OUTPUT_FILENAME" 80

echo -e "${GREEN}  ✓ Image compressed and saved${NC}"
echo ""

# Update gallery page
echo -e "${BLUE}Step 3: Updating gallery page...${NC}"

GALLERY_PAGE="${REPO_ROOT}/app/(wide-layout)/gallery/page.tsx"

if [ ! -f "$GALLERY_PAGE" ]; then
    echo -e "${RED}Error: Gallery page not found at $GALLERY_PAGE${NC}"
    exit 1
fi

# Check if the image is already in the gallery data
if grep -q "\"\/images\/gallery\/${OUTPUT_FILENAME}\"" "$GALLERY_PAGE"; then
    echo -e "${YELLOW}  ⚠ Image already exists in gallery${NC}"
else
    echo "  Adding image to year $YEAR section..."
    
    # This is a simple approach - in practice you might want more sophisticated parsing
    # For now, we'll just show what needs to be added
    echo ""
    echo -e "${YELLOW}  Manual step required:${NC}"
    echo "  Add this line to the year $YEAR images array in:"
    echo "  $GALLERY_PAGE"
    echo ""
    echo -e "${GREEN}    \"/images/gallery/${OUTPUT_FILENAME}\"${NC}"
    echo ""
fi

# Cleanup
rm -rf "$TEMP_DIR"

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Done!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "Next steps:"
echo "1. Update ${GALLERY_PAGE}"
echo "   Add: \"/images/gallery/${OUTPUT_FILENAME}\" to year $YEAR"
echo ""
echo "2. Test your changes:"
echo "   cd $REPO_ROOT"
echo "   npm run dev"
echo ""
echo "3. Build and verify:"
echo "   npm run build"
echo ""
echo "4. Commit your changes:"
echo "   git add public/images/gallery/${OUTPUT_FILENAME}"
echo "   git add app/(wide-layout)/gallery/page.tsx"
echo "   git commit -m \"Add ${OUTPUT_FILENAME} to gallery\""
echo ""
