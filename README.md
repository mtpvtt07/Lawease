# LawEase

A huge percentage of rural residents in India face a significant, often overlooked challenge: dealing with legal issues in their daily lives, professional spheres, and communities. Often, they lack awareness of the legal solutions available. To address this, we've created a user-friendly platform to help them navigate these complexities.

## Project Overview
LawEase is designed to make legal information and solutions accessible to everyone, especially those in rural areas. Our platform categorizes legal problems into clear sections and subcategories, making information easy to find. We present relevant laws and legal firms in simple language, including regional languages, and provide video summaries for further clarity. Additionally, we connect users with lawyers for personalized advice and recommendations.

## Features
- **Categorized Legal Problems:** Legal issues are organized into clear sections and subcategories for easy navigation.
- **Simple Language:** All information is presented in easy-to-understand language, with support for regional languages.
- **Video Summaries:** Key legal topics and solutions are explained through short, informative videos.
- **Lawyer Connect:** Users can connect with lawyers for personalized advice and recommendations.
- **Legal Firm Listings:** Find and contact legal firms relevant to your needs.

## Tech Stack
LawEase is built using the MERN stack:
- **MongoDB:** Database for storing user, lawyer, and legal information.
# LawEase

Make legal information accessible, understandable and actionable — with a focus on underserved rural communities.

## Table of contents
- About
- Key features
- Tech stack
- Quickstart (run locally)
- Project structure
- Development notes
- Contributing
- License & Code of conduct
- Contact

## About
LawEase is a platform that helps people discover legal solutions to everyday problems. It organizes legal problems into categories and subcategories, explains laws in simple language (including regional languages), includes short video summaries, and connects users to legal professionals.

The project aims to reduce friction for users in rural areas who may not have easy access to legal advice.

## Key features
- Categorized legal topics and subtopics for easy discovery
- Simple-language explanations and regional language support
- Short video summaries for selected topics
- Lawyer / legal-firm directory and contact flow
- Authentication, user dashboards and saved resources
- Chat-bot helpers and FAQs

## Tech stack
- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: (JWT / session - depends on implementation)
- Optional: Payment gateway for lawyer consultations

> Note: This repository contains the frontend under `frontend/`. If you also maintain a backend, it should live under `backend/`.

## Quickstart (development)
These steps assume you have Node.js and npm installed.

1. Clone the repo

```powershell
git clone https://github.com/echoAbhinav/LawEase.git
cd LaweaseFork
```

2. Frontend (local dev)

```powershell
cd frontend
npm install
npm run dev
```

3. Backend (if present)

```powershell
cd backend
npm install
npm start
```

Open the frontend URL printed by Vite (usually http://localhost:5173).

## Project structure (important folders)
- `frontend/` — React app (Vite). Key files:
  - `src/main.jsx` — app entry
  - `src/App.jsx` — root component
  - `src/pages/` — page components (Landing, Login, Signup, Main)
  - `src/components/` — reusable UI pieces (Navbar, HeroSection, Dashboard widgets)

Other expected folders (if present):
- `backend/` — Node/Express server
- `scripts/`, `docs/`, or `infra/` — optional support files

## Development notes
- Keep UI components small and focused.
- Store API URL and secrets in environment variables (use `.env` locally; never commit secrets).
- Follow the existing linting rules in `frontend/eslint.config.js`.
- Use the existing `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` for contribution rules.

## Contributing
Contributions are very welcome. A suggested workflow:

1. Open an issue to discuss larger changes.
2. Create a branch: `git checkout -b feat/short-description`.
3. Run tests / lint and add unit tests for new logic where appropriate.
4. Open a pull request describing the change.

See `CONTRIBUTING.md` for more detail.

## License & Code of conduct
This repository includes `CODE_OF_CONDUCT.md` and `CONTRIBUTING.md`. Add a LICENSE file if one is missing.

## Contact
If you have questions or need help, open an issue on GitHub or reach out to the maintainers through the repository.

---

Thanks for improving access to legal help. If you want, I can also:
- Add a short screenshot or GIF to the README
- Add a minimal `frontend/README.md` with frontend-specific commands
- Create a small dev script to start frontend + backend together

If you'd like any of those, tell me which and I'll add them.
Open the frontend URL printed by Vite (usually http://localhost:5173).

