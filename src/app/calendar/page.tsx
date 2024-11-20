"use client"

import { useState } from "react"
import { addHours } from "date-fns"
import { CalendarHeader } from "@/components/calendar/calendar-header"
import { CalendarView } from "@/components/calendar/calendar-view"
import { CalendarViewType, CalendarEvent, Customer, Employee } from "@/types/calendar"
import { EventFormDialog } from "@/components/calendar/event-form-dialog"
import { CalendarFilters } from "@/components/calendar/calendar-filters"
import { mockEvents } from "@/data/mock-events"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<CalendarViewType>("week")
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [newEventStart, setNewEventStart] = useState<Date | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setNewEventStart(null)
    setIsEventDialogOpen(true)
  }

  const handleNewEvent = () => {
    setSelectedEvent(null)
    setNewEventStart(new Date())
    setIsEventDialogOpen(true)
  }

  const handleTimeSlotClick = (start: Date) => {
    setSelectedEvent(null)
    setNewEventStart(start)
    setIsEventDialogOpen(true)
  }

  // Filter events based on selected employee and customer
  const filteredEvents = mockEvents.filter((event) => {
    if (selectedEmployee && event.employeeId !== selectedEmployee.id) {
      return false
    }
    if (selectedCustomer && event.customerId !== selectedCustomer.id) {
      return false
    }
    return true
  })

  return (
    <div className="flex h-screen flex-col">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onViewChange={setView}
        onDateChange={setCurrentDate}
        onNewEvent={handleNewEvent}
      />
      <CalendarFilters
        selectedEmployee={selectedEmployee}
        selectedCustomer={selectedCustomer}
        onEmployeeChange={setSelectedEmployee}
        onCustomerChange={setSelectedCustomer}
      />
      <CalendarView
        currentDate={currentDate}
        view={view}
        events={filteredEvents}
        onEventClick={handleEventClick}
        onTimeSlotClick={handleTimeSlotClick}
      />
      <EventFormDialog
        open={isEventDialogOpen}
        onOpenChange={setIsEventDialogOpen}
        event={selectedEvent}
        defaultStartTime={newEventStart}
        selectedEmployee={selectedEmployee}
        selectedCustomer={selectedCustomer}
      />
    </div>
  )
}
