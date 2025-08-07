from flask import Flask, jsonify, request
from flask_cors import CORS
from anthropic import Anthropic
from dotenv import load_dotenv
import os
import random

app = Flask(__name__)
CORS(app)

load_dotenv()
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
anthropic = Anthropic(api_key=ANTHROPIC_API_KEY)

conversations = {}

major_arcana = [
    "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
    "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
    "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
    "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
    "Judgement", "The World"
]

suits = ["Cups", "Pentacles", "Swords", "Wands"]
ranks = ["Ace"] + [str(n) for n in range(2, 11)] + ["Page", "Knight", "Queen", "King"]
minor_arcana = [f"{rank} of {suit}" for suit in suits for rank in ranks]
full_deck = major_arcana + minor_arcana


@app.route("/api/draw", methods=["GET"])
def draw_tarot():
    num_cards = random.randint(1, 5)
    drawn_cards = random.sample(full_deck, num_cards)

    reading = []

    print(f"\n🔮 Tarot Reading ({num_cards} card{'s' if num_cards > 1 else ''}):\n")

    for i, card in enumerate(drawn_cards, 1):
        orientation = random.choice(["Upright", "Reversed"])
        print(f"{i}. 🃏 {card} ({orientation})")
        reading.append({
            "card": card,
            "orientation": orientation
        })

    return jsonify({
        "num_cards": num_cards,
        "reading": reading
    })



@app.route("/api/interpret", methods=["POST"])
def interpret_cards():
    data = request.get_json()
    cards = data.get("cards")
    session_id = data.get("session_id") or "default"

    if not cards:
        return jsonify({"error": "No cards provided"}), 400

    formatted_cards = "\n".join(
        [f"- {card['card']} ({card['orientation']})" for card in cards]
    )

    user_input = f"Please interpret the following tarot reading:\n{formatted_cards}"

    messages = conversations.get(session_id, [])
    messages.append({"role": "user", "content": user_input})

    try:
        response = anthropic.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=500,
            temperature=0.7,
            messages=messages,
        )

        reply = response.content[0].text
        messages.append({"role": "assistant", "content": reply})

        # Save updated conversation
        conversations[session_id] = messages

        return jsonify({"interpretation": reply})

    except Exception as e:
        print("Anthropic error:", e)
        return jsonify({"error": "Failed to get interpretation"}), 500



if __name__ == "__main__":
    app.run(debug=True, port=5050)
