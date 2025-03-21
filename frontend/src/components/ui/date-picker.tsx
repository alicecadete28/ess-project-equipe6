"use client"

import { useState, useRef } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { SimpleCalendar } from "@/components/ui/simple-calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  label?: string
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  minDate?: Date
}

export function DatePicker({ label = "Data", date, onDateChange = () => {}, minDate }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Format date as string or show placeholder
  const formattedDate = date ? format(date, "dd/MM/yy", { locale: ptBR }) : "--/--/--"

  // Função para selecionar a data sem fechar o calendário
  const handleDateSelect = (selectedDate: Date) => {
    onDateChange(selectedDate)
    // Não fechamos o calendário aqui para permitir múltiplas seleções
  }

  return (
    <div className="flex items-center gap-2 w-full">
      <CalendarIcon className="text-gray-400" size={20} />
      <div className="flex-1">
        <div className="text-xs text-gray-500">{label}</div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button ref={triggerRef} className="text-sm w-full text-left outline-none" onClick={() => setOpen(true)}>
              {formattedDate}
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-0 border border-gray-200 rounded-md shadow-lg w-auto" align="start">
            <div className="bg-white rounded-md overflow-hidden">
              <SimpleCalendar selectedDate={date} onDateSelect={handleDateSelect} minDate={minDate} />
              <div className="p-2 border-t flex justify-end">
                <button onClick={() => setOpen(false)} className="px-4 py-2 bg-[#0079c2] text-white rounded-md text-sm">
                  Confirmar
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

