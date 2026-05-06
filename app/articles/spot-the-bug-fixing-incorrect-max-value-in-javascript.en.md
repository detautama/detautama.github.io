---
title: "Spot the Bug: Fixing Incorrect Max Value in JavaScript"
date: "2025-02-23"
description: "A deep dive into a common JavaScript bug when finding the maximum value in an array and how to fix it."
tags: ["JavaScript", "Debugging", "Problem Solving"]
featured: false
---

## Introduction

Debugging is an essential skill in programming, and sometimes, even simple-looking functions can contain hidden bugs. Let's analyze a JavaScript function that is supposed to find the maximum value in an array. Can you spot the bug?

```javascript
function findMaxValue(inputArray) {
  let maxVal = 0;
  for (let index = 0; index < inputArray.length; index++) {
    if (inputArray[index] > maxVal) {
      maxVal = inputArray[index];
    }
  }
  return maxVal;
}

console.log(findMaxValue([-10, 20, -5, -1]));
```

## Understanding the Issue

At first glance, the function appears to work correctly by iterating through the array and updating `maxVal` whenever it encounters a larger number. However, there is a subtle bug: **the initial value of `maxVal` is set to `0`**.

Why is this a problem? If all elements in `inputArray` are negative, `maxVal` will never be updated, and the function will incorrectly return `0`, which is not even in the array!

For example, with the input `[-10, 20, -5, -1]`, the function works fine because `20` is greater than `0`, but if we change the input to `[-10, -20, -5, -1]`, the function will incorrectly return `0` instead of `-1`.

## Fixing the Bug

To ensure that `maxVal` correctly starts with the first element of the array, we should initialize it using the first element of `inputArray` instead of `0`.

### Corrected Code

```javascript
function findMaxValue(inputArray) {
  if (inputArray.length === 0) return undefined; // Handle empty arrays
  let maxVal = inputArray[0];
  for (let index = 1; index < inputArray.length; index++) {
    // Start from index 1
    if (inputArray[index] > maxVal) {
      maxVal = inputArray[index];
    }
  }
  return maxVal;
}

console.log(findMaxValue([-10, 20, -5, -1])); // 20
console.log(findMaxValue([-10, -20, -5, -1])); // -1
console.log(findMaxValue([])); // undefined
```

## Key Takeaways

- Always initialize variables with a value that makes sense for the given problem.
- When working with arrays, using the first element as an initial value is often safer.
- Consider edge cases like empty arrays or all-negative numbers when writing functions.
- Testing your function with multiple inputs helps catch hidden bugs.

By making this small yet crucial fix, we ensure our function works correctly for all cases. Happy coding!
