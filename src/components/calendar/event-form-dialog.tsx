"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EventForm } from "@/components/calendar/event-form"
import { CalendarEvent, Customer, Employee } from "@/types/calendar"

interface EventFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event: CalendarEvent | null
  defaultStartTime: Date | null
  selectedEmployee?: Employee | null
  selectedCustomer?: Customer | null
}

export function EventFormDialog({
  open,
  onOpenChange,
  event,
  defaultStartTime,
  selectedEmployee,
  selectedCustomer,
}: EventFormDialogProps) {
  const handleSubmit = (values: CalendarEvent) => {
    console.log("Form submitted:", values)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {event ? "Etkinliği Düzenle" : "Yeni Etkinlik"}
          </DialogTitle>
        </DialogHeader>
        <EventForm
          event={event}
          defaultStartTime={defaultStartTime}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          defaultEmployee={selectedEmployee}
          defaultCustomer={selectedCustomer}
        />
      </DialogContent>
    </Dialog>
  )
}
