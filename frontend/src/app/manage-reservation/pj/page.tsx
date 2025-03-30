"use client"

import Image from "next/image"
import { User } from "lucide-react"
import LocationCard from "@/components/ui/location-card"
import { locations } from "@/lib/data"
import { get } from "http"
import { useAuth } from "@/hooks/useAuth"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useEffect, useState } from "react"

export default function Home() {
  const Data = useAuth();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchAttempted, setFetchAttempted] = useState(false)
  //TODO: Implementar fetch das localidades do usuário logado

  useEffect(() => {
    if (!Data?.isAuthenticated) return
    if (fetchAttempted) return

    async function fetchLocations() {
        console.log("Fetching locations")
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
          const locationsResponse = await fetch(`http://localhost:5001/api/locations/${user_id}/pf`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log("Response:", locationsResponse)
          if (!locationsResponse.ok) {
            throw new Error("Falha ao buscar locais")
          }
          const locationsData = await locationsResponse.json()
          console.log("Data:", locationsData)
          // setLocations(locationsData)
          setFetchAttempted(true)
        } catch (error) {
          // setError(error.message)
        } finally {
          setLoading(false)
        }
    }

    fetchLocations()
  })
  

  return (
    <div className="min-h-screen bg-gray-50 mt-20">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-[#0079c2] mb-12">Seus Quartos</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((location) => (
            <LocationCard key={location.id} {...location} />
          ))}
        </div>
      </main>
    </div>
  )
}

