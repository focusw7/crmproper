"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Edit, FileText, Download, Eye, Receipt, Building2, ExternalLink, FileSpreadsheet, FileImage, FileText as FileTextIcon, FolderOpen, Plus, Pencil, Trash2 } from "lucide-react"
import { CustomerForm } from "@/components/customers/customer-form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from 'sonner';

// Tip tanımlamaları
type Status = 'paid' | 'pending' | 'overdue';
type DocumentType = 'report' | 'presentation' | 'spreadsheet' | 'document';
type ContractType = 'service' | 'nda' | 'maintenance';
type EquipmentType = 'Laptop' | 'Telefon' | 'Tablet' | 'Yazıcı';
type ConditionType = 'İyi' | 'Orta' | 'Kötü' | 'Onarımda';

interface StatusConfig {
  [key: string]: {
    label: string;
    class: string;
  }
}

interface DocumentConfig {
  [key: string]: {
    icon: any;
    class: string;
    label: string;
  }
}

interface ActivityConfig {
  [key: string]: {
    label: string;
    class: string;
  }
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  lastOrder: string;
  totalOrders: string;
  paymentMethod: string;
  address: string;
  joinDate: string;
  orders: {
    id: string;
    date: string;
    amount: string;
    status: string;
  }[];
  activities: {
    id: string;
    type: string;
    description: string;
    date: string;
  }[];
  contracts: {
    id: string;
    title: string;
    date: string;
    status: string;
    type: ContractType;
    file: string;
  }[];
  invoices: {
    total: number;
    paid: number;
    pending: number;
    overdue: number;
    totalAmount: string;
    list: {
      id: string;
      date: string;
      dueDate: string;
      amount: string;
      status: Status;
      description: string;
    }[];
  };
  domain: {
    files: {
      id: string;
      name: string;
      type: DocumentType;
      size: string;
      uploadDate: string;
      category: string;
      description: string;
    }[];
  };
  equipments: {
    id: number;
    name: string;
    type: EquipmentType;
    serialNumber: string;
    status: string;
    assignedTo: string;
    purchaseDate: string;
    warranty: string;
    condition: ConditionType;
    notes: string;
  }[];
}

const customer: Customer = {
  id: "728ed52f",
  name: "Ahmet Yılmaz",
  email: "ahmet@example.com",
  phone: "+90 555 123 4567",
  status: "active",
  lastOrder: "1,250₺",
  totalOrders: "12,350₺",
  paymentMethod: "havale-eft",
  address: "İstanbul, Türkiye",
  joinDate: "15 Ocak 2023",
  orders: [
    {
      id: "ORD001",
      date: "15 Nisan 2023",
      amount: "1,250₺",
      status: "completed",
    },
    {
      id: "ORD002",
      date: "1 Nisan 2023",
      amount: "2,150₺",
      status: "completed",
    },
  ],
  activities: [
    {
      id: "ACT001",
      type: "order",
      description: "Yeni sipariş oluşturuldu",
      date: "15 Nisan 2023",
    },
    {
      id: "ACT002",
      type: "contact",
      description: "Müşteri destek talebi oluşturdu",
      date: "10 Nisan 2023",
    },
  ],
  contracts: [
    {
      id: "CNT001",
      title: "Hizmet Sözleşmesi",
      date: "15 Ocak 2023",
      status: "active",
      type: "service",
      file: "/contracts/service-agreement.pdf"
    },
    {
      id: "CNT002",
      title: "Gizlilik Sözleşmesi",
      date: "15 Ocak 2023",
      status: "active",
      type: "nda",
      file: "/contracts/nda.pdf"
    },
    {
      id: "CNT003",
      title: "Bakım Sözleşmesi",
      date: "1 Mart 2023",
      status: "pending",
      type: "maintenance",
      file: "/contracts/maintenance.pdf"
    }
  ],
  invoices: {
    total: 15,
    paid: 12,
    pending: 2,
    overdue: 1,
    totalAmount: "25,750₺",
    list: [
      {
        id: "INV001",
        date: "15 Nisan 2023",
        dueDate: "15 Mayıs 2023",
        amount: "1,250₺",
        status: "paid",
        description: "Nisan Ayı Hizmet Faturası"
      },
      {
        id: "INV002",
        date: "1 Mayıs 2023",
        dueDate: "1 Haziran 2023",
        amount: "2,150₺",
        status: "pending",
        description: "Mayıs Ayı Hizmet Faturası"
      },
      {
        id: "INV003",
        date: "1 Haziran 2023",
        dueDate: "1 Temmuz 2023",
        amount: "1,850₺",
        status: "overdue",
        description: "Haziran Ayı Hizmet Faturası"
      }
    ]
  },
  domain: {
    files: [
      {
        id: "DOC001",
        name: "2023 Yıllık Rapor.pdf",
        type: "report",
        size: "2.4 MB",
        uploadDate: "15 Ocak 2024",
        category: "Finansal Rapor",
        description: "2023 yılı detaylı finansal performans raporu"
      },
      {
        id: "DOC002",
        name: "Proje Sunumu.pptx",
        type: "presentation",
        size: "5.1 MB",
        uploadDate: "10 Ocak 2024",
        category: "Proje Dökümanı",
        description: "Yeni e-ticaret projesi sunum dosyası"
      },
      {
        id: "DOC003",
        name: "Müşteri Analizi.xlsx",
        type: "spreadsheet",
        size: "1.8 MB",
        uploadDate: "5 Ocak 2024",
        category: "Analiz Raporu",
        description: "Müşteri davranış analizi ve öngörüler"
      },
      {
        id: "DOC004",
        name: "Toplantı Notları.docx",
        type: "document",
        size: "842 KB",
        uploadDate: "1 Ocak 2024",
        category: "Toplantı Dökümanı",
        description: "Ocak ayı strateji toplantısı notları"
      }
    ]
  },
  equipments: [
    {
      id: 1,
      name: "ThinkPad X1 Carbon",
      type: "Laptop",
      serialNumber: "LP2023001",
      status: "Aktif",
      assignedTo: "Ahmet Yılmaz",
      purchaseDate: "2023-01-15",
      warranty: "2025-01-15",
      condition: "İyi",
      notes: "Windows 11 Pro yüklü, 16GB RAM"
    },
    {
      id: 2,
      name: "iPhone 13 Pro",
      type: "Telefon",
      serialNumber: "IP2023045",
      status: "Tamirde",
      assignedTo: "Ayşe Demir",
      purchaseDate: "2023-03-20",
      warranty: "2025-03-20",
      condition: "Onarımda",
      notes: "Ekran değişimi yapılacak"
    }
  ]
}

