export interface Reservation {
    id: number
    roomName: string
    address: string
    period: string
    price: string
    status: string
    checkInDate: string
    checkOutDate: string
    guestCount: number
    owner: string
    imageUrl?: string
  }

  export interface Reservation2 {
    id: string
    guestName: string
    startDate: string
    endDate: string
    guestCount: number
    price: number
    locationId: string
    imageUrl?: string
  }

  export interface Location {
    id: string
    name: string
    address: string
    rating: number
    stars: number
    reservations: number
    dailyRate?: number
  }