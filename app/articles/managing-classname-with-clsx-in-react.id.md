---
title: "Mengelola ClassName dengan clsx di React"
date: "2025-03-21"
description: "Pelajari cara menggunakan clsx untuk mengelola className secara dinamis di React dengan lebih bersih dan efisien."
tags: ["clsx", "React", "CSS"]
featured: false
---

Saat membangun aplikasi React, kita sering perlu menentukan `className` secara dinamis berdasarkan kondisi tertentu. Library `clsx` menyederhanakan proses ini dan membuat kode jadi lebih bersih serta mudah dibaca.

## Instalasi

Untuk menggunakannya, install terlebih dahulu dengan npm, yarn, atau pnpm:

```sh
npm install clsx
# atau
yarn add clsx
# atau
pnpm add clsx
```

Kamu bisa mempelajari lebih lanjut tentang `clsx` di repository GitHub resminya: [clsx on GitHub](https://github.com/lukeed/clsx)

## Cara Penggunaan

Dengan `clsx`, kita bisa mengelola class name secara kondisional tanpa harus menulis kode yang panjang dan berantakan.

### Contoh Dasar

```tsx
import clsx from "clsx";

const Button = ({ primary }: { primary: boolean }) => {
  return (
    <button
      className={clsx("btn", {
        "btn-primary": primary,
        "btn-secondary": !primary,
      })}
    >
      Click me
    </button>
  );
};
```

Pada contoh ini:

- Jika `primary` bernilai `true`, className menjadi `"btn btn-primary"`.
- Jika `primary` bernilai `false`, className menjadi `"btn btn-secondary"`.

### Menggabungkan Beberapa Class

Kamu juga bisa menggabungkan class dari berbagai kondisi:

```tsx
const isActive = true;
const isDisabled = false;

const className = clsx(
  "base-class",
  isActive && "active-class",
  isDisabled ? "disabled-class" : "enabled-class"
);

console.log(className); // Output: "base-class active-class enabled-class"
```

## Menggunakan `clsx` dengan Tailwind CSS

Kalau kamu menggunakan Tailwind CSS, disarankan untuk memakai `tailwind-merge` bersama `clsx` agar tidak ada class yang saling konflik:

```tsx
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const buttonClass = twMerge(
  clsx("p-4 text-white", isActive && "bg-blue-500", isDisabled && "opacity-50")
);

<button className={buttonClass}>Click me</button>;
```

Dengan `twMerge`, class yang saling bertentangan (seperti `p-2` dan `p-4`) akan difilter sehingga hanya class yang paling relevan yang diterapkan.

Kamu bisa mempelajari lebih lanjut tentang `tailwind-merge` di sini: [tailwind-merge on GitHub](https://github.com/dcastil/tailwind-merge)

## Kesimpulan

Menggunakan `clsx` membantu membuat pengelolaan `className` jadi lebih bersih dan fleksibel. Kalau kamu menggunakan Tailwind CSS, `tailwind-merge` sangat direkomendasikan untuk memastikan class tidak saling konflik. Dengan pendekatan ini, kode React kamu jadi lebih terorganisir dan mudah di-maintain.
