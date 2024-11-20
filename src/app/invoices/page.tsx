"use client"

import { useState } from "react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { InvoicesTable } from "@/components/invoices/invoices-table"
import { InvoiceDialog } from "@/components/invoices/invoice-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type Invoice = {
  id: string
  invoiceNumber: string
  customerName: string
  date: Date
  dueDate: Date
  amount: number
  status: "paid" | "pending" | "overdue"
  items: {
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    customerName: "Ahmet Yılmaz",
    date: new Date(2024, 0, 15),
    dueDate: new Date(2024, 1, 15),
    amount: 2500,
    status: "paid",
    items: [
      {
        description: "Yazılım Hizmeti",
        quantity: 1,
        unitPrice: 2500,
        total: 2500
      }
    ]
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    customerName: "Mehmet Demir",
    date: new Date(2024, 0, 20),
    dueDate: new Date(2024, 1, 20),
    amount: 3750,
    status: "pending",
    items: [
      {
        description: "Danışmanlık Hizmeti",
        quantity: 5,
        unitPrice: 750,
        total: 3750
      }
    ]
  }
]

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus
    const matchesSearch = invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleNewInvoice = () => {
    setSelectedInvoice(null)
    setIsDialogOpen(true)
  }

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsDialogOpen(true)
  }

  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId))
  }

  const handleSaveInvoice = (invoice: Invoice) => {
    if (selectedInvoice) {
      setInvoices(invoices.map((i) => (i.id === invoice.id ? invoice : i)))
    } else {
      setInvoices([...invoices, { ...invoice, id: Math.random().toString() }])
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Faturalar</h1>
        <Button onClick={handleNewInvoice}>
          Yeni Fatura Oluştur
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Müşteri adı veya fatura numarası ile ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Duruma göre filtrele" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="paid">Ödendi</SelectItem>
            <SelectItem value="pending">Beklemede</SelectItem>
            <SelectItem value="overdue">Gecikmiş</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <InvoicesTable
        invoices={filteredInvoices}
        onEdit={handleEditInvoice}
        onDelete={handleDeleteInvoice}
      />

      <InvoiceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        invoice={selectedInvoice}
        onSave={handleSaveInvoice}
      />
    </div>
  )
}
