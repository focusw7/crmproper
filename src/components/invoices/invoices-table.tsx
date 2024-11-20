"use client"

import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileEdit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Invoice } from "@/app/invoices/page"

interface InvoicesTableProps {
  invoices: Invoice[]
  onEdit: (invoice: Invoice) => void
  onDelete: (invoiceId: string) => void
}

const statusMap = {
  paid: { label: "Ödendi", variant: "success" },
  pending: { label: "Beklemede", variant: "warning" },
  overdue: { label: "Gecikmiş", variant: "destructive" },
} as const

export function InvoicesTable({ invoices, onEdit, onDelete }: InvoicesTableProps) {
  const router = useRouter()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fatura No</TableHead>
            <TableHead>Müşteri</TableHead>
            <TableHead>Tarih</TableHead>
            <TableHead>Vade</TableHead>
            <TableHead className="text-right">Tutar</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow 
              key={invoice.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => router.push(`/invoices/${invoice.id}`)}
            >
              <TableCell className="font-medium">
                {invoice.invoiceNumber}
              </TableCell>
              <TableCell>{invoice.customerName}</TableCell>
              <TableCell>
                {format(invoice.date, "d MMMM yyyy", { locale: tr })}
              </TableCell>
              <TableCell>
                {format(invoice.dueDate, "d MMMM yyyy", { locale: tr })}
              </TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                }).format(invoice.amount)}
              </TableCell>
              <TableCell>
                <Badge variant={statusMap[invoice.status].variant as any}>
                  {statusMap[invoice.status].label}
                </Badge>
              </TableCell>
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Menüyü aç</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(invoice)}>
                      <FileEdit className="mr-2 h-4 w-4" />
                      Düzenle
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(invoice.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
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
  )
}
