---
title: "Memperbaiki Bug 'Ghost Changes' di Bulk Edit Tables"
date: "2025-10-17"
description: "Menyelami proses debugging masalah state management yang rumit, di mana sistem mendeteksi perubahan yang sebenarnya tidak ada, dan bagaimana membandingkan dengan nilai asli berhasil memecahkan masalahnya."
tags: ["Debugging", "React", "Problem Solving"]
featured: false
---

## Masalah

Hari ini saya menemukan bug menarik di fitur bulk edit table. Pengguna mengeluhkan bahwa tombol "Save" menampilkan "1 changed row" meskipun mereka hanya mengetik teks di sebuah input field lalu menghapus semuanya kembali ke kondisi kosong. Seharusnya tidak ada perubahan karena nilainya sama seperti nilai awal, tapi sistem tetap mendeteksi adanya perubahan.

Petunjuk visualnya cukup jelas: tidak ada "blue dot" di sudut field mana pun (yang menandakan field yang berubah), tapi counter perubahan tetap menunjukkan 1 perubahan.

## Analisis Root Cause

Setelah diselidiki, ternyata masalahnya ada di logika state management dari custom hook `useBulkTableEdit`. Hook ini melacak perubahan dengan menyimpan semua field yang pernah diupdate ke dalam sebuah object bernama `editState`:

```typescript
// Sebelum diperbaiki
const updateField = (itemId, field, value) => {
  dispatch({ type: "UPDATE_FIELD", itemId, field, value });
};
```

Reducer-nya sangat sederhana: setiap kali ada `UPDATE_FIELD`, langsung dimasukkan ke `editState` tanpa mengecek apakah nilainya berbeda dari nilai asli atau tidak.

```typescript
case 'UPDATE_FIELD':
  return {
    ...state,
    editState: {
      ...state.editState,
      [action.itemId]: {
        ...state.editState[action.itemId],
        [action.field]: action.value,
      },
    },
  }
```

Masalahnya: **Hook ini melacak "field yang sudah disentuh", bukan "field yang sudah berubah"**.

Jadi kalau pengguna mengetik "test" lalu menghapus semuanya kembali ke kosong (kembali ke nilai asli), field tersebut tetap tersimpan di `editState` dengan nilai yang sama seperti aslinya. Counter `changesCount` dihitung dari `Object.keys(editState).length`, yang menghitung item APA PUN di editState tanpa peduli apakah nilainya benar-benar berbeda.

## Solusinya

Solusinya ternyata sederhana tapi butuh penempatan yang tepat secara strategis. Karena hook tidak punya akses ke nilai asli, saya memindahkan logika perbandingan ke level component — di mana kita punya akses ke data item aslinya.

### Pattern yang Saya Terapkan

```typescript
// Di editable components
onChange={(event) => {
  const newValue = event.target.value
  const originalValue = item[field]

  // Bandingkan dan putuskan
  if (newValue === originalValue) {
    bulkEdit.removeField(item._id, field)  // Hapus dari editState
  } else {
    bulkEdit.updateField(item._id, field, newValue)  // Simpan di editState
  }

  // Validasi tetap berjalan
  onValidateField(newValue)
}}
```

## File yang Diubah

Saya menerapkan pattern ini ke semua editable component:

1. **Reusable Components** (untuk destinations):

   - `EditableTextCell.tsx` - Text input fields
   - `EditableCustomerCell.tsx` - Dropdown select

2. **Inline Edit Components**:
   - `customers.tsx` - Field nama & email
   - `operators.tsx` - Field nama

## Pelajaran yang Didapat

### 1. Prinsip State Management

**Lacak perubahan yang sebenarnya, bukan interaksi.** Ada perbedaan besar antara "pengguna menyentuh field ini" vs "pengguna mengubah nilai field ini".

### 2. Data Access Pattern

Kalau sebuah hook tidak punya cukup konteks (dalam hal ini, nilai asli), dorong logikanya ke layer yang memilikinya — dalam hal ini, component yang me-render datanya.

### 3. Defensive Comparison

Selalu bandingkan dengan nilai asli sebelum mengupdate state:

```typescript
// Pattern yang baik
if (newValue === originalValue) {
  removeChange();
} else {
  recordChange();
}

// Anti-pattern
recordChange(); // Selalu merekam tanpa pengecekan
```

### 4. DRY via Components

Dengan membuat `EditableTextCell` dan `EditableCustomerCell` yang reusable, saya hanya perlu memperbaiki sekali untuk halaman destinations. Untuk inline edit di customers & operators, saya harus memperbaikinya satu per satu karena mereka tidak menggunakan shared component.

## Strategi Testing

Setelah diperbaiki, saya menguji dengan skenario-skenario berikut:

1. ✅ Ketik teks → hapus semua → Tidak ada perubahan terdeteksi
2. ✅ Ketik teks → edit → ubah lagi → Hanya menampilkan perubahan jika berbeda
3. ✅ Ubah dropdown → kembalikan → Tidak ada perubahan terdeteksi
4. ✅ Indikator blue dot hanya muncul untuk field yang berbeda dari aslinya
5. ✅ Counter perubahan akurat sesuai jumlah perubahan yang sebenarnya

Semua lolos! 🎉

## Kesimpulan

Bug ini mengingatkan saya bahwa **interaksi pengguna ≠ perubahan data**. Dalam UI/UX yang baik, sistem harus cukup cerdas untuk membedakan antara "pengguna sedang menjelajah/mengetik" vs "pengguna benar-benar membuat perubahan yang perlu disimpan".

---

**Takeaway:** Saat membangun edit interface, selalu validasi perubahan yang sebenarnya terhadap nilai asli, bukan hanya melacak interaksi. Pengguna kamu akan berterima kasih karena tidak diganggu dengan peringatan "unsaved changes" yang palsu! 🚀
