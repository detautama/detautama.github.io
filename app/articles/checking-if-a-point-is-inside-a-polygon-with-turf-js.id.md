---
title: "Mengecek apakah Sebuah Point Berada di Dalam Polygon dengan Turf.js"
date: "2025-02-21"
description: "Perlu tahu apakah sebuah point berada di dalam polygon di JavaScript? Fungsi turf.booleanPointInPolygon memudahkan hal ini!"
tags: ["Turf.js", "JavaScript", "GIS", "Geospatial"]
featured: false
---

Perlu tahu apakah sebuah point berada di dalam polygon di JavaScript? Fungsi `turf.booleanPointInPolygon` memudahkan hal ini!

🔹 **Apa fungsinya:**  
Fungsi ini mengecek apakah sebuah point tertentu berada di dalam (atau di batas) sebuah polygon.

🔹 **Cara menggunakannya:**

```javascript
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point, polygon } from "@turf/helpers";

const pt = point([2, 2]);
const poly = polygon([
  [
    [0, 0],
    [4, 0],
    [4, 4],
    [0, 4],
    [0, 0],
  ],
]);

const isInside = booleanPointInPolygon(pt, poly);
console.log(isInside); // true ✅
```
