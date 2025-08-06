"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCardEmoji } from "@/lib/card-emojis"



type TarotCard = {
  card: string
  orientation: "Upright" | "Reversed"
}

export function CardDeck() {
  const [cards, setCards] = useState<TarotCard[]>([])
  const [loading, setLoading] = useState(false)

  const fetchCards = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://127.0.0.1:5050/api/draw")
      const data = await res.json()
      setCards(data.reading)
    } catch (err) {
      console.error("Failed to fetch cards", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl min-h-[33rem] mb-8">

        {/* {cards.map((card, index) => (
          <Card
            key={index}
            className="border-black shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center text-center"
            >
            <div className="w-20 h-24 mb-2 bg-muted rounded-sm flex items-center justify-center text-xs">
                {card.card}
            </div>
            <p className="text-xs italic text-muted-foreground">{card.orientation}</p>
          </Card>

        ))} */}
        {cards.map((card, index) => (
            <Card key={index} className="border-black shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center text-center">
                <div className="text-3xl mb-1">{getCardEmoji(card.card)}</div>
                <div className="text-xs text-center">{card.card}</div>
                <p className="text-xs italic text-muted-foreground">{card.orientation}</p>
            </Card>
        ))}
      </div>

      <Button onClick={fetchCards} className="italic font-medium cursor-pointer">
        Give me a reading
      </Button>
    </div>
  )
}
