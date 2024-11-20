"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Receipt, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "todo" | "in-progress" | "done"
  assignee: {
    name: string
    avatar: string
  }
}

const priorityColors = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Müşteri Toplantısı",
    description: "ABC Şirketi ile ürün demosunu gerçekleştir",
    priority: "high",
    status: "todo",
    assignee: {
      name: "Ahmet Yılmaz",
      avatar: "/avatars/01.png",
    },
  },
  {
    id: "2",
    title: "Rapor Hazırlama",
    description: "Q2 satış raporunu hazırla",
    priority: "medium",
    status: "in-progress",
    assignee: {
      name: "Ayşe Demir",
      avatar: "/avatars/02.png",
    },
  },
  {
    id: "3",
    title: "Email Kampanyası",
    description: "Yeni ürün için email kampanyası oluştur",
    priority: "low",
    status: "done",
    assignee: {
      name: "Mehmet Kaya",
      avatar: "/avatars/03.png",
    },
  },
]

function TaskCard({ task }: { task: Task }) {
  const handleConvertToInvoice = () => {
    // Sadece tamamlanmış işler faturaya çevrilebilir
    if (task.status !== "done") {
      toast.error("Sadece tamamlanmış işler faturaya çevrilebilir", {
        icon: <AlertCircle className="h-4 w-4" />,
      })
      return
    }

    // TODO: Fatura oluşturma işlemi burada yapılacak
    toast.success("İş faturaya çevrildi", {
      icon: <Receipt className="h-4 w-4" />,
    })
  }

  return (
    <Card className="mb-4 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{task.title}</h3>
        <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
      </div>
      <p className="mt-2 text-sm text-gray-500">{task.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={task.assignee.avatar}
            alt={task.assignee.name}
            className="h-6 w-6 rounded-full"
          />
          <span className="ml-2 text-sm text-gray-600">{task.assignee.name}</span>
        </div>
        {task.status === "done" && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleConvertToInvoice}
            className="ml-2"
          >
            <Receipt className="mr-2 h-4 w-4" />
            Faturaya Çevir
          </Button>
        )}
      </div>
    </Card>
  )
}

export function TasksKanban() {
  const todoTasks = tasks.filter((task) => task.status === "todo")
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress")
  const doneTasks = tasks.filter((task) => task.status === "done")

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div>
        <h3 className="mb-4 font-medium">Yapılacaklar</h3>
        {todoTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <div>
        <h3 className="mb-4 font-medium">Devam Edenler</h3>
        {inProgressTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <div>
        <h3 className="mb-4 font-medium">Tamamlananlar</h3>
        {doneTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
