"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FotoUpload from "./FotoUpload";
import axios from "axios";
import { Upload, Image } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
const amenities = [
  "Wi-fi",
  "Tv",
  "Pet-Friendly",
  "Ar-condicionado",
  "Estacionamento",
];

const formSchema = z.object({
  preco: z.coerce.number().min(50, "O preço deve ser maior que cinquenta"),
  descricao: z.string().min(1, "A descrição é obrigatória"),
  quantidade_hosp: z.coerce
    .number()
    .min(1, "A quantidade de hóspedes é no mínimo 1"),
  local: z.string().min(1, "O local é obrigatorio"),
  stars: z.coerce.number().min(1, "As entrelas devem ser de 1 a 5"),
  avaliacao: z.coerce.number().min(1, "A avaliacao deve ser de 0 a 10"),
  caracteristics: z.string().min(1, "As características são obrigatorias"),
  tipo: z.string().min(1, "O tipo é obrigatorio"),
});

export default function FormAcomodacao() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preco: 100,
      descricao: "",
      quantidade_hosp: 2,
      local: "",
      stars: 1,
      avaliacao: 1,
      caracteristics: "",
      tipo: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  async function onSubmit(values: any) {
    console.log("Botão clicado");
    setLoading(true);

    const dataToSend = {
      id: crypto.randomUUID(), // Gera um UUID para o id
      pj_id: user?.id, // Ajuste se necessário
      // pj_id: "2222",
      description: values.descricao || "Sem descrição",
      type: values.tipo, // Pode ajustar conforme necessário
      price: values.preco,
      capacity: values.quantidade_hosp,
      caracteristics_ids: values.caracteristics
        ? values.caracteristics.split(",")
        : [],
      local: values.local,
      stars: values.stars,
      avaliacao: 0,
      ar_condicionado: selectedAmenities.includes("Ar-condicionado"),
      tv: selectedAmenities.includes("Tv"),
      wifi: selectedAmenities.includes("Wi-fi"),
      petFriendly: selectedAmenities.includes("Pet-Friendly"),
      cafeDaManha: false, // Defina como necessário
      estacionamento: selectedAmenities.includes("Estacionamento"),
    };

    console.log(dataToSend);

    try {
      const token = localStorage.getItem("token") as string;

      const response = await fetch("http://localhost:5001/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        token,
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados.");
      }

      const result = await response.json();
      console.log("Acomodação cadastrada:", result);
      alert("Acomodação cadastrada com sucesso!");
      form.reset();
      setSelectedAmenities([]);
    } catch (error) {
      console.error("Erro:", error);
      alert("Falha ao cadastrar acomodação.");
    } finally {
      setLoading(false);
    }
  }

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item: string) => item !== amenity)
        : [...prev, amenity]
    );
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-4 border rounded-lg"
      >
        <h1 className="font-bold">Hotel Estrela</h1>
        <div className="p-6 bg-gray-200 rounded-lg max-w-xl mx-auto space-y-4">
          <FormField
            control={form.control}
            name="quantidade_hosp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Selecione a quantidade de hóspedes que seu quarto comporta:
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ex: 150" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <label className="block text-gray-700 font-semibold">
            Selecione as comodidades do seu quarto:
          </label>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity) => (
              <Button
                key={amenity}
                variant={
                  selectedAmenities.includes(amenity) ? "default" : "outline"
                }
                onClick={() => toggleAmenity(amenity)}
              >
                {amenity}
              </Button>
            ))}
          </div>

          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição do quarto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Suíte aconchegante à beira-mar"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="local"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Local</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Porto de Galinhas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Casa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="caracteristics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caracteristicas do seu quarto</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Aconchegante, espaçoso" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço por Noite (R$)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ex: 150" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stars"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estrelas</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ex: 3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Publicar Acomodação</Button>
        </div>
      </form>
    </Form>
  );
}
function setSelectedAmenities(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}
