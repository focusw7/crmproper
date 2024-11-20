"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock veri - gerçek uygulamada API'den gelecek
const expenseCategories = [
  { value: "office", label: "Ofis Giderleri" },
  { value: "travel", label: "Seyahat" },
  { value: "software", label: "Yazılım Lisansları" },
  { value: "marketing", label: "Pazarlama" },
  { value: "other", label: "Diğer" },
]

const mockExpense = {
  id: 1,
  date: new Date(2024, 0, 15),
  category: "office",
  description: "Ofis Malzemeleri Alımı",
  amount: "1500.00",
  paymentMethod: "Kredi Kartı",
  receipt: "receipt-001.pdf",
  notes: "Kırtasiye malzemeleri ve ofis mobilyası",
  approvedBy: "Ahmet Yılmaz",
  approvalDate: new Date(2024, 0, 16),
}

export default function ExpenseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Gider Detayı</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Genel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Tarih</div>
              <div>{format(mockExpense.date, "dd MMMM yyyy", { locale: tr })}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Kategori</div>
              <div>{expenseCategories.find(c => c.value === mockExpense.category)?.label}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Açıklama</div>
              <div>{mockExpense.description}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Tutar</div>
              <div className="text-lg font-semibold">
                {Number(mockExpense.amount).toLocaleString('tr-TR', {
                  style: 'currency',
                  currency: 'TRY'
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ödeme Detayları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Ödeme Yöntemi</div>
              <div>{mockExpense.paymentMethod}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Makbuz/Fatura</div>
              <div className="text-blue-600 hover:underline cursor-pointer">
                {mockExpense.receipt}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Notlar</div>
              <div>{mockExpense.notes}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Onay Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Onaylayan</div>
              <div>{mockExpense.approvedBy}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Onay Tarihi</div>
              <div>
                {format(mockExpense.approvalDate, "dd MMMM yyyy", { locale: tr })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
