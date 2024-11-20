"use client"

import { useRouter } from "next/navigation"
import { CustomersTable } from "@/components/customers/customers-table"
import { CustomersToolbar } from "@/components/customers/customers-toolbar"

export default function CustomersPage() {
  const router = useRouter();
  
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Müşteriler</h2>
        <p className="text-muted-foreground">
          Müşterilerinizi yönetin ve takip edin
        </p>
      </div>
      <div className="space-y-4">
        <CustomersToolbar />
        <div className="border rounded-lg">
          <CustomersTable 
            rowClassName="cursor-pointer hover:bg-muted/50"
            onRowClick={(customer) => router.push(`/customers/${customer.id}`)}
          />
        </div>
      </div>
    </div>
  )
}
