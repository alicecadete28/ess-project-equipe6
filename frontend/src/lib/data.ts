import type { Location, Reservation2 } from "@/components/types/interface"

export const locations: Location[] = [
  {
    id: "e121",
    name: "CIn - Sala E121",
    address: "Av. Jornalista Aníbal Fernandes, s/n - Cidade Universitária, Recife, PE, Pernambuco",
    rating: 10,
    stars: 5,
    reservations: 10,
    dailyRate: 250.0,
  },
  {
    id: "e122",
    name: "CIn - Sala E122",
    address: "Av. Jornalista Aníbal Fernandes, s/n - Cidade Universitária, Recife, PE, Pernambuco",
    rating: 10,
    stars: 5,
    reservations: 10,
    dailyRate: 230.0,
  },
  {
    id: "e123",
    name: "CIn - Sala E123",
    address: "Av. Jornalista Aníbal Fernandes, s/n - Cidade Universitária, Recife, PE, Pernambuco",
    rating: 10,
    stars: 5,
    reservations: 10,
    dailyRate: 245.0,
  },
  {
    id: "e111",
    name: "CIn - Sala E111",
    address: "Av. Jornalista Aníbal Fernandes, s/n - Cidade Universitária, Recife, PE, Pernambuco",
    rating: 10,
    stars: 5,
    reservations: 10,
    dailyRate: 220.0,
  },
]

export const reservations2: Reservation2[] = [
  {
    id: "res1",
    guestName: "Alexandre Silva",
    startDate: "03/03/2025",
    endDate: "08/03/2025",
    guestCount: 2,
    price: 1145.39,
    locationId: "e122",
    imageUrl: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "res2",
    guestName: "Humberta Guimarães",
    startDate: "12/03/2025",
    endDate: "15/03/2025",
    guestCount: 1,
    price: 452.58,
    locationId: "e122",
    imageUrl: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "res3",
    guestName: "Rogério Severino",
    startDate: "20/03/2025",
    endDate: "22/03/2025",
    guestCount: 2,
    price: 320.45,
    locationId: "e122",
    imageUrl: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "res4",
    guestName: "Maria Santos",
    startDate: "05/03/2025",
    endDate: "10/03/2025",
    guestCount: 3,
    price: 1250.0,
    locationId: "e121",
    imageUrl: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "res5",
    guestName: "João Pereira",
    startDate: "15/03/2025",
    endDate: "20/03/2025",
    guestCount: 2,
    price: 980.75,
    locationId: "e123",
    imageUrl: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "res6",
    guestName: "Carla Oliveira",
    startDate: "01/04/2025",
    endDate: "05/04/2025",
    guestCount: 1,
    price: 750.3,
    locationId: "e111",
    imageUrl: "/placeholder.svg?height=150&width=150",
  },
]

export function getLocationById(id: string): Location | undefined {
  return locations.find((location) => location.id === id)
}

export function getReservationsByLocationId(id: string): Reservation2[] {
  return reservations2.filter((reservation2) => reservation2.locationId === id)
}

