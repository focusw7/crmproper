"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const employees = [
  {
    id: "EMP001",
    name: "Mehmet Kaya",
    email: "mehmet@example.com",
    department: "Satış",
    role: "Satış Temsilcisi",
    status: "active",
    avatar: "/avatars/01.png",
  },
  {
    id: "EMP002",
    name: "Zeynep Demir",
    email: "zeynep@example.com",
    department: "Müşteri Hizmetleri",
    role: "Müşteri Temsilcisi",
    status: "active",
    avatar: "/avatars/02.png",
  },
  // Daha fazla çalışan eklenebilir
]

export function EmployeesTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Çalışan ID</TableHead>
            <TableHead>İsim</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Departman</TableHead>
            <TableHead>Pozisyon</TableHead>
            <TableHead>Durum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback>
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {employee.name}
                </div>
              </TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>
                <Badge variant={employee.status === "active" ? "default" : "secondary"}>
                  {employee.status === "active" ? "Aktif" : "Pasif"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
