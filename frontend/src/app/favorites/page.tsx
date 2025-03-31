"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft, Heart, Users, Loader2, AlertCircle, Star, Wifi, Tv, Car, Coffee, Dog, Wind } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import ProtectedRoute from "@/components/ProtectedRoute"

// Updated interface to match the room entity structure
interface Room {
  id: string
  pj_id: string
  description: string
  type: string
  price: number
  capacity: number
  caracteristics_ids: string[]
  local: string
  stars: number
  ar_condicionado: boolean
  tv: boolean
  wifi: boolean
  petFriendly: boolean
  cafeDaManha: boolean
  estacionamento: boolean
  avaliacao: number
}

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchAttempted, setFetchAttempted] = useState(false)
  const Dados = useAuth();
  console.log(Dados);

  useEffect(() => {
    // Only run once when component mounts
    if (!Dados?.isAuthenticated) return
    if (fetchAttempted) return

    async function fetchFavorites() {
      console.log("Fetching favorites")
      if (loading) return

      setLoading(true)
      setError(null)
  

      try {
        // Get token from localStorage
        const token = localStorage.getItem("accessToken") as string
        console.log("Token:", token)
        const user_id = String(Dados.user?.client?.id)
        console.log(Dados)
        console.log("user_id",user_id)
        localStorage.setItem("user_id", user_id)

        // Step 1: Fetch list of favorite room IDs
        console.log(user_id)
        const favoritesResponse = await fetch(`http://localhost:5001/api/favorites/${user_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!favoritesResponse.ok) {
          console.log(`HTTP error! status: ${favoritesResponse.status}`)
          setFavoriteIds([])
          setRooms([])
          setLoading(false)
          setFetchAttempted(true)
          return
        }

        const favoritesData = await favoritesResponse.json()
        console.log("Raw favorites response:", favoritesData)

        // Handle different response formats
        let ids: string[] = []

        if (Array.isArray(favoritesData)) {
          // If it's already an array, use it directly
          ids = favoritesData
        } else if (favoritesData && typeof favoritesData === "object") {
          // If it's an object, check if it has a data property or similar
          if (Array.isArray(favoritesData.data)) {
            ids = favoritesData.data
          } else if (Array.isArray(favoritesData.favorites)) {
            ids = favoritesData.favorites
          } else if (Array.isArray(favoritesData.ids)) {
            ids = favoritesData.ids
          } else {
            // If it's an object with IDs as keys or values
            const possibleIds = Object.values(favoritesData).filter(
              (val) => typeof val === "string" || typeof val === "number",
            )
            if (possibleIds.length > 0) {
              ids = possibleIds.map((id) => String(id))
            }
          }
        } else if (typeof favoritesData === "string") {
          // If it's a single string ID
          ids = [favoritesData]
        }

        if (ids.length === 0) {
          console.log("No favorite IDs found in response")
          setFavoriteIds([])
          setRooms([])
          setLoading(false)
          setFetchAttempted(true)
          return
        }

        setFavoriteIds(ids)
        console.log("Favorite IDs processed:", ids)

        // Step 2: Fetch details for each room
        const roomsData: Room[] = []

        for (const id of ids) {
          try {
            const roomResponse = await fetch(`http://localhost:5001/api/get-room/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })

            if (!roomResponse.ok) {
              console.error(`Failed to fetch room ${id}: ${roomResponse.status}`)
              continue // Skip this room but continue with others
            }

            const roomData = await roomResponse.json()
            // Add a placeholder image for display
            roomData.image = "/placeholder.svg?height=200&width=300"
            roomsData.push(roomData)
          } catch (roomError) {
            console.error(`Error fetching room ${id}:`, roomError)
            // Continue with other rooms
          }
        }

        setRooms(roomsData)
        console.log("Rooms data fetched:", roomsData)
      } catch (error) {
        console.error("Error fetching favorites:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch favorites")
      } finally {
        setLoading(false)
        setFetchAttempted(true)
      }
    }

    fetchFavorites()

    return () => {
      console.log("unmounted")
    }
  }, [Dados]) // Empty dependency array to run only once

  const handleRetry = () => {
    setFetchAttempted(false) // Reset fetch attempted flag to trigger a new fetch
  }

  // Fallback data for testing if API is not available
  const fallbackData: Room[] = [
    {
      id: "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1e",
      pj_id: "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1b",
      description: "Hotel Centro de Informática",
      type: "Seed",
      price: 400,
      capacity: 2,
      caracteristics_ids: ["Seed"],
      local: "Recife",
      stars: 3,
      ar_condicionado: true,
      tv: true,
      wifi: false,
      petFriendly: false,
      cafeDaManha: true,
      estacionamento: true,
      avaliacao: 5,
    },
    {
      id: "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1f",
      pj_id: "f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1c",
      description: "Hotel Star",
      type: "Seed",
      price: 500,
      capacity: 3,
      caracteristics_ids: ["Seed"],
      local: "João Pessoa",
      stars: 4,
      ar_condicionado: true,
      tv: true,
      wifi: true,
      petFriendly: true,
      cafeDaManha: true,
      estacionamento: false,
      avaliacao: 4,
    },
  ]

  // Function to render amenities icons
  const renderAmenities = (room: Room) => {
    return (
      <div className="flex flex-wrap gap-3 mt-2">
        {room.wifi && <Wifi size={18} className="text-gray-600" />}
        {room.tv && <Tv size={18} className="text-gray-600" />}
        {room.estacionamento && <Car size={18} className="text-gray-600" />}
        {room.cafeDaManha && <Coffee size={18} className="text-gray-600" />}
        {room.petFriendly && <Dog size={18} className="text-gray-600" />}
        {room.ar_condicionado && <Wind size={18} className="text-gray-600" />}
      </div>
    )
  }

  return (
    <ProtectedRoute><div className="min-h-screen bg-[#fafafa]">
    {/* Plain white header */}
    <header className="h-16 bg-white border-b"></header>

    {/* Back button and title */}
    <div className="p-4 flex items-center">
      <Link href="/resultados" className="mr-4">
        <ArrowLeft size={40} className="text-black" />
      </Link>
      <button className="bg-[#1976d2] text-white px-16 py-3 rounded-full text-xl">Favoritos</button>
    </div>

    {/* Room cards */}
    <div className="px-4 py-6 space-y-6">
      {loading ? (
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

          {/* Show fallback data for testing */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-6">Dados de exemplo:</h3>
            {fallbackData.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col md:flex-row mb-6"
              >
                <div className="w-full md:w-1/3">
                  <Image
                    src={`https://picsum.photos/seed/${room.id}/300/200`}
                    alt={room.description}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">{room.description}</h2>
                    <div className="flex items-center mb-2">
                      <Users className="mr-2" />
                      <span>Hóspedes - {room.capacity} pessoas</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[...Array(room.stars)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{room.local}</span>
                    </div>
                    {renderAmenities(room)}
                  </div>
                  <div className="flex flex-col items-end"> 
                    <Heart fill="#ff0707" color="#ff0707" size={40} />
                    <div className="mt-auto text-xl font-bold">R$ {room.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-1/3">
              <Image
                src={`https://picsum.photos/seed/${room.id}/300/200`}
                alt={room.description}
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{room.description}</h2>
                <div className="flex items-center mb-2">
                  <Users className="mr-2" />
                  <span>Hóspedes - {room.capacity} pessoas</span>
                </div>
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(room.stars)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{room.local}</span>
                </div>
                {renderAmenities(room)}
              </div>
              <div className="flex flex-col items-end">
                <Heart fill="#ff0707" color="#ff0707" size={40} />
                <div className="mt-auto text-xl font-bold">R$ {room.price}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-lg">Nenhum favorito encontrado.</p>
        </div>
      )}
    </div>
  </div></ProtectedRoute>
  )
}

