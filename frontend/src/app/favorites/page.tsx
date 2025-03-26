"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft, Heart, Users, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Hotel {
  id: string
  name: string
  image: string
  guests: number
}

export default function FavoritesPage() {
  const [data, setData] = useState<Hotel[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchAttempted, setFetchAttempted] = useState(false)

  useEffect(() => {
    // Only run once when component mounts
    if (fetchAttempted) return

    async function fetchData() {
      console.log("fetching")
      if (loading) return

      setLoading(true)
      setError(null)

      try {
        // Get token from localStorage
        const token = localStorage.getItem("accessToken") as string
        console.log("Token:", token)

        // Make request with authorization header
        const response = await fetch("http://localhost:5001/api/favorites/12732", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const json = await response.json()
        setData(json)
        console.log("Data fetched successfully:", json)
      } catch (error) {
        console.error("Error fetching favorites:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch favorites")
      } finally {
        setLoading(false)
        setFetchAttempted(true)
      }
    }

    fetchData()

    return () => {
      console.log("unmounted")
    }
  }, []) // Empty dependency array to run only once

  const handleRetry = () => {
    setFetchAttempted(false) // Reset fetch attempted flag to trigger a new fetch
  }

  // Fallback data for testing if API is not available
  const fallbackData: Hotel[] = [
    {
      id: "1",
      name: "Hotel Centro de Informática",
      image: "/placeholder.svg?height=200&width=300",
      guests: 2,
    },
    {
      id: "2",
      name: "Hotel Star",
      image: "/placeholder.svg?height=200&width=300",
      guests: 3,
    },
  ]

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Plain white header */}
      <header className="h-16 bg-white border-b"></header>

      {/* Back button and title */}
      <div className="p-4 flex items-center">
        <Link href="#" className="mr-4">
          <ArrowLeft size={40} className="text-black" />
        </Link>
        <button className="bg-[#1976d2] text-white px-16 py-3 rounded-full text-xl">favoritos</button>
      </div>

      {/* Hotel cards */}
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
              {fallbackData.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col md:flex-row mb-6"
                >
                  <div className="w-full md:w-1/3">
                    <Image
                      src={hotel.image || "/placeholder.svg"}
                      alt={hotel.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6 flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">{hotel.name}</h2>
                      <div className="flex items-center">
                        <Users className="mr-2" />
                        <span>Hóspedes - {hotel.guests} pessoas</span>
                      </div>
                    </div>
                    <Heart fill="#ff0707" color="#ff0707" size={40} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : data && data.length > 0 ? (
          data.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col md:flex-row">
              <div className="w-full md:w-1/3">
                <Image
                  src={hotel.image || "/placeholder.svg?height=200&width=300"}
                  alt={hotel.name}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-6 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">{hotel.name}</h2>
                  <div className="flex items-center">
                    <Users className="mr-2" />
                    <span>Hóspedes - {hotel.guests} pessoas</span>
                  </div>
                </div>
                <Heart fill="#ff0707" color="#ff0707" size={40} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-lg">Nenhum favorito encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}

