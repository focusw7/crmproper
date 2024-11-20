"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockEmployees } from "@/data/mock"
import { EmployeeDialog } from "@/components/employees/employee-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(mockEmployees)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleEmployeeClick = (employee: any) => {
    setSelectedEmployee(employee)
    setDialogOpen(true)
  }

  const handleAddEmployee = () => {
    setSelectedEmployee(null)
    setDialogOpen(true)
  }

  const handleSaveEmployee = (data: any) => {
    if (selectedEmployee) {
      // Mevcut çalışanı güncelle
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id 
          ? { ...emp, ...data }
          : emp
      ))
    } else {
      // Yeni çalışan ekle
      const newEmployee = {
        id: Date.now().toString(),
        ...data,
        advances: [],
        expenses: [],
        leaves: []
      }
      setEmployees([...employees, newEmployee])
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Çalışanlar</h2>
          <p className="text-muted-foreground">
            Şirket çalışanlarının listesi ve detaylı bilgileri
          </p>
        </div>
        <Button onClick={handleAddEmployee}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Çalışan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <Card 
            key={employee.id}
            className="cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => handleEmployeeClick(employee)}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={employee.avatar} />
                  <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{employee.position}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Departman</span>
                  <span className="text-sm font-medium">{employee.department}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">E-posta</span>
                  <span className="text-sm font-medium">{employee.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EmployeeDialog 
        employee={selectedEmployee}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveEmployee}
      />
    </div>
  )
}
