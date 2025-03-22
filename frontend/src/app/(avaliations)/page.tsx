"use client"

import { useState } from "react"
import { AlertCircle, Star, X } from "lucide-react"
import Image from "next/image"

export default function RatingInterface() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [showError, setShowError] = useState(false)

  const handleSubmit = () => {
    if (rating === 0) {
      setShowError(true)
    } else {
      // Handle successful submission
      console.log("Submitted with rating:", rating, "and comment:", comment)
      // Here you would typically send the data to your backend
    }
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#d9d9d9]">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6">
            <Image src="/placeholder.svg?height=24&width=24" alt="Compass icon" width={24} height={24} />
          </div>
          <span className="font-semibold text-[#000000]">
            Dest<span className="text-[#1976d2]">CIN</span>ation
          </span>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium">
          <div className="w-5 h-5 rounded-full bg-[#505050]"></div>
          Criar conta
        </button>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center p-4 min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-[#e0e0e0]">
          <h1 className="mb-6 text-xl font-semibold text-center text-[#1d1b20]">Avalie Sua Estadia</h1>

          {/* Star Rating */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1"
              >
                <Star
                  size={32}
                  className={`${
                    (hoveredRating || rating) >= star
                      ? "fill-[#1976d2] text-[#1976d2]"
                      : "fill-[#d9d9d9] text-[#d9d9d9]"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          {/* Comment Section */}
          <div className="mb-4">
            <label htmlFor="comment" className="block mb-2 text-sm text-[#505050]">
              Deixe um comentário (Opcional)
            </label>
            <input
              id="comment"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comentário"
              className="w-full p-3 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1976d2]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 text-white bg-[#1976d2] rounded-md hover:bg-[#1976d2]/90 transition-colors"
          >
            Enviar
          </button>
        </div>
      </main>

      {/* Error Popup */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={() => setShowError(false)}
              className="absolute top-3 right-3 text-[#505050] hover:text-black"
            >
              <X size={20} />
              <span className="sr-only">Fechar</span>
            </button>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-red-100">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>

              <h3 className="mb-2 text-lg font-medium text-[#1d1b20]">Avaliação necessária</h3>

              <p className="mb-4 text-center text-[#505050]">
                Por favor, selecione uma classificação por estrelas antes de enviar sua avaliação.
              </p>

              <button
                onClick={() => setShowError(false)}
                className="px-4 py-2 text-white bg-[#1976d2] rounded-md hover:bg-[#1976d2]/90 transition-colors"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

