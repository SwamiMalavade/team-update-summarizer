# 🚀 Team Update Summarizer

An intelligent AI-powered application that automatically analyzes team updates and extracts key insights including blockers, wins, and goals using Cohere AI. Perfect for team leads and managers who need to quickly understand team progress and identify issues.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![React](https://img.shields.io/badge/React-18.2-blue.svg)

## ✨ Features

- 🤖 **AI-Powered Analysis**: Uses Cohere AI to intelligently parse team updates
- 📊 **Automatic Extraction**: Identifies blockers, wins, and goals automatically
- 🎨 **Modern UI**: Beautiful, responsive interface built with Material-UI
- ⚡ **Fast Performance**: Powered by Vite for lightning-fast development and builds
- 🔒 **Secure**: Environment-based configuration with CORS protection
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices
- 🎯 **Type-Safe**: Full TypeScript support for both frontend and backend
- 💪 **Production Ready**: Health checks, error handling, and monitoring built-in

## 🏗️ Project Structure

```
team-update-summarizer/
├── backend/                      # Express.js API Server
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   │   └── summary.controller.ts
│   │   ├── routes/               # API route definitions
│   │   │   └── summary.routes.ts
│   │   ├── services/             # Business logic
│   │   │   └── cohere.service.ts # Cohere AI integration
│   │   └── server.ts             # Express app configuration
│   ├── .env                      # Environment variables (not in git)
│   ├── .env.example              # Environment template
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
│
├── frontend/                     # React + Vite Frontend
│   ├── src/
│   │   ├── App.tsx               # Main application component
│   │   ├── main.tsx              # React entry point
│   │   ├── styles.ts             # Styled components
│   │   └── vite-env.d.ts         # TypeScript definitions
│   ├── .env                      # Environment variables (not in git)
│   ├── .env.example              # Environment template
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitignore
├── LICENSE
└── README.md
```

## 🎯 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Cohere API Key** - [Get one free](https://cohere.ai)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/SwamiMalavade/team-update-summarizer.git
cd team-update-summarizer
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Edit .env and add your Cohere API key
# Required: COHERE_API_KEY=your_api_key_here

# Start development server
npm run dev
```

The backend will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Start development server
npm run dev
```

The frontend will start on `http://localhost:3000`

### 4. Open in Browser

Visit `http://localhost:3000` and start summarizing team updates!

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000

# Cohere AI Configuration
COHERE_API_KEY=your_cohere_api_key_here
COHERE_MODEL=command-a-03-2025

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | `5000` |
| `COHERE_API_KEY` | Your Cohere API key | **Yes** | - |
| `COHERE_MODEL` | Cohere model to use | No | `command-a-03-2025` |
| `FRONTEND_URL` | Frontend URL for CORS | No | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | No | `development` |

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000
```

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API base URL | No | `http://localhost:5000` |

## 📚 API Documentation

### Base URL

```
Development: http://localhost:5000
Production: https://your-backend.onrender.com
```

### Endpoints

#### 1. Generate Summary

**POST** `/api/summary/generate`

Analyzes team updates and generates a structured summary.

**Request Body:**

```json
{
  "updates": [
    {
      "name": "John Doe",
      "update": "Completed user authentication. Blocked on API keys from vendor. Will work on profile page next."
    },
    {
      "name": "Jane Smith",
      "update": "Deployed payment gateway successfully. Won 40% performance improvement. Planning to refactor checkout flow."
    },
    {
      "name": "Bob Wilson",
      "update": "Reviewed 3 PRs. Stuck on failing CI/CD tests. Next: implement notification system."
    }
  ]
}
```

**Response (200 OK):**

```json
{
  "report": {
    "blockers": [
      "Waiting for API keys from vendor",
      "Need DBA approval for database migration",
      "CI/CD tests failing in pipeline"
    ],
    "wins": [
      "Completed user authentication module",
      "Successfully deployed payment gateway",
      "Won 40% performance improvement"
    ],
    "goals": [
      "Work on user profile page",
      "Refactor checkout flow",
      "Implement notification system"
    ],
    "summary": "The team made solid progress with authentication and payment features. Some blockers around API keys and testing need attention. Focus areas include profile page, checkout improvements, and notifications."
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "error": "At least 3 team members' updates are required"
}
```

**Error Response (500 Internal Server Error):**

```json
{
  "error": "Failed to generate summary. Please check your Cohere API key and try again."
}
```

#### 2. Health Check

**GET** `/health`

Check if the server is running.

**Response (200 OK):**

```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "Team Update Summarizer"
}
```

## 🎨 Features Walkthrough

### 1. **Load Sample Data**
Click "Load Sample Data" to see the app in action with pre-filled team updates.

### 2. **Add Team Updates**
- Enter team member names and their daily updates
- Add more team members with the "Add Team Member" button
- Minimum 3 team members required

### 3. **Generate Summary**
Click "Generate Summary" to analyze the updates using AI.

### 4. **View Results**
The app will display:
- **🚧 Blockers**: Issues and obstacles preventing progress
- **🎉 Wins**: Accomplishments and completed tasks
- **🎯 Goals**: Upcoming work and planned tasks
- **📝 Overall Summary**: High-level team status

## 🏭 Production Deployment

### Deploy to Render

#### Backend Deployment

1. **Create New Web Service** on [Render](https://render.com)
2. **Connect Repository**: `https://github.com/SwamiMalavade/team-update-summarizer`
3. **Configure Service**:
   - **Name**: `team-update-summarizer-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Build Command**: 
     ```bash
     cd backend && npm install && npm run build
     ```
   - **Start Command**: 
     ```bash
     cd backend && npm start
     ```
   - **Plan**: Free (or choose paid)

4. **Environment Variables**:
   ```
   COHERE_API_KEY=your_actual_api_key
   FRONTEND_URL=https://your-frontend-name.onrender.com
   NODE_ENV=production
   ```

5. Click **Create Web Service**

#### Frontend Deployment

1. **Create New Static Site** on [Render](https://render.com)
2. **Connect Repository**: Same repository
3. **Configure Site**:
   - **Name**: `team-update-summarizer-frontend`
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Build Command**: 
     ```bash
     cd frontend && npm install && npm run build
     ```
   - **Publish Directory**: 
     ```
     frontend/dist
     ```

4. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-name.onrender.com
   ```

5. Click **Create Static Site**

6. **Update Backend FRONTEND_URL**: After frontend is deployed, update the backend's `FRONTEND_URL` environment variable with the actual frontend URL.

### Deploy to Vercel (Frontend Only)

```bash
cd frontend
npm install -g vercel
vercel --prod
```

Add environment variable in Vercel dashboard:
- `VITE_API_URL`: Your backend URL

### Deploy to Heroku (Backend)

```bash
cd backend
heroku create team-update-summarizer-backend
heroku config:set COHERE_API_KEY=your_api_key
heroku config:set FRONTEND_URL=your_frontend_url
git subtree push --prefix backend heroku main
```

## 🛠️ Development

### Available Scripts

#### Backend

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Run production server
```

#### Frontend

```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build locally
```

### Code Structure

#### Backend Architecture

- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and external API integration
- **Routes**: API endpoint definitions
- **Middleware**: CORS, JSON parsing, error handling

#### Frontend Architecture

- **Component-based**: Single-page React application
- **Material-UI**: Pre-built React components
- **Axios**: HTTP client for API calls
- **TypeScript**: Type-safe development

## 🧪 Testing

### Manual Testing

1. Load sample data
2. Verify all fields populate correctly
3. Click "Generate Summary"
4. Verify response includes all sections
5. Test error cases (empty fields, network errors)

### API Testing with cURL

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test summary generation
curl -X POST http://localhost:5000/api/summary/generate \
  -H "Content-Type: application/json" \
  -d '{
    "updates": [
      {"name": "John", "update": "Completed authentication"},
      {"name": "Jane", "update": "Deployed payment gateway"},
      {"name": "Bob", "update": "Fixed critical bug"}
    ]
  }'
```

## 📦 Technologies Used

### Backend Stack

- **Express.js** - Fast, minimalist web framework
- **TypeScript** - Type-safe JavaScript
- **Cohere AI SDK** - AI-powered text analysis
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Nodemon** - Development auto-reload

### Frontend Stack

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Next-generation build tool
- **Material-UI (MUI)** - React component library
- **Emotion** - CSS-in-JS styling
- **Axios** - Promise-based HTTP client

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Cohere AI](https://cohere.ai) for powerful language models
- [Material-UI](https://mui.com) for beautiful React components
- [Vite](https://vitejs.dev) for blazing-fast build tool

## 📧 Contact

**Swami Malavade**

- GitHub: [@SwamiMalavade](https://github.com/SwamiMalavade)
- Project: [team-update-summarizer](https://github.com/SwamiMalavade/team-update-summarizer)

## 🐛 Known Issues

- Cohere API free tier has rate limits
- Render free tier services sleep after 15 minutes of inactivity

## 🔮 Future Enhancements

- [ ] Add user authentication
- [ ] Save and export summaries
- [ ] Email/Slack integration
- [ ] Historical summary tracking
- [ ] Multi-language support
- [ ] Custom AI prompt templates
- [ ] Team analytics dashboard
- [ ] Calendar integration

---

Made with ❤️ by Swami Malavade
