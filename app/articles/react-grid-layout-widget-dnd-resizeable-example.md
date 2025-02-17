---
title: "React Grid Layout Widget DnD and Resizable Example"
date: "2025-02-17"
description: "This article demonstrates how to create a React grid layout widget with draggable and resizable components using the react-grid-layout library. We will build a simple dashboard with draggable and resizable widgets that can be rearranged by the user."
tag: "React"
featured: true
---

<img src="/images/blog/react-grid-layout-widget-dnd-resizeable-example.gif" alt="React Grid Layout Widget DnD and Resizable Example" />

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
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
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

## App.tsx

```ts
// Import necessary modules and components
import { JSX, useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "./ReportsGridResizeHandle.css";

// Custom hook to handle resize events
const useResize = () => {
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const rows = 3;
  const gap = 20;
  const totalGapHeight = (rows - 1) * gap;
  const availableHeight = wrapperHeight - totalGapHeight;
  const boxHeight = availableHeight / rows;

  useEffect(() => {
    const controller = new AbortController();
    const handleResize = () => {
      setWrapperWidth(document.getElementById("reports")?.offsetWidth ?? 0);
      setWrapperHeight(document.getElementById("reports")?.offsetHeight ?? 0);
    };
    window.addEventListener("resize", handleResize, {
      signal: controller.signal,
    });
    requestAnimationFrame(handleResize);

    return () => controller.abort();
  }, []);

  return {
    wrapperWidth: wrapperWidth,
    height: boxHeight,
  };
};

// Main App component
export default function App() {
  const { wrapperWidth, height } = useResize();
  const [widgetsOnLayout, setWidgetsOnLayout] = useState<
    {
      position: GridLayout.Layout;
      component: JSX.Element;
    }[]
  >([
    // Initial widgets on layout
    {
      position: {
        i: "0",
        x: 0,
        y: 0,
        w: 1,
        h: 1,
      },
      component: (
        <>
          <HeaderItem title="Line Chart" />
          <div className="p-4 flex-1 overflow-auto">
            <BigNumber />
          </div>
        </>
      ),
    },
    {
      position: {
        i: "2",
        x: 1,
        y: 0,
        w: 1,
        h: 1,
      },
      component: (
        <>
          <HeaderItem title="Work orders" />
          <div className="p-4 flex-1 overflow-auto">
            <BigNumber />
          </div>
        </>
      ),
    },
  ]);

  const [widgets, setWidgets] = useState([
    // Available widgets
    {
      id: "1",
      component: (
        <>
          <HeaderItem title="Work orders" />
          <div className="p-4 flex-1 overflow-auto">
            <BigNumber />
          </div>
        </>
      ),
    },
    {
      id: "2",
      component: (
        <>
          <HeaderItem title="Pie Chart" />
          <div className="p-4 flex-1 overflow-auto">
            <BigNumber />
          </div>
        </>
      ),
    },
    {
      id: "3",
      component: (
        <>
          <HeaderItem title="Big Number" />
          <div className="p-4 flex-1 overflow-auto">
            <BigNumber />
          </div>
        </>
      ),
    },
    {
      id: "4",
      component: (
        <>
          <HeaderItem title="Metrics Table" />
          <div className="p-4 flex-1 overflow-auto">
            <BigNumber />
          </div>
        </>
      ),
    },
  ]);

  const cols = 4;
  const maxRows = 3;

  // Handle drop event to add widget to layout
  const handleOndrop = (
    l: GridLayout.Layout[],
    i: GridLayout.Layout,
    e: Event
  ) => {
    const id = (e as DragEvent).dataTransfer?.getData("text/plain");

    if (!id) throw new Error("Invalid widget id");

    const draggedWidget = widgets.find((widget) => widget.id === id);

    if (draggedWidget === undefined) throw new Error("Widget not found");

    setWidgetsOnLayout((prev) => [
      ...prev,
      {
        position: { i: crypto.randomUUID(), x: i.x, y: i.y, w: 1, h: 1 },
        component: draggedWidget.component,
      },
    ]);
    setWidgets((prev) => prev.filter((widget) => widget.id !== id));
  };

  // Find widget by ID
  const findWidgetById = (
    prevWidgetsOnLayout: typeof widgetsOnLayout,
    layout: GridLayout.Layout
  ) => {
    const widget = prevWidgetsOnLayout.find(
      (widget) => widget.position.i === layout.i
    );
    if (widget === undefined) throw new Error("Widget not found");
    return {
      position: layout,
      component: widget.component,
    };
  };

  // Handle resize or drag stop event
  const handleOnResizeStopOrDragStop = (gridLayout: GridLayout.Layout[]) => {
    setWidgetsOnLayout((prevWidgetsOnLayout) =>
      gridLayout.map((layout) => findWidgetById(prevWidgetsOnLayout, layout))
    );
  };

  // Placeholder layout for grid
  const placeholderLayout = Array.from({ length: cols * maxRows }).map(
    (_, index) => ({
      i: index.toString(),
      x: index % cols,
      y: Math.floor(index / cols),
      w: 1,
      h: 1,
    })
  );

  return (
    <div className="gap-2 flex h-full w-full flex-1 bg-red-900">
      <div className="relative h-auto w-full bg-blue-900" id="reports">
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
        <GridLayout
          layout={widgetsOnLayout.map((widget) => widget.position)}
          cols={cols}
          rowHeight={height}
          width={wrapperWidth}
          maxRows={maxRows}
          isDroppable={true}
          onDrop={(l, i, e) => handleOndrop(l, i, e)}
          resizeHandles={["s", "e", "w"]}
          onResizeStop={handleOnResizeStopOrDragStop}
          onDragStop={handleOnResizeStopOrDragStop}
          preventCollision={true}
          compactType={"vertical"}
          draggableHandle=".draggable-handle"
        >
          {widgetsOnLayout.map((widget) => (
            <div
              key={widget.position.i}
              className="rounded-sm flex flex-col border border-silver bg-yellow-500"
            >
              {widget.component}
            </div>
          ))}
        </GridLayout>
      </div>
      <div className="w-96 p-4 h-screen overflow-auto bg-green-500">
        <div className="text-back font-semibold">Available Widgets</div>
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className="mt-2 rounded-sm flex flex-col border border-silver bg-yellow-500"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", widget.id);
            }}
          >
            {widget.component}
          </div>
        ))}
      </div>
    </div>
  );
}

// HeaderItem component for widget headers
function HeaderItem({ title }: { readonly title: string }) {
  return (
    <div className="px-4 py-2 flex cursor-grab items-center justify-between border-b border-silver">
      <div className="draggable-handle text-back font-semibold flex-1">
        {title}
      </div>
    </div>
  );
}

// BigNumber component for displaying large numbers
function BigNumber() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="text-7xl font-bold">123</div>
      <div className="text-sm">Bottom text</div>
    </div>
  );
}

```
