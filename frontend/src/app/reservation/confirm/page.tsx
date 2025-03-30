"use client";

import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { Star } from "lucide-react"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { CompassLogo } from "@/components/compass-logo"



export default function ReservationConfirmation() {
  // const { isAuthenticated } = useAuth();
  const router = useRouter();

  // if (!isAuthenticated) {
  // router.push("/login"); 
  // return null;
  // }
  
  interface Rating {
    stars: number;
    comment: string;
  }
  
  interface Reservation {
    id: string;
    check_in: string;
    check_out: string;
    confirmed: boolean;
    guests: number;
    pf_id: string;
    room_id: string;
    status: string;
    total: number;
    rating: Rating;
  }
  
  interface Room {
    id: string;
    pj_id: string;
    price: number;
    stars: number;
    type: string;
    description: string;
    local: string;
    avaliacao: number;
    cafeDaManha: boolean;
    capacity: number;
    ar_condicionado: boolean;
    estacionamento: boolean;
    petFriendly: boolean;
    wifi: boolean;
    caracteristics_ids: string[];
  }
  
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [room, setRoom] = useState<Room | null>(null);

  // const [reservation, setReservation] = useState<null | {
  //   hotelName: string;
  //   address: string;
  //   startDate: string;
  //   endDate: string;
  //   guests: number;
  //   total: number;
  // }>(null);

  const handleBack = () => {
    router.push("/reservation");
  };

  useEffect(() => {
    const id_reservation = '1' // ou localStorage.getItem("id_reservation")
    const token = localStorage.getItem("accessToken");
  
    const fetchReservation = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/reservations/${id_reservation}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("Erro ao buscar reserva");
        }
  
        const data = await response.json();
        console.log("Fetched reservation data [confirm]:", data);
        setReservation(data.reservation);
        setRoom(data.room);
      } catch (error) {
        console.error("Erro ao buscar dados da reserva na página de confirmação:", error);
      }
    };
  
    fetchReservation();
  }, []);
  
  
  const hotel_name = room?.description || "Nome do hotel";
  const hotel_address = room?.local || "Endereço não informado";
  const hotel_rating = room?.stars?.toString() || "N/A";
  const data_reserva = reservation?.check_in && reservation?.check_out
    ? `${new Date(reservation.check_in).toLocaleDateString("pt-BR")} - ${new Date(reservation.check_out).toLocaleDateString("pt-BR")}`
    : "Carregando datas...";
  const num_hospedes = reservation?.guests?.toString() || "-";
  const total_final = reservation?.total ? `R$ ${reservation.total.toFixed(2)}` : "-";


  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("accessToken");
  
      if (!reservation || !token) {
        console.error("Reserva ou token não encontrados.");
        return;
      }
  
      const response = await fetch(
        `http://localhost:5001/api/reservations/${reservation.id}/confirm`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Erro ao confirmar a reserva");
      }
  
      const data = await response.json();
      console.log("Reserva confirmada com sucesso:", data);
  
      setReservation((prev) =>
        prev ? { ...prev, confirmed: true } : prev
      );
  
      setShowConfirmation(true); // Exibe o modal de confirmação
    } catch (error) {
      console.error("Erro ao confirmar a reserva:", error);
    }
  };
  

  if (!reservation || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-600 text-lg">Carregando dados da reserva...</p>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Header
      <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Image
            src="/placeholder.svg?height=30&width=30"
            alt="DestCINation Logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <span className="font-bold text-xl">
            Dest<span className="text-[#0079c2]">CIN</span>ation
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <User size={20} className="text-black" />
          <span>Logada como Aline</span>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {/* Back Link */}
        <Link href="#" className="text-[#0079c2] text-xl mb-6 inline-block">
          &lt; Confirmar Reserva
        </Link>

        {/* Reservation Card */}
        <div className="border border-[#0079c2] rounded-3xl p-6 flex flex-col md:flex-row gap-6">
          {/* Left Side - Hotel Info */}
          <div className="flex-1">
            {/* Hotel Title */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#0079c2] text-white px-4 py-1 rounded-md font-medium">Hotel</span>
              <Star className="fill-[#0079c2] text-[#0079c2]" size={24} />
            </div>

            {/* Hotel Name */}
            <h2 className="text-[#0079c2] text-2xl font-bold mb-2">{hotel_name}</h2>

            {/* Hotel Address */}
            <p className="text-[#0079c2] mb-6">
              {hotel_address}
            </p>

            {/* Reservation Details */}
            <div className="bg-[#0079c2] text-white p-4 rounded-xl max-w-xs">
              <p className="font-bold mb-2">{data_reserva}</p>
              <p className="mb-4">{num_hospedes} hóspedes</p>
              <p className="text-xl font-bold">Total (BRL) - <p>Total (BRL)</p>
            {reservation?.check_in && reservation?.check_out
              ? `R$ ${(reservation.total * ((new Date(reservation.check_out).getTime() - new Date(reservation.check_in).getTime()) / (1000 * 60 * 60 * 24))).toFixed(2)}`
              : total_final}</p>
            </div>
          </div>

          {/* Right Side - Hotel Image */}
          <div className="md:w-1/3">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Hotel Centro de Informática"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
            <button 
            className="bg-[#0079c2] text-white px-8 py-3 rounded-full font-medium" 
            onClick={handleBack}>
            Voltar e alterar
            </button>
          <button className="bg-[#0079c2] text-white px-12 py-3 rounded-full font-medium" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)} />
    </div>
  )
}


//TO DO:
// - Adicionar confirmação
// - Pegar informações do hotel (Falar com ALLan)