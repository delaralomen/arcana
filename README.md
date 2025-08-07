# 🔮 Arcana — Tarot Card Reading Generator & Interpreter

A very simple Tarot card reading app built with **Next.js**, **Tailwind CSS**, and **Flask**. Draw cards from a virtual deck and receive randomized readings.


Arcana is a simple tarot card reading web app built with Next.js and Flask. It lets users pull tarot cards, ask personalized questions, and receive interpretations using Anthropic's *Sonnet 3.5* model. The interface includes a clean design, dynamic card rendering with emoji suits, and full light/dark theme support.

---

## ✨ Features

* 🎴 Draw 1–5 random tarot cards (Major + Minor Arcana)
* 💬 Ask a personal question to guide the reading
* 🤖 Receive an AI-generated interpretation (Anthropic, Sonnet 3.5)
* 💡 Beautiful light/dark mode with animated transitions
* 🌈 Glossy animated buttons and emoji-enhanced cards
* 📚 Session memory support for multi-step readings


---

## 🧱 Tech Stack

### Frontend

* **Next.js (App Router)**
* **React (Client Components)**
* **Tailwind CSS** for styling
* **Lucide Icons** + emojis for card symbols
* **Light/Dark Mode** with `next-themes`

### Backend

* **Flask** API for `/draw` and `/interpret` endpoints
* **Anthropic API** integration
* **In-memory conversation history**

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/delaralomen/arcana.git
cd arcana
```

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

## 🧪 API Endpoints

`GET /api/draw`

Returns a JSON response with a random tarot reading of 1 to 5 cards.

Payload:
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

`POST /api/interpret`

Takes a user prompt + set of drawn cards and returns an interpretation using Anthropic API.

Payload:

```json
{
  "prompt": "What should I focus on today?",
  "cards": [
    { "card": "The Empress", "orientation": "Upright" },
    { "card": "2 of Cups", "orientation": "Reversed" }
  ]
}
```


---

## 📁 Project Structure

```
arcana/
├── backend/              # Flask server
│   └── main.py
├── frontend/             # Next.js frontend
│   ├── app/              # App Router structure
│   ├── components/       # UI and utility components
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


