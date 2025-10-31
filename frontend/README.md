```markdown
# Frontend — LawEase

This directory contains the React frontend built with Vite and Tailwind CSS. The app provides the user-facing UI for LawEase (landing pages, authentication, dashboard, and chatbot).

## Quick start (frontend)

Prerequisites
- Node.js v18+ and npm

Install dependencies

```powershell
cd frontend
npm install
```

Run development server

```powershell
npm run dev
```

Build for production

```powershell
npm run build
```

Lint

```powershell
npm run lint
```

## Environment variables

Create a `frontend/.env` file and add required Vite environment variables (example):

```
VITE_GEMINI_API_KEY=your_google_genai_api_key
```

Security note: Variables prefixed with `VITE_` are embedded in the client bundle and therefore public. Keep secrets on the backend.

## Scripts
- `dev` — start Vite dev server
- `build` — production build
- `preview` — preview production build
- `lint` — run ESLint

## Notes
- The theme is controlled by `ThemeContext` and CSS variables in `src/index.css`. The footer uses those variables to match theme colors.
- If you add new environment variables, restart the dev server to pick them up.

```
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
