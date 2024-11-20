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
import { CalendarIcon, Pencil, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { DateRange } from "react-day-picker"
import { addDays, startOfMonth } from "date-fns"

interface Expense {
  id: string;
  date: Date;
  category: string;
  description: string;
  amount: string;
  personnel: string;
}

type ExpenseFormData = {
  date: Date;
  category: string;
  description: string;
  amount: string;
  personnel: string;
}

// Gider kategorileri
const expenseCategories = [
  { value: "office", label: "Ofis Giderleri" },
  { value: "travel", label: "Seyahat" },
  { value: "software", label: "Yazılım Lisansları" },
  { value: "marketing", label: "Pazarlama" },
  { value: "other", label: "Diğer" },
]

// Mock personel listesi
const personnelList = [
  { value: "1", label: "Ahmet Yılmaz" },
  { value: "2", label: "Mehmet Demir" },
  { value: "3", label: "Ayşe Kaya" },
  { value: "4", label: "Fatma Şahin" },
]

// Mock veri
const initialExpenses: Expense[] = [
  {
    id: "1",
    date: new Date(2024, 0, 15),
    category: "office",
    description: "Ofis Malzemeleri",
    amount: "1500.00",
    personnel: "1"
  },
  {
    id: "2",
    date: new Date(2024, 0, 10),
    category: "travel",
    description: "İş Seyahati",
    amount: "2500.00",
    personnel: "2"
  },
]

export default function ExpensesPage() {
  const router = useRouter()
  const [expenses, setExpenses] = useState(initialExpenses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)

  // Filtreleme state'leri
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date()
  })
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPersonnel, setSelectedPersonnel] = useState<string>("all")
  const [amountRange, setAmountRange] = useState({
    min: "",
    max: ""
  })

  // Filtreleme fonksiyonu
  const filteredExpenses = expenses.filter(expense => {
    let matches = true;

    // Tarih aralığı kontrolü
    if (dateRange?.from && dateRange?.to) {
      matches = matches && 
        expense.date >= dateRange.from &&
        expense.date <= dateRange.to;
    }

    // Kategori kontrolü
    if (selectedCategory !== "all") {
      matches = matches && expense.category === selectedCategory;
    }

    // Personel kontrolü
    if (selectedPersonnel !== "all") {
      matches = matches && expense.personnel === selectedPersonnel;
    }

    // Tutar aralığı kontrolü
    if (amountRange.min) {
      matches = matches && Number(expense.amount) >= Number(amountRange.min);
    }
    if (amountRange.max) {
      matches = matches && Number(expense.amount) <= Number(amountRange.max);
    }

    return matches;
  });

  // Filtreleri sıfırlama
  const resetFilters = () => {
    setDateRange({
      from: startOfMonth(new Date()),
      to: new Date()
    });
    setSelectedCategory("all");
    setSelectedPersonnel("all");
    setAmountRange({ min: "", max: "" });
  };

  const form = useForm<ExpenseFormData>({
    defaultValues: {
      date: new Date(),
      category: "",
      description: "",
      amount: "",
      personnel: "",
    },
  })

  const onSubmit = (values: ExpenseFormData) => {
    if (editingExpense) {
      // Güncelleme
      setExpenses(expenses.map(expense => 
        expense.id === editingExpense.id 
          ? { ...values, id: expense.id }
          : expense
      ))
      toast.success("Gider güncellendi")
    } else {
      // Yeni ekleme
      setExpenses([...expenses, { ...values, id: Date.now().toString() }])
      toast.success("Gider eklendi")
    }
    setIsDialogOpen(false)
    setEditingExpense(null)
    form.reset()
  }

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
    form.reset(expense)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
    toast.success("Gider silindi")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Giderler</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingExpense(null)
              form.reset({
                date: new Date(),
                category: "",
                description: "",
                amount: "",
                personnel: "",
              })
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Gider
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingExpense ? "Gider Düzenle" : "Yeni Gider Ekle"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tarih</FormLabel>
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
                              date > new Date() || date < new Date("1900-01-01")
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Kategori seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {expenseCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
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
                  name="personnel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personel</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Personel seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {personnelList.map((person) => (
                            <SelectItem key={person.value} value={person.value}>
                              {person.label}
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Açıklama</FormLabel>
                      <FormControl>
                        <Input placeholder="Gider açıklaması" {...field} />
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
                  {editingExpense ? "Güncelle" : "Ekle"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtreleme Alanları */}
      <div className="border rounded-lg p-4 mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Tarih Aralığı */}
          <div>
            <label className="text-sm font-medium mb-1 block">Tarih Aralığı</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd MMM", { locale: tr })} -{" "}
                        {format(dateRange.to, "dd MMM", { locale: tr })}
                      </>
                    ) : (
                      format(dateRange.from, "dd MMM", { locale: tr })
                    )
                  ) : (
                    <span>Tarih seçin</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Kategori */}
          <div>
            <label className="text-sm font-medium mb-1 block">Kategori</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Tüm kategoriler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm kategoriler</SelectItem>
                {expenseCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Personel */}
          <div>
            <label className="text-sm font-medium mb-1 block">Personel</label>
            <Select value={selectedPersonnel} onValueChange={setSelectedPersonnel}>
              <SelectTrigger>
                <SelectValue placeholder="Tüm personel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm personel</SelectItem>
                {personnelList.map((person) => (
                  <SelectItem key={person.value} value={person.value}>
                    {person.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tutar Aralığı */}
          <div>
            <label className="text-sm font-medium mb-1 block">Tutar Aralığı</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={amountRange.min}
                onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                className="w-1/2"
              />
              <Input
                type="number"
                placeholder="Max"
                value={amountRange.max}
                onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-1/2"
              />
            </div>
          </div>
        </div>

        {/* Filtreleri Sıfırla Butonu */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={resetFilters}>
            Filtreleri Sıfırla
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tarih</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead>Tutar</TableHead>
              <TableHead>Personel</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>
                  {format(expense.date, "dd.MM.yyyy")}
                </TableCell>
                <TableCell>
                  {expenseCategories.find(c => c.value === expense.category)?.label}
                </TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.amount} ₺</TableCell>
                <TableCell>
                  {personnelList.find(p => p.value === expense.personnel)?.label}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(expense)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(expense.id)}
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
