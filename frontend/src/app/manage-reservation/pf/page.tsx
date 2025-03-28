"use client"

import { useState } from "react"
import { ReservationCard } from "@/components/ui/reservation-card"
import { ReservationDetailsModal } from "@/components/ui/reservation-details-modal"
import type { Reservation } from "@/components/types/interface"

// Dados de exemplo das reservas
const reservationsData: Reservation[] = [
  {
    id: 1,
    roomName: "CIn - Sala E121",
    address: "Av. Jornalista Aníbal Fernandes, s/n - Cidade Universitária, Recife, PE, Pernambuco",
    period: "20/03/2025 - 22/03/2025",
    price: "103,59",
    status: "Confirmada",
    checkInDate: "20/03/2025",
    checkOutDate: "22/03/2025",
    guestCount: 1,
    owner: "UFPE",
  },
  {
    id: 2,
    roomName: "CIn - Sala E121",
    address: "Av. Jornalista Aníbal Fernandes, s/n - Cidade Universitária, Recife, PE, Pernambuco",
    period: "26/03/2025 - 30/03/2025",
    price: "457,90",
    status: "Confirmada",
    checkInDate: "26/03/2025",
    checkOutDate: "30/03/2025",
    guestCount: 2,
    owner: "UFPE",
  },
  {
    id: 3,
    roomName: "CIn - Sala E123",
    address: "Av. Jornalista Aníbal Fernandes, s/n - Cidade Universitária, Recife, PE, Pernambuco",
    period: "04/04/2025 - 12/04/2025",
    price: "1033,59",
    status: "Pendente",
    checkInDate: "04/04/2025",
    checkOutDate: "12/04/2025",
    guestCount: 3,
    owner: "UFPE",
  },
  {
    id: 4,
    roomName: "CIn - Sala E111",
    address: "Av. Jornalista Aníbal Fernandes, s/n - Cidade Universitária, Recife, PE, Pernambuco",
    period: "13/04/2025 - 15/04/2025",
    price: "235,59",
    status: "Confirmada",
    checkInDate: "13/04/2025",
    checkOutDate: "15/04/2025",
    guestCount: 1,
    owner: "UFPE",
  },
  {
    id: 5,
    roomName: "CIn - Sala E111",
    address: "Av. Jornalista Aníbal Fernandes, s/n - Cidade Universitária, Recife, PE, Pernambuco",
    period: "13/04/2025 - 15/04/2025",
    price: "235,59",
    status: "Confirmada",
    checkInDate: "13/04/2025",
    checkOutDate: "15/04/2025",
    guestCount: 1,
    owner: "UFPE",
  },
]

export default function ReservationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

  const handleCardClick = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleEditReservation = (id: number) => {
    console.log(`Editing reservation ${id}`)
    setIsModalOpen(false)
    // Implementar lógica de edição aqui
  }

  const handleCancelReservation = (id: number) => {
    console.log(`Canceling reservation ${id}`)
    setIsModalOpen(false)
    // Implementar lógica de cancelamento aqui
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Main Content */}
      <main className="container px-4 py-8 mx-auto max-w-7xl">
        <h1 className="mb-12 text-3xl font-bold text-center text-primary">Suas Reservas</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {reservationsData.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} onClick={handleCardClick} />
          ))}
        </div>
      </main>

      <ReservationDetailsModal
        reservation={selectedReservation}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEdit={handleEditReservation}
        onCancel={handleCancelReservation}
      />
    </div>
  )
}

