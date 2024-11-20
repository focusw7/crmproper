"use client"

import { useState } from "react"
import { mockContracts } from "@/data/mock-contracts"
import { ContractsTable } from "@/components/contracts/contracts-table"
import { ContractDialog } from "@/components/contracts/contract-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Contract } from "@/types/contract"

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)

  const handleEditContract = (contract: Contract) => {
    setSelectedContract(contract)
    setDialogOpen(true)
  }

  const handleCreateContract = () => {
    setSelectedContract(null)
    setDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Sözleşmeler</h1>
        <Button onClick={handleCreateContract}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Sözleşme
        </Button>
      </div>

      <ContractsTable
        contracts={contracts}
        onEditContract={handleEditContract}
      />

      <ContractDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        contract={selectedContract}
      />
    </div>
  )
}
