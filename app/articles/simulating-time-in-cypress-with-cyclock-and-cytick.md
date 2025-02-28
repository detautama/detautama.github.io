---
title: "Simulating Time in Cypress with cy.clock and cy.tick"
date: "2025-03-01"
description: "When writing Cypress tests, there are scenarios where you need to manipulate time. For example, testing session expiration or scheduled UI updates requires control over time progression. This is where `cy.clock()` and `cy.tick()` come in handy."
tag: "Cypress"
featured: false
---

When writing Cypress tests, there are scenarios where you need to manipulate time. For example, testing session expiration or scheduled UI updates requires control over time progression. This is where `cy.clock()` and `cy.tick()` come in handy.

## Controlling Time with cy.clock()

`cy.clock()` overrides the browser's native time functions like `Date`, `setTimeout`, `setInterval`, and `clearTimeout`. This allows you to freeze time at a specific point and manipulate it as needed.

Example:

```js
cy.clock(new Date()); // Freezes the time at the current moment
```

## Fast-forwarding Time with cy.tick()

Once the clock is controlled, you can use `cy.tick()` to move time forward artificially. This is useful for testing delays, timeouts, or token expiration scenarios.

Example:

```js
describe("User session expiration", () => {
  it("logs out user after token expiration", () => {
    cy.visit("/auth/sign-in");

    // Simulate user login
    cy.get('[data-testid="loginButton"]').click();
    cy.getCookie("authToken").should("exist");

    cy.clock();
    // Fast-forward 30 minutes
    cy.tick(1000 * 60 * 30);

    // Attempt to navigate and verify user is logged out
    cy.visit("/dashboard");
    cy.url().should("include", "/auth/sign-in");
  });
});
```

## When to Use cy.clock() and cy.tick()

- Testing session expiration
- Simulating time-based UI changes (e.g., countdowns, auto-refresh)
- Validating delays without slowing down tests

Using `cy.clock()` and `cy.tick()` helps create reliable and fast tests by eliminating unpredictable delays and ensuring time-based logic is properly verified.
