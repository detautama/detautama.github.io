---
title: "Prioritas Testing di Era AI: Smoke Test dan Dokumentasi Terlebih Dahulu"
date: "2025-10-21"
description: "Pendapat saya tentang prioritas pengujian modern: mulai dengan smoke test dan dokumentasi, lalu tambahkan pengujian e2e, komponen, dan unit. Pendekatan praktis untuk pengembangan bertenaga AI."
tags: ["Testing", "Best Practices", "AI Development", "Documentation"]
featured: false
---

Seiring dengan asisten koding AI yang semakin kuat, strategi pengujian (testing) kita perlu berevolusi. Setelah bertahun-tahun membangun dan memelihara aplikasi—termasuk blog ekspor statis Next.js ini—saya mengembangkan opini kuat tentang prioritas pengujian yang bekerja sangat baik di era AI.

## Fondasi: Smoke Test Adalah yang Utama

Sebelum hal lain, **Anda butuh smoke test**. Bukan nanti-nanti. Bukan "saat kita punya waktu." Tapi sekarang juga.

Smoke test adalah *canary in the coal mine* Anda. Ini adalah validasi minimal mutlak bahwa aplikasi Anda hidup dan bernapas. Untuk aplikasi web, ini bisa sesederhana:

- Apakah aplikasi bisa berjalan?
- Apakah beranda (*homepage*) bisa dimuat?
- Apakah rute-rute penting dapat diakses?
- Apakah layanan esensial memberikan respons?

### Mengapa Smoke Test Harus Diutamakan

Dalam pengembangan dengan bantuan AI, kita menghasilkan kode lebih cepat dari sebelumnya. Claude, GitHub Copilot, dan alat AI lainnya dapat membuat kerangka seluruh fitur dalam hitungan menit. Namun kecepatan tanpa validasi hanyalah utang teknis yang dipercepat.

Smoke test memastikan bahwa tidak peduli seberapa banyak kode yang dihasilkan AI, inti aplikasi Anda tetap fungsional. Ini adalah jaring pengaman Anda yang menangkap kegagalan fatal sebelum mencapai pengguna—atau lebih buruk lagi, sebelum menjadi masalah yang lebih besar.

## Dokumentasi: Setengah Bagian Fondasi Lainnya

Smoke test memberitahu Anda **apakah** sesuatu berfungsi. Dokumentasi memberitahu Anda **bagaimana** dan **mengapa** hal itu harus berfungsi.

Inilah pendapat kontroversial saya: **Dokumentasi harus ditulis bersamaan dengan—atau bahkan sebelum—smoke test.**

Mengapa? Karena di era pengembangan berbantuan AI:

1.  **AI butuh konteks**: Alat seperti Claude Code bekerja paling baik saat mereka memahami niat (*intent*) sistem Anda, bukan hanya statusnya saat ini.
2.  **Manusia cepat lupa**: Solusi cerdik yang Anda terapkan? Anda akan lupa mengapa itu ada dalam dua minggu.
3.  **Onboarding itu krusial**: Dengan AI yang menghasilkan kode dengan cepat, anggota tim (manusia atau AI) butuh dokumentasi yang jelas untuk memahami sistem yang mereka kembangkan.

### Apa yang Harus Didokumentasikan Terlebih Dahulu

Fokuslah pada:

- **Arsitektur sistem**: Bagaimana komponen-komponen saling terhubung
- **Jalur kritis (Critical paths)**: Apa yang harus berfungsi agar aplikasi layak digunakan
- **Pengaturan lingkungan (Environment setup)**: Bagaimana cara menjalankan aplikasi dari nol
- **Pendekatan pengujian**: Bagaimana cara memvalidasi perubahan (ya, dokumentasikan strategi pengujian Anda!)

Untuk blog ini, file `.github/copilot-instructions.md` adalah contoh sempurna—ia memberitahu agen AI cara bekerja dengan basis kode secara efektif.

## Piramida Pengujian: Dibayangkan Kembali untuk Pengembangan AI

