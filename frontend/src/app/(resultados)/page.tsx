"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Home, Bookmark, Heart, LogOut, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"


// Define the room type
interface Room {
  id: number
  name: string
  description: string
  dailyRate: string
  totalValue: string
  image: string
  priceValue: number // Numeric value for sorting
  stars: number
  rating: number
}

export default function SearchResults() {
  // Initial room data
  const initialRooms: Room[] = [
    {
      id: 1,
      name: "Nome quarto",
      description: "Descrição",
      dailyRate: "R$ 250,00",
      totalValue: "R$ 750,00",
      image: "/placeholder.svg?height=150&width=150",
      priceValue: 250,
      stars: 4,
      rating: 8.7,
    },
    {
      id: 2,
      name: "Nome quarto",
      description: "Descrição",
      dailyRate: "R$ 300,00",
      totalValue: "R$ 900,00",
      image: "/placeholder.svg?height=150&width=150",
      priceValue: 300,
      stars: 5,
      rating: 9.2,
    },
    {
      id: 3,
      name: "Nome quarto",
      description: "Descrição",
      dailyRate: "R$ 200,00",
      totalValue: "R$ 600,00",
      image: "/placeholder.svg?height=150&width=150",
      priceValue: 200,
      stars: 3,
      rating: 7.5,
    },
    {
      id: 4,
      name: "Nome quarto",
      description: "Descrição",
      dailyRate: "R$ 350,00",
      totalValue: "R$ 1050,00",
      image: "/placeholder.svg?height=150&width=150",
      priceValue: 350,
      stars: 4,
      rating: 8.9,
    },
  ]

  // State for rooms (will be sorted)
  const [rooms, setRooms] = useState<Room[]>(initialRooms)

  // Filter states
  const [filters, setFilters] = useState({
    airConditioning: false,
    wifi: false,
    parking: false,
    breakfast: false,
    petFriendly: false,
    tv: false,
  })

  // Sort states
  const [sortOptions, setSortOptions] = useState({
    price: false,
    stars: false,
    rating: false,
  })

  // Current page state
  const [currentPage, setCurrentPage] = useState(1)

  // Handle filter change
  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }))
  }

  // Handle sort change
  const handleSortChange = (option: keyof typeof sortOptions) => {
    // Toggle the selected sort option and turn off others
    const newSortOptions = {
      price: false,
      stars: false,
      rating: false,
      [option]: !sortOptions[option],
    }

    setSortOptions(newSortOptions)

    // Sort the rooms based on the selected option
    sortRooms(newSortOptions)
  }

  // Function to sort rooms based on sort options
  const sortRooms = (options = sortOptions) => {
    const sortedRooms = [...initialRooms]

    if (options.price) {
      // Sort by price (lowest first)
      sortedRooms.sort((a, b) => a.priceValue - b.priceValue)
    } else if (options.stars) {
      // Sort by stars (highest first)
      sortedRooms.sort((a, b) => b.stars - a.stars)
    } else if (options.rating) {
      // Sort by rating (highest first)
      sortedRooms.sort((a, b) => b.rating - a.rating)
    }

    setRooms(sortedRooms)
  }

  // Apply sorting when sort options change
  useEffect(() => {
    sortRooms()
  }, [sortOptions])

  // Handle search
  const handleSearch = () => {
    // In a real app, this would trigger a new search with the filters
    console.log("Searching with filters:", filters)
    console.log("Sorting by:", sortOptions)

    // Re-apply sorting
    sortRooms()
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/compass.svg" alt="DestCINation logo" width={24} height={24} />
            <span className="font-semibold text-xl">
              Dest<span className="text-[#0079c2]">CIN</span>ation
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#0079c2] text-white rounded-full w-8 h-8 flex items-center justify-center text-xs">
              OP
            </div>
            <span className="hidden sm:inline text-sm">Olavo Paulo</span>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <div className="bg-[#0069b0] text-white p-2">
        <div className="container mx-auto flex justify-between">
          <Link href="/home" className="flex items-center gap-2 hover:underline">
            <Home size={18} />
            <span>Voltar para a tela inicial</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/saved" className="flex items-center gap-2 hover:underline">
              <Bookmark size={18} />
              <span>Salvos</span>
            </Link>
            <Link href="/favorites" className="flex items-center gap-2 hover:underline">
              <Heart size={18} />
              <span>Favoritos</span>
            </Link>
            <Link href="/logout" className="flex items-center gap-2 hover:underline">
              <LogOut size={18} />
              <span>Sign out</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Search Results */}
        <div className="flex-1 p-4">
          {rooms.map((room) => (
            <div key={room.id} className="flex mb-4 border rounded-md overflow-hidden">
              <div className="w-64 h-48 bg-gray-500 flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-white rounded-md flex items-center justify-center">
                  <Image
                    src={room.image || "/placeholder.svg"}
                    alt={room.name}
                    width={64}
                    height={64}
                    className="text-white"
                  />
                </div>
              </div>
              <div className="flex-1 bg-gray-200 p-4">
                <h2 className="text-xl font-bold">{room.name}</h2>
                <p className="text-lg">{room.description}</p>
                <div className="flex justify-between mt-8">
                  <div className="flex items-center">
                    {sortOptions.stars && (
                      <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{room.stars} estrelas</div>
                    )}
                    {sortOptions.rating && (
                      <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded ml-2">
                        {room.rating.toFixed(1)} avaliação
                      </div>
                    )}
                  </div>
                  <div className="flex gap-8">
                    <div className="text-right">
                      <div className="text-sm">Val. diária</div>
                      <div className="font-bold">{room.dailyRate}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">Val. total</div>
                      <div className="font-bold">{room.totalValue}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="sm"
              className={`h-8 w-8 ${currentPage === 1 ? "bg-[#0079c2] text-white" : ""}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 w-8 ${currentPage === 2 ? "bg-[#0079c2] text-white" : ""}`}
              onClick={() => setCurrentPage(2)}
            >
              2
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 w-8 ${currentPage === 3 ? "bg-[#0079c2] text-white" : ""}`}
              onClick={() => setCurrentPage(3)}
            >
              3
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 w-8 ${currentPage === 4 ? "bg-[#0079c2] text-white" : ""}`}
              onClick={() => setCurrentPage(4)}
            >
              4
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 w-8 ${currentPage === 5 ? "bg-[#0079c2] text-white" : ""}`}
              onClick={() => setCurrentPage(5)}
            >
              5
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 w-8 ${currentPage === 6 ? "bg-[#0079c2] text-white" : ""}`}
              onClick={() => setCurrentPage(6)}
            >
              6
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 w-8 ${currentPage === 7 ? "bg-[#0079c2] text-white" : ""}`}
              onClick={() => setCurrentPage(7)}
            >
              7
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters Sidebar */}
        <div className="w-64 bg-gray-100 p-4">
          <h2 className="text-lg font-bold text-[#0079c2] mb-4">Filtrar por:</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ac"
                checked={filters.airConditioning}
                onCheckedChange={() => handleFilterChange("airConditioning")}
              />
              <label
                htmlFor="ac"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ar condicionado
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="wifi" checked={filters.wifi} onCheckedChange={() => handleFilterChange("wifi")} />
              <label
                htmlFor="wifi"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Wi-Fi
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="parking" checked={filters.parking} onCheckedChange={() => handleFilterChange("parking")} />
              <label
                htmlFor="parking"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Estacionamento
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="breakfast"
                checked={filters.breakfast}
                onCheckedChange={() => handleFilterChange("breakfast")}
              />
              <label
                htmlFor="breakfast"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Café da Manhã
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pet"
                checked={filters.petFriendly}
                onCheckedChange={() => handleFilterChange("petFriendly")}
              />
              <label
                htmlFor="pet"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Pet-Friendly
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="tv" checked={filters.tv} onCheckedChange={() => handleFilterChange("tv")} />
              <label
                htmlFor="tv"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                TV
              </label>
            </div>
          </div>

          <h2 className="text-lg font-bold text-[#0079c2] mt-8 mb-4">Ordenar por:</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="price" checked={sortOptions.price} onCheckedChange={() => handleSortChange("price")} />
              <label
                htmlFor="price"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Preço
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="stars" checked={sortOptions.stars} onCheckedChange={() => handleSortChange("stars")} />
              <label
                htmlFor="stars"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Estrelas
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="rating" checked={sortOptions.rating} onCheckedChange={() => handleSortChange("rating")} />
              <label
                htmlFor="rating"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Avaliação
              </label>
            </div>
          </div>

          <Button className="w-full mt-8 bg-[#0079c2] text-white hover:bg-[#0069b0]" onClick={handleSearch}>
            Buscar
          </Button>
        </div>
      </div>
    </div>
  )
}

