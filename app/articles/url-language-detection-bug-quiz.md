---
title: "🐞 Quiz: Spot the Bug – URL Language Detection"
date: "2025-06-24"
description: "A quiz-style article exploring a common bug in URL-based language detection and how to fix it."
tag: "JavaScript"
featured: false
---

When building multilingual websites, a common approach to detect the user’s language is by inspecting the URL. For example, you might check if the URL contains `"en"` to decide if the page is in English or some other language.

Here’s a simple JavaScript snippet that tries to do exactly that:

```js
if (window.location.href.includes("en")) {
  // Set language to English
} else {
  // Set language to Swedish
}
```

### The Scenario

Imagine your website has URLs structured like this:

- `https://example.com/en/about` (English page)
- `https://example.com/sv/about` (Swedish page)
- `https://example.com/customer-cases/vattenfall` (case study without language prefix)

At first glance, the condition looks fine — if the URL contains `"en"`, treat it as English. Otherwise, use Swedish.

### 🕵️‍♂️ Can you spot the bug?

The bug lies in the way the URL is checked with `.includes("en")`. This check looks for the substring `"en"` anywhere in the entire URL, not specifically in the language segment. This can lead to false positives.

#### What can go wrong?

- **False positives:** The word `"en"` can appear elsewhere in the URL, such as in the path or query parameters, unrelated to the language. For example:

  - `https://example.com/customer-cases/vattenfall`  
    The string `"en"` appears in `"vattenfall"`, so `.includes("en")` returns `true`, wrongly setting the language to English.

- **Incorrect language detection:** The site might mistakenly show content or UI elements in English on pages that are actually Swedish or neutral.

### How to fix it?

Instead of searching for `"en"` anywhere in the URL, restrict the check to the part of the URL that actually specifies the language — usually the first path segment.

Here’s an improved approach:

```js
const pathSegments = window.location.pathname.split("/");
const lang = pathSegments[1]; // first path segment after the domain

if (lang === "en") {
  // Set language to English
} else if (lang === "sv") {
  // Set language to Swedish
} else {
  // Default language or fallback
}
```

### Why is this better?

- **Precise detection:** It explicitly looks at the first path segment, where the language code should be.
- **Avoids false positives:** It won’t mistake parts of other words or parameters for language codes.
- **Easily extensible:** You can add more languages just by checking for different codes.

---

### Summary

Checking for substrings like `"en"` anywhere in the URL is a common but fragile approach to language detection. Always narrow down your checks to the specific URL segment responsible for the language to avoid bugs.

Did you spot the bug quickly? Let me know in the comments!
