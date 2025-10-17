<!-- Short, actionable instructions for AI coding agents working on this repository -->

# Copilot / AI agent instructions — detautama.github.io

This file contains focused, actionable guidance for automated coding agents (Copilot-style) to be immediately productive in this Next.js blog repository.

Keep instructions short and concrete. When in doubt, prefer small, well-scoped edits and run the project's linters/build locally (or advise the user how to) before changing many files.

## Big picture

- This is a Next.js (v15) static-export blog: `next.config.ts` sets `output: "export"` and pages are under `app/`.
- Content is Markdown files stored in `app/articles/*.md`. The site reads them with `app/lib/articles.ts` using `gray-matter`.
- There are multiple layout groups under `app/`: `(home-layout)`, `(clean-layout)`, and `(wide-layout)`. Place pages/components in the appropriate layout group when adding new routes.

## Key files and patterns (quick reference)

- Article utilities: `app/lib/articles.ts` — use `getSortedArticlesData()`, `getArticleData(id)`, and `getAllArticleIds()` when adding features that read articles.
- Markdown rendering: `app/MarkdownRenderer.tsx` — uses `react-markdown`, `remark-gfm`, `rehype-raw`, and `react-syntax-highlighter` with Prism (dracula). Keep code block handling consistent with this component.
- Styling: Tailwind (dark mode via selector). Global CSS in `app/globals.css` defines theme variables and utility classes (`claude-*` classes used throughout).
- Root layout: `app/layout.tsx` wraps app in `ThemeProvider` (next-themes) and injects Google Analytics via `@next/third-parties/google`.

## Build / dev / test commands

- Development: `npm run dev` (script runs `next dev --turbopack`).
- Build static site: `npm run build`.
- Start (production): `npm run start`.
- Lint: `npm run lint`.
- Format: `npm run format` (Prettier + Tailwind plugin configured in repo).

If a change touches Markdown content, HTML output, or CSS variables, recommend running a local dev server (`npm run dev`) to visually verify layout and styling.

## Project-specific conventions & gotchas

- Articles frontmatter: code supports both `tags` (array) and legacy `tag` (string). When adding metadata prefer `tags: [..]`.
- Articles directory path is absolute-joined in `app/lib/articles.ts` to `process.cwd()`; when adding file-based utilities, follow the same pattern (use `path.join(process.cwd(), '/app/articles')`).
- Dark mode: Tailwind `darkMode: 'selector'` — switching theme is done via adding/removing `.dark` on the root element (the project uses `next-themes`). Avoid assumptions about class-based dark utilities elsewhere.
- Images: `next.config.ts` sets `images.unoptimized = true` because site is exported statically. Do not rely on Next.js Image optimization in static-export contexts.

## When editing content (Markdown) vs. code

- For content-only changes: edit `app/articles/*.md`. Keep frontmatter fields consistent with examples already in the folder (title, date, description, tags/ tag, featured).
- For code changes that affect markdown rendering (code fences, HTML in MD): update `app/MarkdownRenderer.tsx` and ensure syntax highlighter and `rehype-raw` usage are preserved to allow inline HTML.

## Examples (use these patterns)

- Read all articles:
  - Use `getSortedArticlesData()` from `app/lib/articles.ts`.
- Render markdown inside a server component:
  - Import `MarkdownRenderer` and pass article content (string) — the renderer expects raw markdown string children.
- Add a new layout-aware page:
  - Place it under the matching layout group directory, e.g. `app/(wide-layout)/gallery/page.tsx` for the gallery page.

## Tests / validation guidance for agents

- There are no automated tests in the repo. Validate changes by:
  1. Running `npm run build` to catch type and build-time errors.
  2. Running `npm run dev` and visually checking the modified page.
  3. Running `npm run lint` and `npm run format` for style consistency.

## Safety and small-change policy

- Prefer focused PRs. Avoid large refactors unless requested. If you propose a structural change (routing, build pipeline), include a short migration plan and list of affected files.

## Files to inspect when troubleshooting

- Content & data: `app/articles/*`, `app/lib/articles.ts`
- Rendering: `app/MarkdownRenderer.tsx`, `app/(*/)**/page.tsx`, `app/layout.tsx`
- Styling: `app/globals.css`, `tailwind.config.ts`
- Config & scripts: `next.config.ts`, `package.json`, `tsconfig.json`

---

If anything here is unclear or you want more details for a specific area (routing, image handling, adding new article metadata, or deployment notes), tell me which part and I will expand the instructions or update this file.
