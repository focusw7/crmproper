"use client"

import { useRef, useEffect } from "react"
import {
  addDays,
  format,
  startOfWeek,
  differenceInMinutes,
  isSameDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addWeeks,
  getHours,
} from "date-fns"
import { tr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { CalendarEvent, CalendarViewType } from "@/types/calendar"
import { mockEvents } from "@/data/mock-events"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const hours = Array.from({ length: 24 }, (_, i) => i)
const days = Array.from({ length: 7 }, (_, i) => i)
const HOUR_HEIGHT = 50 // Saat yüksekliğini 50px'e güncelledim

interface CalendarViewProps {
  currentDate: Date
  view: CalendarViewType
  events: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
  onTimeSlotClick?: (start: Date) => void
}

export function CalendarView({ currentDate, view, events, onEventClick, onTimeSlotClick }: CalendarViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const weekStart = startOfWeek(currentDate, { locale: tr })

  // Sayfa yüklendiğinde mevcut saate kaydırma
  useEffect(() => {
    if (containerRef.current) {
      const currentHour = getHours(new Date())
      const scrollPosition = currentHour * HOUR_HEIGHT - (window.innerHeight / 2)
      containerRef.current.scrollTop = scrollPosition
    }
  }, [])

  const getEventStyle = (event: CalendarEvent) => {
    const startMinutes = differenceInMinutes(event.startTime, startOfDay(event.startTime))
    const duration = differenceInMinutes(event.endTime, event.startTime)
    const top = (startMinutes / 60) * HOUR_HEIGHT
    const height = (duration / 60) * HOUR_HEIGHT

    return {
      top: `${top}px`,
      height: `${height}px`,
    }
  }

  const handleTimeSlotClick = (date: Date, hour: number) => {
    if (onTimeSlotClick) {
      const clickedDate = new Date(date)
      clickedDate.setHours(hour)
      clickedDate.setMinutes(0)
      onTimeSlotClick(clickedDate)
    }
  }

  const getPriorityColor = (priority: CalendarEvent["priority"]) => {
    const colors = {
      low: "bg-blue-500",
      medium: "bg-yellow-500",
      high: "bg-red-500",
    }
    return colors[priority]
  }

  const renderTimeColumn = () => (
    <div className="w-20 flex-none border-r">
      {hours.map((hour) => (
        <div
          key={hour}
          className="text-muted-foreground text-sm text-right pr-4"
          style={{ height: `${HOUR_HEIGHT}px` }}
        >
          {`${hour.toString().padStart(2, "0")}:00`}
        </div>
      ))}
    </div>
  )

  const renderDayView = () => (
    <div className="flex flex-1 overflow-hidden">
      {renderTimeColumn()}
      <div className="flex-1 min-w-[200px] relative">
        {/* Time grid */}
        <div className="relative">
          {hours.map((hour) => (
            <div
              key={hour}
              className="border-b cursor-pointer hover:bg-accent/50 transition-colors"
              style={{ height: `${HOUR_HEIGHT}px` }}
              onClick={() => handleTimeSlotClick(currentDate, hour)}
            />
          ))}

          {/* Events */}
          {events
            .filter((event) => isSameDay(event.startTime, currentDate))
            .map((event) => (
              <div
                key={event.id}
                className="absolute left-0 right-0 mx-1 rounded-md p-1 overflow-hidden cursor-pointer hover:opacity-80"
                style={getEventStyle(event)}
                onClick={() => onEventClick?.(event)}
              >
                <div
                  className={cn(
                    "h-full rounded-md p-2 text-white",
                    getPriorityColor(event.priority)
                  )}
                >
                  <div className="text-xs font-medium">{event.title}</div>
                  <div className="text-xs opacity-90">
                    {format(event.startTime, "HH:mm")} -{" "}
                    {format(event.endTime, "HH:mm")}
                  </div>
                  {event.location && (
                    <div className="text-xs opacity-75 mt-0.5">
                      {event.location}
                    </div>
                  )}
                  {event.attendees && event.attendees.length > 0 && (
                    <div className="flex -space-x-2 mt-1">
                      {event.attendees.map((attendee) => (
                        <Avatar
                          key={attendee.id}
                          className="h-5 w-5 border-2 border-white"
                        >
                          <AvatarImage src={attendee.avatar} />
                          <AvatarFallback>
                            {attendee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )

  const renderWeekView = () => (
    <div className="flex flex-1 overflow-hidden">
      {renderTimeColumn()}
      <div className="flex flex-1">
        {days.map((dayOffset) => {
          const date = addDays(weekStart, dayOffset)
          const isToday = isSameDay(date, new Date())
          const dayEvents = events.filter((event) =>
            isSameDay(event.startTime, date)
          )

          return (
            <div
              key={dayOffset}
              className="flex-1 min-w-[120px] border-r last:border-r-0"
            >
              {/* Day header */}
              <div
                className={cn(
                  "h-12 border-b sticky top-0 bg-background z-20 flex flex-col items-center justify-center",
                  isToday && "bg-accent"
                )}
              >
                <div className="text-sm font-medium">
                  {format(date, "EEEE", { locale: tr })}
                </div>
                <div
                  className={cn(
                    "text-sm",
                    isToday && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mt-1"
                  )}
                >
                  {format(date, "d")}
                </div>
              </div>

              {/* Time grid */}
              <div className="relative">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="border-b cursor-pointer hover:bg-accent/50 transition-colors"
                    style={{ height: `${HOUR_HEIGHT}px` }}
                    onClick={() => handleTimeSlotClick(date, hour)}
                  />
                ))}

                {/* Events */}
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="absolute left-0 right-0 mx-1 rounded-md p-1 overflow-hidden cursor-pointer hover:opacity-80"
                    style={getEventStyle(event)}
                    onClick={() => onEventClick?.(event)}
                  >
                    <div
                      className={cn(
                        "h-full rounded-md p-2 text-white",
                        getPriorityColor(event.priority)
                      )}
                    >
                      <div className="text-xs font-medium">{event.title}</div>
                      <div className="text-xs opacity-90">
                        {format(event.startTime, "HH:mm")} -{" "}
                        {format(event.endTime, "HH:mm")}
                      </div>
                      {event.location && (
                        <div className="text-xs opacity-75 mt-0.5">
                          {event.location}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto">
      {view === "day" ? renderDayView() : renderWeekView()}
    </div>
  )
}
