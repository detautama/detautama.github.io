---
title: "Tingkatkan Kualitas Kode dengan CodeMetrics di VS Code"
date: "2025-03-27"
description: "Ukur kompleksitas kode secara real-time menggunakan CodeMetrics, sebuah VS Code extension ringan yang membantu kamu menulis kode yang lebih bersih dan mudah dipelihara."
tags: ["Clean Code", "VS Code", "Code Quality"]
featured: false
---

Sebagai developer, kita sering mengejar kode yang bersih dan mudah dipelihara. Tapi bagaimana cara _mengukur_ kode yang bersih? Perkenalkan [**CodeMetrics**](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics), sebuah VS Code extension yang membantu kamu memantau kompleksitas function dan method langsung di dalam editor.

---

### 🧠 Apa Itu CodeMetrics?

CodeMetrics adalah VS Code extension yang menampilkan metrik secara real-time di sebelah function atau method kamu, memperlihatkan seberapa kompleks kode tersebut. Extension ini mendukung bahasa seperti **JavaScript**, **TypeScript**, **PHP**, **C#**, dan masih banyak lagi.

Metrik yang ditampilkan adalah **cyclomatic complexity score**, sebuah angka yang merepresentasikan berapa banyak jalur independen yang bisa diambil oleh sebuah function. Sederhananya: semakin tinggi angkanya, semakin banyak keputusan (seperti `if`, `for`, `while`, `switch`) yang dibuat oleh kode tersebut, dan semakin kompleks (serta semakin sulit untuk di-test dan dipelihara).

---

### 🛠 Cara Menginstalnya

1. Buka VS Code
2. Buka tampilan **Extensions** (`Ctrl+Shift+X`)
3. Cari `codemetrics`
4. Klik **Install** pada "CodeMetrics" oleh kisstkondoros

Selesai. Setelah terinstal, extension langsung bekerja tanpa perlu konfigurasi apapun.

---

### 👀 Tampilannya Seperti Apa?

Kamu akan mulai melihat angka berwarna abu-abu di sebelah setiap function atau method. Contohnya:

<img src="/images/blog/improve-your-code-quality-with-codemetrics/img-codemetric-1.jpg" alt="CodeMetrics in action" />

Angka `3` merepresentasikan cyclomatic complexity dari function tersebut.

---

### ⚖️ Berapa Skor yang Ideal?

Berikut panduan kasarnya:

- **1–5:** Kompleksitas rendah, bagus!
- **6–10:** Sedang, masih bisa dikelola
- **11–20:** Tinggi, sebaiknya mulai di-refactor
- **20+**: Zona bahaya, sudah waktunya dipecah

---

### ✨ Kenapa Ini Penting?

- **Readability:** Kode yang lebih sederhana lebih mudah dipahami oleh kamu _dan_ rekan setim.
- **Testability:** Function dengan kompleksitas rendah lebih mudah dicakup oleh unit test.
- **Maintainability:** Menjaga function tetap kecil dan terfokus mengurangi bug dan technical debt.

---

### 💡 Bonus: Jadikan Kompleksitas Sebagai Permainan

Gunakan CodeMetrics sebagai motivasi untuk terus mengurangi kompleksitas di seluruh codebase. Refactor function raksasa bernilai 12 poin menjadi rapi di angka 4. Rayakan kemenangan-kemenangan kecil itu!

---

### Penutup

CodeMetrics bukan pengganti code review atau testing yang baik, tapi ia adalah sidekick yang powerful. Extension ini membuat kompleksitas menjadi terlihat, sehingga kamu bisa membuat keputusan yang lebih baik saat coding. Kalau kamu peduli dengan penulisan software yang bersih dan mudah dipelihara, coba extension ini sekarang.

🔗 [Dapatkan CodeMetrics di VS Code Marketplace →](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics)
