---
title: "Maestro E2E Testing on a React Native Debug Build"
date: "2026-04-26"
description: "Most Maestro guides assume you're testing against a release build. But during active development, you naturally want to test against the debug build that's already running. Here's how to handle the Metro bundler dev menu overlay that can break your tests."
tags: ["Testing", "React Native", "E2E Testing", "Maestro"]
featured: false
---

Most Maestro guides assume you're testing against a **release build**. But during active development, compiling a release build for every iteration is slow. You naturally want to test against the **debug build** that's already running — Metro is live, hot reload works, and JS errors show up inline.

The catch: every time the debug app launches, the **Metro bundler dev menu** may appear as an overlay showing the bundler address (e.g. `http://192.168.1.10:8081`). If Maestro starts running commands while this overlay is visible, your taps land on the overlay instead of your actual UI — and the test fails in a confusing way.

## The Fix: A Conditional Dismiss Flow

Create a reusable file called `dismissDevMenu.yaml`:

```yaml
# Dismiss Metro bundler dev menu when running a debug build.
- runFlow:
    when:
      visible:
        text: ".*http://.*"
    commands:
      - tapOn:
          text: ".*http://.*"
      - tapOn:
          text: "Close"
          optional: true
          label: "Close dev menu if visible"
```

### How it works

**`when: visible: text: ".*http://.*"`**
A conditional guard — the block only runs if a visible element matches the regex. The Metro dev menu always shows the bundler URL, so this reliably detects it. On a release build, nothing matches and the block is skipped entirely. No side-effects.

**First `tapOn` — the bundler URL**
Taps the URL text (matched via `.*http://.*`) to interact with the overlay. The regex handles any host or port — `localhost`, LAN IP, custom Metro host — without hardcoding anything.

**Second `tapOn` — "Close"**
Taps the "Close" button that typically appears on the RN developer menu. `optional: true` means the test won't fail if the button isn't found — it's a best-effort cleanup. The `label` is just for readable test logs.

## Using It in Your Test Flows

Reference `dismissDevMenu.yaml` at the top of every test flow:

```yaml
appId: com.yourcompany.yourapp
---
# Step 1: always dismiss Metro dev menu if present.
- runFlow: dismissDevMenu.yaml

# Step 2: proceed with your actual test.
- tapOn: "Login"
- inputText: "user@example.com"
- tapOn: "Continue"
- assertVisible: "Welcome"
```

> **Tip:** If you have a global setup flow in `.maestro/config.yaml`, add the dismiss call there once and every test in the suite inherits it automatically.

## Running the Test

```bash
# Terminal 1 — start Metro
npx react-native start

# Terminal 2 — build and test
npx react-native run-android
maestro test loginFlow.yaml
```

## Debug vs Release — When to Use Which

|Aspect            |Release Build             |Debug Build                   |
|------------------|--------------------------|------------------------------|
|Build time        |Slow                      |Fast                          |
|Metro dev menu    |❌ Not present             |⚠ May appear — needs dismissal|
|Hot reload        |❌ No                      |✅ Yes                         |
|JS error overlay  |❌ No                      |✅ Red screen errors visible   |
|Good for CI       |✅ Best — production parity|⚠ Works with dismiss flow     |
|Good for local dev|❌ Slow iteration          |✅ Yes                         |

A practical workflow: **write and iterate tests locally** against a debug build, then run the same flow files against a **release build in CI**. Because the dismiss guard is conditional, it has zero effect on release builds — one set of test files, two environments, no changes needed.

## Summary

- Use `runFlow` with `when: visible` to conditionally detect the Metro overlay
- Match the bundler URL with regex `.*http://.*` — works for any host or port
- Tap through to close it, with `optional: true` on the "Close" step
- Include the helper at the top of every test flow, or once in a global setup config
