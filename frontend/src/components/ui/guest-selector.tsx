"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Users, Plus, Minus } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface GuestSelectorProps {
  guests: number
  onGuestsChange: (guests: number) => void
}

export function GuestSelector({ guests, onGuestsChange }: GuestSelectorProps) {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleIncrement = () => {
    onGuestsChange(guests + 1)
  }

  const handleDecrement = () => {
    if (guests > 1) {
      onGuestsChange(guests - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      onGuestsChange(value)
    } else if (e.target.value === "") {
      // Allow empty input temporarily while typing
      e.target.value = ""
    }
  }

  const handleInputBlur = () => {
    // Ensure we always have at least 1 guest
    if (!guests || guests < 1) {
      onGuestsChange(1)
    }
  }

  return (
    <div className="flex items-center gap-2 w-full">
      <Users className="text-gray-400" size={20} />
      <div className="flex-1">
        <div className="text-xs text-gray-500">Hóspedes</div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="text-sm w-full text-left outline-none" onClick={() => setOpen(true)}>
              {guests} {guests === 1 ? "hóspede" : "hóspedes"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4" align="start">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Número de hóspedes</h4>

              <div className="flex items-center justify-between">
                <span className="text-sm">Hóspedes</span>
                <div className="flex items-center gap-3">
                  {/* <button
                    onClick={handleDecrement}
                    disabled={guests <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button> */}

                  <input
                    ref={inputRef}
                    type="number"
                    min="1"
                    value={guests}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-12 text-center border-none text-sm outline-none"
                  />

                  {/* <button
                    onClick={handleIncrement}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                  >
                    <Plus size={16} />
                  </button> */}
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="w-full py-2 bg-[#0079c2] text-white rounded-md text-sm mt-2"
              >
                Aplicar
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

