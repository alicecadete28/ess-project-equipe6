"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import AppHeader from "@/components/Header"
import Image from "next/image"

export default function ReservarPage() {
  const router = useRouter()
  const [dadosReserva, setDadosReserva] = useState<any>(null)
  const [quartoSelecionado, setQuartoSelecionado] = useState<any>(null)

  useEffect(() => {
    const dadosReservaStr = sessionStorage.getItem("dadosReserva")
    const quartoSelecionadoStr = sessionStorage.getItem("selectedRoom")

    if (dadosReservaStr) {
      try {
        const dados = JSON.parse(dadosReservaStr)
        setDadosReserva(dados)
      } catch (e) {
        console.error("Erro ao parsear dadosReserva:", e)
      }
    }

    if (quartoSelecionadoStr) {
      try {
        const quarto = JSON.parse(quartoSelecionadoStr)
        setQuartoSelecionado(quarto)
      } catch (e) {
        console.error("Erro ao parsear selectedRoom:", e)
      }
    }
  }, [])

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />

      <div className="bg-[#0069b0] text-white p-2">
        <div className="container mx-auto">
          <Button variant="ghost" className="text-white hover:bg-[#0079c2] hover:text-white" onClick={handleBack}>
            Voltar para resultados
          </Button>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Teste de Dados da Reserva</h1>

        <div className="grid gap-6">
          {/* Dados da Reserva */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Dados da Reserva (dadosReserva)</h2>
            {dadosReserva ? (
              <div>
                <div className="mb-4 p-4 bg-gray-100 rounded-md">
                  <h3 className="font-semibold mb-2">Dados brutos:</h3>
                  <pre className="text-xs overflow-auto max-h-60 bg-gray-50 p-2 rounded">
                    {JSON.stringify(dadosReserva, null, 2)}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Informações da Estadia:</h3>
                    <ul className="space-y-2">
                      <li><strong>Data de Ida:</strong> {dadosReserva.data_ida || "Não informado"}</li>
                      <li><strong>Data de Volta:</strong> {dadosReserva.data_volta || "Não informado"}</li>
                      <li><strong>Hóspedes:</strong> {dadosReserva.hospedes || "Não informado"}</li>
                      <li><strong>Preço Total:</strong> {dadosReserva.preco_total || "Não informado"}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Informações do Quarto:</h3>
                    {dadosReserva.quarto ? (
                      <ul className="space-y-2">
                        <li><strong>ID:</strong> {dadosReserva.quarto.id}</li>
                        <li><strong>Nome:</strong> {dadosReserva.quarto.name}</li>
                        <li><strong>Descrição:</strong> {dadosReserva.quarto.description}</li>
                        <li><strong>Preço:</strong> {dadosReserva.quarto.price}</li>
                        <li><strong>Estrelas:</strong> {dadosReserva.quarto.stars}</li>
                      </ul>
                    ) : (
                      <p className="text-red-500">Dados do quarto não encontrados em dadosReserva</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-red-500">Nenhum dado de reserva encontrado no sessionStorage (dadosReserva)</p>
            )}
          </div>

          {/* Quarto Selecionado */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Quarto Selecionado (selectedRoom)</h2>
            {quartoSelecionado ? (
              <div>
                <div className="mb-4 p-4 bg-gray-100 rounded-md">
                  <h3 className="font-semibold mb-2">Dados brutos:</h3>
                  <pre className="text-xs overflow-auto max-h-60 bg-gray-50 p-2 rounded">
                    {JSON.stringify(quartoSelecionado, null, 2)}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Informações do Quarto:</h3>

                  <Image
                    src={`https://picsum.photos/seed/${quartoSelecionado.id}/400/300`}
                    alt={quartoSelecionado.name}
                    width={400}
                    height={300}
                    className="object-cover rounded-md mb-4"
                  />

                  <ul className="space-y-2">
                    <li><strong>ID:</strong> {quartoSelecionado.id}</li>
                    <li><strong>Nome:</strong> {quartoSelecionado.name}</li>
                    <li><strong>Descrição:</strong> {quartoSelecionado.description}</li>
                    <li><strong>Preço:</strong> {quartoSelecionado.price}</li>
                    <li><strong>Estrelas:</strong> {quartoSelecionado.stars}</li>
                    <li>
                      <strong>Características:</strong>
                      <ul className="ml-4 mt-1">
                        <li>Ar Condicionado: {quartoSelecionado.ar_condicionado ? "Sim" : "Não"}</li>
                        <li>TV: {quartoSelecionado.tv ? "Sim" : "Não"}</li>
                        <li>Wi-Fi: {quartoSelecionado.wifi ? "Sim" : "Não"}</li>
                        <li>Pet Friendly: {quartoSelecionado.petFriendly ? "Sim" : "Não"}</li>
                        <li>Café da Manhã: {quartoSelecionado.cafeDaManha ? "Sim" : "Não"}</li>
                        <li>Estacionamento: {quartoSelecionado.estacionamento ? "Sim" : "Não"}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-red-500">Nenhum quarto selecionado encontrado no sessionStorage (selectedRoom)</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
