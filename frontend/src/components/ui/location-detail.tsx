import Image from "next/image"
import type { Location } from "@/components/types/reservation"
import { formatCurrency } from "@/lib/utils"

interface LocationDetailProps {
  location: Location
}

export default function LocationDetail({ location }: LocationDetailProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="mb-6">
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt={location.name}
            width={400}
            height={300}
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        <h2 className="text-2xl font-bold text-[#0079c2] mb-2">{location.name}</h2>
        <p className="text-sm mb-6">{location.address}</p>

        <div className="space-y-2 mb-6">
          <p>
            <span className="text-[#0079c2]">Avaliação:</span> {location.rating}
          </p>
          <p>
            <span className="text-[#0079c2]">Estrelas:</span> {location.stars}
          </p>
        </div>

        <p className="text-lg">
          <span className="text-[#0079c2]">Valor da diária:</span>{" "}
          {location.dailyRate ? formatCurrency(location.dailyRate) : "R$ XX,xx"}
        </p>
      </div>
    </div>
  )
}