const statusMap: StatusConfig = {
  active: { label: "Aktif", class: "bg-green-500/15 text-green-700" },
  pending: { label: "Beklemede", class: "bg-yellow-500/15 text-yellow-700" },
  inactive: { label: "Pasif", class: "bg-red-500/15 text-red-700" },
}

const contractTypeMap = {
  service: "Hizmet",
  nda: "Gizlilik",
  maintenance: "Bakım"
}

const invoiceStatusMap: StatusConfig = {
  paid: { label: "Ödendi", class: "bg-green-500/15 text-green-700" },
  pending: { label: "Beklemede", class: "bg-yellow-500/15 text-yellow-700" },
  overdue: { label: "Gecikmiş", class: "bg-red-500/15 text-red-700" }
}

const projectStatusMap = {
  active: { label: "Devam Ediyor", class: "bg-green-500/15 text-green-700" },
  pending: { label: "Beklemede", class: "bg-yellow-500/15 text-yellow-700" },
  completed: { label: "Tamamlandı", class: "bg-blue-500/15 text-blue-700" }
}

const fileTypeMap: DocumentConfig = {
  report: { icon: FileTextIcon, class: "text-blue-600", label: "Rapor" },
  presentation: { icon: FileImage, class: "text-orange-600", label: "Sunum" },
  spreadsheet: { icon: FileSpreadsheet, class: "text-green-600", label: "Tablo" },
  document: { icon: FileTextIcon, class: "text-purple-600", label: "Döküman" }
}

const activityStatusMap: ActivityConfig = {
  completed: { label: "Tamamlandı", class: "bg-green-500/15 text-green-700" },
  pending: { label: "Beklemede", class: "bg-yellow-500/15 text-yellow-700" },
  cancelled: { label: "İptal", class: "bg-red-500/15 text-red-700" }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aktif":
      return "bg-green-500/15 text-green-700"
    case "Tamirde":
      return "bg-yellow-500/15 text-yellow-700"
    case "İptal":
      return "bg-red-500/15 text-red-700"
    default:
      return "bg-gray-500/15 text-gray-700"
  }
}

const equipmentTypes: EquipmentType[] = ["Laptop", "Telefon", "Tablet", "Yazıcı"]
const statusTypes: string[] = ["Aktif", "Tamirde", "İptal"]
const conditionTypes: ConditionType[] = ["İyi", "Orta", "Kötü", "Onarımda"]

