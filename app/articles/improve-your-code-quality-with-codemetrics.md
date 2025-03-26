---
title: "Improve Your Code Quality with CodeMetrics in VS Code"
date: "2025-03-27"
description: "Measure code complexity in real-time using CodeMetrics, a lightweight VS Code extension that helps you write cleaner, more maintainable code."
tag: "Clean Code"
featured: false
---

As developers, we’re often chasing clean, maintainable code. But how do you _measure_ clean code? Enter [**CodeMetrics**](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics), a handy Visual Studio Code extension that helps you keep track of the complexity of your functions and methods—right inside your editor.

---

### 🧠 What is CodeMetrics?

CodeMetrics is a VS Code extension that provides a real-time metric next to your functions or methods, showing how complex your code is. It supports languages like **JavaScript**, **TypeScript**, **PHP**, **C#,** and more.

The metric shown is a **cyclomatic complexity score**—a number that represents how many independent paths your function can take. In simpler terms: the higher the number, the more decisions (like `if`, `for`, `while`, `switch`) your code is making, and the more complex (and harder to test/maintain) it becomes.

---

### 🛠 How to Install It

1. Open VS Code
2. Head to the **Extensions** view (`Ctrl+Shift+X`)
3. Search for `codemetrics`
4. Click **Install** on "CodeMetrics" by kisstkondoros

That’s it. Once installed, it starts working immediately—no setup required.

---

### 👀 What It Looks Like

You'll start seeing a number in gray next to each function or method. For example:

<img src="/images/blog/improve-your-code-quality-with-codemetrics/img-codemetric-1.jpg" alt="CodeMetrics in action" />

The number `3` represents the cyclomatic complexity of this function.

---

### ⚖️ What’s a Good Score?

Here’s a rough guide:

- **1–5:** Low complexity — great!
- **6–10:** Moderate — still manageable
- **11–20:** High — could benefit from refactoring
- **20+**: Danger zone — time to break things down

---

### ✨ Why It Matters

- **Readability:** Simpler code is easier to understand for you _and_ your teammates.
- **Testability:** Lower-complexity functions are easier to cover with unit tests.
- **Maintainability:** Keeping functions small and focused reduces bugs and tech debt.

---

### 💡 Bonus: Turn Complexity into a Game

Use CodeMetrics as a fun motivator to reduce complexity across your codebase. Refactor that 12-point monster function down to a tidy 4. Celebrate those small wins!

---

### Final Thoughts

CodeMetrics doesn’t replace good code reviews or testing—but it’s a powerful sidekick. It makes complexity visible, helping you make better decisions as you code. If you care about writing clean, maintainable software, give this extension a spin.

🔗 [Get CodeMetrics on the VS Code Marketplace →](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics)
