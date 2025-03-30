"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Star } from "lucide-react"
import { useState, useEffect } from "react"
import { GuestCounter } from "@/components/guest-counter";
import { SimpleCalendar } from "@/components/ui/simple-calendar";
import { useAuth } from "@/hooks/useAuth";


export default function ReservationDetails() {

  //const [reservation, setReservation] = useState<any>(null);
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

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [selectedDateType, setSelectedDateType] = useState<"check_in" | "check_out" | null>(null);  
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [isGuestCounterOpen, setIsGuestCounterOpen] = useState(false)
  const [guestCount, setGuestCount] = useState(2) // Default to 2 guests or whatever your initial value is

  
  
  useEffect(() => {
    const id_reservation = JSON.parse(localStorage.getItem("id_reservation") || "null");
    console.log("id reserva", id_reservation)
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
          throw new Error("Failed to fetch reservation data");
        }
        
        const data = await response.json();
        console.log("Fetched reservation data:", data); // Log the response to verify its structure
        
        setReservation({
          ...data.reservation,
          total: Number(data.reservation.total),
          guests: Number(data.reservation.guests)
        });
        
      setRoom(data.room);
      setGuestCount(data.reservation.guests);
      setCheckIn(data.reservation.check_in ? new Date(data.reservation.check_in) : null);
      setCheckOut(data.reservation.check_out ? new Date(data.reservation.check_out) : null);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      } 
    };

    


    fetchReservation();
  }, []);

  const { isAuthenticated } = useAuth(); // autenticação do login
  const router = useRouter()

  //  if (!isAuthenticated) {
  //  router.push("/login");
  //  return null;
  //  }

  const hotel_name = room?.description || "Nome do hotel"; 
  const hotel_address = room?.local || "Endereço não informado";
  const hotel_rating = room?.stars?.toString() || "N/A";
  const data_reserva = `${new Date(reservation?.check_in || "").toLocaleDateString("pt-BR")} - ${new Date(reservation?.check_out || "").toLocaleDateString("pt-BR")}`;
  const total_final = reservation?.total ? `R$ ${reservation.total.toFixed(2)}` : "-";
  //const guestCount = reservation?.guests || 1;

  const handleNext = () => {
    localStorage.setItem("id_reservation", reservation?.id || "");
    router.push("/reservation/confirm") // Redirect to the next page
  }

  const updateGuests = async (newGuestCount: number) => {
    const token = localStorage.getItem("accessToken");
  
    if (!reservation) return;
  
    try {
      const response = await fetch(
        `http://localhost:5001/api/reservations/${reservation.id}/guests`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ guests: newGuestCount }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Falha ao atualizar número de hóspedes");
      }
  
      const data = await response.json();
      console.log("Reserva atualizada:", data);
  
      setReservation({
        ...data.data,
        total: Number(data.data.total),
        guests: Number(data.data.guests),
      }); // atualiza o state com os novos dados
      setGuestCount(newGuestCount);
      
    } catch (error) {
      console.error("Erro ao atualizar hóspedes:", error);
    }
  };

  const updateDates = async (newCheckIn: Date | null, newCheckOut: Date | null) => {
    const token = localStorage.getItem("accessToken");
    if (!reservation || !newCheckIn || !newCheckOut) return;
  
    try {
      const response = await fetch(
        `http://localhost:5001/api/reservations/${reservation.id}/dates`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            check_in: newCheckIn.toISOString(),
            check_out: newCheckOut.toISOString(),
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar datas");
      }
  
      const data = await response.json();
      console.log("Datas atualizadas:", data);
  
      setReservation({
        ...data.data,
        total: Number(data.data.total),
        guests: Number(data.data.guests),
      });
      setCheckIn(new Date(data.data.check_in));
      setCheckOut(new Date(data.data.check_out));
      setIsCalendarOpen(false);
      setSelectedDateType(null);
    } catch (error) {
      console.error("Erro ao atualizar datas:", error);
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Header
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
                </header> */}

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {/* Back Link */}
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &lt; Detalhes da Reserva
        </button>
              

        {/* Hotel Card */}
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Hotel Image */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="relative rounded-lg overflow-hidden h-48 md:h-40">
                <Image src="/images/hotel-cin.jpg" alt="Hotel Image" fill className="object-cover" />
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
              <h1 className="text-2xl font-bold mb-2">{hotel_name}</h1>
              <p className="mb-4">{hotel_address}</p>
              <div className="text-lg">{hotel_rating} estrelas</div>
            </div>
          </div>
        </div>

        {/* Reservation Details */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Sua Reserva</h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Datas e hóspedes</h3>
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg">{data_reserva}</p>
              <div className="flex gap-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setSelectedDateType("check_in");
                      setIsCalendarOpen(true);
                    }}
                  >
                    editar check-in
                  </button>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setSelectedDateType("check_out");
                      setIsCalendarOpen(true);
                    }}
                  >
                    editar check-out
                  </button>
                </div>
                  
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg">{guestCount} hóspedes</p>
              <button onClick={() => setIsGuestCounterOpen(true)} className="text-blue-600 hover:underline">
                editar hóspedes
              </button>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Preços</h2>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg"> </p>
            <p className="text-lg"> </p>
          </div>
          <div className="flex justify-between items-center text-xl font-bold">
            <p>Total (BRL)</p>
            {reservation?.check_in && reservation?.check_out
              ? `R$ ${(reservation.total * ((new Date(reservation.check_out).getTime() - new Date(reservation.check_in).getTime()) / (1000 * 60 * 60 * 24))).toFixed(2)}`
              : total_final}
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
              Faça{" "}
              <button onClick={() => router.push("/login")} className="underline text-blue-600 hover:text-blue-800">
                Login
              </button>
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
      {/* Guest Counter Popup */}
      <GuestCounter
        //id= "guest-counter"
        initialCount={guestCount}
        isOpen={isGuestCounterOpen}
        onClose={() => setIsGuestCounterOpen(false)}
        onSave={(count) => {
          console.log("Novo número de hóspedes:", count);
          updateGuests(count); // Atualiza no back
          setIsGuestCounterOpen(false); // Fecha o popup
        }}
      />
      {isCalendarOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Selecione nova data de {selectedDateType === "check_in" ? "entrada" : "saída"}
      </h3>
      <SimpleCalendar
        selectedDate={
          selectedDateType === "check_in"
            ? reservation?.check_in ? new Date(reservation.check_in) : undefined
            : reservation?.check_out ? new Date(reservation.check_out) : undefined
        }
        onDateSelect={(date) => {
          if (selectedDateType === "check_in") {
            setCheckIn(date);
            setSelectedDateType("check_out"); // Vai pedir a próxima
          } else if (selectedDateType === "check_out") {
            setCheckOut(date);
            if (checkIn && date > checkIn) {
              updateDates(checkIn, date); // Envia para o backend
            } else {
              alert("Data de saída deve ser depois do check-in.");
            }
          }
        }}
        minDate={new Date()}
      />
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsCalendarOpen(false)}
          className="text-sm text-blue-600 hover:underline"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  )
}

//TO DO
//Pegar informações do hotel (Falar com ALLan)
// Falar com allan sobre a autenticação
