"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Building2, Receipt, CreditCard } from "lucide-react"

// Mock veri - API entegrasyonunda değiştirilecek
const invoiceData = {
  id: "INV001",
  invoiceNumber: "F-2024-001",
  customerName: "ABC Teknoloji Ltd. Şti.",
  customerAddress: "Merkez Mah. Atatürk Cad. No:123 İstanbul",
  customerTaxId: "1234567890",
  date: new Date("2024-01-15"),
  dueDate: new Date("2024-02-15"),
  status: "pending" as const,
  amount: 25000,
  items: [
    {
      id: 1,
      description: "Web Sitesi Tasarımı",
      quantity: 1,
      unitPrice: 15000,
      total: 15000,
    },
    {
      id: 2,
      description: "SEO Optimizasyonu",
      quantity: 1,
      unitPrice: 10000,
      total: 10000,
    },
  ],
}

const statusMap = {
  paid: { label: "Ödendi", variant: "success" },
  pending: { label: "Beklemede", variant: "warning" },
  overdue: { label: "Gecikmiş", variant: "destructive" },
} as const

export default function InvoiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const invoiceId = params.id as string

  // API'den fatura detaylarını çekme fonksiyonu burada implement edilecek
  const invoice = invoiceData // Şimdilik mock veri kullanıyoruz

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Geri Butonu */}
      <Button
        variant="ghost"
        className="gap-2"
        onClick={() => router.push('/invoices')}
      >
        <ArrowLeft className="h-4 w-4" />
        Faturalar Listesine Dön
      </Button>

      {/* Üst Bilgi Kartı */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Fatura #{invoice.invoiceNumber}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {invoice.customerName}
            </div>
          </div>
          <Badge variant={statusMap[invoice.status].variant as any}>
            {statusMap[invoice.status].label}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Fatura Tarihi</div>
                <div className="font-medium">
                  {invoice.date.toLocaleDateString("tr-TR")}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Vade Tarihi</div>
                <div className="font-medium">
                  {invoice.dueDate.toLocaleDateString("tr-TR")}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Vergi No</div>
                <div className="font-medium">{invoice.customerTaxId}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Toplam Tutar</div>
                <div className="font-medium">
                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(invoice.amount)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Müşteri Bilgileri */}
      <Card>
        <CardHeader>
          <CardTitle>Müşteri Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <div className="font-medium">{invoice.customerName}</div>
              <div className="text-sm text-muted-foreground">
                {invoice.customerAddress}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fatura Kalemleri */}
      <Card>
        <CardHeader>
          <CardTitle>Fatura Kalemleri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th className="px-4 py-2">Açıklama</th>
                  <th className="px-4 py-2 text-right">Miktar</th>
                  <th className="px-4 py-2 text-right">Birim Fiyat</th>
                  <th className="px-4 py-2 text-right">Toplam</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-2">{item.description}</td>
                    <td className="px-4 py-2 text-right">{item.quantity}</td>
                    <td className="px-4 py-2 text-right">
                      {new Intl.NumberFormat("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      }).format(item.unitPrice)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {new Intl.NumberFormat("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      }).format(item.total)}
                    </td>
                  </tr>
                ))}
                <tr className="font-medium">
                  <td colSpan={3} className="px-4 py-2 text-right">
                    Genel Toplam
                  </td>
                  <td className="px-4 py-2 text-right">
                    {new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    }).format(invoice.amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
