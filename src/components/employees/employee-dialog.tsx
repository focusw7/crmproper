"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { EmployeeForm } from "./employee-form"
import { toast } from "sonner"

interface EmployeeDialogProps {
  employee: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (data: any) => void
}

export function EmployeeDialog({ employee, open, onOpenChange, onSave }: EmployeeDialogProps) {
  const handleSave = (data: any) => {
    if (onSave) {
      onSave(data)
      toast.success(employee ? "Çalışan güncellendi" : "Çalışan eklendi")
      onOpenChange(false)
    }
  }

  // Yeni çalışan ekleme formu
  if (!employee) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni Çalışan Ekle</DialogTitle>
          </DialogHeader>
          <EmployeeForm
            onSubmit={handleSave}
            onCancel={() => onOpenChange(false)}
          />
        </DialogContent>
      </Dialog>
    )
  }

  // Mevcut çalışan detayları
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={employee.avatar} />
              <AvatarFallback>{employee.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl mb-1">{employee.name}</DialogTitle>
              <div className="text-muted-foreground">
                <p>{employee.position} - {employee.department}</p>
                <p className="text-sm">{employee.email} • {employee.phone}</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-6">
          <TabsList>
            <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
            <TabsTrigger value="advances">Avanslar</TabsTrigger>
            <TabsTrigger value="expenses">Harcırahlar</TabsTrigger>
            <TabsTrigger value="leaves">İzinler</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Genel Bilgiler</CardTitle>
                <CardDescription>Çalışan hakkında temel bilgiler</CardDescription>
              </CardHeader>
              <CardContent>
                <EmployeeForm
                  initialData={employee}
                  onSubmit={handleSave}
                  onCancel={() => onOpenChange(false)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advances">
            <Card>
              <CardHeader>
                <CardTitle>Avanslar</CardTitle>
                <CardDescription>Çalışanın avans talepleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employee.advances?.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Avans kaydı bulunmuyor.</div>
                  ) : (
                    employee.advances?.map((advance: any) => (
                      <div key={advance.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div>
                          <div className="font-medium">{advance.amount.toLocaleString('tr-TR')} ₺</div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(advance.date), 'dd MMMM yyyy', { locale: tr })}
                          </div>
                        </div>
                        <Badge variant={advance.status === "Onaylandı" ? "default" : "secondary"}>
                          {advance.status}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses">
            <Card>
              <CardHeader>
                <CardTitle>Harcırahlar</CardTitle>
                <CardDescription>Çalışanın harcırah talepleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employee.expenses?.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Harcırah kaydı bulunmuyor.</div>
                  ) : (
                    employee.expenses?.map((expense: any) => (
                      <div key={expense.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div>
                          <div className="font-medium">{expense.amount.toLocaleString('tr-TR')} ₺</div>
                          <div className="text-sm text-muted-foreground">
                            {expense.type} - {format(new Date(expense.date), 'dd MMMM yyyy', { locale: tr })}
                          </div>
                        </div>
                        <Badge variant={expense.status === "Onaylandı" ? "default" : "secondary"}>
                          {expense.status}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaves">
            <Card>
              <CardHeader>
                <CardTitle>İzinler</CardTitle>
                <CardDescription>Çalışanın izin talepleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employee.leaves?.length === 0 ? (
                    <div className="text-sm text-muted-foreground">İzin kaydı bulunmuyor.</div>
                  ) : (
                    employee.leaves?.map((leave: any) => (
                      <div key={leave.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div>
                          <div className="font-medium">{leave.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(leave.startDate), 'dd MMM', { locale: tr })} - {format(new Date(leave.endDate), 'dd MMM yyyy', { locale: tr })}
                          </div>
                        </div>
                        <Badge variant={leave.status === "Onaylandı" ? "default" : "secondary"}>
                          {leave.status}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
