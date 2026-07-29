---
title: "Automating My Morning Work Ritual with a Claude Skill"
date: "2026-07-29"
description: "The story of building a single Claude Skill to compress my morning work ritual—Teams, Forecast, Outlook, Gmail, the sprint board, all the way to standup—into one connected flow."
tags: ["Claude", "Automation", "Productivity", "Workflow"]
featured: false
image: "/images/home/gunung-sunrise-morning-card.webp"
---

Every work morning, there's a sequence of things I always check before I actually start working: Teams, Forecast, Outlook, Gmail, the Azure DevOps sprint board, then logging all of it into TickTick, and finally putting together standup. It sounds simple, but doing it one step at a time every morning eats up time, and more often than not, something gets missed.

So I tried compressing all of those steps into a single Claude skill, called `rutinitas-pagi-lengkap` ("full-morning-routine").

## The Problem I Wanted to Solve

Before this existed, the flow looked roughly like this every morning:

- Open Teams, scroll to find unread messages and check the calendar
- Open Forecast, check which projects are assigned this week
- Open Outlook, read PR notification emails one by one, decide which need a review versus a follow-up
- Open Gmail, check the inbox
- Open Azure DevOps, check the sprint board
- Manually enter all of those findings into TickTick
- Finally put together standup from memory of what I worked on yesterday

The weak point was that last step. If the earlier steps weren't tidy, standup turned into scrambled last-minute thinking, and sometimes a task got logged twice or missed entirely.

## How It Works

I wrote this skill as a single structured instruction file that Claude reads as soon as I say "check morning" or "morning routine." It contains eight steps:

1. Microsoft Teams — check unread messages and today's calendar
2. Report clock-out time to WhatsApp, automatically calculated from clock-in time and the meetings on the calendar
3. Forecast — check which projects are assigned and how many hours are allocated
4. Outlook — triage PR notification emails: which need a review, which are follow-ups on my own PRs, which are already approved and just need merging
5. Gmail — summarize unread messages
6. Azure DevOps — check the sprint board, filter items assigned to me that are still active
7. TickTick — everything found above becomes a task, tagged by its originating project, so it can serve as a single hub
8. Daily Standup — an automatic draft built from TickTick data, ready to paste into Google Chat

Technically, all access to Teams/Outlook/Gmail/Forecast/Azure DevOps/WhatsApp/Google Chat happens through Claude in Chrome, a browser automation extension, not through official API integrations and not through desktop apps. The one exception is TickTick, which uses an official connection via its MCP connector.

As for the trigger itself, I run it from "Cowork" mode in Claude Desktop, not the regular "Chat" mode. The reason: this routine involves many steps and many sequential tool calls (browser automation across several web apps plus MCP calls to TickTick), so it fits better as a multi-step task whose progress can be monitored, rather than a one-way chat.

## A Few Things I Learned Along the Way

Small details can make a mess of things. For example, TickTick has a bug where typing `#tag` and then closing it with Escape turns it into plain text instead of an actual tag. If it isn't verified one by one, tasks end up not filtering correctly. Details like this are what made the skill thicker than expected at the start, since every edge case found got documented immediately.

## What the Skill Looks Like

To make this less abstract, here's a simplified excerpt of the skill file's structure (some personal details redacted):

```markdown
---
name: "rutinitas-pagi-lengkap"
description: "Run the morning work routine: check Microsoft Teams (unread +
calendar), check Forecast (project assignment), triage Azure DevOps
notifications in Outlook (PR, comment, ticket status), check Gmail, check
the Azure DevOps sprint board, log tasks into TickTick, and prepare the
Daily Standup for Google Chat. Use when the user asks for 'check morning',
'morning routine', 'standup'."
---

# Morning Routine Prompt

**Account & tools context:**
- All tool access MUST use the Claude in Chrome extension, NOT the desktop app.
- Reference timezone: WITA (UTC+8)

## 1. Check Microsoft Teams
- Open Teams, Chat tab, filter "Unread"
- Check today's Calendar, report title + meeting time

## 2. Check Forecast
- Find my own name row, view hour allocation per project

## 3. Check Outlook (triage)
- Categorize notifications into: Review, Follow-up, Approved
- Confirm the final list before moving to the next step

...

## Global Rules
- Never permanently delete emails/messages, even if asked
- Confirm before bulk-creating records
- Response language: Indonesian
```

The pattern I use is consistent across all my skills: a frontmatter section (`name` + `description`, which is what Claude uses to decide when this skill is relevant), then numbered steps, and ending with "Global Rules" that apply across every step, such as a ban on permanently deleting data and a requirement to confirm before any impactful action (sending messages, bulk-creating tasks, etc). These global rules matter precisely because they're a safeguard, not just a matter of efficiency.

## Why I Wrote This

This is a personal workflow story that might be relevant to anyone with a recurring morning ritual who wants to reduce the friction inside it, whatever their tool stack is. If anyone's curious about the setup details or wants to try building their own version, feel free to reach out.
