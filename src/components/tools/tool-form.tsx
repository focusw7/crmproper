"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"

interface ToolFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  initialData?: any
}

const statuses = [
  "Kullanımda",
  "Bakımda",
  "Arızalı",
  "Boşta"
]

export function ToolForm({ onSubmit, onCancel, initialData }: ToolFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    status: initialData?.status || "",
    assignedTo: initialData?.assignedTo || "",
    lastCheck: initialData?.lastCheck ? new Date(initialData.lastCheck).toISOString().split('T')[0] : "",
    notes: initialData?.notes || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basit validasyon
    if (!formData.name || !formData.status) {
      toast.error("Lütfen zorunlu alanları doldurun")
      return
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Araç Adı / Plaka</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Durum</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignedTo">Sorumlu</Label>
          <Input
            id="assignedTo"
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastCheck">Son Kontrol Tarihi</Label>
          <Input
            id="lastCheck"
            type="date"
            value={formData.lastCheck}
            onChange={(e) => setFormData({ ...formData, lastCheck: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notlar</Label>
          <Input
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
