"use client"

import TasksTable from "@/components/tasks/tasks-table"
import { TasksToolbar } from "@/components/tasks/tasks-toolbar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { TasksKanban } from "@/components/tasks/tasks-kanban"
import { TaskFormDialog } from "@/components/tasks/task-form-dialog"

export default function TasksPage() {
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false)
  const [view, setView] = useState<'table' | 'kanban'>('table')

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">İşler</h2>
        <Button onClick={() => setIsNewTaskDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni İş Ekle
        </Button>
      </div>
      <div className="space-y-4">
        <TasksToolbar view={view} onViewChange={setView} />
        {view === 'table' ? <TasksTable /> : <TasksKanban />}
      </div>
      
      {/* Dialog ile açılan form */}
      <TaskFormDialog
        open={isNewTaskDialogOpen}
        onOpenChange={setIsNewTaskDialogOpen}
        onSuccess={() => {
          setIsNewTaskDialogOpen(false)
          // TODO: Tabloyu yenile
        }}
      />
    </div>
  )
}