<!-- README.md -->
# ⚡️ KRONOS AI Assistant

Kronos is a modern, full-stack productivity & proposal management platform.  
It consists of:

- **Backend**: Flask API (`/backend`)  
- **Frontend**: React + Tailwind UI (`/frontend`)  
- **Desktop**: Electron shell wrapping the React app

---

## 🗂️ Project Structure


kronos-assistant/ ├─ backend/               # Flask API │  ├─ app.py │  ├─ requirements.txt │  └─ ... ├─ frontend/              # React app (Create-React-App + Tailwind) │  ├─ public/ │  ├─ src/ │  ├─ package.json │  └─ ... ├─ main.js                # Electron entrypoint ├─ package.json           # Monorepo + Electron config ├─ tailwind.config.js ├─ postcss.config.js ├─ README.md └─ .gitignore

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later  
- Python 3.10 or later  
- npm (or Yarn)

### 1. Clone & Install Root

```bash
git clone https://github.com/SufianAtDevX/kronos-assistant.git
cd kronos-assistant
npm install


2. Backend Setup (Flask)
cd backend
python -m venv venv
# On Git Bash:
source venv/Scripts/activate
# On PowerShell:
# .\venv\Scripts\Activate

pip install -r requirements.txt


3. Frontend Setup (React)
cd ../frontend
npm install


Create a .env in /frontend:
REACT_APP_API_URL=http://localhost:5001/api


4. Run Locally
Open three shells or tabs:
- Flask API
cd backend
source venv/Scripts/activate   # if not already active
python app.py                  # listens on http://127.0.0.1:5001
- React Dev Server
cd frontend
npm start                      # opens http://localhost:3000
- Electron + Hot-Reload
cd ../
npm run electron-dev



📦 Build & Package
- Build React
npm run build-react
- Package Desktop App
npm run electron-pack


- Output in dist/.
📖 Features- User registration & JWT authentication
- Social Media automation:
- Connect mock accounts
- AI-powered post generation & scheduling
- Freelance proposals:
- Connect mock platforms
- Fetch job listings
- AI-generated proposals
- Easy desktop distribution via Electron
🔗 API Endpoints- Auth
- POST /api/register
- POST /api/login
- Social
- GET  /api/social/accounts
- POST /api/social/connect
- POST /api/social/generate-content
- POST /api/social/schedule
- Proposals
- GET  /api/proposals/platforms
- POST /api/proposals/connect-platform
- GET  /api/proposals/find-jobs
- POST /api/proposals/generate
