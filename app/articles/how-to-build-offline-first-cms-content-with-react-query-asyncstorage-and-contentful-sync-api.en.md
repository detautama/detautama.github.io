---
title: "How to Build Offline-First CMS Content with TanStack Query, AsyncStorage, and Contentful Sync API"
date: "2026-05-13"
description: "A practical offline-first pattern for React Native and Expo apps using Contentful, TanStack Query, AsyncStorage, and the Contentful Sync API."
tags: ["TanStack Query", "React Native", "Expo", "Contentful", "Offline First"]
featured: false
---

Many apps fetch CMS data on every launch.

That usually causes three problems:

- startup feels slower than it should
- offline users see broken or empty screens
- every refresh can cost more than necessary because it pulls full content again

The good news is: you do not need to choose between fast startup, offline support, and fresh CMS content.

You can get all three by combining:

- a bundled snapshot for first launch safety
- TanStack Query with AsyncStorage persistence for local reuse
- the Contentful Sync API for cheap change detection

This article shows a practical pattern for React Native and Expo apps that already use Contentful as a content source.

## The Problem with Fetching CMS Content on Every Launch

The default setup is simple: app opens, requests CMS content, waits, then renders.

That works until it does not.

If the network is slow, startup feels bad. If the user is offline, the screen may fail. If the content rarely changes, you still pay the cost of refetching everything again and again.

The worst case is a fresh install with no internet. There is no cache yet, so your UI has nothing to show.

This is where a layered offline-first strategy helps.

## The 3-Layer Fix

Each layer solves a different weakness.

### Layer 1: Bundled snapshot

Ship a JSON snapshot of your important CMS content inside the app bundle.

This gives you:

- safe first launch offline
- fast initial render
- a known minimum baseline

Think of this as emergency content that is always available.

### Layer 2: Persisted query cache

Use TanStack Query with AsyncStorage persistence.

This gives you:

- cached content after the first successful fetch
- fast reopen performance
- offline access to content the app has already loaded before

This handles the common case where the user has opened the app before and later returns with poor or no connectivity.

### Layer 3: Sync-based change detection

Use the Contentful Sync API to detect whether content changed since the last check.

This gives you:

- cheaper freshness checks
- fewer full refetches
- a simple way to know when your real content queries should refresh

This is the piece that keeps your app fresh without brute-force refetching everything on every app open.

## Why One Layer Is Not Enough

It is tempting to try only one caching trick, but each layer covers a different failure mode:

- snapshot solves "fresh install and offline"
- persisted cache solves "opened before and now offline"
- sync solves "how do I know when to refresh"

If you skip one, you keep one weak spot.

That is why this works best as a layered pattern, not a single tool.

## Recommended Data Flow

Here is a practical startup flow:

1. Restore the persisted TanStack Query cache.
2. Seed missing CMS queries from the bundled snapshot.
3. Render the UI immediately.
4. If online, let normal fetches run in the background.
5. On app foreground or reconnect, run Contentful sync.
6. If sync reports changes, invalidate content queries and refetch.

This feels fast because the UI has something to render right away.

It stays robust because it works even when the device is offline.

It stays fresh because change detection is separated from full data fetching.

## Seed TanStack Query from a Bundled Snapshot

For offline-first content, do not wait for a request just to populate the first screen.

Seed the query cache early when the query is empty.

```ts
import bundledContent from "@/cms/content-snapshot.json";
import { queryClient } from "@/lib/queryClient";

const CONTENT_QUERY_KEY = ["cms", "home", "en-US"];

export function seedBundledContent() {
  const existing = queryClient.getQueryData(CONTENT_QUERY_KEY);

  if (!existing) {
    queryClient.setQueryData(CONTENT_QUERY_KEY, bundledContent["en-US"]);
  }
}
```

This is more reliable than trying to fake the loading state later in the component tree.

It also works well with suspense-based queries.

## Important TanStack Query Detail: `useSuspenseQuery`

If you use `useSuspenseQuery`, do not build this pattern around `placeholderData`.

