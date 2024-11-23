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
    balance: "5,000₺",
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
    balance: "-2,500₺",
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
    balance: "8,750₺",
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
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedCustomers.length === customers.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                Müşteri
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("balance")}>
                Bakiye
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                Durum
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("lastOrder")}>
                Son Sipariş
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("totalOrders")}>
                Toplam
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow
                key={customer.id}
                className={`h-12 hover:bg-slate-50 ${
                  selectedCustomers.includes(customer.id) ? "bg-slate-50" : ""
                } cursor-pointer transition-colors`}
                onClick={() => router.push(`/customers/${customer.id}`)}
              >
                <TableCell className="p-2">
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={() => handleSelectOne(customer.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell className="p-2">
                  <div className="flex flex-col">
                    <span className="font-medium">{customer.name}</span>
                    <span className="text-sm text-gray-500">{customer.email}</span>
                  </div>
                </TableCell>
                <TableCell className="p-2">
                  <span className={customer.balance.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                    {customer.balance}
                  </span>
                </TableCell>
                <TableCell className="p-2">
                  <Badge className={statusMap[customer.status as keyof typeof statusMap].class}>
                    {statusMap[customer.status as keyof typeof statusMap].label}
                  </Badge>
                </TableCell>
                <TableCell className="p-2">{customer.lastOrder}</TableCell>
                <TableCell className="p-2">{customer.totalOrders}</TableCell>
                <TableCell className="p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/customers/${customer.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Görüntüle
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditingCustomer(customer)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Düzenle
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
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
      </div>
      {editingCustomer && (
        <CustomerForm
          isOpen={!!editingCustomer}
          onClose={() => setEditingCustomer(null)}
          customer={editingCustomer}
        />
      )}
    </div>
  )
}
