"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { CalendarIcon, Pencil, Plus, Trash2, FileText, Send, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"

interface Proposal {
  id: number;
  title: string;
  amount: string;
  description: string;
  customer: string;
  date: Date;
  validUntil: Date;
  status: string;
}

interface ProposalFormData {
  title: string;
  amount: string;
  description: string;
  customer: string;
  date: Date;
  validUntil: Date;
}

// Teklif durumları
const proposalStatuses = [
  { value: "draft", label: "Taslak", color: "bg-slate-500" },
  { value: "sent", label: "Gönderildi", color: "bg-blue-500" },
  { value: "accepted", label: "Kabul Edildi", color: "bg-green-500" },
  { value: "rejected", label: "Reddedildi", color: "bg-red-500" },
]

// Mock müşteri listesi
const customers = [
  { id: 1, name: "ABC Şirketi" },
  { id: 2, name: "XYZ Limited" },
  { id: 3, name: "123 Holding" },
]

// Mock veri
const initialProposals: Proposal[] = [
  {
    id: 1,
    title: "Web Sitesi Geliştirme",
    amount: "25000",
    customer: "ABC Şirketi",
    status: "draft",
    date: new Date(2024, 0, 1),
    validUntil: new Date(2024, 1, 1),
    description: "E-ticaret web sitesi geliştirme projesi",
  },
  {
    id: 2,
    title: "Teknik Danışmanlık",
    amount: "15000",
    customer: "XYZ Ltd.",
    status: "sent",
    date: new Date(2024, 0, 5),
    validUntil: new Date(2024, 1, 10),
    description: "6 aylık teknik danışmanlık hizmeti",
  },
]

export default function ProposalsPage() {
  const router = useRouter()
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null)

  const form = useForm<ProposalFormData>({
    defaultValues: {
      title: "",
      amount: "",
      description: "",
      customer: "",
      date: new Date(),
      validUntil: new Date(),
    },
  })

  const onSubmit = (values: ProposalFormData) => {
    if (editingProposal) {
      // Güncelleme
      setProposals(proposals.map(proposal => 
        proposal.id === editingProposal.id 
          ? { ...values, id: proposal.id, status: proposal.status }
          : proposal
      ))
      toast.success("Teklif güncellendi")
    } else {
      // Yeni ekleme
      setProposals([...proposals, { ...values, id: Date.now(), status: "draft" }])
      toast.success("Teklif oluşturuldu")
    }
    setIsDialogOpen(false)
    setEditingProposal(null)
    form.reset()
  }

  const handleEdit = (proposal: Proposal) => {
    setEditingProposal(proposal)
    form.reset({
      title: proposal.title,
      amount: proposal.amount,
      description: proposal.description,
      customer: proposal.customer,
      date: proposal.date,
      validUntil: proposal.validUntil,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setProposals(proposals.filter(proposal => proposal.id !== id))
    toast.success("Teklif silindi")
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setProposals(proposals.map(proposal =>
      proposal.id === id
        ? { ...proposal, status: newStatus }
        : proposal
    ))
    const statusLabel = proposalStatuses.find(s => s.value === newStatus)?.label
    toast.success(`Teklif durumu "${statusLabel}" olarak güncellendi`)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teklifler</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingProposal(null)
              form.reset({
                title: "",
                amount: "",
                description: "",
                customer: "",
                date: new Date(),
                validUntil: new Date(),
              })
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Teklif
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProposal ? "Teklif Düzenle" : "Yeni Teklif Oluştur"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Müşteri</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Müşteri seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {customers.map((customer) => (
                            <SelectItem key={customer.id} value={customer.name}>
                              {customer.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Teklif Tarihi</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: tr })
                              ) : (
                                <span>Tarih seçin</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="validUntil"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Geçerlilik Tarihi</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: tr })
                              ) : (
                                <span>Tarih seçin</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date()
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teklif Başlığı</FormLabel>
                      <FormControl>
                        <Input placeholder="Teklif başlığı" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Açıklama</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Teklif detayları..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tutar (₺)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  {editingProposal ? "Güncelle" : "Oluştur"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tarih</TableHead>
              <TableHead>Müşteri</TableHead>
              <TableHead>Başlık</TableHead>
              <TableHead className="text-right">Tutar</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="w-[100px]">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((proposal) => (
              <TableRow 
                key={proposal.id}
                className="cursor-pointer hover:bg-muted/50 [&>td]:p-2"
                onClick={() => router.push(`/proposals/${proposal.id}`)}
              >
                <TableCell>
                  {format(proposal.date, "dd MMMM yyyy", { locale: tr })}
                </TableCell>
                <TableCell>
                  {customers.find(c => c.id.toString() === proposal.customer)?.name}
                </TableCell>
                <TableCell>{proposal.title}</TableCell>
                <TableCell className="text-right">
                  {Number(proposal.amount).toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                    proposalStatuses.find(s => s.value === proposal.status)?.color,
                    "text-white"
                  )}>
                    {proposalStatuses.find(s => s.value === proposal.status)?.label}
                  </span>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(proposal)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(proposal.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
