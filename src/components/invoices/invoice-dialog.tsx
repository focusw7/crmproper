"use client"

import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Invoice } from "@/app/invoices/page"
import { Plus, Trash2 } from "lucide-react"

interface InvoiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoice?: Invoice | null
  onSave: (invoice: Invoice) => void
}

interface InvoiceFormValues {
  invoiceNumber: string
  customerName: string
  date: string
  dueDate: string
  status: Invoice["status"]
  items: {
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
}

export function InvoiceDialog({
  open,
  onOpenChange,
  invoice,
  onSave,
}: InvoiceDialogProps) {
  const { register, handleSubmit, control, setValue, watch, reset } =
    useForm<InvoiceFormValues>({
      defaultValues: {
        invoiceNumber: "",
        customerName: "",
        date: format(new Date(), "yyyy-MM-dd"),
        dueDate: format(new Date(), "yyyy-MM-dd"),
        status: "pending",
        items: [
          {
            description: "",
            quantity: 1,
            unitPrice: 0,
            total: 0,
          },
        ],
      },
    })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  useEffect(() => {
    if (invoice) {
      reset({
        invoiceNumber: invoice.invoiceNumber,
        customerName: invoice.customerName,
        date: format(invoice.date, "yyyy-MM-dd"),
        dueDate: format(invoice.dueDate, "yyyy-MM-dd"),
        status: invoice.status,
        items: invoice.items,
      })
    }
  }, [invoice, reset])

  const watchItems = watch("items")
  const totalAmount = watchItems.reduce((sum, item) => sum + (item.total || 0), 0)

  const handleFormSubmit = (values: InvoiceFormValues) => {
    onSave({
      id: invoice?.id || Math.random().toString(),
      ...values,
      date: new Date(values.date),
      dueDate: new Date(values.dueDate),
      amount: totalAmount,
    })
  }

  const calculateItemTotal = (index: number) => {
    const item = watchItems[index]
    const total = item.quantity * item.unitPrice
    setValue(`items.${index}.total`, total)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {invoice ? "Faturayı Düzenle" : "Yeni Fatura Oluştur"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Fatura No</Label>
              <Input
                id="invoiceNumber"
                {...register("invoiceNumber", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerName">Müşteri</Label>
              <Input
                id="customerName"
                {...register("customerName", { required: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Tarih</Label>
              <Input
                id="date"
                type="date"
                {...register("date", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Vade Tarihi</Label>
              <Input
                id="dueDate"
                type="date"
                {...register("dueDate", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Durum</Label>
              <Select
                value={watch("status")}
                onValueChange={(value) =>
                  setValue("status", value as Invoice["status"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Ödendi</SelectItem>
                  <SelectItem value="pending">Beklemede</SelectItem>
                  <SelectItem value="overdue">Gecikmiş</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Kalemler</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    description: "",
                    quantity: 1,
                    unitPrice: 0,
                    total: 0,
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Kalem Ekle
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-12 gap-4">
                  <div className="col-span-5">
                    <Input
                      placeholder="Açıklama"
                      {...register(`items.${index}.description` as const)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Miktar"
                      {...register(`items.${index}.quantity` as const, {
                        valueAsNumber: true,
                        onChange: () => calculateItemTotal(index),
                      })}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Birim Fiyat"
                      {...register(`items.${index}.unitPrice` as const, {
                        valueAsNumber: true,
                        onChange: () => calculateItemTotal(index),
                      })}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Toplam"
                      {...register(`items.${index}.total` as const, {
                        valueAsNumber: true,
                      })}
                      disabled
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end text-lg font-semibold">
              Toplam:{" "}
              {new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(totalAmount)}
            </div>
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
              {invoice ? "Güncelle" : "Oluştur"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
