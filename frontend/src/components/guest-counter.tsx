"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialoga"

interface GuestCounterProps {
  initialCount: number
  isOpen: boolean
  onClose: () => void
  onSave: (count: number) => void
}

export function GuestCounter({ initialCount, isOpen, onClose, onSave }: GuestCounterProps) {
  const [count, setCount] = useState(initialCount)

  const increment = () => {
    setCount((prev) => prev + 1)
  }

  const decrement = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleSave = () => {
    onSave(count)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-none max-w-md">
        <div className="bg-[#0079c2] text-white p-8 rounded-lg flex flex-col items-center">
          <div className="flex items-center justify-center w-full gap-6 mb-6">
            <Button
              onClick={decrement}
              className="bg-[#005487] hover:bg-[#004370] text-white text-2xl h-16 w-16 rounded-2xl"
            >
              -
            </Button>
            <div className="bg-[#005487] text-white text-4xl font-bold h-24 w-24 rounded-2xl flex items-center justify-center">
              {count}
            </div>
            <Button
              onClick={increment}
              className="bg-[#005487] hover:bg-[#004370] text-white text-2xl h-16 w-16 rounded-2xl"
            >
              +
            </Button>
          </div>
          <Button onClick={handleSave} className="bg-white text-[#0079c2] hover:bg-gray-100 px-8 py-2 rounded-full">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