// Ödeme yöntemi haritası
const paymentMethodMap = {
  "havale-eft": "Havale/EFT",
  "kredi-karti": "Kredi Kartı",
  "nakit": "Nakit"
}

// ReactNode tipindeki içeriği güvenli bir şekilde render etmek için
const renderContent = (content: unknown): React.ReactNode => {
  if (typeof content === 'string' || typeof content === 'number') {
    return content;
  }
  return null;
}

export default function CustomerPage() {
  const params = useParams()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isAddingEquipment, setIsAddingEquipment] = useState(false)
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    type: "",
    serialNumber: "",
    status: "",
    assignedTo: "",
    purchaseDate: "",
    warranty: "",
    condition: "",
    notes: ""
  })

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault()
    // API call yapılacak
    toast.success("Teçhizat başarıyla eklendi")
    setIsAddingEquipment(false)
    setNewEquipment({
      name: "",
      type: "",
      serialNumber: "",
      status: "",
      assignedTo: "",
      purchaseDate: "",
      warranty: "",
      condition: "",
      notes: ""
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ...
  };

  const handleSelectChange = (value: string) => {
    // ...
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // ...
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Müşteri Detayı</h1>
        <Button onClick={() => setIsEditing(true)}>
          <Edit className="mr-2 h-4 w-4" />
          Düzenle
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Son Sipariş</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.lastOrder}</div>
            <p className="text-xs text-muted-foreground">
              {customer.orders[0]?.date}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {customer.orders.length} sipariş
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ödeme Yöntemi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentMethodMap[customer.paymentMethod as keyof typeof paymentMethodMap]}</div>
            <p className="text-xs text-muted-foreground">Tercih edilen</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Durum</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              className={
                statusMap[customer.status as keyof typeof statusMap].class
              }
            >
              {statusMap[customer.status as keyof typeof statusMap].label}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              Katılım: {customer.joinDate}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="activities">Aktiviteler</TabsTrigger>
          <TabsTrigger value="contracts">Sözleşmeler</TabsTrigger>
          <TabsTrigger value="invoices">Faturalar</TabsTrigger>
          <TabsTrigger value="files">Dosyalar</TabsTrigger>
          <TabsTrigger value="equipments">Teçhizatlar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Müşteri Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Ad Soyad
                  </p>
                  <p>{customer.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    E-posta
                  </p>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <p>{customer.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Telefon
                  </p>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <p>{customer.phone}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Adres
                  </p>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <p>{customer.address}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Ödeme Yöntemi
                  </p>
                  <p>{paymentMethodMap[customer.paymentMethod as keyof typeof paymentMethodMap]}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Son Aktiviteler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customer.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.date}
                      </p>
                    </div>
                    <div className={activityStatusMap[activity.type]?.class}>
                      {activityStatusMap[activity.type]?.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contracts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sözleşmeler</CardTitle>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Yeni Sözleşme
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customer.contracts.map((contract) => (
                  <div
                    key={contract.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{contract.title}</p>
                        <Badge variant="secondary">
                          {contractTypeMap[contract.type as keyof typeof contractTypeMap]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {contract.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Badge
                        className={
                          statusMap[contract.status as keyof typeof statusMap].class
                        }
                      >
                        {statusMap[contract.status as keyof typeof statusMap].label}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Faturalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Fatura</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{customer.invoices.total}</div>
                    <p className="text-xs text-muted-foreground">
                      Toplam Tutar: {customer.invoices.totalAmount}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ödenen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{customer.invoices.paid}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Bekleyen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{customer.invoices.pending}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gecikmiş</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{customer.invoices.overdue}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fatura No</TableHead>
                      <TableHead>Açıklama</TableHead>
                      <TableHead>Tarih</TableHead>
                      <TableHead>Son Ödeme</TableHead>
                      <TableHead>Tutar</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customer.invoices.list.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>
                          <Badge className={invoiceStatusMap[invoice.status].class}>
                            {invoiceStatusMap[invoice.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Dosyalar ve Raporlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Dosya Kategorileri */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(
                    customer.domain.files.reduce<Record<string, number>>((acc, file) => {
                      acc[file.category] = (acc[file.category] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([category, count]) => (
                    <Card key={category}>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{renderContent(count)}</div>
                        <p className="text-xs text-muted-foreground">{renderContent(category)}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Dosya Listesi */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dosya Adı</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Tür</TableHead>
                        <TableHead>Boyut</TableHead>
                        <TableHead>Tarih</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customer.domain.files.map((file) => {
                        const FileIcon = fileTypeMap[file.type].icon
                        return (
                          <TableRow key={file.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <FileIcon className={`h-4 w-4 ${fileTypeMap[file.type].class}`} />
                                <span className="font-medium">{file.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[300px]">
                              <span className="text-sm text-muted-foreground">{file.description}</span>
                            </TableCell>
                            <TableCell>{file.category}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={fileTypeMap[file.type].class}>
                                {fileTypeMap[file.type].label}
                              </Badge>
                            </TableCell>
                            <TableCell>{file.size}</TableCell>
                            <TableCell>{file.uploadDate}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" title="Görüntüle">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="İndir">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="equipments">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Teçhizatlar</CardTitle>
                <Button onClick={() => setIsAddingEquipment(true)} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Teçhizat Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Dialog open={isAddingEquipment} onOpenChange={setIsAddingEquipment}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Yeni Teçhizat Ekle</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddEquipment} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Teçhizat Adı</Label>
                        <Input
                          id="name"
                          value={newEquipment.name}
                          onChange={(e) =>
                            setNewEquipment({ ...newEquipment, name: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type">Tip</Label>
                        <Select
                          value={newEquipment.type}
                          onValueChange={(value) =>
                            setNewEquipment({ ...newEquipment, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seçiniz" />
                          </SelectTrigger>
                          <SelectContent>
                            {equipmentTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serialNumber">Seri No</Label>
                        <Input
                          id="serialNumber"
                          value={newEquipment.serialNumber}
                          onChange={(e) =>
                            setNewEquipment({ ...newEquipment, serialNumber: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Durum</Label>
                        <Select
                          value={newEquipment.status}
                          onValueChange={(value) =>
                            setNewEquipment({ ...newEquipment, status: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seçiniz" />
                          </SelectTrigger>
                          <SelectContent>
                            {statusTypes.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="assignedTo">Atanan Kişi</Label>
                        <Input
                          id="assignedTo"
                          value={newEquipment.assignedTo}
                          onChange={(e) =>
                            setNewEquipment({ ...newEquipment, assignedTo: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="condition">Kondisyon</Label>
                        <Select
                          value={newEquipment.condition}
                          onValueChange={(value) =>
                            setNewEquipment({ ...newEquipment, condition: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seçiniz" />
                          </SelectTrigger>
                          <SelectContent>
                            {conditionTypes.map((condition) => (
                              <SelectItem key={condition} value={condition}>
                                {condition}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="purchaseDate">Alım Tarihi</Label>
                        <Input
                          id="purchaseDate"
                          type="date"
                          value={newEquipment.purchaseDate}
                          onChange={(e) =>
                            setNewEquipment({ ...newEquipment, purchaseDate: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="warranty">Garanti Bitiş</Label>
                        <Input
                          id="warranty"
                          type="date"
                          value={newEquipment.warranty}
                          onChange={(e) =>
                            setNewEquipment({ ...newEquipment, warranty: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notlar</Label>
                      <Textarea
                        id="notes"
                        value={newEquipment.notes}
                        onChange={(e) =>
                          setNewEquipment({ ...newEquipment, notes: e.target.value })
                        }
                        className="h-20"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Ekle
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="py-1.5 text-xs">Teçhizat Adı</TableHead>
                    <TableHead className="py-1.5 text-xs">Tip</TableHead>
                    <TableHead className="py-1.5 text-xs">Seri No</TableHead>
                    <TableHead className="py-1.5 text-xs">Durum</TableHead>
                    <TableHead className="py-1.5 text-xs">Atanan Kişi</TableHead>
                    <TableHead className="py-1.5 text-xs">Kondisyon</TableHead>
                    <TableHead className="py-1.5 text-xs">Garanti</TableHead>
                    <TableHead className="py-1.5 text-xs">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.equipments.map((equipment) => (
                    <TableRow
                      key={equipment.id}
                      className="cursor-pointer hover:bg-muted/50 [&>td]:py-1.5"
                    >
                      <TableCell className="text-sm font-medium">{equipment.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{equipment.type}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{equipment.serialNumber}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(equipment.status)} text-[10px] py-0 px-2 font-normal`}>
                          {equipment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{equipment.assignedTo}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] py-0 px-2 font-normal">
                          {equipment.condition}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{equipment.warranty}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CustomerForm
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        customer={customer}
      />
    </div>
  );
}
