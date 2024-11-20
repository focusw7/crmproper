"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CustomerForm } from "./customer-form"
import { Plus, Search } from "lucide-react"

export function CustomersToolbar() {
  const [isAddingCustomer, setIsAddingCustomer] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    // Arama fonksiyonu burada implement edilecek
  }

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
      <div className="flex flex-1 items-center space-x-2 md:max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Müşteri ara..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Durum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="pending">Beklemede</SelectItem>
            <SelectItem value="inactive">Pasif</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sıralama" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">İsim</SelectItem>
            <SelectItem value="lastOrder">Son Sipariş</SelectItem>
            <SelectItem value="totalOrders">Toplam Sipariş</SelectItem>
            <SelectItem value="joinDate">Katılım Tarihi</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={() => setIsAddingCustomer(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Müşteri
        </Button>
      </div>

      <CustomerForm
        isOpen={isAddingCustomer}
        onClose={() => setIsAddingCustomer(false)}
      />
    </div>
  )
}
