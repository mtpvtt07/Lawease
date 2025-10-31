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

# LawEase

LawEase is an open-source platform that helps make legal information accessible, understandable, and actionable — with a focus on underserved and rural communities in India.

This repository houses the frontend (React + Vite) and the backend (Node.js + Express) used to power the platform. The project provides categorized legal content, multilingual support, video summaries, and connections to legal professionals.

## Table of Contents
- Project overview
- Features
- Architecture & tech stack
- Quick start (local development)
- Environment variables
- Folder structure
- Testing & linting
- Contributing
- License & Code of Conduct
- Maintainers & contact

## Project overview

LawEase organizes legal topics into discoverable categories, delivers concise legal explanations in plain language, supports multiple regional languages, and connects users to verified legal professionals.

The aim is to reduce friction for users who lack easy access to legal advice and to provide a trustworthy first-stop resource for common legal questions.

## Features

- Categorized legal topics and subtopics for easy discovery
- Concise legal explanations in simple English (with regional language support)
- Short video summaries for select topics
- Lawyer / legal-firm directory and contact flow
- OTP-based authentication and user dashboard
- Chatbot helpers and FAQs

## Architecture & tech stack

- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Auth: JWT / OTP
- Styling: Tailwind CSS + custom CSS variables

## Quick start (development)

Prerequisites
- Node.js v18+ and npm
- MongoDB (local or hosted)

Clone the repository

```powershell
git clone https://github.com/echoAbhinav/Laweasefork.git
cd LaweaseFork
```

Start frontend

```powershell
cd frontend
npm install
npm run dev
```

Start backend (optional)

```powershell
cd backend
npm install
npm run dev
```

Open the frontend URL printed by Vite (default: http://localhost:5173 or another port if occupied).

## Environment variables

Create `.env` files in the frontend and backend directories (do not commit them). Example keys:

Frontend (`frontend/.env`)
- VITE_GEMINI_API_KEY=your_google_genai_api_key

Backend (`backend/.env`)
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- FAST2SMS_API_KEY=your_fast2sms_key

Security note: Vite variables beginning with `VITE_` are embedded in the client bundle and are publicly visible. Do not store private secrets in the frontend; route private API calls through the backend.

## Folder structure

High-level layout:

```
.
├── frontend/        # React + Vite app
├── backend/         # Node.js + Express API
├── README.md        # This file
├── CONTRIBUTING.md
└── CODE_OF_CONDUCT.md
```

Frontend key files
- `src/App.jsx` — router and global layout
- `src/pages/` — page-level components
- `src/components/` — reusable UI components

Backend key files
- `src/app.js` — express app and middleware
- `src/index.js` — server entry point
- `src/controllers/`, `src/models/`, `src/routes/` — API implementation

## Testing & linting

- Frontend scripts are in `frontend/package.json` (dev, build, lint, preview).
- Backend scripts are in `backend/package.json` (start, dev).

Run linting

```powershell
cd frontend
npm run lint
```

Run production build

```powershell
cd frontend
npm run build
```

## Contributing

Contributions are welcome. Recommended workflow:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/short-description`
3. Implement changes, add tests where applicable
4. Run lint/build locally
5. Open a pull request against `mtpvtt07/Lawease:main` with a clear description

Please follow the `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` included in the repository.

## License & Code of Conduct

This project includes `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` in the repo. Add or review `LICENSE` if required by your organization.

## Maintainers & contact

If you need help, open an issue or contact the maintainers via the repository.

---

Thank you for contributing to LawEase — improving access to legal help makes a tangible difference in people’s lives.

