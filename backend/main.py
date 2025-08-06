from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

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



if __name__ == "__main__":
    app.run(debug=True, port=5050)
