import { addDays, addHours, startOfDay, subDays } from 'date-fns'
import { CalendarEvent } from '@/types/calendar'

const today = new Date()
const startOfToday = startOfDay(today)

export const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Müşteri Toplantısı',
    description: 'ABC Şirketi ile ürün demosunu gerçekleştir',
    startTime: addHours(startOfToday, 10),
    endTime: addHours(startOfToday, 11),
    priority: 'high',
    status: 'scheduled',
    location: 'Online - Zoom',
    attendees: [
      { id: '1', name: 'Ahmet Yılmaz', avatar: '/avatars/01.png' },
      { id: '2', name: 'Ayşe Demir', avatar: '/avatars/02.png' },
    ],
  },
  {
    id: '2',
    title: 'Proje Planlaması',
    description: 'Q2 projelerinin planlaması ve kaynak dağılımı',
    startTime: addHours(addDays(startOfToday, 1), 14),
    endTime: addHours(addDays(startOfToday, 1), 15),
    priority: 'medium',
    status: 'scheduled',
    location: 'Toplantı Odası 2',
    attendees: [
      { id: '1', name: 'Ahmet Yılmaz', avatar: '/avatars/01.png' },
      { id: '3', name: 'Mehmet Kaya', avatar: '/avatars/03.png' },
    ],
  },
  {
    id: '3',
    title: 'Ekip Retrospektifi',
    description: 'Aylık ekip değerlendirme toplantısı',
    startTime: addHours(subDays(startOfToday, 1), 15),
    endTime: addHours(subDays(startOfToday, 1), 16),
    priority: 'low',
    status: 'completed',
    location: 'Toplantı Odası 1',
    attendees: [
      { id: '1', name: 'Ahmet Yılmaz', avatar: '/avatars/01.png' },
      { id: '2', name: 'Ayşe Demir', avatar: '/avatars/02.png' },
      { id: '3', name: 'Mehmet Kaya', avatar: '/avatars/03.png' },
    ],
  },
]