Setelah smoke test dan dokumentasi siap, inilah cara saya memprioritaskan pengujian tambahan:

### 1. End-to-End (E2E) Tests

**E2E tests adalah prioritas kedua Anda** setelah smoke tests.

Mengapa? Karena mereka memvalidasi bahwa perjalanan pengguna (*user journeys*) berfungsi sesuai keinginan, menangkap masalah integrasi yang terlewatkan oleh unit test. Dalam pengembangan berbantuan AI, di mana bagian-bagian sistem yang berbeda mungkin dihasilkan secara terpisah, E2E tests memastikan semuanya benar-benar bekerja bersama.

Untuk blog ini, pengujian E2E mungkin memverifikasi:

- Halaman artikel dirender dengan benar
- Navigasi berfungsi di seluruh layout groups
- Mode gelap berubah dengan benar
- Tag memfilter artikel seperti yang diharapkan

### 2. Component Tests

**Component tests adalah berikutnya**, fokus pada elemen interaktif dan logika yang kompleks.

Ini sangat berharga saat AI menghasilkan komponen UI. Sebuah komponen mungkin terlihat benar secara terisolasi tetapi berperilaku salah dalam kondisi tertentu.

Kandidat bagus untuk pengujian komponen:

- Custom hooks dengan logika state yang kompleks
- Widget interaktif (seperti tombol mode gelap)
- Rendering Markdown dengan penanganan khusus
- Logika validasi formulir

### 3. Unit Tests

**Unit tests adalah yang terakhir—namun tetap penting.**

Saya tahu ini bertentangan dengan kebijaksanaan pengujian tradisional, tapi dengarkan saya: dalam pengembangan berbantuan AI, unit tests memberikan nilai paling besar saat Anda memiliki logika bisnis atau algoritma kompleks yang butuh validasi presisi.

Untuk fungsi murni dan metode utilitas, unit tests sangat luar biasa. Tapi jangan buang waktu melakukan unit testing untuk getter, setter sederhana, atau kode sepele yang sudah tercakup dalam pengujian tingkat tinggi lainnya.

## Mengapa Urutan Ini Berhasil di Era AI

### Kecepatan Pengembangan

Alat AI menghasilkan kode dengan cepat. Strategi pengujian Anda harus mengimbanginya. Smoke test dan dokumentasi memberikan nilai langsung tanpa memperlambat kecepatan pengembangan.

### Validasi Otonom

Seperti yang saya bahas dalam artikel [TDD saya](/articles/tdd-best-practice-for-agentic-coding-with-claude-code), pengujian memungkinkan AI bekerja secara otonom. Namun Anda butuh pengujian yang tepat di waktu yang tepat:

- **Smoke tests**: Memberitahu AI segera jika ada sesuatu yang mendasar rusak
- **E2E tests**: Memberikan keyakinan pada AI bahwa alur kerja pengguna masih berfungsi
- **Component/Unit tests**: Memungkinkan AI melakukan refactor dengan aman

### Alokasi Sumber Daya Praktis

Jujur saja: pengujian memakan waktu. Dengan memprioritaskan smoke test dan dokumentasi terlebih dahulu, Anda memastikan bahwa meskipun dengan sumber daya terbatas, Anda memiliki:

1.  Dasar untuk mendeteksi kegagalan kritis
2.  Pelestarian pengetahuan untuk pekerjaan masa depan
3.  Fondasi untuk menambahkan pengujian yang lebih komprehensif nantinya

## Contoh Dunia Nyata: Blog Ini

Untuk `detautama.github.io`, berikut adalah gambaran prioritas pengujiannya:

### ✅ Smoke Test (Diimplementasikan)

```bash
npm run build
# Jika berhasil, parsing markdown dasar, routing, dan ekspor statis berfungsi
```

### ✅ Dokumentasi (Diimplementasikan)

- `.github/copilot-instructions.md` memandu agen AI
- Utilitas artikel dikomentari dengan baik di `app/lib/articles.ts`
- Perintah build didokumentasikan di `package.json`

