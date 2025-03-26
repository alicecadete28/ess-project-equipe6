"use client"

import ReservationCard from "@/components/ui/reservation-card-pj"
import LocationDetail from "@/components/ui/location-detail"
import { getLocationById, getReservationsByLocationId } from "@/lib/data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Reservation2 } from "@/components/types/reservation"
import { useState } from "react"

export default function LocationPage({ params }: { params: { id: string } }) {
    const location = getLocationById(params.id)
  
    if (!location) {
      return (
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-[#0079c2] mb-4">Localidade não encontrada</h2>
          <p className="mb-8">A localidade que você está procurando não existe ou foi removida.</p>
          <Link href="/" className="bg-[#0079c2] text-white px-6 py-2 rounded-md hover:bg-[#005487] transition-colors">
            Voltar para a página inicial
          </Link>
        </div>
      )
    }
  
    const initialReservations = getReservationsByLocationId(params.id)
    const [reservations, setReservations] = useState<Reservation2[]>(initialReservations)
    // const { toast } = useToast()
  
    const handleCancelReservation = (id: string) => {
    //   In a real app, this would call an API to cancel the reservation
      setReservations(reservations.filter((res) => res.id !== id))
  
    //   toast({
    //     title: "Reserva cancelada",
    //     description: "A reserva foi cancelada com sucesso.",
    //     duration: 3000,
    //   })
    }
  
    return (
      <div className="min-h-screen bg-gray-50 mt-20">
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <Link href="/manage-reservation/pj" className="text-[#0079c2] flex items-center hover:underline">
              <ArrowLeft size={20} className="mr-1" />
              <span>voltar</span>
            </Link>
            <h1 className="text-2xl font-bold text-center text-[#0079c2]">Sua localidade</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Location Details */}
            <LocationDetail location={location} />
  
            {/* Reservations */}
            <div>
              <h2 className="text-2xl font-bold text-[#0079c2] mb-6">Reservas</h2>
  
              {reservations.length > 0 ? (
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <ReservationCard
                      key={reservation.id}
                      {...reservation}
                      onCancelReservation={handleCancelReservation}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 bg-white rounded-2xl shadow-md">
                  Nenhuma reserva encontrada para esta localidade.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    )
  }
  
  