"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function CalendarToolbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Etkinlik ara..."
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Button variant="outline" size="sm" className="h-8 px-2 lg:px-3">
          <Search className="h-4 w-4" />
          <span className="ml-2 hidden lg:inline">Ara</span>
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
          Etkinlik Ekle
        </Button>
      </div>
    </div>
  )
}
