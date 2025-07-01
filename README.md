# ☀️ Solar Objection Trainer

An interactive flashcard-based training tool for solar sales professionals to master real-world objection handling using emotionally-driven, conversational responses.

---

## 🧠 Purpose

This tool is built to help door-to-door and in-home solar sales reps sharpen their ability to respond to homeowner objections with clarity, confidence, and empathy.

Instead of relying on boring scripts or memorization, the app uses short, emotionally-resonant answers aligned with natural sales psychology — designed to redirect the conversation back to the homeowner’s **pain points**, **goals**, and **sense of urgency**.

---

## 🚀 Features

* 🔁 **Flashcard Format** – Objection-response training using random prompts
* 🧠 **Challenge Mode** – Delays response reveal to promote independent thinking
* 👤 **Local User Tracking** – Stores usernames and tracks performance in `localStorage`
* 📊 **Score Storage** – Tracks objection-by-objection performance across sessions
* 🧩 **Modular HTMX Interface** – Snappy interaction without complex frontend frameworks
* 💻 **Responsive UI** – Clean Bootstrap design for mobile, tablet, and desktop
* 🔐 **No Auth Needed** – Runs fully offline or locally with persistent tracking

---

## 💂️ Project Structure

```
solar-objection-trainer/
├── data/
│   └── objections.json           # Core dataset of objections + ideal responses
├── public/
│   ├── style.css                 # Custom styles (mobile-first)
│   └── images/                   # (Optional) Add visuals or icons here
├── routes/
│   └── trainerRoutes.js          # Express router for main + flashcard views
├── views/
│   ├── index.html                # Landing page
│   └── flashcards.html           # Flashcard trainer view (Bootstrap + HTMX)
├── utils/
│   └── localStorage.js           # Handles client-side username + score logic
├── server.js                     # Main Node.js/Express app entry
├── package.json
└── README.md                     # You're here
```

---

## 🛠 Tech Stack

* **Node.js + Express** – Backend API
* **HTMX** – Lightweight frontend interactivity
* **Bootstrap 5** – Mobile-first responsive UI
* **localStorage** – Client-side persistent score + user data

---

## 🔮 Future Enhancements

> Ideas for scaling the trainer as your team or use case grows:

### 🧩 Features

* ✅ Add difficulty tiers (easy / medium / hard objections)
* ✅ Filter by objection type (financial, trust, timing, tech, etc.)
* 🔊 Audio playback / microphone input for pitch practice
* 🧠 AI Coach integration (use OpenAI or local LLM to generate new objections)
* 📊 Leaderboard with best streaks, scores, or challenge completions
* 🏆 Badges or milestone achievements for consistent users

### 🌐 Infrastructure

* ☁️ Sync data to a backend or cloud DB for team-level tracking
* 👥 User login with session-based stats
* 🗅️ Admin dashboard to add/edit objections
* 📲 Convert to Progressive Web App (PWA) for offline mobile access
* 🌍 Translate objection/responses into Spanish or other languages

---

## ✅ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourname/solar-objection-trainer.git
cd solar-objection-trainer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the server

```bash
node server.js
```

> Visit `http://localhost:3000` in your browser.

---

## 💬 Contribute

You can add more objections by editing `data/objections.json`. Each entry should follow this format:

```json
{
  "id": "objection-roof-01",
  "objection": "My roof is too old for solar.",
  "response": "That’s actually really common. A lot of people think they have to replace the roof first — but the program can often roll that in with no upfront cost."
}
```

---

## 📄 License

This project is private and for training purposes only. For commercial or team deployment, contact the creator for licensing options.

---

## 👤 Created by

Nick — solar pro, Marine vet, and builder of tools that make people **better** in the field.
