# 🏋️ FitBuddy

FitBuddy is an **AI-powered fitness & nutrition tracking web platform** designed to help users track daily workouts, monitor activity stats, analyze meal nutrition using computer vision / deep learning, and interact with an intelligent fitness assistant.

The project features a modular architecture comprising a responsive frontend, a Node.js/Express backend, an alternative Python/FastAPI ML backend, a pre-trained TensorFlow/TensorFlow.js food classification model, and model training notebooks.

---

## 📑 Table of Contents

- [Project Architecture](#-project-architecture)
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Directory Structure](#-directory-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started & Run Instructions](#-getting-started--run-instructions)
  - [1. MongoDB Database Setup](#1-mongodb-database-setup)
  - [2. Node.js Backend Setup (Primary API)](#2-nodejs-backend-setup-primary-api)
  - [3. Python FastAPI Backend Setup (Alternative / ML API)](#3-python-fastapi-backend-setup-alternative--ml-api)
  - [4. Frontend Setup](#4-frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [AI / ML Model Training](#-ai--ml-model-training)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🏗️ Project Architecture

FitBuddy connects three core components:

```
[ Frontend (HTML5/CSS3/JS) ] 
        │
        ├─── HTTP Requests ───► [ Node.js Express Backend (Port 3000) ] ──► [ MongoDB ]
        │                                 │
        │                       (TensorFlow.js Model)
        │
        └─── Alternative API ─► [ Python FastAPI Backend (Port 8000) ] ──► [ MongoDB ]
                                          │
                                (TensorFlow / Keras Model)
```

---

## 💻 Tech Stack

- **Frontend:**
  - Semantic HTML5, Modern CSS3 (Flexbox/Grid, Glassmorphic dark theme, animations)
  - Vanilla JavaScript (ES6+)
  - **Chart.js** for workout and step count analytics
  - **FontAwesome** for icons
  - Google Gemini API integration for conversational AI fitness chatbot
- **Backend (Node.js):**
  - **Node.js** & **Express.js**
  - **MongoDB** with **Mongoose** ORM
  - **@tensorflow/tfjs-node** for server-side food image recognition
  - **JWT (jsonwebtoken)** & **bcryptjs** for authentication and password hashing
  - **Multer** for handling multipart image uploads
- **Backend (Python / FastAPI):**
  - **FastAPI** & **Uvicorn**
  - **Motor** (Async MongoDB driver) & **Pydantic**
  - **TensorFlow** & **TensorFlow.js** converter
  - **Pillow (PIL)** for image preprocessing
- **Machine Learning / Dataset:**
  - Transfer learning based on **MobileNetV2** (224x224 input shape)
  - Multi-class food classification dataset (Apple Pie, Bibimbap, Caesar Salad, Chicken Curry, Dumplings, etc.)
  - Automated nutrition calculation (Calories, Protein, Carbs, Fats)

---

## 🚀 Key Features

1. **User Authentication:** Secure registration and login with encrypted passwords and JWT token generation.
2. **Interactive Fitness Dashboard:** Real-time step counter animation, responsive step charts powered by Chart.js, and workout timers.
3. **AI Food & Nutrition Recognition:**
   - Upload any meal picture via the UI.
   - The backend runs deep learning inference to classify the dish.
   - Instantly returns macronutrient breakdown (calories, protein, carbohydrates, and fats).
4. **AI Fitness Chatbot:** Integrated assistant powered by Google Gemini to answer workout, meal planning, and health questions.
5. **Workout Tracking:** Categorized routines for bulking, weight loss, and physique goals.

---

## 📁 Directory Structure

```text
FitBuddy/
├── Backend/                      # Node.js Express REST API
│   ├── config/                   # Database configuration (db.js)
│   ├── controllers/              # Route controllers (auth, nutrition, recognition, etc.)
│   ├── middlewares/              # JWT verification middleware
│   ├── models/                   # Mongoose schemas (User, Workout, Nutrition, Settings)
│   ├── routes/                   # Express API routes
│   ├── tfjs_model/               # Converted TensorFlow.js food classification model
│   ├── nutrition_data.json       # Food item macronutrient mappings
│   ├── server.js                 # Backend entry point
│   ├── .env.example              # Sample environment configuration
│   └── package.json              # Backend dependencies and scripts
├── Frontend/                     # Responsive web interface
│   ├── css/                      # Stylesheets (indexStyles.css, dashboardStyles.css, etc.)
│   ├── js/                       # Client logic (dashboardScript.js, indexScript.js, etc.)
│   ├── icons/                    # App UI icons
│   ├── images/                   # Visual assets and banners
│   ├── index.html                # Landing page
│   ├── dashboard.html            # Main fitness dashboard
│   ├── login.html                # Sign-in page
│   └── signup.html               # Registration page
├── PythonBackend/                # FastAPI ML Backend
│   ├── app/
│   │   ├── ml/                   # Model loader, class names, and nutrition data
│   │   ├── routers/              # FastAPI endpoints (auth, workouts, recognize, etc.)
│   │   ├── database.py           # Async MongoDB connection
│   │   ├── models.py & schemas.py# Pydantic schemas
│   │   └── main.py               # FastAPI application entry point
│   ├── .env.example              # Sample environment configuration
│   └── requirements.txt          # Python dependencies
├── Dataset/                      # Training dataset (images & images.zip)
├── train_model.ipynb             # Google Colab notebook for training the food model
├── .gitignore                    # Git ignore file for secrets, dependencies & artifacts
├── package.json                  # Root package configuration
└── README.md                     # Project documentation
```

---

## ⚙️ Prerequisites

Before running the project, make sure you have the following installed on your system:

1. **Node.js** (v18.x or v20.x recommended) & **npm**: [Download Node.js](https://nodejs.org/)
2. **Python** (v3.9 - 3.11): [Download Python](https://www.python.org/)
3. **MongoDB Community Server**: [Download MongoDB](https://www.mongodb.com/try/download/community) or a [MongoDB Atlas](https://www.mongodb.com/atlas) cloud connection string.

---

## 🛠️ Getting Started & Run Instructions

### 1. MongoDB Database Setup

Ensure MongoDB is running locally on the default port `27017`:

- **Windows:** Ensure the MongoDB service is started via Windows Services or run:
  ```powershell
  net start MongoDB
  ```
  *(Or start `mongod` from your MongoDB `bin` folder).*
- **Linux/macOS:**
  ```bash
  sudo systemctl start mongod
  ```

---

### 2. Node.js Backend Setup (Primary API)

1. Open a terminal and navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
     *(On Windows PowerShell: `Copy-Item .env.example .env`)*
   - Open `.env` and configure your settings:
     ```env
     MONGO_URI=mongodb://127.0.0.1:27017
     DB_NAME=fitbuddy
     PORT=3000
     JWT_SECRET=your_jwt_secret_key
     ```

4. Start the server:
   ```bash
   npm start
   ```
   The backend will start and log:
   ```text
   MongoDB Connected: 127.0.0.1
   Server is running on port 3000.
   ```

---

### 3. Python FastAPI Backend Setup (Alternative / ML API)

If you prefer to run the FastAPI backend for the API and image recognition:

1. Open a new terminal and navigate to `PythonBackend`:
   ```bash
   cd PythonBackend
   ```

2. Create and activate a Python virtual environment:
   - **Windows (PowerShell):**
     ```powershell
     python -m venv .venv
     .venv\Scripts\Activate.ps1
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create your `.env` file:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Configure variables:
     ```env
     MONGO_URI=mongodb://127.0.0.1:27017
     DB_NAME=fitbuddy
     PORT=8000
     ```

5. Run the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   - Access interactive Swagger API documentation at: `http://localhost:8000/docs`

---

### 4. Frontend Setup

The frontend is built with vanilla HTML, CSS, and JavaScript. You do not need to build or compile anything.

#### Option A: Using VS Code Live Server (Recommended)
1. Open the project in VS Code.
2. Install the **Live Server** extension.
3. Right-click [`Frontend/index.html`](Frontend/index.html) and select **"Open with Live Server"**.
4. The application will launch in your browser at `http://127.0.0.1:5500/Frontend/index.html`.

#### Option B: Using Node `npx serve`
From the project root:
```bash
npx serve Frontend -l 5500
```
Open `http://localhost:5500` in your web browser.

#### Option C: Using Python HTTP Server
From the project root:
```bash
python -m http.server 5500 --directory Frontend
```
Open `http://localhost:5500` in your web browser.

> [!NOTE]
> To enable the AI Chatbot feature on [`Frontend/dashboard.html`](Frontend/dashboard.html), insert your free Gemini API key into `Frontend/js/dashboardScript.js` at line 293:
> `const apiKey = 'YOUR_GEMINI_API_KEY';`

---

## 🔒 Environment Variables

Always keep credentials safe. The repository ignores `.env` files via `.gitignore`. Reference the `.env.example` files provided:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `MONGO_URI` | MongoDB connection URI | `mongodb://127.0.0.1:27017` |
| `DB_NAME` | Database name | `fitbuddy` |
| `PORT` | API server port | `3000` (Node) / `8000` (FastAPI) |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user (`username`, `email`, `password`)
- `POST /api/auth/login` - Authenticate user and receive JWT access token

### AI Food Recognition
- `POST /api/recognize` - Multipart form upload (`foodImage: File`)
  - **Response:**
    ```json
    {
      "recognizedFood": "apple_pie",
      "probability": 0.95,
      "nutrition": {
        "calories": 237,
        "protein": 1.9,
        "carbs": 34,
        "fats": 11,
        "unit": "100g"
      }
    }
    ```

### User & Activity Management
- `GET /api/profile` - Fetch user profile information
- `GET /api/workouts` - Fetch workout plans and statistics
- `GET /api/nutrition` - Retrieve logged meals and nutritional history
- `GET /api/settings` - User settings and preferences

---

## 🧠 AI / ML Model Training

The image classification model can be retrained or fine-tuned using [`train_model.ipynb`](train_model.ipynb):

1. Upload [`train_model.ipynb`](train_model.ipynb) and [`Dataset/images.zip`](Dataset/images.zip) to [Google Colab](https://colab.research.google.com/).
2. Run all cells in sequence to extract data, augment images, fine-tune MobileNetV2, and convert the resulting model using `tensorflowjs`.
3. Download the converted `tfjs_model.zip`, extract it, and place the contents into `Backend/tfjs_model/`.

---

## 🤝 Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 👤 Author

**Satyajeet Gonugade**
