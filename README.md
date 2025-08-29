# Async Race – Test Task

[**Deployed Application**](https://async-race-f18z.vercel.app/)  
**Score:**   400/400 pts  

---

## Checklist

### 🚀 UI Deployment
- [x] UI successfully deployed on GitHub Pages / Netlify / Vercel / Cloudflare Pages.

### ✅ Requirements to Commits and Repository
- [x] All commits follow Conventional Commits.
- [x] Checklist included in README.md.
- [x] Score calculated and displayed at top of README.md.
- [x] Deployment link added at top of README.md.

### Basic Structure (80 pts)
- [x] Two views implemented ("Garage" and "Winners").
- [x] Garage view content (Name of view, car creation/edit panel, race control panel, garage section).
- [x] Winners view content (Name of view, table, pagination).
- [x] Persistent state between views.

### Garage View (90 pts)
- [x] CRUD operations for cars (name, color, validation, deletion from winners).
- [x] Color picker works and displays color.
- [x] 100 random cars creation with random names/colors.
- [x] Car management buttons (update/delete) work.
- [x] Pagination for garage (7 per page).
- [x] Extra points: empty garage handling & page redirect.

### Winners View (50 pts)
- [x] Winners displayed correctly.
- [x] Pagination (10 per page).
- [x] Table includes №, image, name, wins, best time.
- [x] Sorting by wins & best time (asc/desc).

### Race (170 pts)
- [x] Start engine animation implemented with error handling.
- [x] Stop engine animation returns car to initial position.
- [x] Responsive animation (500px+ screens).
- [x] Start race button starts race for all cars.
- [x] Reset race button resets all cars.
- [x] Winner announcement displayed.
- [x] Buttons disabled/enabled according to car state.
- [x] Actions handled correctly during race (delete/edit/add, navigation, etc.).

### 🎨 Prettier & ESLint Configuration (10 pts)
- [x] Prettier configured with `format` and `ci:format`.
- [x] ESLint configured with Airbnb style guide and strict TypeScript settings.

### 🌟 Overall Code Quality (100 pts)
- [x] Modular design, small functions, no magic numbers, good readability.
- [x] Extra features: custom hooks, portals, React Router (optional).

---

## Project Setup

```bash
npm install
npm run dev

