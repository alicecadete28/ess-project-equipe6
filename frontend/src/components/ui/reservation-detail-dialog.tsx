"use client"

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialoga"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Reservation } from "@/components/types/interface"
import { formatCurrency } from "@/lib/utils"

interface ReservationDetailDialogProps {
  reservation: Reservation
  isOpen: boolean
  onClose: () => void
  onCancel: (id: string) => void
}

export default function ReservationDetailDialog({
  reservation,
  isOpen,
  onClose,
  onCancel,
}: ReservationDetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-3xl">
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* <div className="md:w-2/5">
              <div className="rounded-3xl overflow-hidden">
                <Image
                  src={ ImageUrl || "/placeholder.svg?height=300&width=300"}
                  // alt={reservation.guestName}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div> */}
            <div className="md:w-3/5">
              {/* <h2 className="text-3xl font-bold text-[#0079c2] mb-6">{reservation.guestName}</h2> */}

              <div className="space-y-3 text-lg">
                <p>
                  <span className="text-[#0079c2]">Status:</span> Confirmada
                </p>
                <p>
                  <span className="text-[#0079c2]">Data de entrada:</span> {reservation.check_in.toLocaleDateString()}
                </p>
                <p>
                  <span className="text-[#0079c2]">Data de saída:</span> {reservation.check_out.toLocaleDateString()}
                </p>
                <p className="text-2xl mt-8">
                  <span className="text-[#0079c2]">Total:</span> {formatCurrency(reservation.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="bg-white p-6 flex justify-center">
          <Button
            className="bg-[#0079c2] hover:bg-[#005487] text-white font-medium text-lg py-6 px-8 rounded-xl"
            onClick={() => onCancel(reservation.id)}
          >
            Cancelar reserva
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

