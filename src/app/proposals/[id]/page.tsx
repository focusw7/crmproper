"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, CheckCircle2, XCircle } from "lucide-react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock veri - gerçek uygulamada API'den gelecek
const proposalStatuses = [
  { value: "draft", label: "Taslak", color: "bg-slate-500" },
  { value: "sent", label: "Gönderildi", color: "bg-blue-500" },
  { value: "accepted", label: "Kabul Edildi", color: "bg-green-500" },
  { value: "rejected", label: "Reddedildi", color: "bg-red-500" },
]

const customers = [
  { id: 1, name: "ABC Şirketi" },
  { id: 2, name: "XYZ Limited" },
  { id: 3, name: "123 Holding" },
]

const mockProposal = {
  id: 1,
  date: new Date(2024, 0, 15),
  customer: "1",
  title: "Yazılım Geliştirme Projesi",
  amount: "50000.00",
  status: "sent",
  validUntil: new Date(2024, 1, 15),
  description: "Web uygulaması geliştirme projesi için teklif",
  items: [
    { id: 1, description: "Frontend Geliştirme", amount: "20000.00" },
    { id: 2, description: "Backend Geliştirme", amount: "20000.00" },
    { id: 3, description: "Veritabanı Tasarımı", amount: "10000.00" },
  ],
  terms: "Ödeme 30 gün içinde yapılmalıdır.",
  notes: "Proje 3 ay içinde tamamlanacaktır.",
  preparedBy: "Mehmet Yılmaz",
}

export default function ProposalDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const handleStatusChange = (newStatus: string) => {
    // API çağrısı yapılacak
    console.log(`Status changed to ${newStatus}`)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Teklif Detayı</h1>
        </div>
        {mockProposal.status === "draft" && (
          <Button onClick={() => handleStatusChange("sent")}>
            <Send className="h-4 w-4 mr-2" />
            Gönder
          </Button>
        )}
        {mockProposal.status === "sent" && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleStatusChange("accepted")}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Onayla
            </Button>
            <Button variant="outline" onClick={() => handleStatusChange("rejected")}>
              <XCircle className="h-4 w-4 mr-2" />
              Reddet
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Genel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Müşteri</div>
              <div>{customers.find(c => c.id.toString() === mockProposal.customer)?.name}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Başlık</div>
              <div>{mockProposal.title}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Durum</div>
              <div>
                <span className={cn(
                  "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                  proposalStatuses.find(s => s.value === mockProposal.status)?.color,
                  "text-white"
                )}>
                  {proposalStatuses.find(s => s.value === mockProposal.status)?.label}
                </span>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Tarih</div>
              <div>{format(mockProposal.date, "dd MMMM yyyy", { locale: tr })}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Geçerlilik Tarihi</div>
              <div>{format(mockProposal.validUntil, "dd MMMM yyyy", { locale: tr })}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teklif Kalemleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProposal.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                  <div>{item.description}</div>
                  <div>
                    {Number(item.amount).toLocaleString('tr-TR', {
                      style: 'currency',
                      currency: 'TRY'
                    })}
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 font-semibold">
                <div>Toplam</div>
                <div>
                  {Number(mockProposal.amount).toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detaylar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Açıklama</div>
              <div>{mockProposal.description}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Şartlar</div>
              <div>{mockProposal.terms}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Notlar</div>
              <div>{mockProposal.notes}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hazırlayan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">İsim</div>
              <div>{mockProposal.preparedBy}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
