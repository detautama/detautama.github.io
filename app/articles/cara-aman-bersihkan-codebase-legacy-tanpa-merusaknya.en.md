---
title: "The Art of Refactoring Legacy Code Without Inviting Disaster"
date: "2026-09-08"
description: "Refactoring isn't just about tidying up functions, it's about the order of thinking: understand context, add a safety net, and bring empathy through small PRs."
tags:
  [
    "Software Engineering",
    "Clean Architecture",
    "Code Review",
    "Kotlin Multiplatform",
  ]
featured: true
---

A few days ago, my tech lead sent a message in our team chat that's still sitting in my head:

> _"…we can start look over the tests and consistency of code and architecture, are there pieces which should be moved around following the Clean Architecture already going on? Where are the technical debts? First thing should be for us to clean up the project to more easily grasp what is going on, but to do this we also need to be wary not to break anything, hence write tests first and make good arguments in PRs to why the changes are made, and make them PRs small and easy to digest for the developers already in the project."_

The code itself isn't even that complicated. What kept nagging at me is one thing: **the order of thinking they emphasized before we even touch the keyboard.**

The context was a Kotlin Multiplatform library that's been around for a while, powering multiple platforms (Android, iOS, even backend), and worked on by a good number of people. The team is slowly migrating toward Clean Architecture.

When faced with messy legacy code, most developers' first reflex is "clean it up right now." But that message was a reminder: without the right order, refactoring can turn into a disaster.

---

### 1. Understand First, Change Later

Before arguing about clean code, test coverage, or the ideal architecture, ask yourself first: **what was this code built for, and who uses it?**

Sounds elemental, but it's the first thing that gets skipped once our technical ego gets triggered by ugly code. Without understanding the business context and the past trade-offs behind that code, our refactor risks undoing design decisions that were actually made on purpose.

Understanding how the system talks to itself is the foundation. Only after that can we rationally figure out:

- Which tests are dangerously missing.
- Where the inconsistencies actually live.
- Which components genuinely deserve to move.

---

### 2. Mapping Technical Debt Precisely

Like the message hinted (_"Where are the technical debts?"_), saying "this project is full of technical debt" is cheap and easy. The hard part is pointing at it precisely.

Useful technical debt is debt with a clear address. Which part violates the architecture boundary? Which file is hiding a side effect? If we can't map its location in detail, we don't actually understand the problem yet.

---

### 3. First Goal: Make the Code Easy to Understand

Forget the ambition of "100% Clean Architecture in one sprint." That kind of target almost always ends in failure or burnout.

Set a realistic goal instead, the same one from that message: **leave the codebase easier to read than when you first opened it.**

Code that's easy to understand is a tactical win on its own. Once the flow is transparent, every future fix automatically gets cheaper to make.

---

### 4. The Safety Net: Tests First, Refactor Second

Because our main goal is to clarify the flow without changing behavior, the risk of breaking something already working in production is very real.

The discipline of the order can't be flipped:

1. **Write tests first** to lock in the current behavior.
2. **Do the refactor**, using those tests as a safety net.
3. **Include a strong argument** in the Pull Request description.
4. **Split the PR into small chunks.**

In practice, people often rush to clean up code and only panic-write tests once the app crashes in a user's hands. Test-driven refactoring isn't a formality, it's insurance.

---

### 5. Small PRs Are a Form of Empathy

The last point from that chat that stuck with me the most: **a good Pull Request is one that respects your teammates' time.**

Refactoring isn't just about making the code look nice to us, it's about making it easy for someone else to review, understand, and maintain down the line.

A giant PR that touches dozens of files at once only leads to two outcomes:

- Rejected because it's too confusing.
- Rubber-stamped because the reviewer got tired of scrolling.

A small, focused PR with a clear rationale is the highest form of respect you can give a teammate.

---

### The Takeaway

That message laid out a universal order of thinking, one that applies to any project with a long history:

**Understand context → Map the debt → Write tests → Refactor slowly → Send a small PR.**

In the end, the most valuable code improvement isn't the dramatic, sweeping rewrite, it's the small change that the team can trust and calmly build on once we've moved on to the next task.
