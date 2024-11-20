"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function EmployeesTableToolbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Çalışan ara..."
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Departman" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Departmanlar</SelectItem>
            <SelectItem value="sales">Satış</SelectItem>
            <SelectItem value="support">Müşteri Hizmetleri</SelectItem>
            <SelectItem value="marketing">Pazarlama</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          Ara
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          Filtrele
        </Button>
        <Button variant="default" size="sm">
          Yeni Çalışan
        </Button>
      </div>
    </div>
  )
}
