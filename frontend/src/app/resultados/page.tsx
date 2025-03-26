"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Bookmark,
  Heart,
  LogOut,
  Wifi,
  Tv,
  Car,
  Coffee,
  Wind,
  Dog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AppHeader from "@/components/Header";
import { Badge } from "@/components/ui/badge";

interface Room {
  id: number;
  name: string;
  description: string;
  dailyRate: string;
  totalValue: string;
  image: string;
  price: number;
  stars: number;
  rating: number;
  caracteristics_ids: string;
  ar_condicionado?: boolean;
  tv: boolean;
  wifi: boolean;
  petFriendly: boolean;
  cafeDaManha: boolean;
  estacionamento: boolean;
}

export default function SearchResults() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [filters, setFilters] = useState({
    airConditioning: false,
    wifi: false,
    parking: false,
    breakfast: false,
    petFriendly: false,
    tv: false,
  });

  const [sortOptions, setSortOptions] = useState({
    price: false,
    stars: false,
    rating: false,
  });

  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const handleSortChange = (option: keyof typeof sortOptions) => {
    const newSortOptions = {
      price: false,
      stars: false,
      rating: false,
      [option]: !sortOptions[option],
    };

    setSortOptions(newSortOptions);
    sortRooms(newSortOptions);
  };

  const sortRooms = (options = sortOptions) => {
    const sortedRooms = [...rooms];

    if (options.price) {
      sortedRooms.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (options.stars) {
      sortedRooms.sort((a, b) => b.stars - a.stars);
    } else if (options.rating) {
      sortedRooms.sort((a, b) => b.rating - a.rating);
    }

    setRooms(sortedRooms);
  };

  const fetchFilteredRooms = async () => {
    const paramsString = sessionStorage.getItem("parametrosBusca");

    if (!paramsString) return;

    const parametros = JSON.parse(paramsString);
    const query = new URLSearchParams({
      ...parametros,
      ar_condicionado: filters.airConditioning.toString(),
      tv: filters.tv.toString(),
      wifi: filters.wifi.toString(),
      petFriendly: filters.petFriendly.toString(),
      cafeDaManha: filters.breakfast.toString(),
      estacionamento: filters.parking.toString(),
    });

    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `http://localhost:5001/api/filtrar-acomodacoes?${query.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || data.message) {
        setRooms([]);
        setErrorMsg(data.message || "Erro ao buscar acomodações");
      } else {
        const checkIn = new Date(parametros.data_ida);
        const checkOut = new Date(parametros.data_volta);
        const numberOfNights = Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        );

        const mappedRooms = data.map((room: any) => {
          const price = Number(room.price) || 0;
          const totalValue = price * numberOfNights;

          return {
            ...room,
            dailyRate: `R$ ${price.toLocaleString("pt-BR")}`,
            totalValue: `R$ ${totalValue.toLocaleString("pt-BR")}`,
            rating: room.avaliacao ?? 0,
            stars: room.stars ?? 0,
          };
        });

        setRooms(mappedRooms);
        setErrorMsg("");
      }
    } catch (error) {
      setErrorMsg("Erro ao se comunicar com o servidor");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFilteredRooms();
  }, []);

  useEffect(() => {
    sortRooms();
  }, [sortOptions]);

  const handleSearch = () => {
    fetchFilteredRooms();
  };

  const handleReserve = (room: Room) => {
    const paramsString = sessionStorage.getItem("parametrosBusca");
    let reservaData = {
      quarto: room,
      data_ida: "",
      data_volta: "",
      hospedes: 1,
      preco_total: room.totalValue,
    };

    if (paramsString) {
      const params = JSON.parse(paramsString);
      reservaData = {
        ...reservaData,
        data_ida: params.data_ida || "",
        data_volta: params.data_volta || "",
        hospedes: params.num_pessoas || 1,
      };
    }

    sessionStorage.setItem("dadosReserva", JSON.stringify(reservaData));
    sessionStorage.setItem("selectedRoom", JSON.stringify(room));
    router.push("/reservar");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />

      {/* Navigation Bar */}
      <div className="bg-[#0069b0] text-white p-2">
        <div className="container mx-auto flex justify-between">
          <Link href="/" className="flex items-center gap-2 hover:underline">
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
        <div className="flex-1 p-4">
          {errorMsg && (
            <div className="text-center text-red-600 font-semibold my-4">
              {errorMsg}
            </div>
          )}

          {rooms.length === 0 && !errorMsg && (
            <div className="text-center text-gray-600 font-medium my-4">
              Nenhum quarto encontrado com os filtros selecionados.
            </div>
          )}

          {rooms.map((room) => (
            <div key={room.id} className="flex mb-4 border rounded-md overflow-hidden shadow-md">
              <div className="w-64 h-48 bg-gray-200 flex items-center justify-center">
                <Image
                  src={room.image || "/placeholder.svg"}
                  alt={room.name}
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 p-4">
                <h2 className="text-xl font-bold text-[#0079c2]">{room.description}</h2>
                <p className="text-gray-600 mt-2">{room.caracteristics_ids}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < room.stars ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm font-medium">{room.stars} estrelas</span>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold text-sm mb-2">Características:</h3>
                    <div className="flex flex-wrap gap-2">
                      {room.ar_condicionado && (
                        <Badge className="flex items-center gap-1">
                          <Wind className="h-3 w-3 mr-1" />
                          Ar-condicionado
                        </Badge>
                      )}
                      {room.tv && (
                        <Badge className="flex items-center gap-1">
                          <Tv className="h-3 w-3 mr-1" />
                          TV
                        </Badge>
                      )}
                      {room.wifi && (
                        <Badge className="flex items-center gap-1">
                          <Wifi className="h-3 w-3 mr-1" />
                          Wi-Fi
                        </Badge>
                      )}
                      {room.petFriendly && (
                        <Badge className="flex items-center gap-1">
                          <Dog className="h-3 w-3 mr-1" />
                          Pet-Friendly
                        </Badge>
                      )}
                      {room.cafeDaManha && (
                        <Badge className="flex items-center gap-1">
                          <Coffee className="h-3 w-3 mr-1" />
                          Café da Manhã
                        </Badge>
                      )}
                      {room.estacionamento && (
                        <Badge className="flex items-center gap-1">
                          <Car className="h-3 w-3 mr-1" />
                          Estacionamento
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {Number.isFinite(room.rating) ? room.rating.toFixed(1) : "Sem avaliação"} avaliação
                  </div>
                </div>

                <div className="flex justify-between items-end mt-6">
                  <div>
                    <p className="text-sm text-gray-500">Preço por diária:</p>
                    R$ {Number.isFinite(room.price) ? room.price.toLocaleString("pt-BR") : "Preço indisponível"}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Valor total:</p>
                    <p className="font-bold text-xl text-[#0079c2]">{room.totalValue}</p>
                  </div>

                  <Button
                    className="bg-[#0079c2] hover:bg-[#0069b0] text-white"
                    onClick={() => handleReserve(room)}
                  >
                    Reservar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Sidebar */}
        <div className="w-64 bg-gray-100 p-4">
          <h2 className="text-lg font-bold text-[#0079c2] mb-4">Filtrar por:</h2>
          {[
            ["Ar condicionado", "airConditioning"],
            ["Wi-Fi", "wifi"],
            ["Estacionamento", "parking"],
            ["Café da Manhã", "breakfast"],
            ["Pet-Friendly", "petFriendly"],
            ["TV", "tv"],
          ].map(([label, key]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={filters[key as keyof typeof filters]}
                onCheckedChange={() => handleFilterChange(key as keyof typeof filters)}
              />
              <label htmlFor={key} className="text-sm font-medium">
                {label}
              </label>
            </div>
          ))}

          <h2 className="text-lg font-bold text-[#0079c2] mt-8 mb-4">Ordenar por:</h2>
          {[
            ["Preço", "price"],
            ["Estrelas", "stars"],
            ["Avaliação", "rating"],
          ].map(([label, key]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={sortOptions[key as keyof typeof sortOptions]}
                onCheckedChange={() => handleSortChange(key as keyof typeof sortOptions)}
              />
              <label htmlFor={key} className="text-sm font-medium">
                {label}
              </label>
            </div>
          ))}

          <Button className="w-full mt-8 bg-[#0079c2] text-white hover:bg-[#0069b0]" onClick={handleSearch}>
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
}
