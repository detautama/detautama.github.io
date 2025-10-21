---
title: "One Branch per-ticket Best Practice"
date: "2025-04-30"
description: "Why one Git branch per Jira ticket is a best practice, and how to work efficiently when tickets depend on each other."
tags: ["Jira", "Git", "Version Control", "Best Practices"]
featured: false
---

In modern software development, it's widely considered best practice to use **one Git branch per Jira ticket**. It improves clarity, traceability, and collaboration across teams. But what happens when you’re working on a ticket (Ticket B) that depends on another (Ticket A), and Ticket A is still in PR?

Let’s break it down 👇

---

## ✅ Why One Branch per Ticket Works

- 🔗 **Clear Traceability**  
  Each ticket has its own branch and commit history , easy to track and audit.

- 📦 **Focused Pull Requests**  
  PRs are smaller, more readable, and easier to review.

- 🔁 **Safer Rollbacks**  
  You can revert a specific branch without affecting unrelated work.

- ⚙️ **CI/CD Friendly**  
  Automate builds, tests, and deploys per branch.

---

## 🤔 The Problem: Ticket B Depends on Ticket A

You’ve pushed **Ticket A** to a PR. Now you want to work on **Ticket B**, which builds on top of A’s changes. What should you do?

---

## 🧩 Solution 1: Branch B from A

```bash
git checkout feature/ticket-a
git checkout -b feature/ticket-b
```

- This gives you all of A’s changes while you work on B.
- When A is merged, rebase B onto `main`.

```bash
git checkout feature/ticket-b
git rebase main
```

✅ **Use this when B is blocked without A.**  
📣 **In your PR, mention:** “Depends on PR #123 (Ticket A).”

---

## 🪄 Solution 2: Mock or Stub Ticket A

If A is an API or shared logic that’s not strictly needed yet, you can:

- Stub/mock the behavior in Ticket B.
- Work from `main` like usual.
- Integrate after A is merged.

✅ **Use this when A and B can be loosely decoupled.**

---

## 🧱 Solution 3: Shared Feature Branch (for Epics)

If A and B are part of a bigger feature, create a **feature base branch**:

```
feature/main-feature
├── feature/ticket-a
├── feature/ticket-b
```

You merge A and B into `main-feature`, and then merge that to `main`.

✅ **Use this for large epics or multiple related PRs.**  
⚠️ Adds complexity , not always worth it.

---

## 🧠 Pro Tips

- 📝 **Document dependencies** in PR descriptions.
- 🔗 **Link Jira tickets** so others can follow context.
- 🔄 **Rebase early and often** to avoid conflicts.
- 🧼 **Keep commits focused**: don’t mix A and B changes.

---

## 📌 Summary

| Situation                   | Best Action              |
| --------------------------- | ------------------------ |
| Ticket B **needs** A’s code | Branch B from A          |
| Ticket B can be **stubbed** | Work from `main`, stub A |
| A & B are part of **epic**  | Use feature branch       |

---

Sharing this practice in your team not only improves collaboration but also helps everyone write cleaner Git history and ship features faster 🚀
