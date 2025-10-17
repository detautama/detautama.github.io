---
title: "Conditional Rendering: Keep It Inside the Component"
date: "2025-05-11"
description: "Best practice for placing conditional rendering logic within React components using context or internal state."
tags: ["React", "Best Practices", "Clean Code"]
featured: false
---

When building React applications, a recurring question is:

> Should I conditionally render a component from the parent or within the component itself?

The answer lies in React's core principle: **place logic where the state lives**.

### Real-World Example: Notification Banner

Let’s say you want to show a notification when there's a new message. You use context to track notification state.

### ✅ Correct Approach: Let the Child Handle It

```jsx
// NotificationBanner.js
import React, { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

const NotificationBanner = () => {
  const { hasNewNotification, message } = useContext(NotificationContext);

  if (!hasNewNotification) return null;

  return (
    <div className="rounded bg-yellow-100 p-4 shadow">
      <strong>New Notification:</strong> {message}
    </div>
  );
};

export default NotificationBanner;
```

```jsx
// Dashboard.js
import NotificationBanner from "./NotificationBanner";

const Dashboard = () => (
  <div>
    <NotificationBanner />
    {/* Other dashboard content */}
  </div>
);
```

Why this works well:

- The component owns the logic of when to show/hide itself.
- The parent stays clean and agnostic to the inner behavior.
- Easier to reuse and reason about the component.

---

### ❌ Less Ideal: Parent Handles the Logic

```jsx
// Dashboard.js
import NotificationBanner from "./NotificationBanner";
import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

const Dashboard = () => {
  const { hasNewNotification, message } = useContext(NotificationContext);

  return (
    <div>
      {hasNewNotification && <NotificationBanner message={message} />}
      {/* Other dashboard content */}
    </div>
  );
};
```

Downside: the parent has to understand logic that belongs to the child, reducing modularity and reusability.

---

### 🔚 Conclusion

- Keep conditional rendering inside the component if it depends on internal or context-driven state.
- This makes your React components more maintainable, modular, and aligned with idiomatic best practices.
