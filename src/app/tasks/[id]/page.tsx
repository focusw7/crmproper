"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, DollarSign, Clock, Users, ArrowLeft } from "lucide-react"

// Mock veri - API entegrasyonunda kaldırılacak
const taskData = {
  id: "TASK001",
  title: "E-ticaret Web Sitesi Geliştirme",
  client: "ABC Şirketi",
  deadline: "2024-03-15",
  status: "progress",
  priority: "high",
  budget: "50000₺",
  completionRate: 65,
  description: "Modern ve kullanıcı dostu bir e-ticaret web sitesi geliştirme projesi.",
  team: [
    { id: 1, name: "Ahmet Yılmaz", role: "Frontend Developer", avatar: "/team/ahmet.jpg" },
    { id: 2, name: "Ayşe Demir", role: "Backend Developer", avatar: "/team/ayse.jpg" },
    { id: 3, name: "Mehmet Kaya", role: "UI/UX Designer", avatar: "/team/mehmet.jpg" },
  ],
  subtasks: [
    { id: 1, title: "UI Tasarımı", status: "completed", assignee: "Mehmet Kaya" },
    { id: 2, title: "Frontend Geliştirme", status: "progress", assignee: "Ahmet Yılmaz" },
    { id: 3, title: "Backend API", status: "progress", assignee: "Ayşe Demir" },
    { id: 4, title: "Test ve Optimizasyon", status: "planned", assignee: "Tüm Ekip" },
  ],
  timeline: [
    { date: "2024-01-15", event: "Proje Başlangıcı" },
    { date: "2024-02-01", event: "UI Tasarımı Tamamlandı" },
    { date: "2024-02-15", event: "Frontend Geliştirme Başladı" },
    { date: "2024-02-20", event: "Backend API Geliştirme Başladı" },
  ],
}

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

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const taskId = params.id as string

  // API'den iş detaylarını çekme fonksiyonu burada implement edilecek
  const task = taskData // Şimdilik mock veri kullanıyoruz

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Geri Butonu */}
      <Button
        variant="ghost"
        className="gap-2"
        onClick={() => router.push('/tasks')}
      >
        <ArrowLeft className="h-4 w-4" />
        İşler Listesine Dön
      </Button>

      {/* Üst Bilgi Kartı */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
            <div className="text-sm text-muted-foreground">{task.client}</div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(task.status)}>
              {task.status === "planned" && "Planlandı"}
              {task.status === "progress" && "Devam Ediyor"}
              {task.status === "completed" && "Tamamlandı"}
              {task.status === "cancelled" && "İptal Edildi"}
            </Badge>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority === "high" && "Yüksek Öncelik"}
              {task.priority === "medium" && "Orta Öncelik"}
              {task.priority === "low" && "Düşük Öncelik"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Teslim: {task.deadline}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Bütçe: {task.budget}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-1">
                <div className="text-sm">İlerleme</div>
                <Progress value={task.completionRate} className="h-2" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="flex -space-x-2">
                {task.team.map((member) => (
                  <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detay Sekmeleri */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="subtasks">Alt Görevler</TabsTrigger>
          <TabsTrigger value="team">Ekip</TabsTrigger>
          <TabsTrigger value="timeline">Zaman Çizelgesi</TabsTrigger>
        </TabsList>

        {/* Genel Bakış Sekmesi */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Proje Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alt Görevler Sekmesi */}
        <TabsContent value="subtasks">
          <Card>
            <CardHeader>
              <CardTitle>Alt Görevler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{subtask.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Sorumlu: {subtask.assignee}
                      </div>
                    </div>
                    <Badge className={getStatusColor(subtask.status)}>
                      {subtask.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ekip Sekmesi */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Ekip Üyeleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {task.team.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Zaman Çizelgesi Sekmesi */}
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Zaman Çizelgesi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-4">
                {task.timeline.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-24 text-sm text-muted-foreground">
                      {event.date}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{event.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
