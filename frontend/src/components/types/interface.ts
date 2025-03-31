// export interface Reservation {
//     id: number
//     roomName: string
//     address: string
//     period: string
//     price: string
//     status: string
//     checkInDate: string
//     checkOutDate: string
//     guestCount: number
//     owner: string
//     imageUrl?: string
//   }

  export interface Reservation {
    id: string
    pf_id: string
    room_id: string
    check_in: Date | string
    check_out: Date | string
    guests: number
    total: number
    status: string
    rating: {stars: number, comment: string}
  }

  export interface Room {
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