---
title: "Checking if a Point is Inside a Polygon with Turf.js"
date: "2025-02-21"
description: "Need to determine if a point is inside a polygon in JavaScript? The turf.booleanPointInPolygon function makes it easy!"
tags: ["Turf.js", "JavaScript", "GIS", "Geospatial"]
featured: false
---

Need to determine if a point is inside a polygon in javascript? the `turf.booleanPointInPolygon` function makes it easy!

🔹 **what it does:**  
it checks whether a given point is inside (or on the boundary of) a polygon.

🔹 **how to use it:**

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
