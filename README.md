# Hacker News Reader

A Hacker News client that lets you browse the latest stories, read comments, and expand reply threads — built with React, TypeScript, Redux Toolkit, and React Router v6.

## Features

- Displays the 20 newest stories with score, author, and comment count
- Auto-refreshes the story list every 60 seconds
- Navigates to a story detail page with comments
- Expand/collapse replies per comment (fetched on demand, cached after first load)
- Refresh comments button to pull the latest thread
- Responsive layout with sticky header

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI |
| TypeScript | Static typing throughout |
| Redux Toolkit | Global state (news feed, story data, comments) |
| React Router v6 | Client-side routing with nested layouts |
| Vite | Dev server and bundler |
| Hacker News Firebase API | Live data source |

## Getting Started

```bash
npm install
npm run dev
```

Vite will print the local URL in the terminal once the server starts.

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # App shell — sticky header, page wrapper
│   ├── StoryPage.tsx       # Story detail + comments page
│   └── CommentsBlock.tsx   # Comment list with per-comment reply toggle
├── state/
│   ├── newsIds/            # Slice: fetches top 20 story IDs
│   ├── newsList/           # Slice: fetches story data for each ID
│   ├── commentsList/       # Slice: fetches top-level comments
│   └── refreshData/        # Slices: refresh story + comments on demand
├── helpers/
│   ├── fetchCommentsHelper.ts  # Fetch wrapper for HN API items
│   ├── dateHelper.ts           # Unix timestamp → readable date
│   └── decodeHelper.ts         # HTML entity decoding for comment text
└── types.ts                # Shared TypeScript interfaces
```

## Design decisions

- Reply state lives in each `CommentItem` component (local `useState`) rather than Redux, since it's purely UI-local and does not need to be shared across the tree.
- Comments are fetched in parallel with `Promise.all` to minimize wait time.
- The auto-refresh interval uses `useCallback` so the effect dependency is stable and the interval is not recreated on every render.
