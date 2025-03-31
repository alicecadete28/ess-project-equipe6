"use client"

import { useEffect, useState } from "react"
import { ReservationCard } from "@/components/ui/reservation-card"
import { ReservationDetailsModal } from "@/components/ui/reservation-details-modal"
import type { Reservation, Room } from "@/components/types/interface"
import { useAuth } from "@/hooks/useAuth"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
// import ProtectedRoute from "@/components/ProtectedRoute"

// Dados de exemplo das reservas
const reservationsFallbackData: [Reservation, Room][] = [ 
  [
    {
      id: "1",
      pf_id: "aaa",
      room_id: "101",
      check_in: new Date("2025-03-20"),
      check_out: new Date("2025-03-22"),
      guests: 1,
      total: 103.59,
      status: "Confirmada",
      rating: { stars: 5, comment: "Ótima estadia" },
    },
    {
      id: "101",
      pj_id: "PJ001",
      description: "CIn - Sala E121",
      type: "Conferência",
      price: 200,
      capacity: 50,
      caracteristics_ids: ["wifi", "ar_condicionado", "projetor"],
      local: "Recife",
      stars: 5,
      ar_condicionado: true,
      tv: false,
      wifi: true,
      petFriendly: false,
      cafeDaManha: false,
      estacionamento: true,
      avaliacao: 4.8,
    },
  ],
  [
    {
      id: "2",
      pf_id: "UFPE",
      room_id: "102",
      check_in: new Date("2025-03-26"),
      check_out: new Date("2025-03-30"),
      guests: 2,
      total: 457.90,
      status: "Confirmada",
      rating: { stars: 4, comment: "Muito bom" },
    },
    {
      id: "102",
      pj_id: "PJ002",
      description: "CIn - Sala E122",
      type: "Padrão",
      price: 100,
      capacity: 20,
      caracteristics_ids: ["wifi", "tv"],
      local: "Recife",
      stars: 4,
      ar_condicionado: false,
      tv: true,
      wifi: true,
      petFriendly: false,
      cafeDaManha: false,
      estacionamento: false,
      avaliacao: 4.2,
    },
  ],
  [
    {
      id: "3",
      pf_id: "UFPE",
      room_id: "103",
      check_in: new Date("2025-04-04"),
      check_out: new Date("2025-04-12"),
      guests: 3,
      total: 1033.59,
      status: "Pendente",
      rating: { stars: 3, comment: "Aguardando confirmação" },
    },
    {
      id: "103",
      pj_id: "PJ003",
      description: "CIn - Sala E123",
      type: "Evento",
      price: 500,
      capacity: 100,
      caracteristics_ids: ["wifi", "ar_condicionado", "estacionamento"],
      local: "Recife",
      stars: 3,
      ar_condicionado: true,
      tv: false,
      wifi: true,
      petFriendly: false,
      cafeDaManha: false,
      estacionamento: true,
      avaliacao: 3.5,
    },
  ],
];


