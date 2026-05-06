---
title: "Conditional Rendering: Taruh di Dalam Komponen"
date: "2025-05-11"
description: "Best practice untuk menempatkan logika conditional rendering di dalam React component menggunakan context atau internal state."
tags: ["React", "Best Practices", "Clean Code"]
featured: false
---

Saat membangun aplikasi React, ada pertanyaan yang sering muncul:

> Apakah sebaiknya saya melakukan conditional rendering sebuah component dari parent, atau di dalam component itu sendiri?

Jawabannya ada di prinsip inti React: **taruh logika di tempat state itu berada**.

### Contoh Nyata: Notification Banner

Misalnya kamu ingin menampilkan notifikasi ketika ada pesan baru. Kamu menggunakan context untuk melacak state notifikasi.

### ✅ Pendekatan yang Benar: Biarkan Child yang Menangani

```jsx
// NotificationBanner.js
import React, { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

const NotificationBanner = () => {
  const { hasNewNotification, message } = useContext(NotificationContext);

  if (!hasNewNotification) return null;

  return (
    <div className="rounded bg-yellow-100 p-4 shadow">
      <strong>New Notification:</strong> {message}
    </div>
  );
};

export default NotificationBanner;
```

```jsx
// Dashboard.js
import NotificationBanner from "./NotificationBanner";

const Dashboard = () => (
  <div>
    <NotificationBanner />
    {/* Konten dashboard lainnya */}
  </div>
);
```

Kenapa pendekatan ini bagus:

- Component punya kendali penuh atas kapan ia harus ditampilkan atau disembunyikan.
- Parent tetap bersih dan tidak perlu tahu urusan dalam component.
- Lebih mudah untuk di-reuse dan dipahami.

---

### ❌ Kurang Ideal: Parent yang Menangani Logikanya

```jsx
// Dashboard.js
import NotificationBanner from "./NotificationBanner";
import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

const Dashboard = () => {
  const { hasNewNotification, message } = useContext(NotificationContext);

  return (
    <div>
      {hasNewNotification && <NotificationBanner message={message} />}
      {/* Konten dashboard lainnya */}
    </div>
  );
};
```

Kekurangannya: parent jadi harus tahu logika yang seharusnya menjadi urusan child, sehingga modularitas dan reusability berkurang.

---

### 🔚 Kesimpulan

- Taruh conditional rendering di dalam component jika logikanya bergantung pada internal state atau context.
- Cara ini membuat React component kamu lebih mudah dirawat, lebih modular, dan sesuai dengan best practice yang idiomatis.
