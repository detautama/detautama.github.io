---
title: "GitHub Copilot + VS Code + Marp = Slide Presentations in Minutes"
date: "2025-10-05"
description: "Learn how to create slide presentations quickly using GitHub Copilot, VS Code, and Marp. This guide walks you through setting up the tools and leveraging AI to generate content, allowing you to focus on delivering ideas without the hassle of traditional slide design."
tag: "Copilot"
featured: true
---

## Introduction

Creating slide decks often feels time-consuming—choosing a template, writing bullet points, and adjusting layouts. But if the goal is simply to **deliver ideas quickly**, there’s a faster way: combine **GitHub Copilot + VS Code + Marp**.

With this setup, you can write slides directly in Markdown while letting **Copilot** handle auto-completions or even generate entire outlines through its agent. The result? Quick slides, focused on content, without the hassle of opening PowerPoint.

---

## What is Marp?

[Marp](https://marp.app/) is a framework that turns Markdown files into slide presentations.

A simple example:

```markdown
---
marp: true
---

# Slide Title

- First point
- Second point
```

Save the file as `.md`, render it with Marp, and you get clean, ready-to-present slides.

---

## GitHub Copilot in VS Code

Here’s where **Copilot** shines:

- While writing slides in Markdown, Copilot can **auto-complete bullet points**.
- You can prompt it: _“Create 3 points about why Proof of Concepts matter”_ → it generates content instantly.
- With **Copilot Chat/agent**, you can be even more interactive: _“Generate a 5-slide outline on React performance.”_

---

## Workflow: Building Slides with Copilot + Marp

1. **Set Up the Environment**

   - Install **VS Code**
   - Add the **Marp for VS Code** extension
   - Enable **GitHub Copilot**

2. **Start a New File**  
   Create `slides.md`:

   ```markdown
   ---
   marp: true
   theme: default
   ---

   # GitHub Copilot + Marp

   ## Creating Presentations the Easy Way
   ```

3. **Let Copilot Assist**

   - Type a slide heading, and let Copilot suggest bullet points.
   - Or ask **Copilot Chat** to generate the full presentation outline.

4. **Instant Preview**  
   Click **Marp: Preview** in VS Code → view your slides immediately.

---

## A Real Example

Suppose I want to explain _“Why Copilot Helps with Presentations.”_  
I just write the heading:

```markdown
# Why Copilot Helps
```

Copilot auto-suggests points like:

- Saves time creating outlines
- Suggests concise wording
- Offers additional ideas

Minimal editing, and the slide is presentation-ready.

---

## Closing Thoughts

The combo of **GitHub Copilot + VS Code + Marp** makes slide creation lightweight, fast, and content-driven. Perfect for:

- Tech talks
- Internal team meetings
- Sharing quick ideas

Instead of wrestling with slide design, you just **write in Markdown**. Marp handles the visuals, Copilot boosts the content.

---

👉 Next time you need to present, why not write your slides directly in VS Code?

---
