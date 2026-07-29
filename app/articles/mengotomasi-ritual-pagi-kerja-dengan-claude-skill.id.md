---
title: "Mengotomasi Ritual Pagi Kerja dengan Claude Skill"
date: "2026-07-29"
description: "Cerita bikin satu Claude Skill untuk compress ritual pagi kerja—Teams, Forecast, Outlook, Gmail, sprint board, sampai standup—jadi satu alur terpadu."
tags: ["Claude", "Automation", "Productivity", "Workflow"]
featured: false
image: "/images/home/gunung-sunrise-morning-card.webp"
---

Setiap pagi kerja, ada urutan hal yang selalu aku cek sebelum benar-benar mulai kerja: Teams, Forecast, Outlook, Gmail, sprint board Azure DevOps, lalu masukin semuanya ke TickTick, baru siapin standup. Kedengarannya sederhana, tapi kalau dikerjain satu-satu tiap pagi, itu bisa makan waktu dan yang lebih sering kejadian: ada yang kelewat.

Jadi aku coba compress semua langkah itu jadi satu skill di Claude, namanya `rutinitas-pagi-lengkap`.

## Masalah yang Mau Diselesaikan

Sebelum ada ini, alurnya kira-kira begini tiap pagi:

- Buka Teams, scroll cari unread dan cek kalender
- Buka Forecast, cek project apa yang di-assign minggu ini
- Buka Outlook, baca satu-satu email notifikasi PR, tentuin mana yang butuh review vs follow-up
- Buka Gmail, cek inbox
- Buka Azure DevOps, cek sprint board
- Masukin semua temuan itu manual ke TickTick
- Baru nyusun standup dari ingatan kemarin ngerjain apa

Titik lemahnya di step terakhir. Kalau langkah-langkah sebelumnya gak rapi, standup jadi mikir dadakan, dan kadang ada task yang kecatet dobel atau malah kelewat sama sekali.

## Cara Kerjanya

Skill ini aku tulis sebagai satu file instruksi terstruktur yang dibaca Claude begitu aku bilang "cek pagi" atau "rutinitas pagi". Isinya delapan langkah:

1. Microsoft Teams — cek unread message dan kalender hari itu
2. Report jam pulang ke WhatsApp, otomatis dihitung dari jam clock in dan meeting yang ada di kalender
3. Forecast — cek project apa yang di-assign, berapa jam alokasinya
4. Outlook — triase email notifikasi PR: mana yang butuh review, mana yang follow-up punya sendiri, mana yang sudah approved tinggal merge
5. Gmail — ringkas unread
6. Azure DevOps — cek sprint board, filter item yang assigned ke aku dan masih aktif
7. TickTick — semua temuan di atas masuk jadi task, ditag sesuai project asalnya, biar bisa jadi hub tunggal
8. Daily Standup — draft otomatis dari data TickTick, siap di-paste ke Google Chat

Teknisnya, semua akses ke Teams/Outlook/Gmail/Forecast/Azure DevOps/WhatsApp/Google Chat dilakukan lewat Claude in Chrome, ekstensi browser automation, bukan lewat integrasi API resmi dan bukan lewat desktop app. Satu-satunya yang pakai koneksi resmi adalah TickTick, lewat MCP connector.

Untuk trigger-nya sendiri, aku jalanin dari mode "Cowork" di Claude Desktop, bukan mode "Chat" biasa. Alasannya, rutinitas ini banyak langkah dan banyak tool call berurutan (browser automation ke beberapa web app sekaligus MCP call ke TickTick), jadi lebih pas dijalankan sebagai task multi-step yang bisa dipantau progressnya, dibanding sekadar chat satu arah.

## Beberapa Hal yang Aku Pelajari Sambil Bikin Ini

Detail kecil bisa bikin berantakan. Misalnya TickTick punya bug di mana `#tag` yang diketik lalu ditutup dengan Escape jadi teks biasa, bukan tag beneran. Kalau gak diverifikasi satu-satu, task jadi gak ke-filter dengan benar. Hal-hal semacam ini yang bikin skill jadi lebih tebal dari yang dikira di awal, karena tiap edge case yang ketemu langsung didokumentasikan.

## Contoh Bentuk Skill-nya

Biar gak abstrak, ini potongan struktur file skill-nya (disederhanakan, beberapa detail personal di-redact):

```markdown
---
name: "rutinitas-pagi-lengkap"
description: "Jalankan rutinitas pagi kerja: cek Microsoft Teams (unread +
calendar), cek Forecast (project assignment), triase notifikasi Azure DevOps
di Outlook (PR, comment, status ticket), cek Gmail, cek Azure DevOps sprint
board, masukin task ke TickTick, dan siapkan Daily Standup ke Google Chat.
Gunakan saat user minta 'cek pagi', 'rutinitas pagi', 'standup'."
---

# Prompt Rutinitas Pagi

**Konteks akun & tools:**
- Semua akses tool WAJIB pakai Claude in Chrome extension, BUKAN desktop app.
- Timezone acuan: WITA (UTC+8)

## 1. Cek Microsoft Teams
- Buka Teams, tab Chat, filter "Unread"
- Cek Calendar hari ini, laporkan judul + jam meeting

## 2. Cek Forecast
- Cari baris nama sendiri, lihat alokasi jam per project

## 3. Cek Outlook (triase)
- Kategorikan notifikasi jadi: Review, Follow-up, Approved
- Konfirmasi daftar akhir sebelum lanjut ke langkah berikutnya

...

## Aturan Global
- Tidak pernah hapus email/pesan permanen, walau diminta
- Konfirmasi dulu sebelum bulk-create records
- Bahasa respons: Indonesia
```

Pola yang aku pakai konsisten di semua skill: ada bagian frontmatter (`name` + `description`, ini yang dipakai Claude buat tentuin kapan skill ini relevan), lalu langkah-langkah bernomor, dan diakhiri "Aturan Global" yang berlaku di semua langkah, seperti larangan hapus data permanen dan keharusan konfirmasi sebelum aksi yang berdampak (kirim pesan, bulk-create task, dsb). Aturan global ini penting justru karena sifatnya pengaman, bukan cuma soal efisiensi.

## Kenapa Aku Tulis Ini

Ini cerita workflow personal yang mungkin relevan buat siapa saja yang punya ritual pagi berulang dan ingin mengurangi friksi di dalamnya, apapun tool stack-nya. Kalau ada yang tertarik gimana detail setup-nya atau mau coba bikin versi sendiri, boleh banget kontak aku.
