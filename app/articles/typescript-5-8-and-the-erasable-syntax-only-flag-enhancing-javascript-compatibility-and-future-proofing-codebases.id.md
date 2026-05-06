---
title: "TypeScript 5.8 dan Flag --erasableSyntaxOnly: Meningkatkan Kompatibilitas JavaScript dan Mempersiapkan Codebase untuk Masa Depan"
date: "2025-02-03"
description: "TypeScript 5.8 memperkenalkan compiler flag --erasableSyntaxOnly yang dirancang untuk meningkatkan kompatibilitas dengan sistem tipe JavaScript yang terus berkembang. Flag ini membatasi penggunaan elemen syntax yang tidak bisa dihapus begitu saja, seperti enums, namespaces, dan parameter properties, yang membutuhkan transformasi saat runtime. Dengan begitu, pemisahan antara type annotations dan kode yang dieksekusi menjadi lebih bersih. Artikel ini membahas implikasi dari fitur ini, kesesuaiannya dengan proposal JavaScript terkini, serta potensi dampaknya terhadap praktik pengembangan TypeScript."
tags: ["TypeScript", "JavaScript", "Compiler"]
featured: false
---

## Abstrak

TypeScript 5.8 memperkenalkan compiler flag `--erasableSyntaxOnly` yang dirancang untuk meningkatkan kompatibilitas dengan sistem tipe JavaScript yang terus berkembang. Flag ini membatasi penggunaan elemen syntax yang tidak bisa dihapus begitu saja, seperti enums, namespaces, dan parameter properties, yang membutuhkan transformasi saat runtime. Dengan begitu, pemisahan antara type annotations dan kode yang dieksekusi menjadi lebih bersih. Artikel ini membahas implikasi dari fitur ini, kesesuaiannya dengan proposal JavaScript terkini, serta potensi dampaknya terhadap praktik pengembangan TypeScript.

## Pendahuluan

Seiring TypeScript terus berkembang, menjaga keselarasan dengan syntax dan perilaku runtime JavaScript tetap menjadi tujuan utama. Hadirnya flag `--erasableSyntaxOnly` di TypeScript 5.8 mencerminkan komitmen ini dengan memaksa penggunaan syntax yang bisa dihapus tanpa memengaruhi eksekusi saat runtime. Inisiatif ini sejalan dengan proposal yang sedang aktif dikembangkan di komunitas JavaScript untuk mengintegrasikan type annotations yang tidak mengganggu perilaku runtime.

## Pembahasan

### Memahami Erasable Syntax

Erasable syntax adalah konstruksi kode yang bisa dihilangkan saat kompilasi tanpa mengubah perilaku program saat runtime. Contoh umumnya adalah type annotations untuk variabel dan parameter fungsi:

```typescript
const foo: string = "foo";
const func = (a: number) => {};
```

Menghapus type annotations `: string` dan `: number` menghasilkan kode JavaScript yang valid dengan fungsionalitas yang sama persis:

```javascript
const foo = "foo";
const func = (a) => {};
```

Sebaliknya, beberapa fitur TypeScript seperti enums, namespaces, dan parameter properties menghasilkan kode tambahan yang tetap ada di JavaScript hasil kompilasi, sehingga memengaruhi perilaku runtime. Misalnya, enums menghasilkan kode tambahan untuk merepresentasikan strukturnya, yang tidak bisa begitu saja dihapus.

### Peran `--erasableSyntaxOnly`

Compiler flag `--erasableSyntaxOnly` memaksa penggunaan erasable syntax dengan menandai konstruksi yang tidak erasable sebagai error. Perhatikan contoh berikut:

```typescript
// Error: Enums tidak diperbolehkan
enum Example {
  foo,
}

// Error: Namespaces tidak diperbolehkan
namespace OhNo {
  export const foo = 1;
}

// Error: Parameter properties tidak diperbolehkan
class X {
  constructor(private foo: string) {}
}
```

Dengan mengaktifkan flag ini, developer diarahkan untuk menulis kode TypeScript yang lebih dekat dengan JavaScript murni, sehingga integrasi menjadi lebih mudah dan codebase lebih siap menghadapi perubahan cara JavaScript menangani tipe di masa depan.

### Kesesuaian dengan Proposal JavaScript

Komunitas JavaScript sedang aktif mengeksplorasi proposal untuk mengintegrasikan tipe dengan cara yang tidak memengaruhi perilaku runtime. Salah satu proposal yang menonjol menyarankan agar tipe diperlakukan seperti komentar, sehingga type annotations bisa ada di dalam kode tanpa memengaruhi eksekusi. Pendekatan ini memungkinkan kode seperti berikut menjadi valid di JavaScript:

```javascript
const x: number = 12;
const func = (a: number, b: number) => a + b;
```

Proposal semacam ini bertujuan membawa keunggulan TypeScript langsung ke lingkungan JavaScript, mendorong adopsi yang lebih luas dan kompatibilitas yang lebih baik. Flag `--erasableSyntaxOnly` mengantisipasi arah ini dengan mendorong penggunaan erasable syntax secara eksklusif, memastikan codebase TypeScript tetap kompatibel dengan standar JavaScript di masa mendatang.

### Implikasi bagi Pengembangan TypeScript

Mengadopsi flag `--erasableSyntaxOnly` dapat membawa beberapa manfaat:

- **Kompatibilitas yang Lebih Baik**: Codebase menjadi lebih selaras dengan JavaScript standar, mengurangi gesekan saat berintegrasi dengan proyek JavaScript atau saat melakukan migrasi kode.

- **Tooling yang Lebih Sederhana**: Tools seperti bundler dan transpiler dapat memproses kode dengan lebih efisien ketika kode hanya mengandalkan erasable syntax, karena transformasi yang dibutuhkan menjadi lebih sedikit.

- **Siap Menghadapi Masa Depan**: Dengan berpegang pada erasable syntax, developer memposisikan codebase mereka agar lebih kompatibel dengan fitur dan proposal JavaScript yang akan datang.

Namun, developer juga perlu mempertimbangkan trade-off-nya, seperti kebutuhan untuk melakukan refactor pada kode yang sudah menggunakan konstruksi non-erasable dan kemungkinan kehilangan beberapa fitur TypeScript yang memberikan kemudahan dan kejelasan kode.

## Kesimpulan

Hadirnya flag `--erasableSyntaxOnly` di TypeScript 5.8 menandai langkah penting menuju integrasi yang lebih dalam antara TypeScript dan JavaScript. Dengan memaksa penggunaan erasable syntax, TypeScript menyelaraskan dirinya dengan proposal JavaScript yang sedang berkembang, mendorong masa depan di mana type annotations memperkaya proses pengembangan tanpa memengaruhi perilaku runtime. Developer sangat dianjurkan untuk mencoba flag baru ini dan mengevaluasi manfaat serta implikasinya untuk proyek masing-masing.

## Referensi

- Announcing TypeScript 5.8, [TypeScript Blog](https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-beta/)
- Matt Pocock, [TypeScript 5.8 Ships --erasableSyntaxOnly To Disable Enums](https://www.totaltypescript.com/erasable-syntax-only)
- Pull Request for `--erasableSyntaxOnly`, [TypeScript GitHub Repository](https://github.com/microsoft/TypeScript/pull/61011)
