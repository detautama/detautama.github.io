---
title: "🐞 Kuis: Temukan Bugnya – Deteksi Bahasa dari URL"
date: "2025-06-24"
description: "Artikel berbentuk kuis yang membahas bug umum dalam deteksi bahasa berbasis URL dan cara memperbaikinya."
tags: ["JavaScript", "Debugging", "Internationalization"]
featured: false
---

Saat membangun website multibahasa, salah satu pendekatan umum untuk mendeteksi bahasa pengguna adalah dengan memeriksa URL. Misalnya, kamu mungkin mengecek apakah URL mengandung `"en"` untuk menentukan apakah halaman tersebut berbahasa Inggris atau bahasa lainnya.

Berikut adalah potongan kode JavaScript sederhana yang mencoba melakukan hal tersebut:

```js
if (window.location.href.includes("en")) {
  // Set language to English
} else {
  // Set language to Swedish
}
```

### Skenarionya

Bayangkan website kamu memiliki struktur URL seperti ini:

- `https://example.com/en/about` (halaman bahasa Inggris)
- `https://example.com/sv/about` (halaman bahasa Swedia)
- `https://example.com/customer-cases/vattenfall` (studi kasus tanpa prefix bahasa)

Sekilas, kondisinya terlihat benar — kalau URL mengandung `"en"`, anggap saja bahasa Inggris. Kalau tidak, gunakan bahasa Swedia.

### 🕵️‍♂️ Bisa kamu temukan bugnya?

Bug-nya ada pada cara URL diperiksa menggunakan `.includes("en")`. Pengecekan ini mencari substring `"en"` di mana saja dalam seluruh URL, bukan hanya di segmen bahasa yang seharusnya. Hal ini bisa menyebabkan false positive.

#### Apa yang bisa salah?

- **False positive:** Kata `"en"` bisa muncul di bagian lain URL, seperti di path atau query parameter, yang sama sekali tidak berkaitan dengan bahasa. Contohnya:

  - `https://example.com/customer-cases/vattenfall`  
    String `"en"` muncul di dalam kata `"vattenfall"`, sehingga `.includes("en")` mengembalikan `true`, dan bahasa salah ditetapkan sebagai bahasa Inggris.

- **Deteksi bahasa yang salah:** Situs bisa secara keliru menampilkan konten atau elemen UI dalam bahasa Inggris di halaman yang sebenarnya berbahasa Swedia atau netral.

### Cara memperbaikinya?

Daripada mencari `"en"` di mana saja dalam URL, batasi pengecekan hanya pada bagian URL yang memang menentukan bahasa — biasanya segmen path pertama.

Berikut pendekatan yang lebih baik:

```js
const pathSegments = window.location.pathname.split("/");
const lang = pathSegments[1]; // segmen path pertama setelah domain

if (lang === "en") {
  // Set language to English
} else if (lang === "sv") {
  // Set language to Swedish
} else {
  // Default language or fallback
}
```

### Kenapa ini lebih baik?

- **Deteksi yang tepat:** Kode ini secara eksplisit melihat segmen path pertama, di mana kode bahasa seharusnya berada.
- **Menghindari false positive:** Tidak akan salah mengira bagian dari kata lain atau parameter sebagai kode bahasa.
- **Mudah dikembangkan:** Kamu bisa menambahkan bahasa lain cukup dengan mengecek kode yang berbeda.

---

### Ringkasan

Mengecek substring seperti `"en"` di mana saja dalam URL adalah pendekatan yang umum tapi rapuh untuk deteksi bahasa. Selalu persempit pengecekan ke segmen URL spesifik yang bertanggung jawab atas bahasa, agar terhindar dari bug.

Apakah kamu berhasil menemukan bugnya dengan cepat? Tulis di kolom komentar!
