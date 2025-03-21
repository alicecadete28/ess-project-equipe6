"use client"

import React from "react"

import { useState } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addDays,
} from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SimpleCalendarProps {
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
  minDate?: Date
}

export function SimpleCalendar({ selectedDate, onDateSelect, minDate }: SimpleCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const weekDays = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"]

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Ajustar para começar no domingo (0) e terminar no sábado (6)
  const startDay = monthStart.getDay() // 0-6 (domingo-sábado)
  const endDay = 6 - monthEnd.getDay() // dias restantes até sábado

  // Dias do mês anterior para preencher o início
  const prevMonthDays =
    startDay > 0
      ? eachDayOfInterval({
          start: addDays(monthStart, -startDay),
          end: addDays(monthStart, -1),
        })
      : []

  // Dias do próximo mês para preencher o final
  const nextMonthDays =
    endDay > 0
      ? eachDayOfInterval({
          start: addDays(monthEnd, 1),
          end: addDays(monthEnd, endDay),
        })
      : []

  // Todos os dias a serem exibidos
  const calendarDays = [...prevMonthDays, ...monthDays, ...nextMonthDays]

  // Agrupar em semanas
  const weeks: Date[][] = []
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7))
  }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDateClick = (date: Date) => {
    if (onDateSelect) {
      onDateSelect(date)
    }
  }

  const isDateDisabled = (date: Date) => {
    if (!minDate) return false
    return date < minDate
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-medium">{format(currentMonth, "MMMM yyyy", { locale: ptBR })}</h2>
        <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day, dayIndex) => {
              const isDisabled = isDateDisabled(day)
              const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
              const isCurrentMonth = isSameMonth(day, currentMonth)

              return (
                <button
                  key={dayIndex}
                  onClick={() => !isDisabled && handleDateClick(day)}
                  disabled={isDisabled}
                  className={`
                    h-9 w-9 rounded-full flex items-center justify-center text-sm
                    ${isSelected ? "bg-[#0079c2] text-white" : ""}
                    ${!isCurrentMonth ? "text-gray-400" : ""}
                    ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
                  `}
                >
                  {format(day, "d")}
                </button>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

