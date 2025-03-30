"use client"

import Image from "next/image"
import { Heart, Bookmark, Share, ChevronDown, Users, Copy, ChevronLeft  } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import AppHeader from "@/components/Header";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute"
import Link from "next/link"
import { isDeepStrictEqual } from "util"
import { id } from "date-fns/locale"
//import PfRepository "../../backend/repositories/"

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


export default function HotelDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [fetchAttempted, setFetchAttempted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])

  const router = useRouter();

  const handleShare = () => {
    setShowSharePopup(!showSharePopup)
  }

  const storedRoom = sessionStorage.getItem("selectedRoom");
  const room: Room | null = storedRoom ? JSON.parse(storedRoom) : null;

  const paramsString = sessionStorage.getItem("parametrosBusca");
  if (!paramsString) return;
  const parametros = JSON.parse(paramsString);

  const roomId = room?.id || "";
  const description = room?.description || "Descrição indisponível";
  const rawDate = parametros?.data_ida || "Data não disponível";
  const dataIda = rawDate ? new Date(rawDate).toLocaleDateString("pt-BR") : "Data não disponível";
  const rawVolta = parametros?.data_volta;
  const dataVolta = rawVolta ? new Date(rawVolta).toLocaleDateString("pt-BR") : "Data não disponível";
  const valor = room?.price?.toLocaleString("pt-BR") || "0,00";
  const hospedes = `${parametros?.num_pessoas || 2} hóspedes`;

  const Dados = useAuth();
  console.log(Dados);

  function toggleRoomId(ids: string[], roomId: string): string[] {
    if (ids.includes(roomId)) {
      // Se já está nos favoritos, remove
      return ids.filter((id) => id !== roomId)
    } else {
      // Se não está, adiciona
      return [...ids, roomId]
    }
  }

  async function patchSaved(ids: string[]) {
    console.log("Patching saved")
    if (loading) return
  
    setLoading(true)
    setError(null)
  
    try {
      const token = localStorage.getItem("accessToken") as string
      console.log("Token:", token)
      const user_id = String(Dados.user?.id)
      console.log(Dados)
      console.log("user_id", user_id)
      localStorage.setItem("user_id", user_id)
  
      console.log(user_id)
      const PatchSavedResponse = await fetch(`http://localhost:5001/api/saved/${user_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          savedRooms: ids
        })
      })
  
      if (!PatchSavedResponse.ok) {
        console.log(`HTTP error! status: ${PatchSavedResponse.status}`)
        setLoading(false)
        setFetchAttempted(true)
        return
      }
  
      const savedData = await PatchSavedResponse.json()
      console.log("Raw saved response:", savedData)
      setLoading(false)
  
    } catch (error) {
      console.error("Error patching saved:", error)
      setError(error instanceof Error ? error.message : "Failed to fetch saved")
    } 
  }
  

  async function patchFavorites(ids: string[]) {
    console.log("Patching favorites")
    if (loading) return

    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem("accessToken") as string
      console.log("Token:", token)
      const user_id = String(Dados.user?.id)
      console.log(Dados)
      console.log("user_id",user_id)
      localStorage.setItem("user_id", user_id)

      console.log(user_id)
      const PatchFavoritesResponse = await fetch(`http://localhost:5001/api/favorites/${user_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          favorites: ids
        })
      })

      if (!PatchFavoritesResponse.ok) {
        console.log(`HTTP error! status: ${PatchFavoritesResponse.status}`)
        setLoading(false)
        setFetchAttempted(true)
        return
      }
      
      
      const favoritesData = await PatchFavoritesResponse.json()
      console.log("Raw favorites response:", favoritesData)
      setLoading(false)

    } catch (error) {
      console.error("Error patching favorites:", error)
      setError(error instanceof Error ? error.message : "Failed to fetch favorites")
    } 
  }

  const handleCopyLink = () => {
    // In a real app, you would copy the actual URL to clipboard
    navigator.clipboard
      .writeText("http://localhost:3000/share")
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  const handleFavoritos = async () => {
    try {
      const token = localStorage.getItem("accessToken") as string
      const user_id = String(Dados.user?.id)

      const response = await fetch(`http://localhost:5001/api/favorites/${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      let ids: string[] = []

      if (Array.isArray(data?.data)) {
        ids = data.data
      }

      console.log("roomId:", roomId, typeof roomId)
      console.log("ids antes:", ids)
      ids.forEach(id => console.log("id do array:", id, typeof id))
      const updatedIds = toggleRoomId(ids, roomId)
      console.log("Updated favorites:", updatedIds)

      await patchFavorites(updatedIds)

      // Atualiza o estado de favorito com base na nova lista
      setIsFavorite(updatedIds.includes(roomId))

    } catch (err) {
      console.error("Erro ao lidar com favoritos:", err)
    }
  }

  const handleSaved = async () => {
  try {
    const token = localStorage.getItem("accessToken") as string
    const user_id = String(Dados.user?.id)

    const response = await fetch(`http://localhost:5001/api/saved/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    let ids: string[] = []

    if (Array.isArray(data?.data)) {
      ids = data.data
    }

    console.log("roomId:", roomId, typeof roomId)
    console.log("ids antes:", ids)
    ids.forEach(id => console.log("id do array:", id, typeof id))
    const updatedIds = toggleRoomId(ids, roomId)
    console.log("Updated saved:", updatedIds)

    await patchSaved(updatedIds)

    // Atualiza o estado de salvo com base na nova lista
    setIsSaved(updatedIds.includes(roomId))

  } catch (err) {
    console.error("Erro ao lidar com saved:", err)
  }
  }

  const handleReservar = async () => {
    try {
      const token = localStorage.getItem("accessToken") as string
      const user_id = String(Dados.user?.id)
  
      const response = await fetch(`http://localhost:5001/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pf_id: user_id,
          room_id: roomId,
          check_in: parametros?.data_ida,
          check_out: parametros.data_volta,
          guests: parametros.num_pessoas,
          total: valor,
          confirmed: false
        })
      })
      
      const data = await response.json()
      const newReservation = data.data
      console.log("id reservation", newReservation.id)
      console.log("resposta", data)

      localStorage.setItem("id_reservation", JSON.stringify(newReservation.id));
      router.push("/reservation");

    } catch (err) {
    console.error("Erro ao lidar com handleReservar:", err)
    }
  }


  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const token = localStorage.getItem("accessToken") as string
        const user_id = String(Dados.user?.id)
    
        const response = await fetch(`http://localhost:5001/api/favorites/${user_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
    
        const data = await response.json()
        const ids = Array.isArray(data?.data) ? data.data : []
        setIsFavorite(ids.includes(roomId))
      } catch (err) {
      console.error("Erro ao lidar com favoritos:", err)
      }
    }

    const checkIfSaved= async () => {
      try {
        const token = localStorage.getItem("accessToken") as string
        const user_id = String(Dados.user?.id)
    
        const response = await fetch(`http://localhost:5001/api/saved/${user_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
    
        const data = await response.json()
        const ids = Array.isArray(data?.data) ? data.data : []
        setIsSaved(ids.includes(roomId))

      }catch (err) {
        console.error("Erro ao lidar com salvos:", err)
      }
    }

  
    if (Dados.isAuthenticated) {
      checkIfFavorite()
      checkIfSaved()
    }
  }, [Dados, roomId])
  

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      {/* Plain white header */}
      <AppHeader />

      {/* Main content */}
      <div className="flex flex-col md:flex-row p-4 gap-4">
        {/* Left side - Hotel info and images */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-2 hover:bg-gray-100 p-1 rounded-full"
              aria-label="Go back"
            >
              <ChevronLeft size={24} />
            </button>
            {description}
          </h1>

          {/* Hotel images */}
          <div className="grid grid-cols-12 gap-2 mb-6">
            <div className="col-span-8 row-span-2">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Hotel pool view"
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="col-span-4">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Hotel room"
                width={300}
                height={200}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="col-span-4 relative">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Hotel food"
                width={300}
                height={200}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                <span className="text-white text-xl font-bold">+5 fotos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Booking panel */}
        <div className="w-full md:w-1/3 relative">
          {/* Action buttons */}
          <div className="flex justify-end gap-4 mb-4">
            <button
              onClick={handleFavoritos}
              className="focus:outline-none"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={32} className={isFavorite ? "text-[#ff0707] fill-[#ff0707]" : "text-black"} />
            </button>
            <button
              onClick={handleSaved}
              className="focus:outline-none"
              aria-label={isSaved ? "Remove bookmark" : "Add bookmark"}
            >
              <Bookmark size={32} className={isSaved ? "text-black fill-black" : "text-black"} />
            </button>
            <button
              onClick={handleShare}
              className="focus:outline-none"
              aria-label="Share"
              aria-expanded={showSharePopup}
            >
              <Share size={32} className="text-black" />
            </button>
          </div>

          {/* Share Popup */}
          {showSharePopup && (
            <div className="absolute top-12 right-0 z-10 bg-[#0079c2] text-white p-6 rounded-2xl shadow-lg w-80">
              <div className="absolute w-4 h-4 bg-[#0079c2] transform rotate-45 -top-2 right-6"></div>
              <h3 className="text-2xl font-bold mb-4 text-center">Compartilhar Reserva</h3>
              <button
                onClick={handleCopyLink}
                className="w-full bg-white text-black py-3 px-4 rounded-full flex items-center justify-between"
              >
                <span className="text-xl font-medium">Copiar link</span>
                <Copy size={24} />
              </button>
              {copySuccess && <div className="mt-2 text-center text-sm">Link copiado!</div>}
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-3xl font-bold mb-6">R$ {valor} diária</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#e9e9e9] p-4 rounded-lg">
                <div className="text-sm font-medium mb-1">check-in</div>
                <div className="font-bold">{dataIda}</div>
              </div>
              <div className="bg-[#e9e9e9] p-4 rounded-lg">
                <div className="text-sm font-medium mb-1">check-out</div>
                <div className="font-bold">{dataVolta}</div>
              </div>
            </div>

            <div className="bg-[#e9e9e9] p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users className="mr-2" />
                  <span className="font-medium">hóspedes</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">{hospedes}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleReservar}
              className="w-full bg-[#0079c2] text-white py-4 rounded-lg text-xl font-bold">Reservar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
