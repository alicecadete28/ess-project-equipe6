"use client"

import Image from "next/image"
import type { Reservation, Room } from "@/components/types/interface"
import { format } from 'date-fns'

interface ReservationCardProps {
  reservation: Reservation
  room: Room
  onClick: (reservation: Reservation, room: Room) => void
}

export function ReservationCard({ reservation, room, onClick }: ReservationCardProps) {
  return (
    <div
      className="overflow-hidden bg-white rounded-lg shadow-md transition-all hover:shadow-lg cursor-pointer"
      onClick={() => onClick(reservation, room)}
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3">
          <Image
            src={"/placeholder.svg?height=200&width=200"}
            alt="Building" 
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-between w-full p-6 md:w-2/3">
          <div>
            <h2 className="mb-2 text-xl font-bold text-[#0079c2]">{room.description}</h2>
            {/* <p className="text-sm text-gray-700">{reservation.address}</p> */}
          </div>
          <div className="mt-4">
            <p className="font-medium text-[#0079c2]">Entrada: {format(new Date(reservation.check_in), "dd/MM/yyyy")} </p>
            <p className="font-medium text-[#0079c2]">Saída: {format(new Date(reservation.check_out), "dd/MM/yyyy")}</p>
            <p className="font-medium text-[#0079c2]">Valor: R$ {reservation.total}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

