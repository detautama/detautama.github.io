---
title: "Menjalankan TypeScript 7 dan ESLint Secara Berdampingan"
date: "2026-09-02"
description: "Cara menjalankan compiler native TypeScript 7 untuk build dan type-check, sambil mempertahankan TypeScript 6 agar ESLint tetap memiliki akses ke Compiler API yang dibutuhkannya."
tags: ["TypeScript", "ESLint", "pnpm", "Compiler"]
featured: false
---

TypeScript 7 menawarkan compiler native berbasis Go yang jauh lebih cepat. Namun, TypeScript 7.0 belum menyediakan programmatic Compiler API yang dibutuhkan oleh tools seperti `typescript-eslint`.

Solusi resminya adalah menjalankan TypeScript 6 dan 7 secara berdampingan menggunakan npm aliases.

## Konfigurasi

Di `pnpm-workspace.yaml`:

```yaml
catalog:
  typescript: npm:@typescript/typescript6@~6.0.0
  'typescript-7': npm:typescript@~7.0.0
```

Kemudian tambahkan keduanya sebagai dependencies:

```json
{
  "devDependencies": {
    "typescript": "catalog:",
    "typescript-7": "catalog:"
  }
}
```

## Mengapa Ini Bekerja?

Module dan executable di-resolve melalui jalur berbeda:

- `typescript-eslint` mengimpor module bernama `typescript`, yang diarahkan ke TypeScript 6.
- Script yang menjalankan `tsc` mengambil binary milik TypeScript 7.

Package TypeScript 6 menyediakan binary `tsc6`, sedangkan TypeScript 7 menyediakan `tsc`:

```text
node_modules/.bin/tsc6 -> TypeScript 6
node_modules/.bin/tsc  -> TypeScript 7
```

Karena itu, script yang sudah ada tidak perlu diubah:

```json
{
  "typecheck": "tsc --noEmit"
}
```

Command tersebut otomatis menggunakan TypeScript 7, sementara ESLint tetap menggunakan TypeScript 6 API.

## Hasil

Dengan pendekatan ini:

- ESLint berjalan stabil menggunakan TypeScript 6 API.
- Build dan type-check menggunakan compiler TypeScript 7.
- Tidak diperlukan perubahan pada source code maupun build scripts.
- Alias TypeScript 6 dapat dilepas setelah tooling mendukung API TypeScript 7.

Referensi: [TypeScript 7.0 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) dan [pnpm dependency aliases](https://pnpm.io/aliases).
