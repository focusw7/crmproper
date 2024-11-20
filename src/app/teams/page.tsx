"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTeams } from "@/data/mock"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { TeamDialog } from "@/components/teams/team-dialog"

export default function TeamsPage() {
  const [teams, setTeams] = useState(mockTeams)
  const [selectedTeam, setSelectedTeam] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleTeamClick = (team: any) => {
    setSelectedTeam(team)
    setDialogOpen(true)
  }

  const handleAddTeam = () => {
    setSelectedTeam(null)
    setDialogOpen(true)
  }

  const handleSaveTeam = (data: any) => {
    if (selectedTeam) {
      // Mevcut ekibi güncelle
      setTeams(teams.map(team => 
        team.id === selectedTeam.id 
          ? { ...team, ...data }
          : team
      ))
    } else {
      // Yeni ekip ekle
      const newTeam = {
        id: Date.now().toString(),
        ...data
      }
      setTeams([...teams, newTeam])
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ekipler</h2>
          <p className="text-muted-foreground">
            Şirket ekiplerinin listesi ve üyeleri
          </p>
        </div>
        <Button onClick={handleAddTeam}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Ekip
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card 
            key={team.id}
            className="cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => handleTeamClick(team)}
          >
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <div className="text-sm font-medium mb-2">Ekip Lideri</div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={team.leader.avatar} />
                      <AvatarFallback>{team.leader.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{team.leader.name}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Ekip Üyeleri</div>
                  <div className="flex flex-wrap gap-2">
                    {team.members.map((member) => (
                      <Avatar key={member.id} className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Aktif Projeler</span>
                  <span className="text-sm font-medium">{team.activeProjects}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TeamDialog 
        team={selectedTeam}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveTeam}
      />
    </div>
  )
}
