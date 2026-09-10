---
title: "Seni Refactoring Codebase Legacy Tanpa Mengundang Bencana"
date: "2026-09-08"
description: "Refactoring bukan cuma soal merapikan fungsi, tapi soal urutan berpikir: pahami konteks, pasang jaring pengaman, dan hadirkan empati lewat PR kecil."
tags:
  [
    "Software Engineering",
    "Clean Architecture",
    "Code Review",
    "Kotlin Multiplatform",
  ]
featured: true
---

Beberapa hari lalu, Tech Lead-ku mengirimkan sebuah pesan di chat tim yang terus mengendap di kepalaku sampai sekarang:

> _"…we can start look over the tests and consistency of code and architecture, are there pieces which should be moved around following the Clean Architecture already going on? Where are the technical debts? First thing should be for us to clean up the project to more easily grasp what is going on, but to do this we also need to be wary not to break anything, hence write tests first and make good arguments in PRs to why the changes are made, and make them PRs small and easy to digest for the developers already in the project."_

Kodenya sendiri sebenarnya tidak rumit. Yang membuatku terus memikirkannya justru satu hal: **urutan berpikir yang beliau tekankan sebelum kita menyentuh keyboard.**

Konteks obrolan kami saat itu adalah tentang sebuah _library_ Kotlin Multiplatform yang sudah berumur, menopang lintas platform (Android, iOS, hingga backend), dan dikerjakan bersama oleh banyak orang. Tim sedang mencoba migrasi perlahan menuju _Clean Architecture_.

Saat dihadapkan pada kode lama yang berantakan, refleks pertama mayoritas developer adalah langsung "bersihkan sekarang juga". Padahal pesan dari Lead-ku tadi mengingatkan: tanpa urutan yang benar, refactoring justru bisa berubah jadi bencana.

---

### 1. Pahami Dulu, Baru Ubah

Sebelum meributkan _clean code_, _test coverage_, atau arsitektur idaman, tanyakan dulu pada diri sendiri: **apa tujuan kode ini dibuat dan siapa yang menggunakannya?**

Ini terdengar elemental, tapi paling sering diabaikan saat ego teknis kita tersulut melihat kode jelek. Tanpa memahami konteks bisnis dan kompromi masa lalu di balik kode tersebut, refactor yang kita lakukan berisiko tinggi merusak keputusan desain yang sebenarnya sengaja dibuat.

Memahami alur komunikasi sistem adalah fondasi. Baru setelah itu kita bisa secara rasional menilai:

- Mana _test_ yang absensinya membahayakan.
- Di mana letak inkonsistensi penulisan.
- Komponen mana yang memang layak dipindah rumah.

---

### 2. Memetakan Technical Debt Secara Presisi

Seperti yang disinggung di chat tadi (_"Where are the technical debts?"_), mengatakan _"Project ini penuh utang teknis"_ itu gampang dan murah. Yang sulit adalah menunjuk hidungnya secara presisi.

_Technical debt_ yang berguna adalah utang yang punya alamat jelas. Bagian mana yang melanggar batas arsitektur? File mana yang menyembunyikan _side effect_? Jika kita belum bisa memetakan lokasinya secara rinci, artinya kita belum benar-benar paham masalahnya.

---

### 3. Goal Pertama: Buat Kode Mudah Dipahami

Lupakan ambisi _"100% Clean Architecture dalam satu sprint"_. Target seperti itu hampir selalu berakhir kegagalan atau _burnout_.

Tetapkan goal yang realistis seperti pesan Lead-ku: **buat codebase tersebut lebih mudah dibaca daripada saat kita pertama kali membukanya.**

Kode yang mudah dipahami adalah kemenangan taktis. Ketika alurnya transparan, biaya untuk melakukan perbaikan di masa depan secara otomatis menjadi jauh lebih murah.

---

### 4. Jaring Pengaman: Test Dulu, Refactor Kemudian

Karena goal utama kita adalah memperjelas alur tanpa mengubah perilaku sistem, risiko merusak _feature_ yang sudah jalan di _production_ sangatlah tinggi.

Disiplin urutannya tidak boleh dibalik:

1. **Tulis test dulu** untuk mengunci perilaku (_behavior_) kode saat ini.
2. **Lakukan refactor** dengan memanfaatkan test tersebut sebagai jaring pengaman (_safety net_).
3. **Sertakan alasan yang kuat** dalam deskripsi Pull Request (PR).
4. **Pecah PR menjadi porsi-porsi kecil.**

Di lapangan, orang kerap terburu-buru merapikan kode dan baru panik membuat _test_ ketika aplikasi _crash_ di tangan user. _Test-driven refactoring_ bukan formalitas, tapi asuransi.

---

### 5. PR Kecil Adalah Bentuk Empati

Poin terakhir dari chat tersebut yang paling membekas buatku: **Pull Request yang baik adalah PR yang menghargai waktu rekan tim.**

Refactor bukan cuma tentang membuat kode tampak indah di mata kita, tetapi tentang kemudahan orang lain untuk meninjau, memahami, dan memeliharanya di kemudian hari.

PR raksasa yang mengubah puluhan file sekaligus hanya akan menghasilkan dua hal:

- Ditolak karena membuat bingung.
- Di-_approve_ asal-asalan karena reviewer sudah lelah melakukan _scrolling_.

PR yang kecil, terfokus, dan disertai penjelas alasan yang jernih adalah bentuk rasa hormat tertinggi pada rekan satu tim.

---

### Pelajaran Penting

Pesan dari Lead-ku memberikan urutan berpikir universal yang berlaku untuk project apa pun yang memiliki jejak sejarah panjang:

**Pahami konteks → Petakan utang → Tulis test → Refactor pelan-pelan → Ajukan PR kecil.**

Pada akhirnya, perbaikan kode yang paling berharga bukanlah perubahan besar yang dramatis, melainkan perubahan kecil yang dapat dipercaya dan dilanjutkan dengan tenang oleh tim setelah kita beralih ke task berikutnya.
