import Image from "next/image"
import type { Reservation } from "@/components/types/interface"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"
import ReservationDetailDialog from "@/components/ui/reservation-detail-dialog"
import { format } from 'date-fns'


interface ReservationCardProps extends Reservation {
    onCancelReservation: (id: string) => void
  }
  
  export default function ReservationCard(props: ReservationCardProps) {
    const { pf_id, check_in, check_out, guests, total, id, onCancelReservation } = props
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
                src={"/placeholder.svg?height=150&width=150"}
                alt={pf_id}
                width={150}
                height={150}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-3/4 p-5">
              <h3 className="text-xl font-bold text-[#0079c2] mb-1">{pf_id}</h3>
              <p className="text-sm text-[#0079c2] mb-1">
                {format(new Date(check_in), "dd/MM/yyyy")} - {format(new Date(check_out), "dd/MM/yyyy")}
              </p>
              <p className="text-sm mb-2">{guests} hóspedes</p>
              <p className="font-bold">{formatCurrency(total)}</p>
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
  
  

