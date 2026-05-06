---
title: "Menggunakan Kombinasi Atribut Data untuk React Keys"
date: "2025-01-30"
description: "Dalam React, memberikan prop `key` yang unik pada setiap elemen dalam sebuah list sangat penting untuk performa dan konsistensi UI. Ketika identifier unik alami seperti `id` tidak tersedia, developer sering kali menggunakan index array sebagai solusi, yang justru bisa memicu masalah pada UI. Pendekatan yang lebih baik adalah membuat key yang unik dengan menggabungkan beberapa atribut data. Artikel ini membahas cara efektif menggunakan kombinasi atribut data sebagai key di React list."
tags: ["React", "Best Practices", "Performance"]
featured: true
---

## **Abstrak**

Dalam React, memberikan prop `key` yang unik pada setiap elemen dalam sebuah list sangat penting untuk performa dan konsistensi UI. Ketika identifier unik alami seperti `id` tidak tersedia, developer sering kali menggunakan index array sebagai solusi, yang justru bisa memicu masalah pada UI. Pendekatan yang lebih baik adalah membuat key yang unik dengan menggabungkan beberapa atribut data. Artikel ini membahas cara efektif menggunakan kombinasi atribut data sebagai key di React list.

---

## **Pendahuluan**

Saat me-render list di React, setiap item harus memiliki prop `key` yang unik. Hal ini memungkinkan React memperbarui DOM secara efisien dan melacak elemen antar render. Meskipun ID dari database (`id`) adalah pilihan terbaik, nilainya tidak selalu tersedia. Beberapa developer menggunakan index array sebagai jalan pintas, tapi ini bisa menimbulkan masalah ketika list berubah secara dinamis — misalnya saat item ditambah, dihapus, atau diurutkan ulang.

Pendekatan yang lebih andal adalah membangun key yang unik menggunakan beberapa properti dari data itu sendiri. Cara ini memberikan keseimbangan antara keunikan dan stabilitas tanpa kelemahan yang ada pada key berbasis index.

---

## **Kenapa Tidak Pakai Index sebagai Key?**

Menggunakan index array sebagai `key` mungkin terlihat seperti solusi yang simpel:

```jsx
const items = ["Apple", "Banana", "Cherry"];

const ListComponent = () => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};
```

Tapi pendekatan ini punya beberapa kelemahan:

❌ **Masalah Saat Diurutkan Ulang** – Kalau item ditambah, dihapus, atau diurutkan ulang, React bisa salah mengasosiasikan komponen, sehingga muncul glitch pada UI.  
❌ **Update yang Tidak Efisien** – React bisa me-render lebih banyak komponen dari yang sebenarnya perlu, yang berujung pada penurunan performa.  
❌ **State yang Tidak Terjaga dengan Benar** – Jika komponen menyimpan state lokal (misalnya input form), menggunakan index sebagai key bisa memunculkan perilaku yang tidak terduga.

---

## **Menggunakan Kombinasi Atribut Data sebagai Key**

Jika identifier unik eksplisit seperti `id` tidak tersedia, alternatif terbaik adalah membuat key yang unik dengan menggabungkan beberapa atribut.

### **Contoh: Menggabungkan Name dan Category**

Bayangkan kamu punya dataset produk yang tidak memiliki `id`, tapi memiliki atribut yang bermakna:

```jsx
const items = [
  { name: "Apple", category: "Fruit" },
  { name: "Banana", category: "Fruit" },
  { name: "Carrot", category: "Vegetable" },
];

const ListComponent = () => {
  return (
    <ul>
      {items.map((item) => (
        <li key={`${item.name}-${item.category}`}>{item.name}</li>
      ))}
    </ul>
  );
};
```

### **Kenapa Cara Ini Berhasil**

✅ **Menjamin Keunikan** – Karena `name` dan `category` bersama-sama mengidentifikasi setiap item secara unik, React bisa melacak elemen dengan tepat.  
✅ **Stabil Antar Render** – Berbeda dengan menggunakan `Math.random()` atau `uuid` di setiap render, pendekatan ini mempertahankan key yang sama selama data tidak berubah.  
✅ **Mencegah Bug pada UI** – React bisa melacak perubahan secara efisien tanpa keliru menggunakan kembali elemen yang sudah ada.

---

## **Pendekatan Alternatif: Menggunakan Lebih Banyak Atribut**

Dalam kasus di mana `name` dan `category` saja tidak cukup, kamu bisa menambahkan lebih banyak properti untuk memperkuat keunikannya.

```jsx
const items = [
  { name: "Apple", category: "Fruit", origin: "USA" },
  { name: "Banana", category: "Fruit", origin: "Ecuador" },
  { name: "Carrot", category: "Vegetable", origin: "Canada" },
];

const ListComponent = () => {
  return (
    <ul>
      {items.map((item) => (
        <li key={`${item.name}-${item.category}-${item.origin}`}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};
```

Ini memastikan bahwa bahkan jika dua item memiliki `name` dan `category` yang sama, `origin` mereka tetap membedakannya.

---

## **Menangani Edge Case**

1. **Duplikat dalam Data** – Jika dua item memiliki `name` dan `category` yang sama, React tetap akan menganggapnya identik. Untuk mengatasinya, tambahkan atribut pembeda lainnya.
2. **Update Data** – Jika atribut yang digunakan dalam key berubah secara dinamis (misalnya `name` diedit), React akan memperlakukannya sebagai elemen baru. Dalam kasus seperti ini, pertimbangkan untuk menggunakan atribut yang lebih stabil.
3. **Pertimbangan Performa** – Hindari membuat key yang terlalu rumit. Tetap buat key yang sederhana tapi unik.

---

## **Kesimpulan**

Ketika `id` yang unik tidak tersedia, membangun key menggunakan kombinasi atribut data yang bermakna adalah alternatif yang lebih kuat dibandingkan menggunakan index array. Cara ini meningkatkan efisiensi rendering React, mencegah inkonsistensi pada UI, dan menjaga stabilitas state. Dengan memilih atribut secara strategis, developer bisa membuat key yang memastikan update yang dapat diprediksi dan optimal dalam aplikasi React mereka.

---

## **Referensi**

1. React Documentation - [Lists and Keys](https://react.dev/learn/rendering-lists)
2. Kent C. Dodds - [Understanding React's Key Prop](https://kentcdodds.com/blog/understanding-reacts-key-prop)
3. Stack Overflow - [Best Practices for React Keys](https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js)
