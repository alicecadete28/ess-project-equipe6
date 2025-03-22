"use client";

import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { Star } from "lucide-react"
import { CompassLogo } from "@/components/compass-logo"


export default function ReservationConfirmation() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
  router.push("/login"); 
  return null;
  }
  

  const [reservation, setReservation] = useState<null | {
    hotelName: string;
    address: string;
    startDate: string;
    endDate: string;
    guests: number;
    total: number;
  }>(null);

  const handleBack = () => {
    router.push("/reservation");
  };

  useEffect(() => {
    fetch("http://localhost:3001/reservation/1")
      .then((res) => res.json())
      .then((data) => setReservation(data))
      .catch((err) => console.error("Erro ao buscar reserva:", err));
  }, []);

  

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* Header */}
      <header className="border-b">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image src="/compass.svg" alt="DestCINation logo" width={24} height={24} />
                  <span className="font-semibold text-xl">
                    Dest<span className="text-[#0079c2]">CIN</span>ation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#0079c2] text-white rounded-full w-8 h-8 flex items-center justify-center text-xs">
                    OP
                  </div>
                  <span className="hidden sm:inline text-sm">Olavo Paulo</span>
                </div>
              </div>
            </header>

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
            <h2 className="text-[#0079c2] text-2xl font-bold mb-2">Centro de Informática - CIn</h2>
            
            {/* Hotel Address */}
            <p className="text-[#0079c2] mb-6">
              Av. Jornalista Anibal Fernandes, s/n - Cidade Universitária, Recife, PE, Pernambuco
            </p>

            {/* Reservation Details */}
            <div className="bg-[#0079c2] text-white p-4 rounded-xl max-w-xs">
              <p className="font-bold mb-2">7 - 17 de jan de 2025</p>
              <p className="mb-4">2 hóspedes</p>
              <p className="text-xl font-bold">Total (BRL) - R$ Z,00</p>
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
          onClick={handleBack}
          className="bg-[#0079c2] text-white px-8 py-3 rounded-full font-medium">
            Voltar e alterar
          </button>
          <button className="bg-[#0079c2] text-white px-12 py-3 rounded-full font-medium">
            Confirmar
          </button>
        </div>
      </main>
    </div>
  )
}