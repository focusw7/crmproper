export type EventPriority = 'low' | 'medium' | 'high'
export type EventStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled'

export interface Customer {
  id: string | number
  name: string
  company: string
}

export interface Employee {
  id: string | number
  name: string
  department: string
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
  customerId?: string | number
  customerName?: string
  employeeId?: string | number
  employeeName?: string
  attendees?: Array<{
    id: string
    name: string
    avatar?: string
  }>
}

export type CalendarViewType = 'day' | 'week' | 'month'
