---
title: "JavaScript flatMap(): Transformasi dan Perataan Data Secara Efisien"
date: "2025-02-01"
description: "Menangani data terstruktur secara efisien adalah tugas krusial dalam JavaScript, terutama saat bekerja dengan nested array atau memproses respons API. Fungsi `flatMap()` menawarkan solusi yang elegan dengan menggabungkan mapping dan flattening dalam satu langkah. Artikel ini membahas bagaimana `flatMap()` menyederhanakan konversi data, khususnya saat berurusan dengan struktur data bersarang seperti respons API."
tags: ["JavaScript", "Data Structures", "Array Methods"]
featured: false
---

## **Abstrak**

Menangani data terstruktur secara efisien adalah tugas krusial dalam JavaScript, terutama saat bekerja dengan nested array atau memproses respons API. Fungsi `flatMap()` menawarkan solusi yang elegan dengan menggabungkan mapping dan flattening dalam satu langkah. Artikel ini membahas bagaimana `flatMap()` menyederhanakan konversi data, khususnya saat berurusan dengan struktur data bersarang seperti respons API.

---

## **Pendahuluan**

Aplikasi JavaScript modern sering kali berurusan dengan **data bersarang (nested data)**, baik yang berasal dari API, input pengguna, maupun query database. Pendekatan tradisional untuk memproses data semacam ini biasanya melibatkan `.map()` untuk mentransformasi elemen-elemennya, lalu diikuti `.flat()` untuk meratakan hasilnya. Namun, cara ini bisa menambah kompleksitas yang tidak perlu dan mempengaruhi performa.

Untuk mengatasi hal ini, JavaScript memperkenalkan method `flatMap()`, yang **menggabungkan mapping dan flattening dalam satu langkah**. Method ini sangat berguna dalam **tugas transformasi data**, seperti mengekstrak informasi dari respons API, memfilter nilai kosong, dan merestrukturisasi dataset agar lebih mudah digunakan.

---

## **Isi Utama**

### **1. Memahami `flatMap()`**

#### **1.1 Sintaks dan Penjelasan**

Method `flatMap()` digunakan pada array untuk **memetakan setiap elemen** ke nilai baru (seperti `map()`) sekaligus **meratakan hasilnya satu level** (seperti `flat(1)`).

##### **Sintaks**

```javascript
array.flatMap(callback(element, index, array), thisArg);
```

- **`callback`** – Fungsi yang diterapkan pada setiap elemen.
- **`element`** – Elemen array saat ini.
- **`index`** – Indeks dari elemen saat ini.
- **`array`** – Array asli.
- **`thisArg`** _(opsional)_ – Nilai yang digunakan sebagai `this` di dalam callback.

---

### **2. Kasus Penggunaan Nyata: Meratakan Respons API**

Ketika bekerja dengan API, respons sering kali mengandung **data bersarang**. Mari kita ambil contoh di mana kita mengambil **data pengguna** yang masing-masing memiliki lebih dari satu nomor telepon.

#### **2.1 Contoh Respons API**

Bayangkan sebuah API mengembalikan daftar pengguna beserta nomor telepon mereka:

```javascript
const users = [
  { name: "Alice", phones: ["123-456", "789-101"] },
  { name: "Bob", phones: ["112-233"] },
  { name: "Charlie", phones: [] },
];
```

Setiap pengguna memiliki **satu atau lebih nomor telepon** yang tersimpan dalam array. Tujuan kita adalah mengekstrak semua nomor telepon ke dalam **satu flat list**.

#### **2.2 Menggunakan `.map()` (Tanpa Flattening)**

Dengan `.map()`, kita mendapatkan **nested array** karena nomor telepon tiap pengguna berada dalam sub-array:

```javascript
const mappedPhones = users.map((user) => user.phones);

console.log(mappedPhones);
// Output: [["123-456", "789-101"], ["112-233"], []]   (Nested array)
```

Hasil ini **kurang ideal** karena ada nesting yang tidak diperlukan.

#### **2.3 Menggunakan `.flatMap()` (Hasil Rata)**

Dengan `.flatMap()`, kita bisa mengekstrak dan **meratakan nomor telepon dalam satu langkah**:

```javascript
const allPhones = users.flatMap((user) => user.phones);

console.log(allPhones);
// Output: ["123-456", "789-101", "112-233"]   (Flat array)
```

✔ **Mengapa ini lebih baik?**

- Kita **tidak perlu** operasi `.flat()` tambahan.
- Kodenya **lebih bersih dan efisien**.
- Hasilnya **siap untuk diproses lebih lanjut** (misalnya, memfilter duplikat).

---

### **3. Membandingkan `flatMap()` dengan Method Lain**

#### **3.1 Menggunakan `.map().flat()` (Pendekatan Alternatif)**

Sebelum ada `flatMap()`, kita harus menggunakan chain `.map()` dan `.flat()`:

```javascript
const allPhones = users.map((user) => user.phones).flat();

console.log(allPhones);
// Output: ["123-456", "789-101", "112-233"]
```

Ini memang bekerja, tapi `flatMap()` lebih disukai karena:

- Menghindari pembuatan **intermediate nested array**.
- **Meningkatkan performa**, karena hanya butuh satu kali iterasi.

#### **3.2 Menggunakan `reduce()` (Pendekatan yang Lebih Kompleks)**

Cara lain untuk meratakan data adalah dengan `.reduce()`, tapi ini **kurang mudah dibaca**:

```javascript
const allPhones = users.reduce((acc, user) => acc.concat(user.phones), []);

console.log(allPhones);
// Output: ["123-456", "789-101", "112-233"]
```

✔ **Mengapa sebaiknya dihindari?**

- `.reduce()` **kurang intuitif** untuk tugas flattening sederhana.
- **Lebih sulit dibaca** dibanding `.flatMap()`.

---

### **4. Kasus Penggunaan Tambahan untuk `flatMap()`**

#### **4.1 Menghapus Nilai Kosong atau `null`**

Jika respons API mengandung nilai kosong atau `null`, `flatMap()` bisa membantu **memfilternya** sekaligus meratakan data:

```javascript
const data = ["apple", "", "banana", null, "cherry"];

const filteredData = data.flatMap((item) => (item ? [item] : []));

console.log(filteredData);
// Output: ["apple", "banana", "cherry"]
```

#### **4.2 Memecah Kalimat Menjadi Kata-kata**

```javascript
const sentences = ["Hello world", "JavaScript is fun"];

const words = sentences.flatMap((sentence) => sentence.split(" "));

console.log(words);
// Output: ["Hello", "world", "JavaScript", "is", "fun"]
```

✔ **Mengapa menggunakan `flatMap()`?**

- Menghindari **langkah tambahan** untuk meratakan secara manual.
- Menghasilkan **satu array bersih** berisi kata-kata.

---

## **Kesimpulan**

`flatMap()` di JavaScript adalah alat yang powerful untuk mentransformasi dan meratakan array secara **efisien**. Method ini sangat berguna untuk:

✅ **Meratakan nested API responses**  
✅ **Memfilter nilai yang tidak diinginkan sambil mentransformasi data**  
✅ **Memecah teks menjadi elemen-elemen terstruktur**

Dibandingkan dengan `.map().flat()`, `flatMap()` **lebih efisien** dan **lebih mudah dibaca**. Ia menghilangkan intermediate array yang tidak perlu, membuat kode menjadi **lebih bersih dan lebih performan**.

---

## **Referensi**

- Mozilla Developer Network (MDN). (n.d.). [_Array.prototype.flatMap()_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
