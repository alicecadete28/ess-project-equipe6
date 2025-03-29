"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ConfirmationModal({ isOpen, onClose }: ConfirmationModalProps) {
  const router = useRouter()

  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleGoToReservations = () => {
    // Navigate to reservations page
    onClose()
    router.push('/reservations')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="bg-[#0079c2] text-white p-8 rounded-3xl w-full max-w-md mx-4 z-10 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-8">Reserva Confirmada!</h2>

        <div className="flex justify-center">
          <button
            onClick={handleGoToReservations}
            className="bg-[#005487] hover:bg-[#004370] transition-colors text-white px-6 py-3 rounded-full"
          >
            Ir para minhas reservas
          </button>
        </div>
      </div>
    </div>
  )
}

