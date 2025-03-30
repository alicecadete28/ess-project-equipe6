"use client"

import Image from "next/image"
import { User } from "lucide-react"
import LocationCard from "@/components/ui/location-card"
import { locations } from "@/lib/data"
import { get } from "http"
import { useAuth } from "@/hooks/useAuth"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useEffect, useState } from "react"
import { Room } from "@/components/types/interface"

const roomsFallbackData: Room[] = [
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
]

export default function Home() {
  const Data = useAuth();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchAttempted, setFetchAttempted] = useState(false)
  const [rooms, setRooms] = useState<Room[]>([])
  //TODO: Implementar fetch das localidades do usuário logado

  useEffect(() => {
    if (!Data?.isAuthenticated) return
    if (fetchAttempted) return

    async function fetchLocations() {
        console.log("Fetching rooms...")
        if(loading) return

        setLoading(true)
        setError(null)

        try {
          //
          const token = localStorage.getItem("accessToken") as string
          console.log("Token:", token)
          const user_id = String(Data.user?.id)
          console.log(Data)
          console.log("user_id",user_id)
          localStorage.setItem("user_id", user_id)

          console.log(user_id)
          const locationsResponse = await fetch(`http://localhost:5001/api/rooms/pj/${user_id}/room`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          })

          console.log("Response:", locationsResponse)

          if (!locationsResponse.ok) {
            console.log(`HTTP error! status: ${locationsResponse.status}`),
            setLoading(false),
            setFetchAttempted(true)
            return
          }

          const locationsData = await locationsResponse.json()
          if (locationsData.length === 0) {
            console.log("No reservations found in response")
            // setFavoriteIds([])
            // setRooms([])
            setLoading(false)
            setFetchAttempted(true)
            return
          }
          console.log("Data:", locationsData)
          setRooms(locationsData)
          setFetchAttempted(true)
        } catch (error) {
          // setError(error.message)
          console.error("Error fetching favorites:", error)
          setError(error instanceof Error ? error.message : "Failed to fetch favorites")
        } finally {
          setLoading(false)
          setFetchAttempted(true)
        }
    }

    fetchLocations()

    return () => {
      console.log("unmounted")
    }
  }, [Data])
  

  return (
    <ProtectedRoute><div className="min-h-screen bg-gray-50 mt-20">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-[#0079c2] mb-12">Seus Quartos</h1>

       
          { rooms.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map((room) => (
              <LocationCard key={room.id} {...room} />
            ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roomsFallbackData.map((room) => (
              <LocationCard key={room.id} {...room} />
            ))}
            </div>
          )
          }
      </main>
    </div></ProtectedRoute>
  )
}

