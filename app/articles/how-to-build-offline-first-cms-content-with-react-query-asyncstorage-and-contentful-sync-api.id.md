---
title: "Cara Membangun Konten CMS Offline-First dengan TanStack Query, AsyncStorage, dan Contentful Sync API"
date: "2026-05-13"
description: "Pola praktis offline-first untuk aplikasi React Native dan Expo yang memakai Contentful, TanStack Query, AsyncStorage, dan Contentful Sync API."
tags: ["TanStack Query", "React Native", "Expo", "Contentful", "Offline First"]
featured: false
---

Banyak aplikasi mengambil data CMS setiap kali dibuka.

Biasanya ini menimbulkan tiga masalah:

- startup terasa lebih lambat dari seharusnya
- pengguna yang offline melihat layar kosong atau error
- setiap refresh bisa lebih mahal karena selalu mengambil konten penuh lagi

Kabar baiknya: kamu tidak perlu memilih salah satu antara startup cepat, dukungan offline, dan konten CMS yang tetap fresh.

Kamu bisa mendapatkan ketiganya dengan menggabungkan:

- snapshot bawaan untuk keamanan saat first launch
- TanStack Query dengan persistensi AsyncStorage untuk reuse lokal
- Contentful Sync API untuk deteksi perubahan yang murah

Artikel ini membahas pola praktis untuk React Native dan Expo app yang sudah memakai Contentful sebagai sumber konten.

## Masalah Saat Mengambil Konten CMS Setiap Launch

Setup default biasanya sederhana: app dibuka, request ke CMS, menunggu, lalu render.

Itu bekerja sampai tidak lagi.

Kalau jaringan lambat, startup terasa berat. Kalau pengguna offline, layar bisa gagal tampil. Kalau kontennya jarang berubah, kamu tetap membayar biaya refetch penuh berulang kali.

Kasus terburuknya adalah instalasi baru tanpa internet. Belum ada cache, jadi UI tidak punya apa pun untuk ditampilkan.

Di sinilah strategi offline-first bertingkat menjadi berguna.

## Solusi 3 Lapisan

Setiap lapisan menyelesaikan kelemahan yang berbeda.

### Lapisan 1: Snapshot bawaan

Kirim JSON snapshot berisi konten CMS penting langsung di dalam bundle aplikasi.

Ini memberi kamu:

- first launch yang aman walau offline
- render awal yang cepat
- baseline minimum yang sudah pasti tersedia

Anggap ini sebagai konten darurat yang selalu ada.

### Lapisan 2: Cache query yang dipersist

Gunakan TanStack Query dengan persistensi AsyncStorage.

Ini memberi kamu:

- konten cache setelah fetch pertama berhasil
- performa reopen yang lebih cepat
- akses offline ke konten yang pernah dilihat aplikasi sebelumnya

Ini menangani kasus umum saat pengguna sudah pernah membuka app lalu kembali lagi dalam kondisi koneksi buruk atau tidak ada koneksi.

### Lapisan 3: Deteksi perubahan berbasis sync

Gunakan Contentful Sync API untuk mendeteksi apakah konten berubah sejak pengecekan terakhir.

Ini memberi kamu:

- pemeriksaan freshness yang lebih murah
- lebih sedikit full refetch
- cara sederhana untuk tahu kapan query konten harus di-refresh

Inilah bagian yang menjaga app tetap fresh tanpa harus refetch semua konten secara brute force setiap kali app dibuka.

## Kenapa Satu Lapisan Saja Tidak Cukup

Mudah untuk tergoda memakai satu trik caching saja, tapi setiap lapisan menutup mode gagal yang berbeda:

- snapshot menyelesaikan "instalasi baru dan offline"
- persisted cache menyelesaikan "sudah pernah dibuka dan sekarang offline"
- sync menyelesaikan "bagaimana cara tahu kapan harus refresh"

Kalau satu lapisan dilewatkan, masih ada satu titik lemah.

Karena itu pola ini lebih baik dipakai sebagai strategi bertingkat, bukan satu alat tunggal.

## Alur Data yang Direkomendasikan

Berikut alur startup yang praktis:

1. Restore cache TanStack Query yang sudah dipersist.
2. Seed query CMS yang belum ada dari snapshot bawaan.
3. Render UI secepatnya.
4. Kalau online, biarkan fetch normal jalan di background.
5. Saat app masuk foreground atau reconnect, jalankan Contentful sync.
6. Kalau sync melaporkan perubahan, invalidate query konten lalu refetch.

Alur ini terasa cepat karena UI langsung punya sesuatu untuk dirender.

Alur ini tetap kuat karena tetap bekerja saat device offline.

Alur ini tetap fresh karena deteksi perubahan dipisahkan dari fetch data utama.

## Seed TanStack Query dari Snapshot Bawaan

Untuk konten offline-first, jangan menunggu request hanya untuk mengisi layar pertama.

Seed query cache lebih awal saat query masih kosong.

```ts
import bundledContent from "@/cms/content-snapshot.json";
import { queryClient } from "@/lib/queryClient";

const CONTENT_QUERY_KEY = ["cms", "home", "en-US"];

export function seedBundledContent() {
  const existing = queryClient.getQueryData(CONTENT_QUERY_KEY);

  if (!existing) {
    queryClient.setQueryData(CONTENT_QUERY_KEY, bundledContent["en-US"]);
  }
}
```

Ini lebih andal daripada mencoba memalsukan loading state di level component belakangan.

Pendekatan ini juga cocok dengan query berbasis suspense.

