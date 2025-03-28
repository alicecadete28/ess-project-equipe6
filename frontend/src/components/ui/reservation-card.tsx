"use client"

import Image from "next/image"
import type { Reservation } from "@/components/types/interface"

interface ReservationCardProps {
  reservation: Reservation
  onClick: (reservation: Reservation) => void
}

export function ReservationCard({ reservation, onClick }: ReservationCardProps) {
  return (
    <div
      className="overflow-hidden bg-white rounded-lg shadow-md transition-all hover:shadow-lg cursor-pointer"
      onClick={() => onClick(reservation)}
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3">
          <Image
            src={reservation.imageUrl || "/placeholder.svg?height=200&width=200"}
            alt="Building"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-between w-full p-6 md:w-2/3">
          <div>
            <h2 className="mb-2 text-xl font-bold text-primary">{reservation.roomName}</h2>
            <p className="text-sm text-gray-700">{reservation.address}</p>
          </div>
          <div className="mt-4">
            <p className="font-medium text-primary">Período: {reservation.period}</p>
            <p className="font-medium text-primary">Valor: R$ {reservation.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

