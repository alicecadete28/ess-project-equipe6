"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { GuestSelector } from "@/components/ui/guest-selector";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  // Calcula a data de amanhã
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  // Calcula a data de depois de amanhã
  const getDayAfterTomorrow = () => {
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    return dayAfterTomorrow;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date>(getTomorrow());
  const [checkOutDate, setCheckOutDate] = useState<Date>(getDayAfterTomorrow());
  const [guests, setGuests] = useState(2);
  const [isSearching, setIsSearching] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Handle form submission
  const handleSearch = () => {
    // Validar se tem destino
    if (!searchQuery) {
      setAlertMessage("Por favor, informe o destino");
      setShowAlert(true);
      return;
    }

    // Validar se a data de ida é menor que a de volta
    if (checkInDate >= checkOutDate) {
      setAlertMessage("A data de entrada deve ser anterior à data de saída");
      setShowAlert(true);
      return;
    }

    // Simulate search
    setIsSearching(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsSearching(false);

      // For demo purposes, always redirect to no-results page
      // In a real app, you would check the API response
      router.push("/search/no-results");
    }, 1500);
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen flex flex-1 ">
        <div className="flex-1 flex items-center justify-center">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Encontre sua próxima estadia
              </h1>
              <p className="text-gray-600">Encontre ofertas de hoteis</p>
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
                      <button
                        className="text-gray-400"
                        onClick={handleClearSearch}
                        aria-label="Limpar busca"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 border-b md:border-b-0 md:border-r p-4">
                  <DatePicker
                    label="Entrada"
                    date={checkInDate}
                    onDateChange={(date) =>
                      setCheckInDate(date || getTomorrow())
                    }
                  />
                </div>

                <div className="flex-1 border-b md:border-b-0 md:border-r p-4">
                  <DatePicker
                    label="Saída"
                    date={checkOutDate}
                    onDateChange={(date) =>
                      setCheckOutDate(date || getDayAfterTomorrow())
                    }
                    minDate={new Date(checkInDate.getTime() + 86400000)}
                  />
                </div>

                <div className="flex-1 p-4">
                  <GuestSelector guests={guests} onGuestsChange={setGuests} />
                </div>

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
    </ProtectedRoute>
  );
}
