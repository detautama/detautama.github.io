---
title: "Managing ClassName with clsx in React"
date: "2025-03-21"
description: "Learn how to use clsx to manage className dynamically in React more cleanly and efficiently."
tags: ["clsx", "React", "CSS"]
featured: false
---

When building a React application, we often need to determine `className` dynamically based on certain conditions. The `clsx` library simplifies this process and makes the code cleaner and more readable.

## Installation

To use it, first install it with npm, yarn, or pnpm:

```sh
npm install clsx
# or
yarn add clsx
# or
pnpm add clsx
```

You can learn more about `clsx` on its official GitHub repository: [clsx on GitHub](https://github.com/lukeed/clsx)

## How to Use

With `clsx`, we can manage class names conditionally without writing long and cluttered code.

### Basic Example

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

In this example:

- If `primary` is `true`, the className becomes `"btn btn-primary"`.
- If `primary` is `false`, the className becomes `"btn btn-secondary"`.

### Combining Multiple Classes

You can also combine classes from various conditions:

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

## Using `clsx` with Tailwind CSS

If you are using Tailwind CSS, it is recommended to use `tailwind-merge` alongside `clsx` to avoid conflicting classes:

```tsx
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const buttonClass = twMerge(
  clsx("p-4 text-white", isActive && "bg-blue-500", isDisabled && "opacity-50")
);

<button className={buttonClass}>Click me</button>;
```

With `twMerge`, conflicting classes (such as `p-2` and `p-4`) are filtered so that only the most relevant class is applied.

You can learn more about `tailwind-merge` here: [tailwind-merge on GitHub](https://github.com/dcastil/tailwind-merge)

## Conclusion

Using `clsx` helps make `className` management cleaner and more flexible. If you use Tailwind CSS, `tailwind-merge` is highly recommended to ensure that classes do not conflict. With this approach, your React code becomes more organized and easier to maintain.
