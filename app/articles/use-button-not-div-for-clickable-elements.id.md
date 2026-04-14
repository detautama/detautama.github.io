---
title: "Gunakan <button>, Bukan <div>, untuk Elemen yang Bisa Diklik"
date: "2025-03-14"
description: "Menggunakan <button> alih-alih <div> untuk elemen interaktif meningkatkan aksesibilitas, navigasi keyboard, dan dukungan pembaca layar. Tombol secara alami dapat difokuskan, merespons Enter dan Spasi, dan membutuhkan lebih sedikit kode tambahan. Hindari kompleksitas yang tidak perlu, gunakan elemen semantik yang tepat untuk kegunaan yang lebih baik dan kepatuhan terhadap standar aksesibilitas web."
tags: ["Accessibility", "HTML", "Best Practices", "UX"]
featured: true
---

Menggunakan `<button>` alih-alih `<div>` untuk elemen interaktif meningkatkan aksesibilitas, navigasi keyboard, dan dukungan pembaca layar. Tombol secara alami dapat difokuskan, merespons Enter dan Spasi, dan membutuhkan lebih sedikit kode tambahan. Hindari kompleksitas yang tidak perlu, gunakan elemen semantik yang tepat untuk kegunaan yang lebih baik dan kepatuhan terhadap standar aksesibilitas web.

## 1. Manfaat Aksesibilitas

Menggunakan elemen semantik yang benar memastikan bahwa aplikasi web Anda dapat diakses oleh semua pengguna, termasuk mereka yang mengandalkan teknologi asistif seperti pembaca layar (screen reader). Elemen `<button>`, misalnya, secara otomatis dikenali oleh pembaca layar dan dapat dinavigasi melalui pintasan keyboard, sementara `<div>` tidak menyediakan fungsionalitas bawaan ini tanpa upaya ekstra.

## 2. Fungsionalitas Bawaan

Elemen seperti `<button>` dilengkapi dengan perilaku default yang meningkatkan pengalaman pengguna. Ini termasuk:

- Fokus keyboard (pengguna dapat menekan tab ke tombol tanpa kode tambahan)
- Penanganan event klik (otomatis terpicu saat menekan Enter atau Spasi)
- Gaya dan tema yang tepat di berbagai browser

Menggunakan `<div>` alih-alih `<button>` mengharuskan Anda mengimplementasikan fitur-fitur ini secara manual, yang meningkatkan upaya pengembangan dan potensi kesalahan.

### Contoh Potongan Kode

Berikut adalah contoh perbandingan antara `<div>` dan `<button>`:

```html
<!-- Pendekatan yang salah menggunakan div -->
<div onclick="handleClick()" role="button" tabindex="0">Klik Saya</div>

<!-- Pendekatan yang benar menggunakan button -->
<button onclick="handleClick()">Klik Saya</button>
```

Dalam pendekatan yang salah, atribut tambahan seperti `role="button"` dan `tabindex="0"` diperlukan agar `<div>` bertindak seperti tombol, sedangkan `<button>` menangani semua ini secara alami.

## 3. Peningkatan SEO dan Performa

Mesin pencari memprioritaskan HTML semantik yang terstruktur dengan baik. Menggunakan elemen yang benar membantu meningkatkan pengindeksan dan peringkat situs. Selain itu, fungsionalitas bawaan mengurangi kebutuhan akan JavaScript tambahan, sehingga meningkatkan performa dan kemudahan pemeliharaan (maintainability).

## 4. Pengalaman Pengguna yang Konsisten

Browser dan sistem operasi mengoptimalkan interaksi berdasarkan semantik. Misalnya, elemen `<button>` secara otomatis mewarisi gaya spesifik platform, perilaku, dan fitur aksesibilitas yang diharapkan pengguna. Hal ini menghasilkan pengalaman yang lebih konsisten dan dapat diprediksi di berbagai perangkat.

## Kesimpulan

Menggunakan tag semantik yang tepat bukan hanya praktik terbaik, tetapi juga penting untuk aksesibilitas, kegunaan, dan pemeliharaan. Dengan menggunakan `<button>` alih-alih `<div>` untuk elemen interaktif, Anda menciptakan pengalaman web yang lebih inklusif, ramah pengguna, dan efisien.

Jadi, lain kali Anda tergoda untuk menggunakan `<div>` untuk elemen interaktif, tanyakan pada diri sendiri: Apakah `<button>` atau elemen semantik lainnya akan menjadi pilihan yang lebih baik?
