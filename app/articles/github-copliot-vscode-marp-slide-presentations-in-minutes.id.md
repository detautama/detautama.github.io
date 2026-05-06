---
title: "GitHub Copilot + VS Code + Marp = Slide Presentasi dalam Hitungan Menit"
date: "2025-10-05"
description: "Pelajari cara membuat slide presentasi dengan cepat menggunakan GitHub Copilot, VS Code, dan Marp. Panduan ini memandu kamu menyiapkan tools dan memanfaatkan AI untuk menghasilkan konten, sehingga kamu bisa fokus menyampaikan ide tanpa repot dengan desain slide tradisional."
tags: ["Copilot", "AI", "VS Code", "Productivity"]
featured: true
---

## Pengantar

Membuat slide deck sering terasa memakan waktu — memilih template, menulis poin-poin, menyesuaikan layout. Tapi kalau tujuannya cuma **menyampaikan ide dengan cepat**, ada cara yang lebih efisien: kombinasikan **GitHub Copilot + VS Code + Marp**.

Dengan setup ini, kamu bisa menulis slide langsung di Markdown sambil membiarkan **Copilot** menangani auto-completion, atau bahkan membuat seluruh outline melalui agent-nya. Hasilnya? Slide yang cepat dibuat, fokus pada konten, tanpa perlu repot membuka PowerPoint.

---

## Apa itu Marp?

[Marp](https://marp.app/) adalah framework yang mengubah file Markdown menjadi slide presentasi.

Contoh sederhananya:

```markdown
---
marp: true
---

# Judul Slide

- Poin pertama
- Poin kedua
```

Simpan file sebagai `.md`, render dengan Marp, dan kamu langsung dapat slide yang bersih dan siap dipresentasikan.

---

## GitHub Copilot di VS Code

Di sinilah **Copilot** benar-benar bersinar:

- Saat menulis slide di Markdown, Copilot bisa **auto-complete bullet point**.
- Kamu bisa prompt seperti ini: _"Buat 3 poin tentang kenapa Proof of Concept itu penting"_ → kontennya langsung terbentuk.
- Dengan **Copilot Chat/agent**, kamu bisa lebih interaktif lagi: _"Generate outline 5 slide tentang React performance."_

---

## Workflow: Membuat Slide dengan Copilot + Marp

1. **Siapkan Environment**

   - Install **VS Code**
   - Tambahkan extension **Marp for VS Code**
   - Aktifkan **GitHub Copilot**

2. **Buat File Baru**  
   Buat `slides.md`:

   ```markdown
   ---
   marp: true
   theme: default
   ---

   # GitHub Copilot + Marp

   ## Membuat Presentasi dengan Cara yang Lebih Mudah
   ```

3. **Biarkan Copilot Membantu**

   - Ketik heading slide, lalu biarkan Copilot menyarankan bullet point-nya.
   - Atau minta **Copilot Chat** untuk menghasilkan outline presentasi lengkap.

4. **Preview Langsung**  
   Klik **Marp: Preview** di VS Code → lihat slide kamu seketika.

---

## Contoh Nyata

Misalnya saya ingin menjelaskan _"Kenapa Copilot Membantu dalam Membuat Presentasi."_  
Cukup tulis headingnya:

```markdown
# Kenapa Copilot Membantu
```

Copilot langsung menyarankan poin-poin seperti:

- Menghemat waktu dalam membuat outline
- Menyarankan kata-kata yang ringkas
- Memberikan ide-ide tambahan

Edit sedikit, dan slide pun siap dipresentasikan.

---

## Penutup

Kombinasi **GitHub Copilot + VS Code + Marp** membuat pembuatan slide jadi ringan, cepat, dan fokus pada konten. Cocok untuk:

- Tech talk
- Rapat internal tim
- Berbagi ide secara cepat

Daripada berjibaku dengan desain slide, kamu cukup **nulis di Markdown**. Marp yang urus tampilannya, Copilot yang bantu isinya.

---

👉 Lain kali kamu perlu presentasi, kenapa tidak coba tulis slide-mu langsung di VS Code?

---
