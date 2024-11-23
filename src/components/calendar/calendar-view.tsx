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
  isSameMonth,
  setHours,
} from "date-fns"
import { tr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { CalendarEvent, CalendarViewType } from "@/types/calendar"
import { mockEvents } from "@/data/mock-events"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const hours = Array.from({ length: 24 }, (_, i) => i)
const days = Array.from({ length: 7 }, (_, i) => i)
const HOUR_HEIGHT = 48 // Satır yüksekliğini küçülttük

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
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)

  const scrollToCurrentTime = () => {
    const now = new Date()
    const currentHour = getHours(now)
    const scrollContainer = document.querySelector('.calendar-scroll-container')
    if (scrollContainer) {
      const scrollPosition = currentHour * HOUR_HEIGHT - (scrollContainer.clientHeight / 2)
      scrollContainer.scrollTop = Math.max(0, scrollPosition)
    }
  }

  useEffect(() => {
    scrollToCurrentTime()
  }, [view]) // view değiştiğinde de scroll pozisyonunu güncelle

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
    <div className="w-20 flex-none relative">
      <div className="absolute top-0 left-0 w-full" style={{ height: `${HOUR_HEIGHT * 24}px` }}>
        {hours.map((hour) => (
          <div
            key={hour}
            className="absolute w-full"
            style={{
              height: `${HOUR_HEIGHT}px`,
              top: `${hour * HOUR_HEIGHT}px`,
            }}
          >
            <div className="absolute -top-3 right-4 text-xs text-muted-foreground">
              {String(hour).padStart(2, '0')}:00
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderDayHeader = (date: Date) => (
    <div className="sticky top-0 z-10 bg-background border-b">
      <div className="flex h-10">
        <div className="w-20 flex-none" />
        <div className="flex-1 border-l">
          <div className={cn(
            "h-full flex flex-col items-center justify-center py-1",
            isSameDay(date, new Date()) && "bg-accent"
          )}>
            <div className="text-xs font-medium">
              {format(date, "EEEE", { locale: tr })}
            </div>
            <div className={cn(
              "text-xs",
              isSameDay(date, new Date()) && "bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center"
            )}>
              {format(date, "d")}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderWeekHeader = () => (
    <div className="sticky top-0 z-10 bg-background border-b">
      <div className="flex h-10">
        <div className="w-20 flex-none" />
        {days.map((dayOffset) => {
          const date = addDays(weekStart, dayOffset)
          const isToday = isSameDay(date, new Date())

          return (
            <div
              key={dayOffset}
              className={cn(
                "flex-1 border-l",
                isToday && "bg-accent"
              )}
            >
              <div className="h-full flex flex-col items-center justify-center py-1">
                <div className="text-xs font-medium">
                  {format(date, "EEEE", { locale: tr })}
                </div>
                <div className={cn(
                  "text-xs",
                  isToday && "bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center"
                )}>
                  {format(date, "d")}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderCurrentTimeLine = () => {
    const now = new Date()
    const minutes = now.getHours() * 60 + now.getMinutes()
    const top = (minutes / 60) * HOUR_HEIGHT

    return (
      <div 
        className="absolute left-0 right-0 z-10"
        style={{ top: `${top}px` }}
      >
        <div className="relative">
          <div className="absolute right-0 w-2 h-2 -mt-1 rounded-full bg-red-500" />
          <div className="border-t border-red-500" />
        </div>
      </div>
    )
  }

  const renderDayView = () => (
    <div className="flex flex-col h-full">
      <div className="flex-none">
        {renderDayHeader(currentDate)}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex calendar-scroll-container overflow-y-auto">
          {renderTimeColumn()}
          <div className="flex-1 min-w-[200px] relative">
            <div className="relative" style={{ height: `${HOUR_HEIGHT * 24}px` }}>
              <div className="absolute inset-0 border-l" />
              {/* Time grid */}
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="absolute w-full border-b cursor-pointer hover:bg-accent/50 transition-colors"
                  style={{ 
                    height: `${HOUR_HEIGHT}px`,
                    top: `${hour * HOUR_HEIGHT}px`
                  }}
                  onClick={() => handleTimeSlotClick(currentDate, hour)}
                />
              ))}

              {/* Current time line */}
              {isSameDay(currentDate, new Date()) && renderCurrentTimeLine()}

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
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderWeekView = () => (
    <div className="flex flex-col h-full">
      <div className="flex-none">
        {renderWeekHeader()}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex calendar-scroll-container overflow-y-auto">
          {renderTimeColumn()}
          <div className="flex-1 relative">
            <div className="flex h-full">
              {days.map((dayOffset) => {
                const date = addDays(weekStart, dayOffset)
                const dayEvents = events.filter((event) =>
                  isSameDay(event.startTime, date)
                )

                return (
                  <div
                    key={dayOffset}
                    className="flex-1 min-w-[120px] relative border-l"
                    style={{ height: `${HOUR_HEIGHT * 24}px` }}
                  >
                    {/* Time grid */}
                    {hours.map((hour) => (
                      <div
                        key={hour}
                        className="absolute w-full border-b cursor-pointer hover:bg-accent/50 transition-colors"
                        style={{ 
                          height: `${HOUR_HEIGHT}px`,
                          top: `${hour * HOUR_HEIGHT}px`
                        }}
                        onClick={() => handleTimeSlotClick(date, hour)}
                      />
                    ))}

                    {/* Current time line */}
                    {isSameDay(date, new Date()) && renderCurrentTimeLine()}

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
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMonthView = () => {
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
    const firstDayOfMonth = getDay(monthStart)
    const totalDays = monthDays.length + firstDayOfMonth
    const totalWeeks = Math.ceil(totalDays / 7)
    const monthGrid = Array.from({ length: totalWeeks * 7 }, (_, i) => {
      const dayOffset = i - firstDayOfMonth
      return addDays(monthStart, dayOffset)
    })

    return (
      <div className="grid grid-cols-7 gap-px bg-muted h-full">
        {/* Gün başlıkları */}
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={`header-${i}`}
            className="h-10 flex items-center justify-center bg-background"
          >
            <span className="text-xs font-medium">
              {format(addDays(startOfWeek(new Date(), { locale: tr }), i), "EEEE", { locale: tr })}
            </span>
          </div>
        ))}

        {/* Takvim günleri */}
        {monthGrid.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentDate)
          const isToday = isSameDay(date, new Date())
          const dayEvents = events.filter((event) =>
            event.startTime && isSameDay(new Date(event.startTime), date)
          )

          return (
            <div
              key={`day-${index}`}
              className={cn(
                "min-h-[120px] p-2 bg-background",
                !isCurrentMonth && "text-muted-foreground bg-muted/50",
                isToday && "bg-accent"
              )}
              onClick={() => onTimeSlotClick?.(date)}
            >
              <div className="flex justify-between items-center">
                <span
                  className={cn(
                    "text-xs",
                    isToday &&
                      "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center"
                  )}
                >
                  {format(date, "d")}
                </span>
                {dayEvents && dayEvents.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {dayEvents.length}
                  </Badge>
                )}
              </div>
              <div className="mt-2 space-y-1">
                {dayEvents && dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={`event-${event.id}-${index}`}
                    className={cn(
                      "text-xs p-1 rounded truncate cursor-pointer hover:opacity-80",
                      getPriorityColor(event.priority)
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick?.(event)
                    }}
                  >
                    <span className="text-white">
                      {event.startTime && format(new Date(event.startTime), "HH:mm")} - {event.title}
                    </span>
                  </div>
                ))}
                {dayEvents && dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground text-center">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto">
      {view === "day" && renderDayView()}
      {view === "week" && renderWeekView()}
      {view === "month" && renderMonthView()}
    </div>
  )
}
