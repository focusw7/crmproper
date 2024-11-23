export type EventPriority = 'low' | 'medium' | 'high'
export type EventStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled'

export interface Customer {
  id: string
  name: string
  company: string
}

export interface Employee {
  id: string
  name: string
  department: string
}

export type RecurrenceType = "none" | "daily" | "weekly" | "monthly" | "yearly" | "custom"

export type RecurrenceEndType = "never" | "after" | "on-date"

export interface RecurrenceRule {
  type: RecurrenceType
  interval: number
  endType: RecurrenceEndType
  endAfterOccurrences?: number
  endDate?: string
  weekDays?: string[] // ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]
}

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  location?: string
  startTime: Date
  endTime: Date
  priority: EventPriority
  status: EventStatus
  customerId?: string
  customerName?: string
  employeeId?: string
  employeeName?: string
  recurrence?: RecurrenceRule
  attendees?: Array<{
    id: string
    name: string
    avatar?: string
  }>
}

export type CalendarViewType = 'day' | 'week' | 'month'
