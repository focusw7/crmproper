"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ToolForm } from "./tool-form"
import { toast } from "sonner"

interface ToolDialogProps {
  tool?: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (data: any) => void
}

export function ToolDialog({ tool, open, onOpenChange, onSave }: ToolDialogProps) {
  const handleSave = (data: any) => {
    if (onSave) {
      onSave(data)
      toast.success(tool ? "Araç güncellendi" : "Araç eklendi")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tool ? "Aracı Düzenle" : "Yeni Araç Ekle"}</DialogTitle>
        </DialogHeader>
        <ToolForm
          initialData={tool}
          onSubmit={handleSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
