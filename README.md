\# ⚡ KRONOS: AI-Powered Productivity \& Proposal Management Platform



KRONOS is a modern, full-stack SaaS solution designed to streamline client acquisition, social content generation, and proposal writing across platforms. With a sleek React frontend and a powerful Flask backend, KRONOS brings automation, insight, and elegance into a single workspace.



---



\## 📐 Features



\### 🔐 Authentication

\- User registration, login, and logout

\- Session-based token handling



\### 📣 Social Media Automation

\- Connect multiple social media accounts (mock)

\- Generate AI-powered captions and hashtags

\- Schedule posts with metadata



\### 💼 Freelance Proposals

\- Connect to freelance platforms (mock)

\- Fetch job listings

\- Generate proposals using AI for specific job IDs



---



\## 🛠️ Technology Stack



| Layer           | Tools                                |

|----------------|---------------------------------------|

| Frontend       | React, JavaScript, CSS Modules        |

| Backend        | Flask, SQLAlchemy, Flask-CORS         |

| AI Integration | Placeholder logic (GPT simulated)     |

| Deployment     | Vercel/Netlify (frontend), Heroku/Render (backend) |

| Database       | SQLite (dev), PostgreSQL (production) |

| Auth           | Token-based (Bearer authentication)   |



---



\## 🔃 API Endpoints



\### Authentication

\- `POST /api/register` – Create a new account

\- `POST /api/login` – Authenticate \& return token

\- `POST /api/logout` – End user session



\### Social Media

\- `GET /api/social/accounts` – List connected accounts

\- `POST /api/social/connect` – Simulate connection

\- `POST /api/social/generate-content` – Generate captions/hashtags

\- `POST /api/social/schedule` – Schedule a post



\### Proposals

\- `GET /api/proposals/platforms` – List freelance platforms

\- `POST /api/proposals/connect-platform` – Simulate platform connection

\- `GET /api/proposals/find-jobs` – Fetch mock jobs

\- `POST /api/proposals/generate` – Generate proposal for a job



---



\## ⚙️ Getting Started



\### 🔧 Local Setup



\*\*Backend Setup\*\*

```bash

cd backend

pip install -r requirements.txt

python app.py

