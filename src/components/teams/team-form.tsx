"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"
import { mockEmployees } from "@/data/mock"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface TeamFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  initialData?: any
}

export function TeamForm({ onSubmit, onCancel, initialData }: TeamFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    leader: initialData?.leader || null,
    members: initialData?.members || [],
    activeProjects: initialData?.activeProjects || 0,
  })

  // Seçili üyeleri hariç tut
  const availableEmployees = mockEmployees.filter(emp => 
    !formData.members.find((m: any) => m.id === emp.id) && 
    (!formData.leader || formData.leader.id !== emp.id)
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basit validasyon
    if (!formData.name || !formData.leader) {
      toast.error("Lütfen zorunlu alanları doldurun")
      return
    }

    onSubmit(formData)
  }

  const handleAddMember = (employee: any) => {
    const member = {
      id: employee.id,
      name: employee.name,
      avatar: employee.avatar,
    }
    setFormData({ ...formData, members: [...formData.members, member] })
  }

  const handleRemoveMember = (memberId: string) => {
    setFormData({
      ...formData,
      members: formData.members.filter((m: any) => m.id !== memberId)
    })
  }

  const handleSelectLeader = (employeeId: string) => {
    const employee = mockEmployees.find(emp => emp.id === employeeId)
    if (employee) {
      const leader = {
        id: employee.id,
        name: employee.name,
        avatar: employee.avatar,
      }
      setFormData({ ...formData, leader })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Ekip Adı</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="leader">Ekip Lideri</Label>
          <Select
            value={formData.leader?.id}
            onValueChange={handleSelectLeader}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              {availableEmployees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={employee.avatar} />
                      <AvatarFallback>{employee.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {employee.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Ekip Üyeleri</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.members.map((member: any) => (
              <Badge key={member.id} variant="secondary" className="gap-1">
                <Avatar className="h-4 w-4">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {member.name}
                <button
                  type="button"
                  onClick={() => handleRemoveMember(member.id)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <Select onValueChange={handleAddMember}>
            <SelectTrigger>
              <SelectValue placeholder="Üye ekle" />
            </SelectTrigger>
            <SelectContent>
              {availableEmployees.map((employee) => (
                <SelectItem 
                  key={employee.id} 
                  value={employee.id}
                  onClick={() => handleAddMember(employee)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={employee.avatar} />
                      <AvatarFallback>{employee.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {employee.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="activeProjects">Aktif Proje Sayısı</Label>
          <Input
            id="activeProjects"
            type="number"
            min="0"
            value={formData.activeProjects}
            onChange={(e) => setFormData({ ...formData, activeProjects: parseInt(e.target.value) || 0 })}
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
