---
title: "Vibe Coding Slideshow Galeri untuk Upacara Adat Desaku"
date: "2026-05-30"
description: "Tahun ini aku jadi seksi Humas di upacara Caru Nawa Gempang di Desa Adat Celuk, dan salah satu tugasku adalah membuat slideshow foto untuk proyektor. Begini ceritanya."
tags: ["Vibe Coding", "AI", "Claude Code", "Personal", "Bali"]
featured: false
---

Tahun ini aku terpilih jadi bagian dari seksi Humas di upacara Caru Nawa Gempang di Desa Adat Celuk. Tugasku spesifik: handle sosial media. Tapi ada permintaan tambahan – membuat slideshow foto untuk ditampilkan di proyektor selama acara berlangsung.

Kedengarannya simpel. Ternyata tidak.

![Setup laptop dan proyektor di venue upacara Caru Nawa Gempang, Desa Adat Celuk](/images/blog/caru-nawa-gempang-slideshow-setup.jpg)

---

## Kenapa Aku yang Dipilih Jadi Seksi Humas

Aku bukan orang marketing. Tidak ada background komunikasi atau PR. Tapi aku dikenal sebagai "orang IT" di desa, dan mungkin itu sudah cukup. Beberapa pengalaman kecil yang pernah aku lakukan di komunitas – entah itu bantu desain, posting konten, atau urusan digital lainnya – sepertinya terakumulasi jadi satu label: *"ah si Deta cocok nih buat humas."*

Dan begitulah aku masuk ke seksi Humas bagian sosial media untuk Caru Nawa Gempang.

---

## Sekilas tentang Caru Nawa Gempang

Caru Nawa Gempang adalah upacara Bali untuk membersihkan desa – menetralisir energi negatif dan menjaga keseimbangan alam semesta di lingkungan desa adat. Upacara ini tidak diadakan tiap tahun; cukup jarang, dan skalanya besar. Jadi wajar kalau dokumentasi dan publikasinya juga perlu dipersiapkan dengan serius.

---

## Permintaan yang Datang di Tengah Jalan

Di sela-sela persiapan, aku dapat permintaan: *buatkan slideshow foto dan video untuk ditampilkan di proyektor saat acara.*

Semua file dokumentasi ada di Google Drive – foto dan video, semuanya masih RAW, belum dikompresi. Kalau didownload dulu semuanya ke lokal, bisa makan waktu lama dan ruang penyimpanan yang tidak sedikit. Ide awalnya: langsung fetch dari Google Drive via API, jadi tidak perlu download sama sekali.

Aku langsung buka Claude Code, tulis prompt, dan biarkan dia yang kerja. Hasilnya satu file HTML + JavaScript – tidak perlu framework, tidak perlu build process. Cukup buka di browser, sambungkan ke proyektor.

Tapi begitu dicoba, masalah mulai bermunculan.

---

## Problem Demi Problem

**Video tidak bisa diputar.** Ukuran file video terlalu besar untuk di-stream langsung. Idealnya ada opsi fetch video resolusi rendah, tapi Google Drive API tidak menyediakan itu – itu fitur Google Foto, bukan Google Drive. Akhirnya video dikeluarkan dari slideshow. Hanya foto yang ditampilkan.

**Slide berpindah sebelum foto selesai dimuat.** Ini yang paling mengganggu. Slideshow berjalan otomatis, tapi fetch foto dari Drive butuh waktu – terutama karena ukurannya besar. Slide sudah pindah ke foto berikutnya, tapi foto belum selesai dimuat. Hasilnya: layar kosong, atau foto sebelumnya masih nempel sebentar sebelum lompat.

**Solusinya: prefetch 3 foto ke depan.** Daripada fetch satu foto tepat saat akan ditampilkan, slideshow diubah supaya selalu fetch 3 foto berikutnya di background – sementara foto sekarang masih ditampilkan. Jadi saat slide berpindah, foto berikutnya sudah siap. Tidak ada layar kosong, tidak ada loading yang kelihatan.

**Navigasi folder tidak jadi masalah.** Satu hal yang justru berjalan mulus: meskipun foto tersebar di beberapa sub-folder di dalam Drive, Google Drive API bisa meng-crawl semua path-nya dari satu folder induk menggunakan API key. Tidak perlu listing manual per folder.

---

## Kesimpulan

Vibe coding bukan berarti langsung jalan mulus tanpa berpikir. Dalam kasus ini, Claude Code memang cepat menghasilkan fondasi awalnya – tapi problem nyata baru kelihatan setelah dicoba langsung. Video tidak bisa diputar, slide loncat sebelum foto siap, dan butuh beberapa iterasi sebelum slideshownya benar-benar layak dipakai di proyektor.

Yang membuat prosesnya tetap cepat bukan karena tidak ada masalah – tapi karena setiap kali ada masalah, aku tahu apa yang perlu aku jelaskan ke Claude Code, dan dia langsung bisa menerjemahkannya jadi solusi.

Kamu tetap perlu berpikir. Tapi beban implementasinya bisa didelegasikan.
