---
title: "Perbandingan Lengkap Metode safeParse dan parse di Zod"
date: "2025-03-19"
description: "Memahami perbedaan antara safeParse dan parse di Zod sangat penting untuk validasi data yang efektif di TypeScript. Artikel ini membahas perbedaan perilaku, kasus penggunaan, dan kapan harus memilih salah satunya untuk memastikan penanganan error yang kuat dan mudah diprediksi di aplikasi kamu."
tags: ["Zod", "TypeScript", "Data Validation"]
featured: false
---

Zod adalah library validasi skema berbasis TypeScript yang populer, yang membantu developer menerapkan keamanan tipe saat runtime. Saat bekerja dengan Zod, dua metode yang paling sering digunakan untuk validasi adalah `parse` dan `safeParse`. Meski keduanya punya tujuan yang sama — memvalidasi data input terhadap skema Zod — perilaku dan kasus penggunaannya cukup berbeda. Di artikel ini, kita akan mengulas perbedaan tersebut dan membantu kamu menentukan kapan harus menggunakan masing-masing metode.

## Memahami `parse`

Metode `parse` adalah yang paling sederhana di antara keduanya. Ia memvalidasi data input terhadap skema yang sudah didefinisikan, dan hasilnya bisa salah satu dari dua kemungkinan:

- Mengembalikan data yang sudah diparse jika validasi berhasil.
- Melempar error jika validasi gagal.

### Contoh Penggunaan Parse

```typescript
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
});

const validData = { name: "Alice", age: 25 };
const invalidData = { name: "Alice", age: "twenty-five" };

// Validasi berhasil
const parsedData = userSchema.parse(validData);
console.log(parsedData); // { name: "Alice", age: 25 }

// Validasi gagal - melempar error
const parsedInvalidData = userSchema.parse(invalidData);
// Throws: ZodError: Expected number, received string
```

### Kapan Menggunakan `parse`

- Ketika kamu yakin data input sudah valid dan tidak ingin repot menangani error validasi.
- Ketika kamu lebih suka agar exception dilempar saat data tidak valid.
- Dalam situasi di mana error validasi seharusnya menghentikan eksekusi (misalnya, validasi request API yang kritis).

## Memahami `safeParse`

Berbeda dengan `parse`, metode `safeParse` tidak melempar error saat validasi gagal. Sebaliknya, ia mengembalikan sebuah objek dengan flag `success` beserta data yang sudah diparse (jika validasi berhasil) atau informasi error yang detail (jika validasi gagal).

### Contoh Penggunaan SafeParse

```typescript
const result1 = userSchema.safeParse(validData);
console.log(result1);
// { success: true, data: { name: "Alice", age: 25 } }

const result2 = userSchema.safeParse(invalidData);
console.log(result2);
/* {
  success: false,
  error: ZodError: [{
    path: ["age"],
    message: "Expected number, received string"
  }]
} */
```

### Kapan Menggunakan `safeParse`

- Ketika kamu ingin menangani error validasi dengan mulus tanpa exception.
- Dalam skenario input pengguna di mana data yang tidak valid tidak boleh menghentikan eksekusi.
- Untuk memvalidasi banyak input sekaligus tanpa berhenti di kegagalan pertama.
- Saat kamu ingin mencatat log atau memproses error validasi alih-alih melempar exception.

## Perbedaan Utama: `parse` vs `safeParse`

| Fitur          | `parse`                                                           | `safeParse`                                                       |
| -------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| Mengembalikan  | Data yang sudah divalidasi                                        | `{ success: boolean, data?: T, error?: ZodError }`                |
| Saat gagal     | Melempar error                                                    | Mengembalikan `success: false` beserta detail error               |
| Kasus penggunaan | Saat validasi harus berhasil dan error seharusnya menghentikan eksekusi | Saat kegagalan validasi perlu ditangani tanpa menyebabkan crash |

## Kesimpulan

Pilihan antara `parse` dan `safeParse` bergantung pada kebutuhan kamu:

- Gunakan `parse` ketika kamu menginginkan validasi ketat yang langsung melempar error saat gagal.
- Gunakan `safeParse` ketika kamu ingin menangani error validasi dengan cara yang lebih terkontrol.

Memahami kedua metode ini akan membantu kamu menulis aplikasi TypeScript yang lebih aman dan mudah diprediksi menggunakan Zod. Baik saat membangun API, memvalidasi input pengguna, maupun menerapkan struktur data, memilih pendekatan yang tepat akan meningkatkan keandalan kode dan kualitas penanganan error.
