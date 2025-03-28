import Image from "next/image"
import Link from "next/link"
import type { Location } from "@/components/types/interface"

export default function LocationCard({ id, name, address, rating, stars, reservations }: Location) {
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
            <h2 className="text-xl font-bold text-[#0079c2] mb-2">{name}</h2>
            <p className="text-sm mb-4">{address}</p>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-[#0079c2]">Avaliação:</span> {rating}
              </p>
              <p>
                <span className="text-[#0079c2]">Estrelas:</span> {stars}
              </p>
              <p>
                <span className="text-[#0079c2]">Quantidade de Reservas:</span> {reservations}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

