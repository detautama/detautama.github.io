---
title: "Mengotomatiskan Perintah dengan VS Code Tasks"
date: "2025-02-01"
description: "VS Code punya sistem task yang membantu mengotomatiskan perintah-perintah berulang seperti menjalankan script, menginstall dependency, dan mengeksekusi test. Dengan menggunakan `tasks.json`, developer bisa mendefinisikan dan menjalankan perintah umum secara efisien. Artikel ini membahas dasar-dasar konfigurasi dan menjalankan task di VS Code."
tags: ["VS Code", "Automation", "Productivity", "DevTools"]
featured: false
---

## **Abstrak**

VS Code punya sistem task yang membantu mengotomatiskan perintah-perintah berulang seperti menjalankan script, menginstall dependency, dan mengeksekusi test. Dengan menggunakan `tasks.json`, developer bisa mendefinisikan dan menjalankan perintah umum secara efisien. Artikel ini membahas dasar-dasar konfigurasi dan menjalankan task di VS Code.

---

## **Pendahuluan**

Visual Studio Code (VS Code) punya dukungan bawaan untuk otomatisasi task. Dengan mendefinisikan task di file `tasks.json`, developer bisa menyederhanakan workflow dan tidak perlu lagi menjalankan perintah yang sering dipakai secara manual. Fitur ini sangat berguna untuk mengelola environment development, mengotomatiskan eksekusi test, dan menyederhanakan setup project.

Di artikel ini, kita akan membahas dasar-dasar konfigurasi task di VS Code, menggunakan `tasks.json` untuk mendefinisikan dan menjalankan perintah development yang umum.

---

## **Isi Utama**

### **1. Memahami `tasks.json`**

File `tasks.json` terletak di dalam folder `.vscode` sebuah project dan berisi definisi task. Task-task ini bisa dijalankan langsung dari command palette VS Code.

#### **1.1 Contoh Konfigurasi**

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "npm install",
      "type": "shell",
      "command": "npm install"
    },
    {
      "label": "npm run dev",
      "type": "shell",
      "command": "npm run dev"
    },
    {
      "label": "run test in apps",
      "type": "shell",
      "command": "cd apps && npm run cy:e2e"
    }
  ]
}
```

### **2. Penjelasan Property Utama**

- **`version`** – Menentukan format konfigurasi task (`2.0.0` adalah versi terbaru).
- **`tasks`** – Array berisi objek-objek task yang mendefinisikan perintah tertentu.
- **`label`** – Nama task yang muncul di VS Code saat memilih task yang akan dijalankan.
- **`type`** – Mendefinisikan tipe eksekusi (`"shell"` artinya perintah dijalankan di terminal).
- **`command`** – Perintah shell yang sebenarnya akan dieksekusi.

### **3. Penjelasan Setiap Task**

#### **3.1 Install Dependency**

Task ini menjalankan `npm install` untuk menginstall dependency project.

#### **3.2 Menjalankan Development Server**

Mengeksekusi `npm run dev` untuk menjalankan development server.

#### **3.3 Menjalankan Test**

Berpindah ke direktori `apps` dan menjalankan Cypress end-to-end test dengan `npm run cy:e2e`.

---

## **Menjalankan Task di VS Code**

Untuk mengeksekusi sebuah task:

1. Buka **Command Palette** (`Ctrl+Shift+P` atau `Cmd+Shift+P` di macOS).
2. Cari **"Tasks: Run Task"** dan pilih.
3. Pilih task yang diinginkan lalu tekan **Enter** untuk menjalankannya.

---

## **Kesimpulan**

Menggunakan `tasks.json` di VS Code menyederhanakan otomatisasi workflow, mengurangi perintah berulang, dan meningkatkan efisiensi. Baik untuk menginstall dependency, menjalankan development server, maupun mengeksekusi test, VS Code tasks membuat proses development jadi lebih lancar.

---

## **Referensi**

- Microsoft. (n.d.). [_Tasks in Visual Studio Code_](https://code.visualstudio.com/docs/editor/tasks)
