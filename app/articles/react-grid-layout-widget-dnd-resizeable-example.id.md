---
title: "Contoh Widget React Grid Layout DnD dan Resizable"
date: "2025-02-17"
description: "Postingan ini mendemonstrasikan cara membuat widget layout grid React dengan komponen yang bisa ditarik (draggable) dan diubah ukurannya (resizable) menggunakan pustaka react-grid-layout. Kita akan membangun dashboard sederhana dengan widget yang dapat diatur ulang oleh pengguna."
tags: ["React", "UI", "Drag and Drop", "Layout"]
featured: true
---

<img src="/images/blog/react-grid-layout-widget-dnd-resizeable-example.gif" alt="Contoh Widget React Grid Layout DnD dan Resizable" />

Postingan ini mendemonstrasikan cara membuat widget layout grid React dengan komponen yang bisa ditarik (draggable) dan diubah ukurannya (resizable) menggunakan pustaka `react-grid-layout`. Kita akan membangun dashboard sederhana dengan widget yang dapat diatur ulang oleh pengguna secara ditarik maupun diubah ukurannya.

Demo: [CodeSandbox](https://codesandbox.io/p/devbox/react-dnd-tailwind-yngc8r)

## package.json

```json
{
  "name": "react-vite-ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts, tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@types/react-grid-layout": "1.3.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-grid-layout": "1.5.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@typescript-eslint/eslint-plugin": "^8.17.0",
    "@typescript-eslint/parser": "^8.17.0",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "10.4.20",
    "eslint": "^9.16.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "postcss": "8.4.49",
    "tailwindcss": "3.4.16",
    "typescript": "^5.7.2",
    "vite": "^6.0.3"
  }
}
```

## ReportsGridResizeHandle.css

```css
.react-grid-item > .react-resizable-handle.react-resizable-handle-w {
  top: 0 !important;
  bottom: 0 !important;
  height: 100%;
  background: transparent;
  transform: rotate(180deg) !important;
  margin-top: 0 !important;
}

.react-grid-item > .react-resizable-handle.react-resizable-handle-s {
  bottom: 0 !important;
  width: 100%;
  left: 0;
  margin: 0;
  background: transparent;
  transform: rotate(180deg) !important;
  margin-top: 0 !important;
}

.react-grid-item > .react-resizable-handle.react-resizable-handle-e {
  top: 0 !important;
  height: 100%;
  right: 0 !important;
  margin: 0;
  background: transparent;
  transform: rotate(180deg) !important;
  margin-top: 0 !important;
}

.react-resizable-handle::after {
  display: none;
}
```

## types.ts

```ts
import { JSX } from "react";
import { Layout } from "react-grid-layout";

export interface Widget {
  id: string;
  title: string;
  component: JSX.Element;
}

export interface WidgetOnLayout {
  position: Layout;
  widget: Widget;
}

export interface UseResizeReturn {
  wrapperWidth: number;
  height: number;
}

export interface WidgetCardProps {
  children: React.ReactNode;
  className?: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}
```

## App.tsx

```ts
import { useCallback, useEffect, useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "./ReportsGridResizeHandle.css";
import {
  UseResizeReturn,
  Widget,
  WidgetCardProps,
  WidgetOnLayout,
} from "./types";

// Custom hook untuk menangani resizing responsif dari kontainer grid
const useResize = (): UseResizeReturn => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Ambil elemen kontainer utama
    const reportsElement = document.getElementById("reports");

    // Perbarui dimensi saat ukuran kontainer berubah
    const handleResize = () => {
      if (!reportsElement) return;
      setDimensions({
        width: reportsElement.offsetWidth,
        height: reportsElement.offsetHeight,
      });
    };

    // Gunakan ResizeObserver untuk memantau perubahan ukuran kontainer
    const resizeObserver = new ResizeObserver(handleResize);
    if (reportsElement) {
      resizeObserver.observe(reportsElement);
    }

    // Cleanup observer saat unmount
    return () => resizeObserver.disconnect();
  }, []);

  // Hitung tinggi setiap kotak grid dengan memperhitungkan celah (gap)
  const totalGapHeight = (GRID_CONFIG.MAX_ROWS - 1) * GRID_CONFIG.GAP;
  const boxHeight = (dimensions.height - totalGapHeight) / GRID_CONFIG.MAX_ROWS;

  return { wrapperWidth: dimensions.width, height: boxHeight };
};

// Komponen Header untuk setiap widget dengan handle drag
const HeaderItem = ({ title }: { title: string }) => (
  <div className="px-4 py-2 flex cursor-grab items-center justify-between border-b border-silver">
    <div className="draggable-handle text-back font-semibold flex-1">
      {title}
    </div>
  </div>
);

// Contoh komponen konten widget yang menampilkan angka besar
const BigNumber = () => (
  <div className="flex h-full flex-col items-center justify-center">
    <div className="text-7xl font-bold">123</div>
    <div className="text-sm">Teks bawah</div>
  </div>
);

// Komponen kontainer untuk widget dengan fungsionalitas drag
const WidgetCard = ({
  children,
  className = "",
  draggable,
  onDragStart,
}: WidgetCardProps) => (
  <div
    className={`rounded-sm flex flex-col border border-silver bg-yellow-500 ${className}`}
    draggable={draggable}
    onDragStart={onDragStart}
  >
    {children}
  </div>
);

// Konstanta konfigurasi grid
const GRID_CONFIG = {
  COLS: 4,
  MAX_ROWS: 3,
  GAP: 20,
} as const;

// Data widget yang tersedia awal
const INITIAL_WIDGETS: Widget[] = [
  {
    id: "1",
    title: "Work orders",
    component: <BigNumber />,
  },
  {
    id: "2",
    title: "Pie Chart",
    component: <BigNumber />,
  },
  {
    id: "3",
    title: "Big Number",
    component: <BigNumber />,
  },
  {
    id: "4",
    title: "Metrics Table",
    component: <BigNumber />,
  },
];

// Konfigurasi layout awal
const INITIAL_LAYOUT: WidgetOnLayout[] = [
  {
    position: { i: "0", x: 0, y: 0, w: 1, h: 1 },
    widget: { id: "0", title: "Line Chart", component: <BigNumber /> },
  },
  {
    position: { i: "2", x: 1, y: 0, w: 1, h: 1 },
    widget: { id: "2", title: "Work orders", component: <BigNumber /> },
  },
];

export default function App() {
  // Ambil dimensi responsif dari custom hook
  const { wrapperWidth, height } = useResize();

  // State untuk melacak widget di dalam grid dan widget yang tersedia
  const [widgetsOnLayout, setWidgetsOnLayout] =
    useState<WidgetOnLayout[]>(INITIAL_LAYOUT);
  const [availableWidgets, setAvailableWidgets] =
    useState<Widget[]>(INITIAL_WIDGETS);

  // Menangani pelepasan (drop) widget dari sidebar ke grid
  const handleOndrop = (
    _l: GridLayout.Layout[],
    i: GridLayout.Layout,
    e: Event
  ) => {
    const id = (e as DragEvent).dataTransfer?.getData("text/plain");
    if (!id) throw new Error("ID widget tidak valid");

    // Cari widget yang ditarik dari daftar widget yang tersedia
    const draggedWidget = availableWidgets.find((widget) => widget.id === id);
    if (draggedWidget === undefined) throw new Error("Widget tidak ditemukan");

    // Tambahkan widget ke grid dan hapus dari daftar widget yang tersedia
    setWidgetsOnLayout((prev) => [
      ...prev,
      {
        position: { i: crypto.randomUUID(), x: i.x, y: i.y, w: 1, h: 1 },
        widget: draggedWidget,
      },
    ]);
    setAvailableWidgets((prev) => prev.filter((widget) => widget.id !== id));
  };

  // Perbarui state layout saat widget dipindahkan atau diubah ukurannya
  const handleLayoutChange = useCallback((newLayout: Layout[]) => {
    setWidgetsOnLayout((prev) =>
      newLayout.map((layout) => {
        const widget = prev.find((w) => w.position.i === layout.i)?.widget;
        if (!widget) throw new Error(`Widget tidak ditemukan untuk layout ${layout.i}`);
        return { position: layout, widget };
      })
    );
  }, []);

  // Buat placeholder layout grid
  const placeholderLayout = Array.from({
    length: GRID_CONFIG.COLS * GRID_CONFIG.MAX_ROWS,
  }).map((_, index) => ({
    i: index.toString(),
    x: index % GRID_CONFIG.COLS,
    y: Math.floor(index / GRID_CONFIG.COLS),
    w: 1,
    h: 1,
  }));

  return (
    <div className="gap-2 flex h-full w-full flex-1 bg-red-900">
      {/* Kontainer grid utama */}
      <div className="relative h-auto w-full bg-blue-900" id="reports">
        {/* Placeholder grid yang menunjukkan ruang kosong */}
        <div className="top-0 left-0 absolute h-full w-full">
          <GridLayout
            layout={placeholderLayout}
            cols={4}
            rowHeight={height}
            width={wrapperWidth}
            isDraggable={false}
            isResizable={false}
            maxRows={3}
          >
            {placeholderLayout.map((item) => (
              <div key={item.i} className="rounded-sm bg-white" />
            ))}
          </GridLayout>
        </div>

        {/* Grid aktif dengan widget */}
        <GridLayout
          layout={widgetsOnLayout.map((widget) => widget.position)}
          cols={GRID_CONFIG.COLS}
          rowHeight={height}
          width={wrapperWidth}
          maxRows={GRID_CONFIG.MAX_ROWS}
          isDroppable={true}
          onDrop={handleOndrop}
          resizeHandles={["s", "e", "w"]}
          onResizeStop={handleLayoutChange}
          onDragStop={handleLayoutChange}
          preventCollision={true}
          compactType={"vertical"}
          draggableHandle=".draggable-handle"
        >
          {widgetsOnLayout.map((widget) => (
            <div key={widget.position.i}>
              <WidgetCard className="h-full">
                <HeaderItem title={widget.widget.title} />
                {widget.widget.component}
              </WidgetCard>
            </div>
          ))}
        </GridLayout>
      </div>

      {/* Sidebar dengan widget yang tersedia */}
      <aside className="w-96 p-4 bg-green-600 h-screen overflow-auto">
        <h2 className="font-semibold">Widget yang Tersedia</h2>
        {availableWidgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            className="mt-2"
            draggable={true}
            onDragStart={(e: React.DragEvent) => {
              e.dataTransfer.setData("text/plain", widget.id);
            }}
          >
            <HeaderItem title={widget.title} />
            <div className="p-4 flex-1 overflow-auto">{widget.component}</div>
          </WidgetCard>
        ))}
      </aside>
    </div>
  );
}
```
