"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TaskFormProps {
  task?: {
    id: string
    title: string
    client: string
    deadline: string
    status: string
    priority: string
    budget: string
    team: string[]
    completionRate: number
  }
  onSuccess?: () => void
}

export function TaskForm({ task, onSuccess }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    client: task?.client || "",
    deadline: task?.deadline || "",
    status: task?.status || "planned",
    priority: task?.priority || "medium",
    budget: task?.budget || "",
    team: task?.team || [],
    completionRate: task?.completionRate || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // API çağrısı yapılacak
      // const response = await fetch('/api/tasks', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      // })
      
      // if (response.ok) {
      onSuccess?.()
      // }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          {task ? 'İşi Düzenle' : 'Yeni İş Ekle'}
        </h2>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Başlık</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="client">Müşteri</Label>
          <Input
            id="client"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="deadline">Teslim Tarihi</Label>
          <Input
            id="deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="status">Durum</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Durum seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planned">Planlandı</SelectItem>
              <SelectItem value="in-progress">Devam Ediyor</SelectItem>
              <SelectItem value="completed">Tamamlandı</SelectItem>
              <SelectItem value="cancelled">İptal Edildi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="priority">Öncelik</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => setFormData({ ...formData, priority: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Öncelik seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Düşük</SelectItem>
              <SelectItem value="medium">Orta</SelectItem>
              <SelectItem value="high">Yüksek</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="budget">Bütçe</Label>
          <Input
            id="budget"
            type="number"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" className="px-8">
          {task ? 'Güncelle' : 'Ekle'}
        </Button>
      </div>
    </form>
  )
}
