import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`
}

export function formatDate(dateString: string): string {
  // Assuming dateString is in format DD/MM/YYYY
  return dateString
}

export function calculateDuration(startDate: string, endDate: string): number {
  // Simple implementation for DD/MM/YYYY format
  const start = parseDate(startDate)
  const end = parseDate(endDate)

  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

function parseDate(dateString: string): Date {
  // Parse DD/MM/YYYY format
  const [day, month, year] = dateString.split("/").map(Number)
  return new Date(year, month - 1, day)
}