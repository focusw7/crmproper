"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTools } from "@/data/mock"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { ToolDialog } from "@/components/tools/tool-dialog"

interface Tool {
  id: string;
  name: string;
  status: string;
  assignedTo: string;
  lastCheck: string;
  notes?: string;
}

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>(mockTools)
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool)
    setDialogOpen(true)
  }

  const handleAddTool = () => {
    setSelectedTool(null)
    setDialogOpen(true)
  }

  const handleSaveTool = (data: Omit<Tool, 'id'>) => {
    if (selectedTool) {
      // Mevcut aracı güncelle
      setTools(tools.map(tool => 
        tool.id === selectedTool.id 
          ? { ...tool, ...data }
          : tool
      ))
    } else {
      // Yeni araç ekle
      const newTool: Tool = {
        id: Date.now().toString(),
        ...data
      }
      setTools([...tools, newTool])
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Araçlar</h2>
          <p className="text-muted-foreground">
            Şirket araçlarının listesi ve durumları
          </p>
        </div>
        <Button onClick={handleAddTool}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Araç
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card 
            key={tool.id}
            className="cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => handleToolClick(tool)}
          >
            <CardHeader>
              <CardTitle>{tool.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Durum</span>
                  <span className={cn(
                    "text-sm font-medium",
                    tool.status === "Kullanımda" ? "text-green-600" :
                    tool.status === "Bakımda" ? "text-orange-600" : 
                    tool.status === "Boşta" ? "text-blue-600" : "text-red-600"
                  )}>
                    {tool.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sorumlu</span>
                  <span className="text-sm font-medium">{tool.assignedTo || "-"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Son Kontrol</span>
                  <span className="text-sm font-medium">{tool.lastCheck}</span>
                </div>
                {tool.notes && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Notlar</span>
                    <span className="text-sm font-medium">{tool.notes}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ToolDialog 
        tool={selectedTool}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveTool}
      />
    </div>
  )
}
