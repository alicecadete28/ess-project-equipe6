"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import type { Reservation, Room } from "@/components/types/interface"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'

interface ReservationDetailsModalProps {
  reservation: Reservation | null
  room: Room | null
  isOpen: boolean
  onClose: () => void
  onEdit: (id: string) => void
  onCancel: (id: string) => void
}

export function ReservationDetailsModal({
  reservation,
  room,
  isOpen,
  onClose,
  onEdit,
  onCancel,
}: ReservationDetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Fechar o modal ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevenir scroll do body quando o modal estiver aberto
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Fechar o modal com a tecla ESC
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  if (!isOpen || !reservation) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-[600px] max-h-[90vh] overflow-auto">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${room!.id}/400/300`}
                  alt="Building"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-[#0079c2] mb-2">{room?.description}</h2>
              {/* <p className="text-gray-700 mb-2">{reservation.address}</p> */}
              {/* <p className="text-primary font-medium">Proprietário: {reservation.owner}</p> */}
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <p className="text-[#0079c2] text-xl font-medium">Status: {reservation.status}</p>
            <p className="text-[#0079c2] font-medium">Data de entrada: {format(new Date(reservation.check_in), "dd/MM/yyyy")}</p>
            <p className="text-[#0079c2] font-medium">Data de saída: {format(new Date(reservation.check_out), "dd/MM/yyyy")}</p>
          </div>

          <div className="mt-8 space-y-2">
            <p className="text-[#0079c2] font-medium">Numero de hóspedes: {reservation.guests}</p>
            <p className="text-[#0079c2] text-xl font-medium">Valor total: {reservation.total}</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
            <Button
              variant="outline"
              className="border-[#0079c2] text-[#0079c2] hover:bg-primary/10"
              onClick={() => onCancel(reservation.id)}
            >
              Cancelar reserva
            </Button>
            <Button className="bg-[#0079c2] hover:bg-primary-dark text-white px-8" onClick={() => onEdit(reservation.id)}>
              Editar Reserva
            </Button>
            <Button
              variant="outline"
              className="border-[#0079c2] text-[#0079c2] hover:bg-primary/5"
              onClick={() => {
                window.location.href = `/avaliations?id=${reservation.id}`
              }}
            >
              Avaliar reserva
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

