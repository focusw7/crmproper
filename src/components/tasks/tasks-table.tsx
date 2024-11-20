"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Pencil, Trash, Eye, Receipt, AlertCircle } from "lucide-react"
import { toast } from "sonner"

const tasks = [
  {
    id: "TASK001",
    title: "E-ticaret Web Sitesi Geliştirme",
    client: "ABC Şirketi",
    deadline: "2024-03-15",
    status: "progress",
    priority: "high",
    budget: "50000₺",
    completionRate: 65,
    team: [
      { id: 1, name: "Ahmet Yılmaz", avatar: "/team/ahmet.jpg" },
      { id: 2, name: "Ayşe Demir", avatar: "/team/ayse.jpg" },
    ],
  },
  {
    id: "TASK002",
    title: "Mobil Uygulama Tasarımı",
    client: "XYZ Ltd.",
    deadline: "2024-04-01",
    status: "planned",
    priority: "medium",
    budget: "30000₺",
    completionRate: 0,
    team: [
      { id: 3, name: "Mehmet Kaya", avatar: "/team/mehmet.jpg" },
    ],
  },
]

const getStatusColor = (status: string) => {
  const colors = {
    planned: "bg-blue-500",
    progress: "bg-yellow-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
  }
  return colors[status as keyof typeof colors] || "bg-gray-500"
}

const getPriorityColor = (priority: string) => {
  const colors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-blue-500",
  }
  return colors[priority as keyof typeof colors] || "bg-gray-500"
}

const handleConvertToInvoice = (task: any) => {
  // Sadece tamamlanmış işler faturaya çevrilebilir
  if (task.status !== "completed") {
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

export default function TasksTable() {
  const router = useRouter()
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([])
    } else {
      setSelectedTasks(tasks.map((task) => task.id))
    }
  }

  const handleSelectOne = (taskId: string) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId))
    } else {
      setSelectedTasks([...selectedTasks, taskId])
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedTasks.length === tasks.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>İş</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead>Öncelik</TableHead>
            <TableHead>İlerleme</TableHead>
            <TableHead>Ekip</TableHead>
            <TableHead>Teslim Tarihi</TableHead>
            <TableHead>Bütçe</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow 
              key={task.id} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => router.push(`/tasks/${task.id}`)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedTasks.includes(task.id)}
                  onCheckedChange={() => handleSelectOne(task.id)}
                />
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {task.client}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(task.status)}>
                  {task.status === "planned" && "Planlandı"}
                  {task.status === "progress" && "Devam Ediyor"}
                  {task.status === "completed" && "Tamamlandı"}
                  {task.status === "cancelled" && "İptal Edildi"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority === "high" && "Yüksek"}
                  {task.priority === "medium" && "Orta"}
                  {task.priority === "low" && "Düşük"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="w-[100px]">
                  <Progress value={task.completionRate} className="h-2" />
                  <div className="text-[10px] text-muted-foreground mt-1">
                    {task.completionRate}%
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex -space-x-2">
                  {task.team.map((member) => (
                    <Avatar
                      key={member.id}
                      className="h-8 w-8 border-2 border-background"
                    >
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </TableCell>
              <TableCell>{task.deadline}</TableCell>
              <TableCell>{task.budget}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => router.push(`/tasks/${task.id}`)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Görüntüle
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Düzenle
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      Sil
                    </DropdownMenuItem>
                    {task.status === "completed" && (
                      <DropdownMenuItem
                        onClick={() => handleConvertToInvoice(task)}
                      >
                        <Receipt className="mr-2 h-4 w-4" />
                        Faturaya Çevir
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
