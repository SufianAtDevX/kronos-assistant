HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

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

10dcb7006173533c032235ef79bfb647254d4896