### 🎯 E2E Tests (Akan Ditambahkan Berikutnya)

- Verifikasi halaman artikel dirender dengan benar
- Uji navigasi antar layout
- Validasi filter tag
- Periksa pergantian tema

### 🎯 Component Tests (Akan Ditambahkan Setelah E2E)

- MarkdownRenderer dengan berbagai fitur markdown
- Perilaku toggle mode gelap
- Pemfilteran dan pengurutan daftar artikel

### 🎯 Unit Tests (Akan Ditambahkan Terakhir)

- Logika parsing metadata artikel
- Fungsi pengurutan tanggal
- Utilitas agregasi tag

## Menjawab Keberatan Umum

### "Tapi piramida pengujian bilang unit test dulu!"

Piramida pengujian tradisional dirancang untuk era yang berbeda. Saat AI dapat menghasilkan dan memodifikasi kode dengan kecepatan yang belum pernah terjadi sebelumnya, kita butuh pengujian yang:

1.  Menangkap kegagalan fatal segera (smoke tests)
2.  Memvalidasi fungsionalitas yang dihadapi pengguna (E2E)
3.  Memungkinkan refactoring dengan percaya diri (semua hal di atas)

### "Bagaimana dengan TDD?"

TDD masih berharga! Tapi bahkan dalam TDD, sebaiknya Anda menulis smoke test dan dokumentasi terlebih dahulu. Kemudian praktikkan TDD untuk fitur spesifik yang sedang Anda bangun.

Kuncinya adalah: **TDD adalah teknik pengembangan**. Smoke test dan dokumentasi adalah **infrastruktur proyek**. Anda butuh infrastruktur sebelum dapat menggunakan teknik tersebut secara efektif.

### "Bukankah melewatkan unit test akan menyebabkan bug?"

Tidak, karena Anda tidak melewatkannya—Anda memprioritaskannya. Dan bug paling baik ditangkap di mana ia berdampak pada pengguna: di tingkat E2E.

Unit tests menambah presisi dan memungkinkan refactoring yang percaya diri. Mereka berharga. Mereka hanya bukan prioritas pertama saat memulai proyek atau fitur.

## Panduan Praktis untuk Proyek Anda Berikutnya

Saat memulai proyek atau fitur baru:

1.  **Hari 1**: Tulis smoke test. Meskipun hanya "aplikasi berjalan dan beranda dimuat."
2.  **Hari 1**: Dokumentasikan arsitektur inti dan proses penyiapan (*setup*).
3.  **Sebelum rilis pertama**: Tambahkan pengujian E2E untuk jalur pengguna yang kritis.
4.  **Seiring bertambahnya kompleksitas**: Tambahkan pengujian komponen untuk elemen interaktif.
5.  **Saat melakukan refactoring**: Tambahkan unit pengujian untuk logika kompleks yang Anda ubah.

## Kesimpulan

Era AI menuntut pendekatan baru terhadap prioritas pengujian. Dengan menempatkan smoke test dan dokumentasi di depan, kita menciptakan fondasi yang memungkinkan manusia dan AI mengembangkan kode dengan percaya diri dan cepat.

Kebijaksanaan pengujian tradisional tidak salah—hanya saja kurang lengkap untuk pengembangan berbantuan AI modern. Piramida tersebut tidak terbalik; kita hanya mengakui bahwa tanah di bawahnya (smoke test dan dokumentasi) selalu lebih krusial daripada yang kita akui sebelumnya.

Mulailah dengan smoke test. Dokumentasikan sambil berjalan. Tambahkan pengujian E2E, komponen, dan unit seiring berkembangnya sistem Anda. Diri Anda di masa depan—dan asisten koding AI Anda—akan berterima kasih.

---

*Apa pendapat Anda tentang prioritas pengujian di tahun 2025? Apakah Anda menemukan pendekatan berbeda yang bekerja lebih baik bagi tim Anda? Saya ingin mendengar pendapat Anda.*
