---
title: "Running TypeScript 7 and ESLint Side by Side"
date: "2026-09-02"
description: "How to use the native TypeScript 7 compiler for builds and type-checking while keeping TypeScript 6 available for the Compiler API required by ESLint."
tags: ["TypeScript", "ESLint", "pnpm", "Compiler"]
featured: false
---

TypeScript 7 introduces a much faster native compiler written in Go. However, TypeScript 7.0 does not yet provide the programmatic Compiler API required by tools such as `typescript-eslint`.

The official solution is to run TypeScript 6 and 7 side by side using npm aliases.

## Configuration

In `pnpm-workspace.yaml`:

```yaml
catalog:
  typescript: npm:@typescript/typescript6@~6.0.0
  'typescript-7': npm:typescript@~7.0.0
```

Then add both packages as dependencies:

```json
{
  "devDependencies": {
    "typescript": "catalog:",
    "typescript-7": "catalog:"
  }
}
```

## Why Does This Work?

Modules and executables are resolved through different paths:

- `typescript-eslint` imports the module named `typescript`, which points to TypeScript 6.
- Scripts that run `tsc` use the binary provided by TypeScript 7.

The TypeScript 6 package provides a `tsc6` binary, while TypeScript 7 provides `tsc`:

```text
node_modules/.bin/tsc6 -> TypeScript 6
node_modules/.bin/tsc  -> TypeScript 7
```

As a result, existing scripts do not need to change:

```json
{
  "typecheck": "tsc --noEmit"
}
```

This command automatically uses TypeScript 7, while ESLint continues to use the TypeScript 6 API.

## Result

With this approach:

- ESLint runs reliably using the TypeScript 6 API.
- Builds and type-checking use the TypeScript 7 compiler.
- No source code or build script changes are required.
- The TypeScript 6 alias can be removed once the tooling supports the TypeScript 7 API.

References: [TypeScript 7.0 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) and [pnpm dependency aliases](https://pnpm.io/aliases).
