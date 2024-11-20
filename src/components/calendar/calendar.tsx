"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import type { 
  DayPickerSingleProps,
  DayClickEventHandler
} from "react-day-picker"
import { tr } from "date-fns/locale"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CalendarProps extends Omit<DayPickerSingleProps, "mode" | "selected" | "onSelect"> {
  className?: string
}

function Calendar({
  className,
  ...props
}: CalendarProps) {
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>()
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [eventTitle, setEventTitle] = React.useState("")
  const [eventDescription, setEventDescription] = React.useState("")

  const handleDayClick: DayClickEventHandler = (day) => {
    setSelectedDay(day)
    setIsDialogOpen(true)
  }

  const handleAddEvent = () => {
    // Burada etkinlik ekleme işlemi yapılacak
    console.log({
      date: selectedDay,
      title: eventTitle,
      description: eventDescription,
    })
    setIsDialogOpen(false)
    setEventTitle("")
    setEventDescription("")
  }

  return (
    <>
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
        onDayClick={handleDayClick}
        className={cn("p-3", className)}
        locale={tr}
        showOutsideDays
        formatters={{ formatCaption: (date) => format(date, 'MMMM yyyy', { locale: tr }) }}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center"
          ),
          nav_button_previous: "absolute left-1 [&>svg]:h-4 [&>svg]:w-4",
          nav_button_next: "absolute right-1 [&>svg]:h-4 [&>svg]:w-4",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
        }}
        {...props}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Etkinlik Ekle</DialogTitle>
            <DialogDescription>
              {selectedDay
                ? `${selectedDay.toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Başlık</Label>
              <Input
                id="title"
                placeholder="Etkinlik başlığı"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Input
                id="description"
                placeholder="Etkinlik açıklaması"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleAddEvent}>Ekle</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { Calendar }
