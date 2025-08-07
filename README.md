# 🔮 Arcana — Tarot Card Reading Generator & Interpreter

A very simple Tarot card reading app built with **Next.js**, **Tailwind CSS**, and **Flask**. Draw cards from a virtual deck and receive randomized readings.

---

## ✨ Features

- Draw 1–5 random tarot cards from a full 78-card deck
- Each card includes an **orientation** (Upright or Reversed)
- Emoji representations for suits:
  - 🍵 Cups
  - 💵 Pentacles
  - ⚔️ Swords
  - 🪄 Wands
- Dark/light mode with animated theme switching
- Responsive design with ShadCN + Tailwind

---

## 🧱 Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, ShadCN UI
- **Backend:** Flask (Python)
- **Styling:** CSS transitions, dark mode support
- **UI Effects:** Glossy button, smooth theme toggling

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/delaralomen/arcana.git
cd arcana
````

---

### 2. Backend setup (Flask)

```bash
cd backend
pip install flask flask-cors
python main.py
```

Make sure the Flask server is running on `http://127.0.0.1:5050`.

---

### 3. Frontend setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 API

**Endpoint:** `GET /api/draw`
Returns a JSON response with a random tarot reading of 1 to 5 cards.

```json
{
  "num_cards": 3,
  "reading": [
    { "card": "The Fool", "orientation": "Upright" },
    { "card": "Ace of Cups", "orientation": "Reversed" },
    { "card": "The Moon", "orientation": "Upright" }
  ]
}
```

---

## 📁 Project Structure

```
arcana/
├── backend/
│   └── main.py           # Flask backend
├── frontend/
│   ├── components/      # UI components
│   ├── app/             # Next.js pages
│   └── tailwind.config.js
```

---

## 🎨 Screenshots

### Light Mode
![Light Mode](./frontend/public/screenshots/light-mode.png)

### Dark Mode
![Dark Mode](./frontend/public/screenshots/dark-mode.png)

---

## 🤝 Credits

Inspired by mysticism. Crafted with code.
UI components powered by [shadcn/ui](https://ui.shadcn.com)


