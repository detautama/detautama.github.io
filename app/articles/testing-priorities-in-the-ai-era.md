---
title: "Testing Priorities in the AI Era: Smoke Tests and Documentation First"
date: "2025-10-21"
description: "My opinion on modern testing priorities: start with smoke tests and documentation, then layer in e2e, component, and unit tests. A practical approach for AI-powered development."
tags: ["Testing", "Best Practices", "AI Development", "Documentation"]
featured: false
---

As AI coding assistants become increasingly powerful, our testing strategies need to evolve. After years of building and maintaining applications—including this Next.js static-export blog—I've developed strong opinions about testing priorities that work particularly well in the AI era.

## The Foundation: Smoke Tests Come First

Before anything else, **you need a smoke test**. Not eventually. Not "when we have time." Right now.

A smoke test is your canary in the coal mine. It's the absolute minimum validation that your application is alive and breathing. For a web application, this might be as simple as:

- Can the app start?
- Does the homepage load?
- Are critical routes accessible?
- Do essential services respond?

### Why Smoke Tests Must Come First

In AI-assisted development, we're generating code faster than ever. Claude, GitHub Copilot, and other AI tools can scaffold entire features in minutes. But speed without validation is just technical debt in fast-forward.

A smoke test ensures that no matter how much the AI churns out, your application's core remains functional. It's your safety net that catches catastrophic failures before they reach users—or worse, before they compound into bigger problems.

## Documentation: The Other Half of the Foundation

Smoke tests tell you **if** things work. Documentation tells you **how** and **why** they should work.

Here's my controversial take: **Documentation should be written alongside—or even before—smoke tests.**

Why? Because in the age of AI-assisted development:

1. **AI needs context**: Tools like Claude Code work best when they understand your system's intent, not just its current state.
2. **Humans forget fast**: That clever workaround you implemented? You'll forget why it exists in two weeks.
3. **Onboarding is critical**: With AI generating code quickly, team members (human or AI) need clear documentation to understand the system they're extending.

### What to Document First

Focus on:

- **System architecture**: How components fit together
- **Critical paths**: What must work for the application to be viable
- **Environment setup**: How to get from zero to running
- **Testing approach**: How to validate changes (yes, document your testing strategy!)

For this blog, the `.github/copilot-instructions.md` file is a perfect example—it tells AI agents exactly how to work with the codebase effectively.

## The Testing Pyramid: Reimagined for AI Development

After smoke tests and documentation are in place, here's how I prioritize additional testing:

### 1. End-to-End (E2E) Tests

**E2E tests are your second priority** after smoke tests.

Why? Because they validate that user journeys work as intended, catching integration issues that unit tests miss. In AI-assisted development, where different parts of the system might be generated separately, E2E tests ensure everything actually works together.

For this blog, an E2E test might verify:
- Article pages render correctly
- Navigation works across layout groups
- Dark mode toggles properly
- Tags filter articles as expected

### 2. Component Tests

**Component tests come next**, focusing on interactive elements and complex logic.

These are particularly valuable when AI generates UI components. A component might look right in isolation but behave incorrectly under specific conditions.

Good candidates for component tests:
- Custom hooks with complex state logic
- Interactive widgets (like the dark mode toggle)
- Markdown rendering with special handling
- Form validation logic

### 3. Unit Tests

**Unit tests are last—but still important.**

I know this contradicts traditional testing wisdom, but hear me out: in AI-assisted development, unit tests provide the most value when you have complex business logic or algorithms that need precise validation.

For pure functions and utility methods, unit tests are excellent. But don't waste time unit testing simple getters, setters, or trivial code that's already covered by higher-level tests.

## Why This Order Works in the AI Era

### Speed of Development

AI tools generate code fast. Your testing strategy needs to keep pace. Smoke tests and documentation provide immediate value without slowing down velocity.

### Autonomous Validation

As I discussed in my [TDD article](/articles/tdd-best-practice-for-agentic-coding-with-claude-code), tests enable AI to work autonomously. But you need the right tests at the right time:

- **Smoke tests**: Let AI know immediately if something fundamental broke
- **E2E tests**: Give AI confidence that user workflows still function
- **Component/Unit tests**: Allow AI to refactor safely

### Practical Resource Allocation

Let's be honest: testing takes time. By prioritizing smoke tests and documentation first, you ensure that even with limited resources, you have:

1. A baseline for detecting critical failures
2. Knowledge preservation for future work
3. A foundation for adding more comprehensive tests later

## Real-World Example: This Blog

For `detautama.github.io`, here's what the testing priorities look like:

### ✅ Smoke Test (Implemented)
```bash
npm run build
# If this succeeds, basic markdown parsing, routing, and static export work
```

### ✅ Documentation (Implemented)
- `.github/copilot-instructions.md` guides AI agents
- Article utilities are well-commented in `app/lib/articles.ts`
- Build commands documented in `package.json`

### 🎯 E2E Tests (Would Add Next)
- Verify article pages render correctly
- Test navigation between layouts
- Validate tag filtering
- Check theme switching

### 🎯 Component Tests (Would Add After E2E)
- MarkdownRenderer with various markdown features
- Dark mode toggle behavior
- Article list filtering and sorting

### 🎯 Unit Tests (Would Add Last)
- Article metadata parsing logic
- Date sorting functions
- Tag aggregation utilities

## Common Objections Addressed

### "But the testing pyramid says unit tests first!"

The traditional testing pyramid was designed for a different era. When AI can generate and modify code at unprecedented speed, we need tests that:
1. Catch catastrophic failures immediately (smoke tests)
2. Validate user-facing functionality (E2E)
3. Enable confident refactoring (all of the above)

### "What about TDD?"

TDD is still valuable! But even in TDD, you should write a smoke test and documentation first. Then practice TDD for the specific feature you're building.

The key is: **TDD is a development technique**. Smoke tests and documentation are **project infrastructure**. You need the infrastructure before you can effectively use the technique.

### "Won't skipping unit tests lead to bugs?"

No, because you're not skipping them—you're prioritizing. And bugs are best caught where they impact users: at the E2E level.

Unit tests add precision and enable confident refactoring. They're valuable. They're just not the first priority when starting a project or feature.

## Practical Guidelines for Your Next Project

When starting a new project or feature:

1. **Day 1**: Write a smoke test. Even if it's just "app starts and homepage loads."
2. **Day 1**: Document the core architecture and setup process.
3. **Before first release**: Add E2E tests for critical user journeys.
4. **As complexity grows**: Add component tests for interactive elements.
5. **When refactoring**: Add unit tests for complex logic you're touching.

## Conclusion

The AI era demands a new approach to testing priorities. By putting smoke tests and documentation first, we create a foundation that enables both humans and AI to develop confidently and rapidly.

Traditional testing wisdom isn't wrong—it's just incomplete for modern AI-assisted development. The pyramid hasn't inverted; we've simply acknowledged that the ground beneath it (smoke tests and documentation) was always more critical than we admitted.

Start with smoke tests. Document as you go. Layer in E2E, component, and unit tests as your system grows. Your future self—and your AI coding assistants—will thank you.

---

_What's your take on testing priorities in 2025? Have you found different approaches that work better for your team? I'd love to hear your thoughts._
