"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, MapPin, Building2, User2, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock veri - gerçek uygulamada API'den gelecek
const mockSupplier = {
  id: 1,
  name: "ABC Tedarik Ltd. Şti.",
  contactPerson: "Ahmet Yılmaz",
  email: "ahmet@abctedarik.com",
  phone: "0212 555 1234",
  address: "İstanbul, Türkiye",
  category: "Elektronik",
  notes: "Düzenli tedarikçi, hızlı teslimat",
  taxNumber: "1234567890",
  website: "www.abctedarik.com",
  paymentTerms: "30 gün vadeli",
  rating: 4.5,
  activeContracts: [
    {
      id: 1,
      title: "Yıllık Tedarik Sözleşmesi",
      startDate: "01.01.2024",
      endDate: "31.12.2024",
      value: "500000.00",
    }
  ],
  recentOrders: [
    {
      id: 1,
      date: "15.01.2024",
      orderNumber: "PO-2024-001",
      amount: "25000.00",
      status: "Tamamlandı",
    },
    {
      id: 2,
      date: "01.02.2024",
      orderNumber: "PO-2024-002",
      amount: "35000.00",
      status: "Devam Ediyor",
    }
  ]
}

export default function SupplierDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Tedarikçi Detayı</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Firma Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{mockSupplier.name}</div>
                <div className="text-sm text-muted-foreground">Firma Adı</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{mockSupplier.contactPerson}</div>
                <div className="text-sm text-muted-foreground">İletişim Kişisi</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{mockSupplier.email}</div>
                <div className="text-sm text-muted-foreground">E-posta</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{mockSupplier.phone}</div>
                <div className="text-sm text-muted-foreground">Telefon</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{mockSupplier.address}</div>
                <div className="text-sm text-muted-foreground">Adres</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{mockSupplier.taxNumber}</div>
                <div className="text-sm text-muted-foreground">Vergi Numarası</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ticari Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Kategori</div>
              <div>{mockSupplier.category}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Website</div>
              <div>{mockSupplier.website}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Ödeme Koşulları</div>
              <div>{mockSupplier.paymentTerms}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Değerlendirme</div>
              <div>{mockSupplier.rating} / 5</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Notlar</div>
              <div>{mockSupplier.notes}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aktif Sözleşmeler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSupplier.activeContracts.map((contract) => (
                <div key={contract.id} className="p-4 border rounded-lg">
                  <div className="font-medium">{contract.title}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {contract.startDate} - {contract.endDate}
                  </div>
                  <div className="mt-2 text-right font-medium">
                    {Number(contract.value).toLocaleString('tr-TR', {
                      style: 'currency',
                      currency: 'TRY'
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Son Siparişler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSupplier.recentOrders.map((order) => (
                <div key={order.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{order.orderNumber}</div>
                    <div className="text-sm">{order.date}</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-muted-foreground">{order.status}</div>
                    <div className="font-medium">
                      {Number(order.amount).toLocaleString('tr-TR', {
                        style: 'currency',
                        currency: 'TRY'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
