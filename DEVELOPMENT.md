# 📝 Questify Development Guide

Welcome to **Questify**! This is a gamified task management app where your real-life productivity translates into experience points (EXP) and levels. This guide will walk you through setting up the project from scratch.

---

## 🛠️ Detailed Installation Guide

Follow these steps exactly to get Questify running on your computer.

### 1. Prerequisites
Before starting, ensure you have the following installed:
*   **Node.js** (Version 18 or higher)
*   **npm** (Comes with Node.js)
*   **Git**

### 2. Clone the Project
Open your terminal (PowerShell, CMD, or Terminal) and run:
```bash
git clone <your-repo-url>
cd questify
```

### 3. Install Packages
Install all the necessary libraries for the frontend and backend:
```bash
npm install
```

### 4. Set Up the Local Database
Questify uses **Cloudflare D1** (a SQLite database). You need to create the database tables locally before the app can save any data:

1.  **Generate Migration Files**: (This converts the TypeScript schema into SQL)
    ```bash
    npx drizzle-kit generate
    ```
2.  **Apply Migrations**: (This creates the actual tables in your local folder)
    ```bash
    npx wrangler d1 migrations apply db --local
    ```
    *When asked "About to apply X migrations... continue?", type **y** and press Enter.*

### 5. Start the Development Server
Run the app in development mode:
```bash
npm run dev
```
*   **Frontend**: Open [http://localhost:5173](http://localhost:5173) in your browser.
*   **Backend**: The Hono API runs automatically on the same port via Vite.

---

## 🎮 How the App Works (For Beginners)

### The "Quest" Loop
1.  **Create**: Add a task with an **Estimated Time**.
2.  **Start**: Click **START QUEST**. This takes you to a full-screen Pomodoro timer.
3.  **Focus**: The timer counts down. If you leave the page or click "Give Up," the quest fails.
4.  **Reward**: If the timer hits 00:00, you earn **EXP** (2x the minutes estimated).
5.  **Level Up**: Every 100 EXP you earn, your character level increases!

---

## 📁 Folder Map

*   `src/db/schema.ts`: **The Blueprint.** Defines what your database tables (Users, Tasks, Tags) look like.
*   `src/worker/index.ts`: **The Brain.** This is the backend (Hono). it handles saving tasks and calculating EXP.
*   `src/react-app/`: **The Face.** Everything you see on the screen.
    *   `store/useTaskStore.ts`: The global memory of the app (Zustand).
    *   `components/`: Individual pieces like the `PomodoroTimer` or `TaskForm`.

---

## 🛠️ Common Developer Tasks

### How do I reset my Level/EXP?
If you want to start fresh with 0 EXP:
```bash
npx wrangler d1 execute db --local --command="UPDATE users SET experience = 0, level = 1 WHERE id = 1;"
```

### How do I see my data?
To see all tasks currently in your local database:
```bash
npx wrangler d1 execute db --local --command="SELECT * FROM tasks;"
```

### I changed the schema.ts file, now what?
Whenever you change the database structure:
1. Run `npx drizzle-kit generate`
2. Run `npx wrangler d1 migrations apply db --local`

---

## 🚢 Deployment
To put your app on the internet using Cloudflare:
```bash
npm run deploy
```
*(Requires a free Cloudflare account)*
