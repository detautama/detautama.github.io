---
title: "What I Learned Using Sanity Across Two Client Projects"
date: "2026-07-03"
description: "Notes from two bilingual company profile sites I built with Sanity and Next.js — localized fields, webhook-driven revalidation, live preview, and the habit of auditing your schema."
tags: ["Sanity", "CMS", "Next.js", "Headless CMS"]
featured: false
---

**Two projects, one CMS.**

Over the past few months I worked on two different company profile projects, let's call them Project A and Project B.

Different clients, different content, different editorial teams.

But one thing was the same: both were bilingual, and both were built with Sanity as the CMS, paired with Next.js.

Because the shape of the problem was so similar, I got to see which patterns actually held up across projects, and which ones just happened to fit one project by coincidence.

---

**Why Sanity, not something else.**

The initial reason was simple: the Studio is code, not a dashboard configuration.

Schemas are defined in TypeScript, reviewed like regular code, diffable in a pull request.

Add GROQ for querying, and the Live Content API for live preview without a manual refresh.

For a project with reasonably structured content — not just a plain blog — that fit well.

---

**The bilingual problem, solved at the field level.**

At first I thought about creating two separate documents per language.

That turned out to make it easy for editors to forget updating one of them, and cross-document references became double work.

The fix: one bilingual field, storing an object.

```json
{
  "lang1": "First language text",
  "lang2": "Second language text"
}
```

In both projects I built a handful of reusable types for this: `localeString`, `localeText`, `localeStringArray`, `localeTextArray`.

The Studio got an edit-mode toggle: Language 1, Language 2, or Both, plus small completion badges to flag which fields were still empty.

One document, one slug, two languages living on the same field.

Much cleaner than two documents that need to be manually kept in sync.

---

**CMS updates, pages refresh themselves.**

This is the part that mattered most for non-developers.

An editor updates content in the Studio, and without a rebuild, the relevant pages refresh on production.

The flow looks roughly like this:

```text
Editor updates content in Sanity
        ↓
Sanity sends a signed webhook to Next.js
        ↓
Next.js verifies the webhook signature
        ↓
Next.js calls revalidateTag() / revalidatePath()
        ↓
Only the affected pages/data get regenerated
```

What makes this actually work: the cache tags have to stay consistent across three places at once — the data loader in code, the mapping in the revalidate route, and the document type filter on the Sanity webhook.

If one of those falls out of sync when a new document type is added, the webhook still fires, but nothing actually gets invalidated.

I got bitten by this once — added a new content type but forgot to update the webhook filter. The content was published, but the page kept showing the old version. I only noticed when an editor asked why their changes weren't showing up.

---

**Live preview, so editors don't have to guess.**

Before publishing, editors can see their draft rendered directly on the page, through Sanity's built-in Presentation Tool.

This matters a lot for non-technical editors. They don't have to imagine what the final result will look like, they just see it.

The effect: shorter revision cycles. No more back-and-forth of "so what will this actually look like".

---

**A habit that turned out to matter: auditing the schema regularly.**

A CMS schema accumulates unused fields fast, especially once a project has been running for a while and requirements keep shifting.

I slowly built a habit of checking a field from three angles before deciding to keep or remove it:

1. Is the field still defined in the schema?
2. Is the field projected in a GROQ query?
3. Is the query result actually used in a component, metadata, or the sitemap?

If a field only shows up at step one — defined in the schema, but never queried and never used — that's a strong candidate for removal, or at least marking as `deprecated`.

A real example I ran into: a field controlling mobile card height, and a field controlling video aspect ratio.

Both made sense when they were first added, but they turned out to be layout concerns, not content. CSS (`aspect-ratio`, `min-height` that adapts to content) handled it just fine, no CMS value needed.

Now, every time I add a new field, I ask first: is this content an editor genuinely needs to change, or is it actually a design decision that belongs in code?

---

**A sharper lesson: don't put sensitive config in the CMS.**

While auditing one of the projects, I found a form ID and portal ID for a third-party marketing tool stored as a Sanity field, sent to the client, and then used by the API only as a fallback when the environment variable was empty.

Looked convenient at first. But it meant that if the CMS or the client payload changed, form submissions could end up routed to the wrong portal or form.

It all got moved to server-only environment variables. The CMS doesn't need to know it, and the client never receives that value at all.

The lesson: a CMS is for content editors manage, not a place to store configuration that's really an infrastructure or security concern.

---

**Singleton vs collection, a mental model that helps a lot.**

In both projects, I consistently separated two document patterns:

- **Collection** — many documents can exist, like articles, customer cases, team members.
- **Singleton** — exactly one document exists, like the Home Page or Global Site Settings.

Sounds obvious, but once it's clear from the start, other decisions get easier. Singletons usually have a wider blast radius when they change — which is why a change there deserves invalidating a whole layout, not just a single path.

---

**Closing thoughts.**

Sanity earns its keep the most on projects with structured content, a genuine need for bilingual support, and editors who aren't developers.

The upfront setup — schema, GROQ queries, revalidation, webhooks — isn't instant.

But once it's all wired up, editors can update content on their own without waiting on a deploy, and I stop being the only person who can change a line of text on a page.

And that schema-auditing habit turned out to be about more than just tidying up code.

It's also a way of checking: is this field genuinely used, or just an old idea nobody got around to throwing away.
