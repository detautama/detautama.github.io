---
title: "Spot the Bug: Memperbaiki Nilai Maksimum yang Salah di JavaScript"
date: "2025-02-23"
description: "Menyelami bug JavaScript yang umum terjadi saat mencari nilai maksimum dalam sebuah array dan cara memperbaikinya."
tags: ["JavaScript", "Debugging", "Problem Solving"]
featured: false
---

## Pendahuluan

Debugging adalah skill yang sangat penting dalam programming, dan kadang-kadang, fungsi yang terlihat sederhana pun bisa menyimpan bug yang tersembunyi. Mari kita analisis sebuah fungsi JavaScript yang seharusnya mencari nilai maksimum dalam sebuah array. Bisakah kamu menemukan bugnya?

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

## Memahami Masalahnya

Sekilas, fungsi ini terlihat bekerja dengan benar — ia mengiterasi array dan memperbarui `maxVal` setiap kali menemukan angka yang lebih besar. Namun, ada bug yang cukup halus di sini: **nilai awal `maxVal` diset ke `0`**.

Kenapa ini jadi masalah? Kalau semua elemen dalam `inputArray` bernilai negatif, `maxVal` tidak akan pernah diperbarui, dan fungsi ini akan mengembalikan `0` secara salah — padahal `0` bahkan tidak ada di dalam array!

Contohnya, dengan input `[-10, 20, -5, -1]`, fungsi ini bekerja baik karena `20` lebih besar dari `0`. Tapi kalau kita ubah inputnya menjadi `[-10, -20, -5, -1]`, fungsi ini akan mengembalikan `0` secara keliru, padahal seharusnya `-1`.

## Memperbaiki Bug-nya

Agar `maxVal` dimulai dari nilai yang tepat, kita perlu menginisialisasinya menggunakan elemen pertama dari `inputArray`, bukan dari `0`.

### Kode yang Sudah Diperbaiki

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

## Poin Penting yang Bisa Dipetik

- Selalu inisialisasi variabel dengan nilai yang masuk akal untuk problem yang sedang dikerjakan.
- Saat bekerja dengan array, menggunakan elemen pertama sebagai nilai awal biasanya lebih aman.
- Pertimbangkan edge case seperti array kosong atau semua angka negatif saat menulis fungsi.
- Menguji fungsimu dengan berbagai input membantu menemukan bug yang tersembunyi.

Dengan perbaikan kecil tapi krusial ini, fungsi kita sekarang bekerja dengan benar untuk semua kasus. Selamat coding!
