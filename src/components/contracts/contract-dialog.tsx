"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { format, parseISO } from "date-fns"
import { tr } from "date-fns/locale"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Contract, ContractStatus, ContractType } from "@/types/contract"
import { mockCustomers } from "@/data/mock"

interface ContractDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contract: Contract | null
}

interface ContractFormValues {
  title: string
  type: ContractType
  status: ContractStatus
  customerId: string
  startDate: string
  endDate: string
  value: string
  description?: string
  terms?: string
}

const contractTypes: { value: ContractType; label: string }[] = [
  { value: "service", label: "Hizmet" },
  { value: "product", label: "Ürün" },
  { value: "maintenance", label: "Bakım" },
  { value: "support", label: "Destek" },
  { value: "other", label: "Diğer" },
]

const contractStatuses: { value: ContractStatus; label: string }[] = [
  { value: "draft", label: "Taslak" },
  { value: "pending", label: "Beklemede" },
  { value: "active", label: "Aktif" },
  { value: "expired", label: "Süresi Dolmuş" },
  { value: "terminated", label: "Feshedilmiş" },
]

export function ContractDialog({
  open,
  onOpenChange,
  contract,
}: ContractDialogProps) {
  const [openCustomer, setOpenCustomer] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(
    contract
      ? mockCustomers.find((c) => c.id === contract.customerId)
      : null
  )

  const { register, handleSubmit, setValue, reset } = useForm<ContractFormValues>({
    defaultValues: {
      title: "",
      type: "service",
      status: "draft",
      customerId: "",
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
      value: "",
      description: "",
      terms: "",
    },
  })

  useEffect(() => {
    if (contract) {
      reset({
        title: contract.title,
        type: contract.type,
        status: contract.status,
        customerId: String(contract.customerId),
        startDate: format(contract.startDate, "yyyy-MM-dd"),
        endDate: format(contract.endDate, "yyyy-MM-dd"),
        value: String(contract.value),
        description: contract.description,
        terms: contract.terms,
      })
      
      const customer = mockCustomers.find(c => c.id === contract.customerId)
      if (customer) setSelectedCustomer(customer)
    }
  }, [contract, reset])

  const onSubmit = (values: ContractFormValues) => {
    if (!selectedCustomer) return

    const newContract: Contract = {
      id: contract?.id || Math.random().toString(36).substr(2, 9),
      ...values,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      startDate: parseISO(values.startDate),
      endDate: parseISO(values.endDate),
      value: parseFloat(values.value),
      createdAt: contract?.createdAt || new Date(),
      updatedAt: new Date(),
    }

    console.log("Form submitted:", newContract)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {contract ? "Sözleşmeyi Düzenle" : "Yeni Sözleşme"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Başlık</Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              placeholder="Sözleşme başlığı"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Müşteri</Label>
              <Popover open={openCustomer} onOpenChange={setOpenCustomer}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCustomer}
                    className="w-full justify-between"
                  >
                    {selectedCustomer?.name || "Müşteri seçin..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Müşteri ara..." />
                    <CommandEmpty>Müşteri bulunamadı.</CommandEmpty>
                    <CommandGroup>
                      {mockCustomers.map((customer) => (
                        <CommandItem
                          key={customer.id}
                          value={customer.name}
                          onSelect={() => {
                            setSelectedCustomer(customer)
                            setValue("customerId", String(customer.id))
                            setOpenCustomer(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCustomer?.id === customer.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {customer.name}
                          <span className="ml-2 text-sm text-muted-foreground">
                            {customer.company}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tür</Label>
              <Select
                onValueChange={(value) =>
                  setValue("type", value as ContractType)
                }
                defaultValue={contract?.type || "service"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tür seçin" />
                </SelectTrigger>
                <SelectContent>
                  {contractTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Başlangıç Tarihi</Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Bitiş Tarihi</Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate", { required: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Tutar</Label>
              <Input
                id="value"
                type="number"
                {...register("value", { required: true })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Durum</Label>
              <Select
                onValueChange={(value) =>
                  setValue("status", value as ContractStatus)
                }
                defaultValue={contract?.status || "draft"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  {contractStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Sözleşme açıklaması"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms">Şartlar</Label>
            <Textarea
              id="terms"
              {...register("terms")}
              placeholder="Sözleşme şartları"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              İptal
            </Button>
            <Button type="submit">
              {contract ? "Güncelle" : "Oluştur"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
