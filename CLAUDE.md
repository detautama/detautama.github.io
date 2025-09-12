# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 blog application with static site generation (`output: "export"`). It uses TypeScript, Tailwind CSS, and Markdown files for content management.

## Commands

### Development

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build static site for production
- `npm run start` - Start production server
- `npm run lint` - Run Next.js linting
- `npm run format` - Format code with Prettier

## Architecture

### Content Structure

Articles are stored as Markdown files in `/app/articles/` with frontmatter:

```yaml
---
title: "Article Title"
date: "YYYY-MM-DD"
description: "Brief description"
tag: "Category"
featured: boolean
---
```

### Routing Layout Groups

The app uses Next.js layout groups for different page layouts:

- `(home-layout)` - Homepage and search pages
- `(clean-layout)` - Articles, about, contact, projects, tags, links
- `(wide-layout)` - Gallery and achievements pages

### Core Components

- `app/lib/articles.ts` - Article data fetching and processing using gray-matter
- `app/MarkdownRenderer.tsx` - Markdown rendering with syntax highlighting
- `app/ToggleDarkMode.tsx` - Dark mode toggle using next-themes

### Key Configuration

- Static export configured in `next.config.ts`
- Dark mode selector strategy in `tailwind.config.ts`
- TypeScript path alias: `@/*` maps to root directory