export default function ReservationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [presentMockData, setPresentMockData] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<Room| null>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [reservationsFetched, setReservationsFetched] = useState<Reservation[]>([])
  const [reservationRoomPairs, setReservationRoomPairs] = useState<[Reservation, Room | null][]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchAttempted, setFetchAttempted] = useState(false)
  const Dados = useAuth()
  console.log(Dados)

  useEffect(() => {
    if (!Dados?.isAuthenticated) return
    if (fetchAttempted) return

    async function fetchReservations() {
        console.log("Fetching reservations")
        if(loading) return

        setLoading(true)
        setError(null)

        try {
          //
          const token = localStorage.getItem("accessToken") as string
          console.log("Token:", token)
          const user_id = String(Dados.user?.id)
          console.log(Dados)
          console.log("user_id",user_id)
          localStorage.setItem("user_id", user_id)

          console.log(user_id)
          const reservationsResponse = await fetch(`http://localhost:5001/api/reservations/${user_id}/pf`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          })

          //checar se consguiu realizar o fetch
          if (!reservationsResponse.ok) {
            console.log(`HTTP error! status: ${reservationsResponse.status}`)
            // setFavoriteIds([])
            // setRooms([])
            setLoading(false)
            setFetchAttempted(true)
            return
          }
          
          //imprimir o array raw de reservationsResponse para verificacao
          const reservationsData = await reservationsResponse.json()
          console.log("Raw favorites response:", reservationsData)

          if (reservationsData.length === 0) {
            console.log("No reservations found in response")
            // setFavoriteIds([])
            // setRooms([])
            setLoading(false)
            setFetchAttempted(true)
            return
          }

          setReservationsFetched(reservationsData) // ver de juntar os elementos do array numa tupla
          console.log("Rooms data fetched:", reservationsData)
          console.log("reservation datas fetched:", reservationsFetched)

          const reservationRoomPairsAux: [Reservation, Room | null][] = []

          for (const reservation of reservationsData){
            const roomResponse = await fetch(`http://localhost:5001/api/get-room/${reservation.room_id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            console.log("Room response:", roomResponse)
            if (!roomResponse.ok) {
              console.error(`Failed to fetch room ${reservation.room_id}: ${roomResponse.status}`)
              continue // Skip this room but continue with others
            }

            const roomData = await roomResponse.json()
            // roomData.image = "/placeholder.svg?height=200&width=300"
            reservationRoomPairsAux.push([reservation, roomData]) 
          }

          setReservationRoomPairs(reservationRoomPairsAux)
          console.log("Reservation-room pairs:", reservationRoomPairsAux)
        }
        catch (error) {
          console.error("Error fetching favorites:", error)
          setError(error instanceof Error ? error.message : "Failed to fetch favorites")
        } finally {
          setLoading(false)
          setFetchAttempted(true)
        }

    }

    fetchReservations()

    return () => {
      console.log("unmounted")
    }
  }, [Dados])

  const handleRetry = () => {
    setFetchAttempted(false) // Reset fetch attempted flag to trigger a new fetch
  }

  const handleMock = () => {
    setPresentMockData(true) // Reset fetch attempted flag to trigger a new fetch
  }

  const handleCardClick = (reservation: Reservation, room: Room) => {
    setSelectedReservation(reservation)
    setSelectedRoom(room)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleEditReservation = (id: string) => {
    console.log(`Editing reservation ${id}`)
    setIsModalOpen(false)
    // Implementar lógica de edição aqui
  }

  const handleCancelReservation = async (id: string) => {
    console.log(`Canceling reservation ${id}`)
    setIsModalOpen(false)
    
    try{
      const token = localStorage.getItem("accessToken") as string 
          console.log("Token:", token)
          const user_id = String(Dados.user?.id)
          console.log(Dados)
          console.log("user_id",user_id)
          localStorage.setItem("user_id", user_id)
      console.log("token", token)
      const reservationsResponse = await fetch(`http://localhost:5001/api/reservations/${id}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        })
      console.log("Response:", reservationsResponse)

      if (!reservationsResponse.ok) {
        console.log(`HTTP error! status: ${reservationsResponse.status}`)
        setError("Failed to cancel reservation")
        return
      }

    } catch (error) {
      console.error("Error canceling reservation:", error)
      setError(error instanceof Error ? error.message : "Failed to cancel reservation")
    } 

    return () => {
      console.log("unmounted")
    }
    
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Title */}
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold text-center text-[#0079c2] mb-12">Suas Reservas</h1>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        { loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#1976d2]" />
            <span className="ml-2 text-lg">Carregando favoritos...</span>
          </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="flex flex-col items-center justify-center">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <p className="text-lg mb-4">Erro ao carregar favoritos: {error}</p>
                <button
                  onClick={handleRetry}
                  className="bg-[#1976d2] text-white px-6 py-2 rounded-md hover:bg-[#1565c0] transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          ) : reservationRoomPairs.filter(([reservation]) => reservation.status !== "canceled").length > 0 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {reservationRoomPairs
                  .filter(([reservation]) => reservation.status !== "canceled")
                  .map(([reservation, room]) => (
                  <ReservationCard key={reservation.id} reservation={reservation} room={room!} onClick={handleCardClick} />
                  ))}
                </div>
          ): presentMockData ? (
            <h2 className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {reservationsFallbackData.map(([reservation, room], index) => (
                <ReservationCard key={reservation.id} reservation={reservation} room={room} onClick={handleCardClick} />
              ))}
            </h2>
          )
          : (
            <h1 className="text-center py-12">
              <p className="text-lg">Nenhuma reserva encontrada.</p>
              {/* <button
                  onClick={handleMock}
                  className="bg-[#1976d2] text-white px-6 py-2 rounded-md hover:bg-[#1565c0] transition-colors"
                >
                  Mostrar Dados mockados
                </button> */}
            </h1>
          )
          }
      </div>

      <ReservationDetailsModal
        reservation={selectedReservation}
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEdit={handleEditReservation}
        onCancel={handleCancelReservation}
      />
    </div>
  )
}

