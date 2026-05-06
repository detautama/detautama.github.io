---
title: "Best Practice Satu Branch per Ticket"
date: "2025-04-30"
description: "Mengapa satu Git branch per Jira ticket adalah best practice, dan bagaimana bekerja secara efisien ketika ticket-ticket saling bergantung satu sama lain."
tags: ["Jira", "Git", "Version Control", "Best Practices"]
featured: false
---

Dalam pengembangan software modern, sudah menjadi best practice yang umum untuk menggunakan **satu Git branch per Jira ticket**. Pendekatan ini meningkatkan kejelasan, keterlacakan, dan kolaborasi antar tim. Tapi apa yang terjadi ketika kamu mengerjakan sebuah ticket (Ticket B) yang bergantung pada ticket lain (Ticket A), sementara Ticket A masih dalam proses PR?

Mari kita bahas satu per satu 👇

---

## ✅ Kenapa Satu Branch per Ticket Itu Efektif

- 🔗 **Keterlacakan yang Jelas**  
  Setiap ticket punya branch dan commit history-nya sendiri — mudah dilacak dan diaudit.

- 📦 **Pull Request yang Terfokus**  
  PR jadi lebih kecil, lebih mudah dibaca, dan lebih mudah di-review.

- 🔁 **Rollback yang Lebih Aman**  
  Kamu bisa merevert branch tertentu tanpa memengaruhi pekerjaan lain yang tidak terkait.

- ⚙️ **Ramah CI/CD**  
  Otomatisasi build, test, dan deploy per branch jadi lebih mudah.

---

## 🤔 Masalahnya: Ticket B Bergantung pada Ticket A

Kamu sudah push **Ticket A** ke PR. Sekarang kamu ingin mengerjakan **Ticket B**, yang dibangun di atas perubahan dari Ticket A. Apa yang harus dilakukan?

---

## 🧩 Solusi 1: Branch B dari A

```bash
git checkout feature/ticket-a
git checkout -b feature/ticket-b
```

- Dengan cara ini kamu sudah punya semua perubahan dari A saat mengerjakan B.
- Ketika A sudah di-merge, lakukan rebase B ke `main`.

```bash
git checkout feature/ticket-b
git rebase main
```

✅ **Gunakan ini ketika B benar-benar terblokir tanpa A.**  
📣 **Di PR-mu, sebutkan:** "Depends on PR #123 (Ticket A)."

---

## 🪄 Solusi 2: Mock atau Stub Ticket A

Kalau A adalah API atau shared logic yang belum benar-benar dibutuhkan sekarang, kamu bisa:

- Stub/mock perilaku A di Ticket B.
- Bekerja dari `main` seperti biasa.
- Integrasikan setelah A di-merge.

✅ **Gunakan ini ketika A dan B bisa dipisahkan secara longgar.**

---

## 🧱 Solusi 3: Shared Feature Branch (untuk Epic)

Kalau A dan B merupakan bagian dari fitur yang lebih besar, buat sebuah **feature base branch**:

```
feature/main-feature
├── feature/ticket-a
├── feature/ticket-b
```

Kamu merge A dan B ke `main-feature`, lalu merge itu ke `main`.

✅ **Gunakan ini untuk epic besar atau beberapa PR yang saling terkait.**  
⚠️ Menambah kompleksitas — tidak selalu sepadan.

---

## 🧠 Tips Pro

- 📝 **Dokumentasikan dependencies** di deskripsi PR.
- 🔗 **Tautkan Jira ticket** agar orang lain bisa mengikuti konteksnya.
- 🔄 **Rebase lebih awal dan lebih sering** untuk menghindari konflik.
- 🧼 **Jaga commit tetap terfokus**: jangan campur perubahan A dan B.

---

## 📌 Ringkasan

| Situasi                          | Tindakan Terbaik             |
| -------------------------------- | ---------------------------- |
| Ticket B **butuh** kode A        | Branch B dari A              |
| Ticket B bisa di-**stub**        | Kerja dari `main`, stub A    |
| A & B bagian dari **epic**       | Gunakan feature branch       |

---

Berbagi praktik ini di tim kamu tidak hanya meningkatkan kolaborasi, tapi juga membantu semua orang menulis Git history yang lebih bersih dan merilis fitur lebih cepat 🚀
