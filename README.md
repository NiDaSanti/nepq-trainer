# NEPQ Objection Trainer

## Overview

The NEPQ Objection Trainer is a web-based flashcard tool built to help Sunrun sales representatives master objection handling using Neuro-Emotional Persuasion Questioning (NEPQ). It offers a smooth, mobile-first interface where reps can practice real-world solar objections, reveal suggested responses, rate their performance, and track their session stats.

## Features

* ✅ Mobile, tablet, and desktop responsive design
* ✅ Flashcard-based objection/response training
* ✅ Self-rating system with real-time session stats
* ✅ HTMX-powered interaction for seamless frontend UX
* ✅ Express.js backend serving dynamic flashcards
* ✅ Clean, modern UI styled via custom CSS

## Tech Stack

* **Frontend:** HTML, HTMX, CSS (Inter font via Google Fonts)
* **Backend:** Node.js (Express)
* **Data Storage:** Static JSON file (`objections.json`)

## File Structure

```
project-root/
├── public/
│   └── style.css            # All responsive and visual styling
├── views/
│   ├── index.html           # Landing page (how it works, start button)
│   └── flashcards.html      # Main training interface
├── data/
│   └── objections.json      # List of objection/response pairs
├── src/
│   └── routes/
│       └── trainerRoutes.js # All route logic
│   └── server.js            # Express server entry point
└── package.json
```

## API Routes

### `GET /`

Serves `index.html` with "how it works" overview.

### `GET /flashcards`

Serves `flashcards.html`, the HTMX-enabled flashcard interface.

### `GET /api/flashcard`

Returns a random objection with:

* Objection text
* Reveal button
* Helpful / Needs Work buttons
* Success stats
* "Next Objection" sticky CTA

### `GET /api/response/:id`

Returns the corresponding NEPQ response for a given objection ID.

### `POST /api/score`

Increments total and helpful counts based on rating. Returns the next flashcard.

### `GET /api/stats`

Returns a styled HTML block with session summary stats (used on `/`).

## Session Stats Logic

Session progress is stored in-memory:

```js
let sessionStats = {
  total: 0,
  helpful: 0
}
```

* Updated on each `/api/score` post
* Reset by posting to `/api/reset` (if implemented)

## Styling Strategy

* Fully responsive layout (`100vh` fill on mobile)
* CSS handles button styles, layout spacing, and card width control
* Sticky footer ensures CTA button stays visible

## Usage Instructions

1. Launch project using:

   ```bash
   npm install
   npm run dev
   ```
2. Visit `/` to read instructions.
3. Click **Start Training** to open `/flashcards`.
4. Practice objection responses:

   * Reveal response
   * Rate yourself
   * Repeat
5. Review session stats in real-time.

## Customization

* Add more objections in `data/objections.json`
* Modify styling in `public/style.css`
* Update layout or UX in `views/flashcards.html`

## Deployment

This app is deployable to platforms like Render, Vercel (with Node), or DigitalOcean. Ensure environment supports:

* Node.js 18+
* Static hosting of `/public` and `/views`
* Persistent or auto-updating `objections.json` if needed

## Author

Built by **Nick**
Sales Consultant, Sunrun
For training & leveling up field performance with NEPQ.

---

> "Salespeople don’t rise to the level of their pitch — they fall to the level of their preparation."

---
