"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Mail, Phone, Edit, Trash, Eye } from "lucide-react"
import { CustomerForm } from "./customer-form"
import Link from "next/link"

const customers = [
  {
    id: "728ed52f",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "+90 555 123 4567",
    status: "active",
    lastOrder: "1,250₺",
    totalOrders: "12,350₺",
    method: "Kredi Kartı",
    address: "İstanbul, Türkiye",
    joinDate: "15 Ocak 2023",
  },
  {
    id: "489e1d42",
    name: "Ayşe Demir",
    email: "ayse@example.com",
    phone: "+90 555 987 6543",
    status: "pending",
    lastOrder: "750₺",
    totalOrders: "8,150₺",
    method: "Havale",
    address: "Ankara, Türkiye",
    joinDate: "22 Mart 2023",
  },
  {
    id: "624c3a1b",
    name: "Mehmet Kaya",
    email: "mehmet@example.com",
    phone: "+90 555 456 7890",
    status: "inactive",
    lastOrder: "2,100₺",
    totalOrders: "15,750₺",
    method: "Kredi Kartı",
    address: "İzmir, Türkiye",
    joinDate: "5 Şubat 2023",
  },
]

const statusMap = {
  active: { label: "Aktif", class: "bg-green-500/15 text-green-700" },
  pending: { label: "Beklemede", class: "bg-yellow-500/15 text-yellow-700" },
  inactive: { label: "Pasif", class: "bg-red-500/15 text-red-700" },
}

interface CustomersTableProps {
  rowClassName?: string;
  onRowClick?: (customer: any) => void;
}

export function CustomersTable({ rowClassName, onRowClick }: CustomersTableProps) {
  const router = useRouter()
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [editingCustomer, setEditingCustomer] = useState<typeof customers[0] | null>(null)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleSelectAll = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(customers.map((customer) => customer.id))
    }
  }

  const handleSelectOne = (customerId: string) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId))
    } else {
      setSelectedCustomers([...selectedCustomers, customerId])
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedCustomers.length === customers.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-[150px]">Müşteri</TableHead>
            <TableHead>İletişim</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead>Son Sipariş</TableHead>
            <TableHead>Toplam</TableHead>
            <TableHead>Katılım</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow 
              key={customer.id}
              className={`${rowClassName} cursor-pointer hover:bg-muted/50`}
              onClick={() => onRowClick && onRowClick(customer)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedCustomers.includes(customer.id)}
                  onCheckedChange={() => handleSelectOne(customer.id)}
                />
              </TableCell>
              <TableCell>
                <div className="font-medium">{customer.name}</div>
                <div className="text-sm text-muted-foreground">
                  {customer.address}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customer.phone}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={statusMap[customer.status as keyof typeof statusMap].class}
                >
                  {statusMap[customer.status as keyof typeof statusMap].label}
                </Badge>
              </TableCell>
              <TableCell>{customer.lastOrder}</TableCell>
              <TableCell>{customer.totalOrders}</TableCell>
              <TableCell>{customer.joinDate}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Menüyü aç</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setEditingCustomer(customer)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Düzenle
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Görüntüle
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash className="mr-2 h-4 w-4" />
                      Sil
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomerForm
        isOpen={!!editingCustomer}
        onClose={() => setEditingCustomer(null)}
        customer={editingCustomer || undefined}
      />
    </>
  )
}
