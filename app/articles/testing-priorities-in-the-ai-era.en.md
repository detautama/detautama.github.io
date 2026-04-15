---
title: "Testing Priorities in the AI Era: Smoke Tests and Documentation First"
date: "2025-10-21"
description: "My take on modern testing priorities: start with smoke tests and documentation, then layer in e2e, component, and unit tests. A practical approach for AI-powered development."
tags: ["Testing", "Best Practices", "AI Development", "Documentation"]
featured: false
---

As AI coding assistants get more powerful, our testing strategies need to evolve with them. After years of building and maintaining applications—including this Next.js static export blog—I've developed strong opinions about testing priorities that work really well in the AI era.

## The Foundation: Smoke Tests Come First

Before anything else, **you need smoke tests**. Not eventually. Not "when we get around to it." Right now.

Smoke tests are your canary in the coal mine. They're the absolute minimum validation that your application is alive and breathing. For a web app, this can be as simple as:

- Does the app start up?
- Does the homepage load?
- Are the important routes accessible?
- Are essential services responding?

### Why Smoke Tests Should Be Your First Priority

In AI-assisted development, we're shipping code faster than ever before. Claude, GitHub Copilot, and other AI tools can scaffold entire features in minutes. But speed without validation is just accelerated technical debt.

Smoke tests ensure that no matter how much AI-generated code gets added, the core of your application stays functional. They're your safety net that catches fatal failures before they reach users—or worse, before they snowball into something bigger.

## Documentation: The Other Half of the Foundation

Smoke tests tell you **whether** something works. Documentation tells you **how** and **why** it's supposed to work.

Here's my somewhat controversial take: **Documentation should be written alongside—or even before—your smoke tests.**

Why? Because in AI-assisted development:

1.  **AI needs context**: Tools like Claude Code work best when they understand your system's *intent*, not just its current state.
2.  **Humans forget fast**: That clever solution you implemented? You'll have forgotten why it exists in two weeks.
3.  **Onboarding matters**: With AI generating code quickly, team members (human or AI) need clear documentation to understand the system they're working on.

### What to Document First

Focus on:

- **System architecture**: How the pieces connect to each other
- **Critical paths**: What has to work for the app to be usable
- **Environment setup**: How to run the app from scratch
- **Testing approach**: How to validate changes (yes, document your testing strategy!)

For this blog, the `.github/copilot-instructions.md` file is a perfect example—it tells AI agents how to work with the codebase effectively.

## The Testing Pyramid: Reimagined for AI Development

Once smoke tests and documentation are in place, here's how I prioritize the rest:

### 1. End-to-End (E2E) Tests

**E2E tests are your second priority** after smoke tests.

Why? Because they validate that user journeys work as intended, catching integration issues that unit tests miss. In AI-assisted development, where different parts of the system might be generated separately, E2E tests make sure everything actually works together.

For this blog, E2E tests might verify:

- Article pages render correctly
- Navigation works across layout groups
- Dark mode toggles properly
- Tags filter articles as expected

### 2. Component Tests

**Component tests come next**, focused on interactive elements and complex logic.

These are especially valuable when AI is generating UI components. A component might look correct in isolation but behave wrong under certain conditions.

Good candidates for component testing:

- Custom hooks with complex state logic
- Interactive widgets (like the dark mode button)
- Markdown rendering with custom handling
- Form validation logic

### 3. Unit Tests

**Unit tests come last—but they still matter.**

I know this goes against traditional testing wisdom, but hear me out: in AI-assisted development, unit tests deliver the most value when you have complex business logic or algorithms that need precise validation.

For pure functions and utility methods, unit tests are great. But don't waste time unit testing getters, simple setters, or trivial code that's already covered by higher-level tests.

## Why This Order Works in the AI Era

### Development Speed

AI tools generate code fast. Your testing strategy has to keep up. Smoke tests and documentation deliver immediate value without slowing down development velocity.

### Autonomous Validation

As I covered in my [TDD article](/articles/tdd-best-practice-for-agentic-coding-with-claude-code), tests allow AI to work autonomously. But you need the right tests at the right time:

- **Smoke tests**: Tell the AI immediately if something fundamental is broken
- **E2E tests**: Give the AI confidence that user workflows still function
- **Component/Unit tests**: Let the AI refactor safely

### Practical Resource Allocation

Let's be honest: testing takes time. By prioritizing smoke tests and documentation first, you ensure that even with limited resources, you have:

1.  A baseline for detecting critical failures
2.  Knowledge preservation for future work
3.  A foundation to build more comprehensive tests on later

## Real-World Example: This Blog

For `detautama.github.io`, here's what the testing priority looks like in practice:

### ✅ Smoke Test (Implemented)

```bash
npm run build
# If this succeeds, basic markdown parsing, routing, and static export are working
```

### ✅ Documentation (Implemented)

- `.github/copilot-instructions.md` guides AI agents
- Article utilities are well-commented in `app/lib/articles.ts`
- Build commands are documented in `package.json`

### 🎯 E2E Tests (Up Next)

- Verify article pages render correctly
- Test navigation between layouts
- Validate tag filtering
- Check theme switching

### 🎯 Component Tests (After E2E)

- MarkdownRenderer with various markdown features
- Dark mode toggle behavior
- Article list filtering and sorting

### 🎯 Unit Tests (Last)

- Article metadata parsing logic
- Date sorting functions
- Tag aggregation utilities

## Addressing Common Objections

### "But the testing pyramid says unit tests first!"

The traditional testing pyramid was designed for a different era. When AI can generate and modify code at unprecedented speed, we need tests that:

1.  Catch fatal failures immediately (smoke tests)
2.  Validate user-facing functionality (E2E)
3.  Enable confident refactoring (all of the above)

### "What about TDD?"

TDD is still valuable! But even in TDD, you should write smoke tests and documentation first. Then practice TDD for the specific feature you're building.

The key distinction is: **TDD is a development technique**. Smoke tests and documentation are **project infrastructure**. You need the infrastructure before the technique can be used effectively.

### "Won't skipping unit tests cause bugs?"

No, because you're not skipping them—you're prioritizing them. And bugs are best caught where they impact users: at the E2E level.

Unit tests add precision and enable confident refactoring. They're valuable. They're just not the first priority when starting a project or feature.

## A Practical Guide for Your Next Project

When starting a new project or feature:

1.  **Day 1**: Write a smoke test. Even if it's just "the app runs and the homepage loads."
2.  **Day 1**: Document the core architecture and setup process.
3.  **Before the first release**: Add E2E tests for critical user paths.
4.  **As complexity grows**: Add component tests for interactive elements.
5.  **When refactoring**: Add unit tests for the complex logic you're changing.

## Conclusion

The AI era calls for a new approach to testing priorities. By putting smoke tests and documentation first, we build a foundation that lets both humans and AI develop code with confidence and speed.

Traditional testing wisdom isn't wrong—it's just incomplete for modern AI-assisted development. The pyramid isn't upside down; we're just acknowledging that the ground beneath it (smoke tests and documentation) has always been more critical than we gave it credit for.

Start with smoke tests. Document as you go. Add E2E, component, and unit tests as your system grows. Your future self—and your AI coding assistant—will thank you.

---

*What's your take on testing priorities in 2025? Have you found a different approach that works better for your team? I'd love to hear your thoughts.*
