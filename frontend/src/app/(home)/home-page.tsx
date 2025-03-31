"use client";

import { Search, Calendar, Users } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { GuestSelector } from "@/components/ui/guest-selector";
import { useState } from "react";

export default function EnhancedHome() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/compass.svg"
              alt="DestCINation logo"
              width={24}
              height={24}
            />
            <span className="font-semibold text-xl">DestCINation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs">
              OP
            </div>
            <span className="hidden sm:inline text-sm">Olavo Paulo</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Encontre sua próxima estadia
            </h1>
            <p className="text-gray-600">Encontre ofertas de hoteis</p>
          </div>

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
                      onClick={() => setSearchQuery("")}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 border-b md:border-b-0 md:border-r p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="text-gray-400" size={20} />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Entrada</div>
                    <DatePicker />
                  </div>
                </div>
              </div>

              <div className="flex-1 border-b md:border-b-0 md:border-r p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="text-gray-400" size={20} />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Saída</div>
                    <DatePicker />
                  </div>
                </div>
              </div>

              <div className="flex-1 p-4">
                <div className="flex items-center gap-2">
                  <Users className="text-gray-400" size={20} />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Hóspedes</div>
                    <GuestSelector
                      guests={2}
                      onGuestsChange={(newGuests) => console.log(newGuests)}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-center">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
                  Pesquisar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
