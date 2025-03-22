"use client";

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Star } from "lucide-react"
import { CompassLogo } from "@/components/compass-logo"


export default function ReservationDetails() {
    const router = useRouter();
    const handleNext = () => {
        router.push("/reservation/confirm"); // Redirect to the next page
      };
  return (
    <div className="min-h-screen flex flex-col">
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
        <Link href="#" className="text-blue-600 hover:underline mb-4 inline-block">
          &lt; Detalhes da Reserva
        </Link>

        {/* Hotel Card */}
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Hotel Image */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="relative rounded-lg overflow-hidden h-48 md:h-40">
                <Image src="/images/hotel-cin.jpg" alt="Hotel Centro de Informática" fill className="object-cover" />
              </div>
              <div className="mt-2 mb-1 text-left">
                <span className="text-white text-sm">ótima localização</span>
              </div>
            </div>

            {/* Hotel Info */}
            <div className="w-full md:w-3/4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm">Hotel</span>
                <Star className="w-5 h-5 fill-white stroke-white" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Centro de Informática - CIn</h1>
              <p className="mb-4">
                Av. Jornalista Anibal Fernandes, s/n - Cidade Universitária, Recife, PE, Pernambuco
              </p>
              <div className="text-lg">4.5 - 40 reviews</div>
            </div>
          </div>
        </div>

        {/* Reservation Details */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Sua Reserva</h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Datas e hóspedes</h3>
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg">7 - 17 de jan de 2025</p>
              <Link href="#" className="text-blue-600 hover:underline">
                editar datas
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg">2 hóspedes</p>
              <Link href="#" className="text-blue-600 hover:underline">
                editar hóspedes
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Preços</h2>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg">R$ XX,00 x 10 noites</p>
            <p className="text-lg">R$ 10 . XX,00</p>
          </div>
          <div className="flex justify-between items-center text-xl font-bold">
            <p>Total (BRL)</p>
            <p>- R$ Z,00</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
              </svg>
            </div>
            <span className="text-blue-600 font-medium">
              Logado como{" "}
              <Link href="#" className="underline">
                Olavo Paulo
              </Link>
            </span>
          </div>
          <button
      onClick={handleNext}
      className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
    >
      Seguir
    </button>
        </div>
      </main>
    </div>
  )
}

