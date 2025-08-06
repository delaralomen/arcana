"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { CardDeck } from "@/components/card-deck"

export default function CardGenerator() {
  const [numberOfCards, setNumberOfCards] = useState<number>(3)

  const handleReading = () => {
    console.log(`Generating reading for ${numberOfCards} cards...`)
    // Add your card reading logic here
  }

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Header with theme toggle */}
      <div className="relative p-6">
        {/* <h1 className="text-2xl font-bold text-center">Arcana</h1> */}
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-12">
        <CardDeck />
      </div>
    </div>
  )
}
