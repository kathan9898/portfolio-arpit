# Portfolio Images Guide

## How to Add Your Before/After Images

### Folder Structure
```
public/portfolio/
├── before/          # Raw, unedited images
│   ├── 1.jpg
│   ├── 2.jpg
│   └── 3.jpg
└── after/           # Edited, final images
    ├── 1.jpg
    ├── 2.jpg
    └── 3.jpg
```

### Image Requirements
- **Naming**: Use matching numbers (1.jpg, 2.jpg, etc.) for before/after pairs
- **Format**: JPG, PNG, or WebP
- **Resolution**: Recommended 1920x1080 or higher for best quality
- **Aspect Ratio**: 16:9 works best for the slider

### Steps to Add Images
1. Place your **raw/unedited** images in `public/portfolio/before/`
2. Place your **edited** images in `public/portfolio/after/`
3. Use the same filename for matching pairs (e.g., `1.jpg` in both folders)
4. Update `src/components/Portfolio.jsx` with image metadata:
   - Add the filename
   - Add the category (Wedding, Editorial, Portrait, etc.)
   - Add a descriptive title

### Example
```javascript
{
  id: 1,
  category: "Wedding",
  title: "Cinematic Color Grading",
  filename: "1.jpg" // This refers to /portfolio/before/1.jpg and /portfolio/after/1.jpg
}
```

The portfolio will automatically display your images with the interactive before/after slider!
