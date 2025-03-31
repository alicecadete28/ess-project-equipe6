"use state"

import Image from "next/image"
import Link from "next/link"
import type { Room } from "@/components/types/interface"
import { ca } from "date-fns/locale"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"

export default function LocationCard({ id, description, local, stars}: Room) {
    const Dados = useAuth();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [fetchAttempted, setFetchAttempted] = useState(false)
    const [rooms, setRooms] = useState<Room[]>([])

  // const reservationsQuantity = async () => {
  //   try {
  //     const token = localStorage.getItem("accessToken") as string 
  //     console.log("Token:", token)
  //     const user_id = String(Dados.user?.id)
  //     console.log(Dados)
  //     console.log("user_id",user_id)
  //     localStorage.setItem("user_id", user_id)

  //     const locationsResponse = await fetch(`http://localhost:5001//api/reservations/${id}/room`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })

  //     console.log("Response:", locationsResponse)

  //     if (!locationsResponse.ok) {
  //       console.log(`HTTP error! status: ${locationsResponse.status}`),
  //       setLoading(false),
  //       setFetchAttempted(true)
  //       return
  //     }

  //     const locationsData = await locationsResponse.json()
  //     console.log("Data:", locationsData)

  //     return locationsData.length 
  //   } catch (error) {
  //     console.error("Error fetching favorites:", error)
  //     setError(error instanceof Error ? error.message : "Failed to fetch favorites")
  //   } 
  // } 

  return (
    <Link href={`/manage-reservation/pj/${id}`} className="block">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="w-1/3">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Building"
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-2/3 p-5">
            <h2 className="text-xl font-bold text-[#0079c2] mb-2">{description}</h2>
            <p className="text-sm mb-4">{local}</p>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-[#0079c2]">Avaliação:</span> {stars}
              </p>
              <p>
                <span className="text-[#0079c2]">Estrelas:</span> {stars}
              </p>
              {/* <p>
                <span className="text-[#0079c2]">Quantidade de Reservas:</span> {reservationsQuantity()} 
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

