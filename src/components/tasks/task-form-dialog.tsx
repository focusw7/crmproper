"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { TaskForm } from "./task-form"

interface TaskFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function TaskFormDialog({ open, onOpenChange, onSuccess }: TaskFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <TaskForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  )
}
