"use client"

import { useState } from "react"
import { mockCustomers } from "@/data/mock"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileText, Upload, FileSpreadsheet, Trash2 } from "lucide-react"

interface CustomerFile {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
  uploadedBy: string
}

interface CustomerReport {
  id: string
  name: string
  type: string
  generatedDate: string
  generatedBy: string
}

// Mock veriler
const mockFiles: CustomerFile[] = [
  {
    id: "1",
    name: "Sözleşme_2024.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    uploadedBy: "Ahmet Yılmaz",
  },
  {
    id: "2",
    name: "Fatura_Ocak2024.pdf",
    type: "PDF",
    size: "1.1 MB",
    uploadDate: "2024-01-10",
    uploadedBy: "Mehmet Demir",
  },
]

const mockReports: CustomerReport[] = [
  {
    id: "1",
    name: "Aylık Analiz Raporu",
    type: "Excel",
    generatedDate: "2024-01-01",
    generatedBy: "Sistem",
  },
  {
    id: "2",
    name: "Müşteri İlişkileri Raporu",
    type: "PDF",
    generatedDate: "2024-01-15",
    generatedBy: "Ayşe Kaya",
  },
]

export default function CustomerFilesPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("")
  const [activeTab, setActiveTab] = useState("files")

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Müşteri Alanı</h1>
      </div>

      <div className="space-y-6">
        <div className="flex items-end gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="customer">Müşteri</Label>
            <Select
              value={selectedCustomer}
              onValueChange={setSelectedCustomer}
            >
              <SelectTrigger>
                <SelectValue placeholder="Müşteri seçin" />
              </SelectTrigger>
              <SelectContent>
                {mockCustomers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCustomer && (
            <Button className="flex gap-2">
              <Upload className="h-4 w-4" />
              Dosya Yükle
            </Button>
          )}
        </div>

        {selectedCustomer && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="files" className="flex gap-2">
                <FileText className="h-4 w-4" />
                Dosyalar
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Raporlar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="files">
              <div className="grid gap-4">
                {mockFiles.map((file) => (
                  <Card key={file.id}>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <CardTitle className="text-base">{file.name}</CardTitle>
                            <CardDescription>
                              Yükleyen: {file.uploadedBy} • {file.uploadDate}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {file.size}
                          </span>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div className="grid gap-4">
                {mockReports.map((report) => (
                  <Card key={report.id}>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-5 w-5 text-green-500" />
                          <div>
                            <CardTitle className="text-base">{report.name}</CardTitle>
                            <CardDescription>
                              Oluşturan: {report.generatedBy} • {report.generatedDate}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {!selectedCustomer && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <CardTitle className="text-xl mb-2">Müşteri Seçin</CardTitle>
              <CardDescription>
                Dosyaları ve raporları görüntülemek için lütfen bir müşteri seçin.
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
