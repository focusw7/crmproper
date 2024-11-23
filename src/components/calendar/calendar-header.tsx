"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { format, addMonths, subMonths, addDays, startOfWeek } from "date-fns"
import { tr } from "date-fns/locale"
import { CalendarViewType } from "@/types/calendar"

interface CalendarHeaderProps {
  currentDate: Date
  onDateChange: (date: Date) => void
  view: CalendarViewType
  onViewChange: (view: CalendarViewType) => void
  onNewEvent: () => void
}

export function CalendarHeader({
  currentDate,
  onDateChange,
  view,
  onViewChange,
  onNewEvent,
}: CalendarHeaderProps) {
  const handlePrevMonth = () => {
    if (view === "month") {
      onDateChange(subMonths(currentDate, 1))
    } else if (view === "week") {
      onDateChange(addDays(currentDate, -7))
    } else {
      onDateChange(addDays(currentDate, -1))
    }
  }

  const handleNextMonth = () => {
    if (view === "month") {
      onDateChange(addMonths(currentDate, 1))
    } else if (view === "week") {
      onDateChange(addDays(currentDate, 7))
    } else {
      onDateChange(addDays(currentDate, 1))
    }
  }

  const handleToday = () => {
    onDateChange(new Date())
  }

  const getHeaderText = () => {
    if (view === "month") {
      return format(currentDate, "MMMM yyyy", { locale: tr })
    } else if (view === "week") {
      const weekStart = startOfWeek(currentDate, { locale: tr })
      const weekEnd = addDays(weekStart, 6)
      return `${format(weekStart, "d", { locale: tr })} - ${format(weekEnd, "d MMMM yyyy", { locale: tr })}`
    } else {
      return format(currentDate, "d MMMM yyyy", { locale: tr })
    }
  }

  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={onNewEvent}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleToday}>
          Bugün
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="text-lg font-semibold">
          {getHeaderText()}
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        <Select value={view} onValueChange={(value) => onViewChange(value as CalendarViewType)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Görünüm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Gün</SelectItem>
            <SelectItem value="week">Hafta</SelectItem>
            <SelectItem value="month">Ay</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
