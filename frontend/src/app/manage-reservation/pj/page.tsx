import Image from "next/image"
import { User } from "lucide-react"
import LocationCard from "@/components/ui/location-card"
import { locations } from "@/lib/data"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 mt-20">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-[#0079c2] mb-12">Suas localidades</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((location) => (
            <LocationCard key={location.id} {...location} />
          ))}
        </div>
      </main>
    </div>
  )
}

