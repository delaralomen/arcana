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
  const [interpretation, setInterpretation] = useState<string | null>(null)
  const [userInput, setUserInput] = useState("")
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

  const interpretCards = async () => {
  if (cards.length === 0) return

  setLoading(true)
  try {
    const res = await fetch("http://127.0.0.1:5050/api/interpret", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cards,
        prompt: userInput,
        }),
    })

    const data = await res.json()
    if (data.interpretation) {
      setInterpretation(data.interpretation)
    }
  } catch (err) {
    console.error("Failed to interpret cards", err)
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="flex flex-col items-center gap-4">
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="What would you like to ask?"
        className="w-full max-w-xl p-3 border border-muted rounded-md bg-background text-foreground text-sm shadow-sm"
        rows={3}
      />
      <Button
        onClick={fetchCards}
        className="italic font-medium cursor-pointer rounded-full px-6 py-2 text-white dark:text-black
            bg-gradient-to-b dark:from-neutral-100 dark:to-neutral-300 from-neutral-700 to-neutral-900 
            border dark:border-black/10 border-white/10 shadow-md hover:brightness-110 
            relative overflow-hidden before:absolute before:inset-0 
            before:dark:bg-white/40 before:bg-white/10 before:rounded-full 
            before:blur-sm before:opacity-30 transition-all duration-500"
      >
        Pull some cards
      </Button>


        <div className="flex flex-wrap justify-center gap-4 max-w-5xl min-h-[64px] mb-8">
        {cards.map((card, index) => (
            <Card key={index} className="border-black shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center text-center">
                <div className="text-3xl mb-1">{getCardEmoji(card.card)}</div>
                <div className="text-xs text-center">{card.card}</div>
                <p className="text-xs italic text-muted-foreground">{card.orientation}</p>
            </Card>
        ))}
      </div>


      {cards.length > 0 && (
        <Button
            onClick={interpretCards}
            className="italic font-medium cursor-pointer rounded-full px-6 py-2 text-white dark:text-black
                bg-gradient-to-b dark:from-neutral-100 dark:to-neutral-300 from-neutral-700 to-neutral-900 
                border dark:border-black/10 border-white/10 shadow-md hover:brightness-110 
                relative overflow-hidden before:absolute before:inset-0 
                before:dark:bg-white/40 before:bg-white/10 before:rounded-full 
                before:blur-sm before:opacity-30 transition-all duration-500"
        >
            Interpret, please
        </Button>
      )}


      {interpretation && (
        <div className="max-w-2xl text-sm text-center text-muted-foreground px-4 mt-4 whitespace-pre-line">
            {interpretation}
        </div>
      )}
    </div>
  )
}
