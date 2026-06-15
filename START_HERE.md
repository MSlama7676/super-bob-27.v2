# Super Bob's 27 — Getting Started

## What is this?

A full-featured darts training game based on Bob's 27 rules.  
Built with React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui.

---

## Requirements

- **Node.js** 18 or newer (20+ recommended) — https://nodejs.org
- **npm** 9+ (comes with Node) OR **pnpm** 9+

---

## Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Serve with:

```bash
npm run preview
```

---

## Type Check

```bash
npm run typecheck
```

---

## Entry Points

| File | Purpose |
|------|---------|
| `index.html` | HTML shell, loads `src/main.tsx` |
| `src/main.tsx` | React root render |
| `src/App.tsx` | Screen router (SETUP → GAME → END) |
| `src/lib/gameLogic.ts` | All game rules & bot AI |

---

## Game Screens

1. **SetupScreen** — choose mode, name, Classic/Pro, target version (D20→DB), rules CZ/EN
2. **GameScreen** — 3 darts per round, entry → double → optional bull
3. **MatchManager** — alternates rounds for 2P and VS BOT modes
4. **BotRoundDisplay** — animated bot throw with auto-advance
5. **EndScreen** — score, success rate, best score (localStorage)

---

## Notes

- No backend or database — everything runs in the browser.
- Best score is stored in `localStorage` under key `superBob27_bestScore`.
- Tailwind CSS v4 is used via `@tailwindcss/vite` plugin — no `tailwind.config.ts` needed.
- shadcn/ui components are in `src/components/ui/`.
