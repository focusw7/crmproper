"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TeamForm } from "./team-form"
import { toast } from "sonner"

interface TeamDialogProps {
  team?: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (data: any) => void
}

export function TeamDialog({ team, open, onOpenChange, onSave }: TeamDialogProps) {
  const handleSave = (data: any) => {
    if (onSave) {
      onSave(data)
      toast.success(team ? "Ekip güncellendi" : "Ekip oluşturuldu")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{team ? "Ekibi Düzenle" : "Yeni Ekip Oluştur"}</DialogTitle>
        </DialogHeader>
        <TeamForm
          initialData={team}
          onSubmit={handleSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
