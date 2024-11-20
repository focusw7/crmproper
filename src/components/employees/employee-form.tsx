"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"

interface EmployeeFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  initialData?: any
}

const departments = [
  "Yönetim",
  "Satış",
  "Muhasebe",
  "İnsan Kaynakları",
  "Teknik",
  "Operasyon",
]

const positions = [
  "Genel Müdür",
  "Müdür",
  "Uzman",
  "Teknisyen",
  "Satış Temsilcisi",
  "Muhasebeci",
  "İK Uzmanı",
  "Operasyon Sorumlusu",
]

export function EmployeeForm({ onSubmit, onCancel, initialData }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    department: initialData?.department || "",
    position: initialData?.position || "",
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : "",
    salary: initialData?.salary || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basit validasyon
    if (!formData.name || !formData.email || !formData.department || !formData.position) {
      toast.error("Lütfen zorunlu alanları doldurun")
      return
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Ad Soyad</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-posta</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Departman</Label>
          <Select
            value={formData.department}
            onValueChange={(value) => setFormData({ ...formData, department: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Pozisyon</Label>
          <Select
            value={formData.position}
            onValueChange={(value) => setFormData({ ...formData, position: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {pos}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">İşe Başlama Tarihi</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary">Maaş</Label>
          <Input
            id="salary"
            type="number"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit">
          {initialData ? "Güncelle" : "Kaydet"}
        </Button>
      </div>
    </form>
  )
}
