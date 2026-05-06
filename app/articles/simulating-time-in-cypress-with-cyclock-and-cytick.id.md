---
title: "Simulasi Waktu di Cypress dengan cy.clock dan cy.tick"
date: "2025-03-01"
description: "Saat menulis test Cypress, ada skenario di mana kamu perlu memanipulasi waktu. Misalnya, menguji expiration session atau pembaruan UI yang terjadwal membutuhkan kontrol atas jalannya waktu. Di sinilah `cy.clock()` dan `cy.tick()` sangat berguna."
tags: ["Testing", "Cypress", "E2E Testing"]
featured: false
---

Saat menulis test Cypress, ada skenario di mana kamu perlu memanipulasi waktu. Misalnya, menguji expiration session atau pembaruan UI yang terjadwal membutuhkan kontrol atas jalannya waktu. Di sinilah `cy.clock()` dan `cy.tick()` sangat berguna.

## Mengontrol Waktu dengan cy.clock()

`cy.clock()` menggantikan fungsi waktu bawaan browser seperti `Date`, `setTimeout`, `setInterval`, dan `clearTimeout`. Ini memungkinkan kamu untuk membekukan waktu di titik tertentu dan memanipulasinya sesuai kebutuhan.

Contoh:

```js
cy.clock(new Date()); // Membekukan waktu di momen saat ini
```

## Mempercepat Waktu dengan cy.tick()

Setelah clock dikendalikan, kamu bisa menggunakan `cy.tick()` untuk memajukan waktu secara buatan. Ini berguna untuk menguji delay, timeout, atau skenario expiration token.

Contoh:

```js
describe("Expiration session pengguna", () => {
  it("logout pengguna setelah token kadaluarsa", () => {
    cy.visit("/auth/sign-in");

    // Simulasi login pengguna
    cy.get('[data-testid="loginButton"]').click();
    cy.getCookie("authToken").should("exist");

    cy.clock();
    // Majukan waktu 30 menit
    cy.tick(1000 * 60 * 30);

    // Coba navigasi dan verifikasi bahwa pengguna sudah logout
    cy.visit("/dashboard");
    cy.url().should("include", "/auth/sign-in");
  });
});
```

## Kapan Menggunakan cy.clock() dan cy.tick()

- Menguji expiration session
- Mensimulasikan perubahan UI berbasis waktu (misalnya, countdown, auto-refresh)
- Memvalidasi delay tanpa memperlambat test

Menggunakan `cy.clock()` dan `cy.tick()` membantu menciptakan test yang andal dan cepat dengan menghilangkan delay yang tidak bisa diprediksi serta memastikan logika berbasis waktu terverifikasi dengan benar.
