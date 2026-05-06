---
title: "Menangkap dan Menyimpan Request Headers di Chrome Extension"
date: "2025-02-25"
description: "Pelajari cara menangkap dan menyimpan request headers di Chrome extension menggunakan webRequest API."
tags: ["Chrome Extension", "JavaScript", "Web APIs"]
featured: false
---

Saat mengembangkan Chrome extension, kamu mungkin perlu mencegat network request untuk menangkap header tertentu. Di tutorial ini, kita akan membahas sebuah script Chrome extension sederhana yang mendengarkan request yang keluar, mengekstrak authentication header tertentu, dan menyimpannya ke local storage Chrome.

## Prasyarat

Sebelum mulai, pastikan kamu sudah punya pengetahuan dasar tentang JavaScript dan Chrome Extension. Kamu juga perlu Chrome extension yang sudah berjalan dengan permission yang sesuai.

## Kodenya

Berikut adalah script yang menggunakan API `chrome.webRequest.onBeforeSendHeaders` untuk mendengarkan request yang dibuat ke `https://qa.example.com/`. Ketika request seperti itu terdeteksi, script akan membersihkan local storage, mengekstrak header `X-Example-Token`, dan menyimpannya beserta timestamp.

```javascript
chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    // Clear local storage
    chrome.storage.local.clear(() => {
      console.log("Local storage cleared.");

      console.log(details);
      // Only process requests to the specific URL
      if (details.url.startsWith("https://qa.example.com/")) {
        // Filter the "X-Example-Token" header from request headers
        const authHeader = details.requestHeaders.find(
          (header) => header.name.toLowerCase() === "x-example-token"
        );

        if (authHeader) {
          const authValue = authHeader.value;
          console.log(
            `Captured X-Example-Token for ${details.url}: ${authValue}`
          );

          // Save the captured value to storage
          chrome.storage.local.set({
            [details.url]: {
              authToken: authValue,
              time: new Date().toLocaleString(),
            },
          });
        }
      }
    });
  },
  { urls: ["https://qa.example.com/*"] }, // Filter only this URL
  ["requestHeaders"]
);
```

## Update Manifest (Manifest V3)

Untuk menggunakan `chrome.webRequest`, update file `manifest.json` kamu ke format Manifest V3:

```json
{
  "manifest_version": 3,
  "name": "Auth Token Capturer",
  "version": "1.0",
  "permissions": ["webRequest", "storage"],
  "host_permissions": ["https://qa.example.com/*"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon.png",
      "48": "icon.png",
      "128": "icon.png"
    }
  }
}
```

## Mencoba Script-nya

1. Load extension yang belum di-pack di Chrome.
2. Buka DevTools (`F12` atau `Ctrl+Shift+I`) dan pergi ke tab **Console**.
3. Navigasi ke `https://qa.example.com/` dan picu sebuah request.
4. Cek console untuk log yang menunjukkan bahwa header `X-Example-Token` berhasil ditangkap dan disimpan.
5. Verifikasi nilai yang tersimpan di local storage Chrome menggunakan `chrome.storage.local.get(null, console.log);` di console DevTools.

## Catatan Penting

Extension ini ditujukan hanya untuk keperluan development dan debugging. Jangan digunakan di lingkungan production, karena ia menangkap authentication token yang bisa menimbulkan risiko keamanan jika tidak ditangani dengan benar.

## Kesimpulan

Pendekatan ini berguna untuk debugging, logging, atau menangani authentication token di Chrome extension. Pastikan kamu menangani data sensitif dengan aman, terutama jika berurusan dengan authentication header.

Selamat coding!