According to the TanStack Query docs, `useSuspenseQuery` supports the same options as `useQuery` except `throwOnError`, `enabled`, and `placeholderData`.

That detail matters because many examples online use `placeholderData` as a friendly fallback. For offline-first content, that can lead you in the wrong direction.

A safer pattern is:

- seed cache with `queryClient.setQueryData(...)`
- or use `initialData` where the shape is simple

This keeps your first render path predictable.

Reference: https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery

## Important Persistence Detail: Use `PersistQueryClientProvider`

If you persist TanStack Query with AsyncStorage, use `PersistQueryClientProvider`.

Why this matters:

- restoring persisted cache is async
- components can mount before restore finishes
- queries can fetch too early if the provider is not handling restoration correctly

TanStack Query documents this clearly: `PersistQueryClientProvider` makes sure queries do not start fetching while restoration is still happening.

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const queryClient = new QueryClient();

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
```

Without this, your app can behave like it has no cache even when valid cached data already exists.

Reference: https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient

## Use Contentful Sync as a Change Detector

This is the most important Contentful design choice in this pattern:

Use the Sync API as a change detector, not as your main app data source.

Why:

- your normal app queries may depend on linked entries
- the Sync API does not support `include`
- delta sync with `nextSyncToken` does not behave like a normal full linked-entry fetch

The Contentful JS docs note that the Sync endpoint does not support `include` or full link resolution for delta sync. That is a strong hint to keep sync logic small and focused.

So the safer flow is:

1. run sync
2. store `nextSyncToken`
3. detect whether entries or assets changed
4. invalidate root content queries
5. let your normal queries refetch in the usual shape

```ts
type SyncState = {
  nextSyncToken?: string;
};

export async function checkForCmsChanges(state: SyncState) {
  const response = await contentfulClient.sync(
    state.nextSyncToken
      ? { nextSyncToken: state.nextSyncToken }
      : { initial: true }
  );

  const hasChanges =
    response.entries.length > 0 ||
    response.assets.length > 0 ||
    response.deletedEntries.length > 0 ||
    response.deletedAssets.length > 0;

  await saveSyncState({
    nextSyncToken: response.nextSyncToken,
  });

  if (hasChanges) {
    queryClient.invalidateQueries({ queryKey: ["cms"] });
  }
}
```

This keeps your app logic simple. Sync decides whether to refresh. Your normal queries still decide how to fetch app-ready content.

References:

- https://contentful.github.io/contentful.js/contentful/latest/interfaces/ContentfulClientApi.html
- https://contentful.github.io/contentful.net-docs/articles/synchronization.html

## Locale Gotcha

Make sure your snapshot keys match your real app locale keys.

For example:

- good: `en-US`, `sv-SE`
- risky: `en`, `sv` when your app queries with full locale codes

This is easy to miss. The snapshot may exist, but your lookup still fails because the cache key and snapshot key do not line up.

When that happens, your fallback story looks broken even though the content is technically there.

## What to Cache and What Not to Cache

This pattern works well for:

- text
- metadata
- entry structure
- media URLs

Do not assume it fully solves offline access for:

- audio files
- video files
- images that were never loaded before

Image libraries often add their own caching. Audio and video usually need explicit download and file storage if you want true offline playback.

So this article is mainly about offline-first CMS data, not full offline media delivery.

## Testing Checklist

Test these cases on purpose:

1. Fresh install, offline
2. Online once, then offline restart
3. App reopen with restored cache
4. Content changed in Contentful
5. Repeated foreground events inside your throttle window
6. Cleared storage with no internet

Offline systems often fail in edge cases, not in the happy path.

## Practical Takeaway

The best offline-first CMS setup is not one big caching trick.

It is a layered strategy:

- bundle a safe baseline
- persist real fetched content
- use sync only to know when to refresh

This approach is simple to reason about, fast for users, and much safer than forcing one tool to do every job.

If your app already uses Contentful and TanStack Query, this pattern is a practical next step.
