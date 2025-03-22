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

import { Upload, Image } from "lucide-react";
const amenities = [
  "Wi-fi",
  "Tv",
  "Pet-Friendly",
  "Ar-condicionado",
  "Estacionamento",
];

const formSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  preco: z.coerce.number().min(50, "O preço deve ser maior que cinquenta"),
  descricao: z.string().optional(),
  quantidade_hosp: z.number().min(1),
});

export default function FormAcomodacao() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      preco: 10,
      descricao: "",
      quantidade_hosp: 2,
    },
  });

  function onSubmit(values: any) {
    console.log("Dados enviados:", values);
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
            name="preco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Selecione a quantidade de hóspedes que seu quarto comporta:
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ex: 150" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <label className="block text-gray-700 font-semibold">
            Selecione as características que seu quarto possui:
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

            <FotoUpload />
          </div>
          <FormField
            control={form.control}
            name="nome"
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

          <Button type="submit">Publicar Acomodação</Button>
        </div>
      </form>
    </Form>
  );
}
function setSelectedAmenities(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}
