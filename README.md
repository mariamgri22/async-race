# Async Race – Test Task

**Deployed Application:**  
**Score:**   /400 pts  

---

## Checklist

### 🚀 UI Deployment
- [ ] UI successfully deployed on GitHub Pages / Netlify / Vercel / Cloudflare Pages.

### ✅ Requirements to Commits and Repository
- [ ] All commits follow Conventional Commits.
- [ ] Checklist included in README.md.
- [ ] Score calculated and displayed at top of README.md.
- [ ] Deployment link added at top of README.md.

### Basic Structure (80 pts)
- [ ] Two views implemented ("Garage" and "Winners").
- [ ] Garage view content (Name of view, car creation/edit panel, race control panel, garage section).
- [ ] Winners view content (Name of view, table, pagination).
- [ ] Persistent state between views.

### Garage View (90 pts)
- [ ] CRUD operations for cars (name, color, validation, deletion from winners).
- [ ] Color picker works and displays color.
- [ ] 100 random cars creation with random names/colors.
- [ ] Car management buttons (update/delete) work.
- [ ] Pagination for garage (7 per page).
- [ ] Extra points: empty garage handling & page redirect.

### Winners View (50 pts)
- [ ] Winners displayed correctly.
- [ ] Pagination (10 per page).
- [ ] Table includes №, image, name, wins, best time.
- [ ] Sorting by wins & best time (asc/desc).

### Race (170 pts)
- [ ] Start engine animation implemented with error handling.
- [ ] Stop engine animation returns car to initial position.
- [ ] Responsive animation (500px+ screens).
- [ ] Start race button starts race for all cars.
- [ ] Reset race button resets all cars.
- [ ] Winner announcement displayed.
- [ ] Buttons disabled/enabled according to car state.
- [ ] Actions handled correctly during race (delete/edit/add, navigation, etc.).

### 🎨 Prettier & ESLint Configuration (10 pts)
- [ ] Prettier configured with `format` and `ci:format`.
- [ ] ESLint configured with Airbnb style guide and strict TypeScript settings.

### 🌟 Overall Code Quality (100 pts)
- [ ] Modular design, small functions, no magic numbers, good readability.
- [ ] Extra features: custom hooks, portals, React Router (optional).

---

## Project Setup

```bash
npm install
npm run dev

