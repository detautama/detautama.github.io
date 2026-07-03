---
title: "Yang Aku Pelajari dari Pakai Sanity di Dua Project Client"
date: "2026-07-03"
description: "Catatan dari dua project company profile dwibahasa yang aku bangun pakai Sanity dan Next.js — soal localized field, revalidation via webhook, live preview, sampai kebiasaan audit schema."
tags: ["Sanity", "CMS", "Next.js", "Headless CMS"]
featured: false
---

**Dua project, satu CMS yang sama.**

Beberapa bulan terakhir aku kerjain dua project company profile berbeda, sebut saja Project A dan Project B.

Beda klien, beda konten, beda tim editor.

Tapi satu hal yang sama: keduanya dwibahasa, dan keduanya aku bangun pakai Sanity sebagai CMS-nya, digabung sama Next.js.

Karena pola masalahnya mirip, aku jadi bisa lihat pattern mana yang beneran kepake berkali-kali, dan mana yang cuma kebetulan cocok di satu project doang.

---

**Kenapa Sanity, bukan yang lain.**

Alasan awalnya sederhana: Studio-nya itu kode, bukan konfigurasi di dashboard.

Schema didefinisikan pakai TypeScript, di-review kayak kode biasa, bisa di-diff di pull request.

Ditambah GROQ buat query, dan Live Content API buat live preview tanpa perlu refresh manual.

Buat project yang kontennya lumayan terstruktur — bukan cuma blog polos — ini kerasa pas.

---

**Masalah dwibahasa, diselesaikan di level field.**

Awalnya aku mikir bikin dua document terpisah per bahasa.

Ternyata itu bikin editor gampang lupa update salah satu, dan referensi antar-document jadi dobel kerjaan.

Solusinya: satu field bilingual, isinya object.

```json
{
  "lang1": "Teks bahasa pertama",
  "lang2": "Teks bahasa kedua"
}
```

Di kedua project aku bikin beberapa reusable type buat ini: `localeString`, `localeText`, `localeStringArray`, `localeTextArray`.

Studio-nya dikasih toggle mode edit: Bahasa 1, Bahasa 2, atau Both, plus badge kecil buat nunjukin field mana yang masih kosong.

Satu document, satu slug, dua bahasa nempel di field yang sama.

Jauh lebih rapi dibanding dua document yang harus disinkronkan manual.

---

**CMS update, halaman ke-refresh sendiri.**

Ini bagian yang paling kerasa manfaatnya buat non-developer.

Editor update konten di Studio, lalu tanpa build ulang, halaman yang relevan langsung ke-refresh di production.

Alurnya kira-kira begini:

```text
Editor update konten di Sanity
        ↓
Sanity kirim webhook (signed) ke Next.js
        ↓
Next.js verifikasi signature webhook
        ↓
Next.js panggil revalidateTag() / revalidatePath()
        ↓
Cuma halaman/data yang kepengaruh yang di-regenerate
```

Yang bikin ini jalan mulus: tag caching harus konsisten di tiga tempat sekaligus — loader data di kode, mapping di route revalidate, dan filter document type di webhook Sanity.

Kalau salah satu ketinggalan update pas nambah document type baru, webhook-nya tetap nembak tapi nggak ada apa-apa yang ke-invalidate.

Aku sempat kena ini sekali, nambah content type baru tapi lupa update filter webhook-nya. Kontennya udah di-publish, halamannya tetap nunjukin versi lama. Baru sadar pas editor nanya kenapa perubahannya nggak muncul-muncul.

---

**Live preview, biar editor nggak perlu nebak.**

Sebelum publish, editor bisa lihat draft-nya langsung nempel di halaman, lewat Presentation Tool bawaan Sanity.

Ini penting banget buat editor yang nggak teknis. Mereka nggak perlu ngebayangin gimana hasil akhirnya, tinggal lihat langsung.

Efeknya, siklus revisi jadi lebih pendek. Nggak ada lagi bolak-balik "ini nanti tampilannya gimana ya".

---

**Kebiasaan yang jadi penting: audit schema secara rutin.**

Schema CMS itu gampang banget numpuk field yang nggak kepake, apalagi kalau project-nya udah jalan lama dan requirement-nya berubah-ubah.

Aku pelan-pelan bikin kebiasaan ngecek field dari tiga sudut sebelum mutusin buang atau simpan:

1. Apakah field-nya masih ada di schema?
2. Apakah field-nya di-project di GROQ query?
3. Apakah hasil query-nya beneran dipakai di komponen, metadata, atau sitemap?

Kalau satu field cuma nongol di poin pertama doang — didefinisikan di schema, tapi nggak pernah di-query dan nggak pernah dipakai — itu kandidat kuat buat dihapus atau minimal ditandai `deprecated`.

Contoh nyata yang aku temuin: field buat ngatur tinggi card di mobile, dan field buat rasio aspek video.

Dua-duanya keliatan masuk akal pas awal dibikin, tapi ternyata itu concern layout, bukan konten. Solusinya cukup CSS (`aspect-ratio`, `min-height` yang nyesuain konten), bukan value dari CMS.

Sekarang tiap kali nambah field baru, aku selalu tanya dulu: ini konten yang editor beneran mau ubah-ubah, atau ini sebenarnya keputusan desain yang lebih pas hidup di kode?

---

**Pelajaran yang agak nampol: jangan taruh config sensitif di CMS.**

Waktu audit salah satu project, aku nemu ID form dan portal dari salah satu tool marketing pihak ketiga disimpan sebagai field di Sanity, terus dikirim ke client, baru dipakai API kalau env var-nya kosong.

Sekilas praktis. Tapi berarti kalau CMS atau payload dari client berubah, submission form bisa aja kekirim ke portal atau form yang salah.

Endingnya dipindah semua ke environment variable server-only. CMS nggak perlu tahu, client nggak perlu nerima nilai itu sama sekali.

Pelajarannya: CMS itu buat konten yang editor kelola, bukan tempat nyimpen konfigurasi yang sifatnya infrastruktur atau keamanan.

---

**Singleton vs collection, mental model yang bantu banget.**

Di kedua project, aku selalu pisahin dua pola document:

- **Collection** — bisa banyak document, contohnya artikel, customer case, team member.
- **Singleton** — cuma ada satu document, contohnya Home Page, Global Site Settings.

Kedengarannya sepele, tapi begitu ini jelas dari awal, keputusan lain jadi lebih gampang. Singleton biasanya dampaknya lebih luas kalau berubah — makanya perubahan di situ layak di-invalidate satu layout penuh, bukan satu path doang.

---

**Penutup.**

Sanity paling kerasa manfaatnya di project yang kontennya terstruktur, butuh dwibahasa, dan editornya bukan developer.

Effort setup di awal — schema, GROQ query, revalidation, webhook — memang nggak instan.

Tapi begitu semuanya nyambung, editor bisa update konten sendiri tanpa nunggu deploy, dan aku nggak perlu jadi satu-satunya orang yang bisa ubah teks di halaman.

Dan kebiasaan audit schema itu, ternyata bukan cuma soal beres-beres kode.

Itu juga cara aku ngecek ulang: field ini beneran kepake, atau cuma ide lama yang belum sempat dibuang.