## Detail Penting TanStack Query: `useSuspenseQuery`

Kalau kamu memakai `useSuspenseQuery`, jangan membangun pola ini di sekitar `placeholderData`.

Menurut dokumentasi TanStack Query, `useSuspenseQuery` memakai opsi yang sama seperti `useQuery` kecuali `throwOnError`, `enabled`, dan `placeholderData`.

Detail ini penting karena banyak contoh di internet memakai `placeholderData` sebagai fallback yang nyaman. Untuk offline-first content, itu bisa mengarahkanmu ke pola yang salah.

Pola yang lebih aman adalah:

- seed cache dengan `queryClient.setQueryData(...)`
- atau pakai `initialData` kalau bentuk datanya sederhana

Ini membuat jalur render awal jadi lebih dapat diprediksi.

Referensi: https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery

## Detail Penting Persistensi: Pakai `PersistQueryClientProvider`

Kalau kamu mem-persist TanStack Query dengan AsyncStorage, pakai `PersistQueryClientProvider`.

Kenapa ini penting:

- restore persisted cache itu async
- component bisa mount sebelum restore selesai
- query bisa fetch terlalu cepat kalau provider-nya tidak mengelola proses restore dengan benar

Dokumentasi TanStack Query menjelaskan ini dengan jelas: `PersistQueryClientProvider` memastikan query tidak mulai fetch saat restoration masih berjalan.

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const queryClient = new QueryClient();

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
```

Tanpa ini, app bisa terlihat seperti tidak punya cache walaupun data cached yang valid sebenarnya sudah ada.

Referensi: https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient

## Pakai Contentful Sync Sebagai Detektor Perubahan

Ini keputusan desain Contentful yang paling penting dalam pola ini:

Pakai Sync API sebagai detektor perubahan, bukan sebagai sumber data utama app.

Kenapa:

- normal query app kamu mungkin bergantung pada linked entries
- Sync API tidak mendukung `include`
- delta sync dengan `nextSyncToken` tidak berperilaku seperti full fetch biasa yang menyertakan relasi lengkap

Dokumentasi Contentful JS menunjukkan bahwa endpoint Sync tidak mendukung `include` atau full link resolution untuk delta sync. Itu tanda kuat bahwa logika sync sebaiknya kecil dan fokus.

Jadi alur yang aman adalah:

1. jalankan sync
2. simpan `nextSyncToken`
3. deteksi apakah ada entry atau asset yang berubah
4. invalidate root content query
5. biarkan normal query refetch dengan bentuk data yang biasa dipakai app

```ts
type SyncState = {
  nextSyncToken?: string;
};

export async function checkForCmsChanges(state: SyncState) {
  const response = await contentfulClient.sync(
    state.nextSyncToken
      ? { nextSyncToken: state.nextSyncToken }
      : { initial: true }
  );

  const hasChanges =
    response.entries.length > 0 ||
    response.assets.length > 0 ||
    response.deletedEntries.length > 0 ||
    response.deletedAssets.length > 0;

  await saveSyncState({
    nextSyncToken: response.nextSyncToken,
  });

  if (hasChanges) {
    queryClient.invalidateQueries({ queryKey: ["cms"] });
  }
}
```

Dengan cara ini, logika app tetap sederhana. Sync memutuskan apakah perlu refresh. Normal query tetap memutuskan bagaimana cara mengambil konten dalam bentuk yang siap dipakai app.

Referensi:

- https://contentful.github.io/contentful.js/contentful/latest/interfaces/ContentfulClientApi.html
- https://contentful.github.io/contentful.net-docs/articles/synchronization.html

## Gotcha Locale

Pastikan key snapshot kamu cocok dengan key locale asli di app.

Contohnya:

- bagus: `en-US`, `sv-SE`
- berisiko: `en`, `sv` kalau app query memakai kode locale lengkap

Ini mudah terlewat. Snapshot-nya ada, tapi lookup tetap gagal karena cache key dan snapshot key tidak sejalan.

Saat itu terjadi, fallback story terlihat rusak walaupun kontennya sebenarnya ada.

## Apa yang Perlu Dicache dan Apa yang Tidak

Pola ini cocok untuk:

- text
- metadata
- struktur entry
- URL media

Jangan menganggap pola ini otomatis menyelesaikan akses offline untuk:

- audio
- video
- gambar yang belum pernah dimuat sebelumnya

Library gambar sering punya caching sendiri. Audio dan video biasanya butuh download dan penyimpanan file eksplisit kalau kamu ingin true offline playback.

Jadi artikel ini fokus ke data CMS offline-first, bukan full offline media delivery.

## Checklist Testing

Uji kasus-kasus ini secara sengaja:

1. Fresh install, offline
2. Online sekali, lalu restart saat offline
3. App dibuka lagi dengan cache yang sudah ter-restore
4. Konten berubah di Contentful
5. Event foreground berulang di dalam throttle window
6. Storage dibersihkan dan tidak ada internet

Sistem offline sering gagal di edge case, bukan di happy path.

## Inti Praktis

Setup CMS offline-first yang terbaik bukan satu trik caching besar.

Ini strategi bertingkat:

- bundle baseline yang aman
- persist konten hasil fetch sungguhan
- pakai sync hanya untuk tahu kapan harus refresh

Pola ini mudah dipahami, cepat untuk user, dan jauh lebih aman daripada memaksa satu tool mengerjakan semuanya.

Kalau app kamu sudah memakai Contentful dan TanStack Query, pola ini adalah langkah lanjutan yang praktis.
