export type ContractStatus = 'draft' | 'pending' | 'active' | 'expired' | 'terminated'
export type ContractType = 'service' | 'product' | 'maintenance' | 'support' | 'other'

export interface Contract {
  id: string
  title: string
  type: ContractType
  status: ContractStatus
  customerId: string | number
  customerName: string
  startDate: Date
  endDate: Date
  value: number
  description?: string
  attachments?: string[]
  terms?: string
  createdAt: Date
  updatedAt: Date
}
