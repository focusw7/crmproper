"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Filter, LayoutGrid, ListFilter, Search, Table } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { useState } from "react"

interface TasksToolbarProps {
  onViewChange?: (view: 'table' | 'kanban') => void
  view?: 'table' | 'kanban'
}

export function TasksToolbar({ onViewChange, view = 'table' }: TasksToolbarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState("all")
  const [priority, setPriority] = useState("all")

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="İş ara..."
            className="h-8 w-[150px] lg:w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" size="sm" className="h-8 px-2 lg:px-3">
            <Search className="h-4 w-4" />
            <span className="ml-2 hidden lg:inline">Ara</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={view === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange?.('table')}
          >
            <Table className="h-4 w-4" />
          </Button>
          <Button
            variant={view === 'kanban' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange?.('kanban')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="h-8 w-[120px]">
            <SelectValue placeholder="Durum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="todo">Yapılacak</SelectItem>
            <SelectItem value="in-progress">Devam Eden</SelectItem>
            <SelectItem value="done">Tamamlanan</SelectItem>
            <SelectItem value="cancelled">İptal Edilen</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="h-8 w-[120px]">
            <SelectValue placeholder="Öncelik" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="high">Yüksek</SelectItem>
            <SelectItem value="medium">Orta</SelectItem>
            <SelectItem value="low">Düşük</SelectItem>
          </SelectContent>
        </Select>

        <DatePickerWithRange className="h-8" />

        <Button variant="outline" size="sm" className="h-8">
          <Filter className="mr-2 h-4 w-4" />
          Daha Fazla Filtre
        </Button>
      </div>
    </div>
  )
}
