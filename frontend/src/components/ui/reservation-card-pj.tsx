import Image from "next/image"
import type { Reservation2 } from "@/components/types/reservation"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"
import ReservationDetailDialog from "@/components/ui/reservation-detail-dialog"


interface ReservationCardProps extends Reservation2 {
    onCancelReservation: (id: string) => void
  }
  
  export default function ReservationCard(props: ReservationCardProps) {
    const { guestName, startDate, endDate, guestCount, price, imageUrl, id, onCancelReservation } = props
    const [isDialogOpen, setIsDialogOpen] = useState(false)
  
    return (
      <>
        <div
          className="bg-white rounded-2xl shadow-md overflow-hidden mb-4 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setIsDialogOpen(true)}
        >
          <div className="flex">
            <div className="w-1/4">
              <Image
                src={imageUrl || "/placeholder.svg?height=150&width=150"}
                alt={guestName}
                width={150}
                height={150}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-3/4 p-5">
              <h3 className="text-xl font-bold text-[#0079c2] mb-1">{guestName}</h3>
              <p className="text-sm text-[#0079c2] mb-1">
                {startDate} - {endDate}
              </p>
              <p className="text-sm mb-2">{guestCount} hóspedes</p>
              <p className="font-bold">{formatCurrency(price)}</p>
            </div>
          </div>
        </div>
  
        <ReservationDetailDialog
          reservation={props}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onCancel={onCancelReservation}
        />
      </>
    )
  }
  
  

