"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { GuestSelector } from "@/components/ui/guest-selector";
import AppHeader from "@/components/Header";

export default function Home() {
  const router = useRouter();

  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const getDayAfterTomorrow = () => {
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    return dayAfter;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState(getTomorrow());
  const [checkOutDate, setCheckOutDate] = useState(getDayAfterTomorrow());
  const [guests, setGuests] = useState(2);
  const [isSearching, setIsSearching] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      setAlertMessage("Por favor, informe o destino");
      setShowAlert(true);
      return;
    }

    if (checkInDate >= checkOutDate) {
      setAlertMessage("A data de entrada deve ser anterior à data de saída");
      setShowAlert(true);
      return;
    }

    setIsSearching(true);

    const token = localStorage.getItem("accessToken") as string;

    const queryParams = new URLSearchParams({
      destino: searchQuery,
      data_ida: checkInDate.toISOString(),
      data_volta: checkOutDate.toISOString(),
      num_pessoas: guests.toString(),
    });

    try {
      const response = await fetch(`http://localhost:5001/api/buscar-acomodacoes?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 404 && errorData.message) {
          setAlertMessage(errorData.message);
          setShowAlert(true);
          return;
        }

        throw new Error(errorData.message || "Erro ao buscar acomodações");
      }

      const resultados = await response.json();
      console.log("🏨 Quartos retornados da API:", resultados);

      // Salvar os dados no sessionStorage
      sessionStorage.setItem("resultadosBusca", JSON.stringify(resultados));
      sessionStorage.setItem("parametrosBusca", JSON.stringify({
        destino: searchQuery,
        data_ida: checkInDate.toISOString(),
        data_volta: checkOutDate.toISOString(),
        num_pessoas: guests,
      }));

      router.push("/resultados");
    } catch (error: any) {
      console.error(error);
      setAlertMessage(error.message || "Erro inesperado");
      setShowAlert(true);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <AppHeader />

      <div className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Encontre sua próxima estadia</h1>
            <p className="text-gray-600">Encontre ofertas de hotéis</p>
          </div>

          {showAlert && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center relative">
                <button
                  onClick={() => setShowAlert(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  aria-label="Fechar alerta"
                >
                  <X size={20} />
                </button>
                <span className="text-sm">{alertMessage}</span>
              </div>
            </div>
          )}

          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Local */}
              <div className="flex-1 border-b md:border-b-0 md:border-r p-4">
                <div className="flex items-center gap-2">
                  <Search className="text-gray-400" size={20} />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Local</div>
                    <input
                      type="text"
                      placeholder="Para onde?"
                      className="w-full outline-none text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {searchQuery && (
                    <button className="text-gray-400" onClick={handleClearSearch} aria-label="Limpar busca">
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Entrada */}
              <div className="flex-1 border-b md:border-b-0 md:border-r p-4">
                <DatePicker
                  label="Entrada"
                  date={checkInDate}
                  onDateChange={(date) => setCheckInDate(date || getTomorrow())}
                />
              </div>

              {/* Saída */}
              <div className="flex-1 border-b md:border-b-0 md:border-r p-4">
                <DatePicker
                  label="Saída"
                  date={checkOutDate}
                  onDateChange={(date) => setCheckOutDate(date || getDayAfterTomorrow())}
                  minDate={new Date(checkInDate.getTime() + 86400000)}
                />
              </div>

              {/* Hóspedes */}
              <div className="flex-1 p-4">
                <GuestSelector guests={guests} onGuestsChange={setGuests} />
              </div>

              {/* Botão */}
              <div className="p-4 flex items-center">
                <Button
                  className="bg-[#0079c2] hover:bg-[#0069b0] text-white px-6"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? "Buscando..." : "Pesquisar"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
