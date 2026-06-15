# Super Bob's 27 — Project Structure

```
super-bobs-27/
├── public/
│   ├── favicon.svg
│   ├── opengraph.jpg
│   └── robots.txt
├── src/
│   ├── App.tsx                          # Root component — screen router (SETUP/SOLO_GAME/MATCH/END)
│   ├── main.tsx                         # React entry point
│   ├── index.css                        # Tailwind v4 + CSS variables (dark theme)
│   ├── components/
│   │   ├── game/
│   │   │   ├── SetupScreen.tsx          # Start screen — mode, names, game settings, rules CZ/EN
│   │   │   ├── GameScreen.tsx           # Single-player round UI — darts, score, NEXT ROUND
│   │   │   ├── MatchManager.tsx         # Orchestrates 2P / VS BOT alternating rounds
│   │   │   ├── BotRoundDisplay.tsx      # Animated bot throw sequence
│   │   │   ├── EndScreen.tsx            # Game over / results / best score
│   │   │   └── BotGameScreen.tsx        # (legacy, unused)
│   │   └── ui/                          # shadcn/ui components (Radix-based)
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       └── ... (all other shadcn components)
│   ├── hooks/
│   │   ├── use-toast.ts                 # Toast state management
│   │   └── use-mobile.tsx               # Mobile breakpoint hook
│   ├── lib/
│   │   ├── gameLogic.ts                 # All game types, bot AI, simulateBotGame()
│   │   └── utils.ts                     # cn() utility (clsx + tailwind-merge)
│   └── pages/
│       └── not-found.tsx                # 404 page
├── index.html                           # HTML entry point
├── package.json                         # Dependencies
├── tsconfig.json                        # TypeScript config
├── vite.config.ts                       # Vite config (local dev)
├── components.json                      # shadcn/ui config
├── START_HERE.md                        # Getting started guide
└── PROJECT_STRUCTURE.md                 # This file
```

## Key Architecture

- **Pure frontend** — no backend, no database. All state in React + `localStorage` (best score).
- **Game flow**: `App.tsx` routes between 4 screens via `screen` state.
- **1 Player**: `GameScreen` handles full 21-round game directly.
- **2 Players / VS BOT**: `MatchManager` alternates rounds; bot rounds pre-computed via `simulateBotGame()`.
- **Scoring**: Single entry = entry only; Triple/Double entry = pending bonus, confirmed only if double hit same round.
- **Bot AI**: 8 PDC-style levels in `BOT_LEVELS[]` with probability tables.
