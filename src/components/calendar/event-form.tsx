"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { format, parseISO, addDays, addWeeks, addMonths, addYears, addHours, startOfDay } from "date-fns"
import { tr, enUS } from "date-fns/locale"
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
import { Check, ChevronsUpDown, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import { CalendarEvent, Customer, Employee, RecurrenceRule, RecurrenceType, RecurrenceEndType } from "@/types/calendar"
import { mockCustomers, mockEmployees } from "@/data/mock"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CustomerForm } from "@/components/customers/customer-form"

interface EventFormValues {
  description: string
  location: string
  startTime: string
  endTime: string
  priority: CalendarEvent["priority"]
  status: CalendarEvent["status"]
  customerId?: string
  employeeId?: string
  recurrence?: {
    type: RecurrenceType
    interval: number
    endType: RecurrenceEndType
    endAfterOccurrences?: number
    endDate?: string
    weekDays?: string[]
  }
}

interface EventFormProps {
  event?: CalendarEvent | null
  defaultStartTime?: Date | null
  onSubmit: (values: CalendarEvent) => void
  onCancel: () => void
  defaultEmployee?: Employee | null
  defaultCustomer?: Customer | null
}

export function EventForm({
  event,
  defaultStartTime,
  defaultCustomer,
  defaultEmployee,
  onSubmit,
  onCancel,
}: EventFormProps) {
  const { register, handleSubmit, setValue, reset, watch } =
    useForm<EventFormValues>({
      defaultValues: {
        description: "",
        location: "",
        priority: "medium",
        status: "scheduled",
        startTime: format(defaultStartTime || new Date(), "yyyy-MM-dd'T'HH:mm"),
        endTime: format(
          defaultStartTime ? addHours(defaultStartTime, 1) : addHours(new Date(), 1),
          "yyyy-MM-dd'T'HH:mm"
        ),
      },
    })

  const [openCustomer, setOpenCustomer] = useState(false)
  const [openEmployee, setOpenEmployee] = useState(false)
  const [openNewCustomer, setOpenNewCustomer] = useState(false)
  const [openRecurrence, setOpenRecurrence] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([])

  const startDate = watch("startTime") ? parseISO(watch("startTime")) : new Date()

  useEffect(() => {
    if (event) {
      reset({
        ...event,
        startTime: format(event.startTime, "yyyy-MM-dd'T'HH:mm"),
        endTime: format(event.endTime, "yyyy-MM-dd'T'HH:mm"),
      })
      
      if (event.customerId) {
        const customer = mockCustomers.find(c => c.id === event.customerId)
        if (customer) setSelectedCustomer(customer)
      }
      
      if (event.employeeId) {
        const employee = mockEmployees.find(e => e.id === event.employeeId)
        if (employee) setSelectedEmployee(employee)
      }
    }
  }, [event, reset])

  useEffect(() => {
    if (defaultEmployee) {
      setSelectedEmployee(defaultEmployee)
      setValue("employeeId", String(defaultEmployee.id))
    }
  }, [defaultEmployee, setValue])

  useEffect(() => {
    if (defaultCustomer) {
      setSelectedCustomer(defaultCustomer)
      setValue("customerId", String(defaultCustomer.id))
    }
  }, [defaultCustomer, setValue])

  const onSubmitForm = handleSubmit((data) => {
    const formattedEvent: CalendarEvent = {
      id: event?.id || Math.random().toString(36).substr(2, 9),
      title: selectedCustomer?.name || "Görev",
      description: data.description,
      location: data.location,
      startTime: parseISO(data.startTime),
      endTime: parseISO(data.endTime),
      priority: data.priority,
      status: data.status,
      customerId: data.customerId,
      customerName: selectedCustomer?.name,
      employeeId: data.employeeId,
      employeeName: selectedEmployee?.name,
      recurrence: data.recurrence && {
        type: data.recurrence.type,
        interval: data.recurrence.interval,
        endType: data.recurrence.endType,
        endAfterOccurrences: data.recurrence.endAfterOccurrences,
        endDate: data.recurrence.endDate,
        weekDays: data.recurrence.weekDays
      }
    }
    onSubmit(formattedEvent)
  })

  return (
    <>
      <form onSubmit={onSubmitForm} className="space-y-4">
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
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Müşteri ara..." />
                <CommandEmpty>
                  <div className="p-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-center"
                      onClick={() => {
                        setOpenCustomer(false)
                        setOpenNewCustomer(true)
                      }}
                    >
                      <span className="text-primary">+</span> Yeni Müşteri Ekle
                    </Button>
                  </div>
                </CommandEmpty>
                <CommandGroup>
                  {mockCustomers.map((customer) => (
                    <CommandItem
                      key={customer.id}
                      value={customer.name}
                      onSelect={() => {
                        setSelectedCustomer(customer)
                        setValue("customerId", customer.id)
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
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Açıklama</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Görev açıklaması"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Konum</Label>
          <Input
            id="location"
            {...register("location")}
            placeholder="Görev konumu"
          />
        </div>

        <div className="space-y-2">
          <Label>Sorumlu Çalışan</Label>
          <Popover open={openEmployee} onOpenChange={setOpenEmployee}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openEmployee}
                className="w-full justify-between"
              >
                {selectedEmployee?.name || "Çalışan seçin..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Çalışan ara..." />
                <CommandEmpty>Çalışan bulunamadı.</CommandEmpty>
                <CommandGroup>
                  {mockEmployees.map((employee) => (
                    <CommandItem
                      key={employee.id}
                      value={employee.name}
                      onSelect={() => {
                        setSelectedEmployee(employee)
                        setValue("employeeId", employee.id)
                        setOpenEmployee(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedEmployee?.id === employee.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {employee.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Başlangıç Zamanı</Label>
            <Input
              id="startTime"
              type="datetime-local"
              {...register("startTime", { required: true })}
              defaultValue={format(defaultStartTime || new Date(), "yyyy-MM-dd'T'HH:mm")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endTime">Bitiş Zamanı</Label>
            <Input
              id="endTime"
              type="datetime-local"
              {...register("endTime", { required: true })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="priority">Öncelik</Label>
            <Select
              onValueChange={(value) =>
                setValue("priority", value as CalendarEvent["priority"])
              }
              defaultValue={event?.priority || "medium"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Öncelik seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Düşük</SelectItem>
                <SelectItem value="medium">Orta</SelectItem>
                <SelectItem value="high">Yüksek</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Durum</Label>
            <Select
              onValueChange={(value) =>
                setValue("status", value as CalendarEvent["status"])
              }
              defaultValue={event?.status || "scheduled"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Durum seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Planlandı</SelectItem>
                <SelectItem value="in-progress">Devam Ediyor</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
                <SelectItem value="cancelled">İptal Edildi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={() => setOpenRecurrence(true)}
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              {watch("recurrence.type") && watch("recurrence.type") !== "none" && (
                <div className="text-sm text-muted-foreground">
                  {watch("recurrence.type") === "daily" && `Her ${watch("recurrence.interval")} günde bir`}
                  {watch("recurrence.type") === "weekly" && `Her ${watch("recurrence.interval")} haftada bir`}
                  {watch("recurrence.type") === "monthly" && `Her ${watch("recurrence.interval")} ayda bir`}
                  {watch("recurrence.type") === "yearly" && `Her ${watch("recurrence.interval")} yılda bir`}
                  {watch("recurrence.endType") === "after" && `, ${watch("recurrence.endAfterOccurrences")} kez`}
                  {(() => {
                    const endDate = watch("recurrence.endDate")
                    if (watch("recurrence.endType") === "on-date" && endDate) {
                      return `, ${format(parseISO(endDate), "dd.MM.yyyy")} tarihine kadar`
                    }
                    return null
                  })()}
                </div>
              )}
              {(!watch("recurrence.type") || watch("recurrence.type") === "none") && (
                <span>Tekrarlama ekle</span>
              )}
            </Button>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            İptal
          </Button>
          <Button type="submit">
            {event ? "Güncelle" : "Oluştur"}
          </Button>
        </div>
      </form>

      <Dialog open={openRecurrence} onOpenChange={setOpenRecurrence}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tekrarlama Ayarları</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-4">
              <div>
                <Label>Tekrarlama Tipi</Label>
                <Select
                  value={watch("recurrence.type") || "none"}
                  onValueChange={(value: RecurrenceType) => {
                    setValue("recurrence.type", value)
                    if (value === "none") {
                      setValue("recurrence", undefined)
                    } else {
                      setValue("recurrence.interval", 1)
                      setValue("recurrence.endType", "never")
                      if (value === "weekly") {
                        setSelectedWeekDays([format(parseISO(watch("startTime")), "EE", { locale: enUS }).toUpperCase()])
                      }
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tekrarlama seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Tekrarlama yok</SelectItem>
                    <SelectItem value="daily">Günlük</SelectItem>
                    <SelectItem value="weekly">Haftalık</SelectItem>
                    <SelectItem value="monthly">Aylık</SelectItem>
                    <SelectItem value="yearly">Yıllık</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {watch("recurrence.type") && watch("recurrence.type") !== "none" && (
                <>
                  <div className="space-y-2">
                    <Label>Tekrarlama Aralığı</Label>
                    <div className="flex items-center space-x-2">
                      <span>Her</span>
                      <Input
                        type="number"
                        min={1}
                        max={30}
                        className="w-20"
                        {...register("recurrence.interval", { valueAsNumber: true })}
                      />
                      <span>
                        {watch("recurrence.type") === "daily" && "gün"}
                        {watch("recurrence.type") === "weekly" && "hafta"}
                        {watch("recurrence.type") === "monthly" && "ay"}
                        {watch("recurrence.type") === "yearly" && "yıl"}
                      </span>
                    </div>
                  </div>

                  {watch("recurrence.type") === "weekly" && (
                    <div className="space-y-2">
                      <Label>Tekrar Günleri</Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { key: "MO", label: "Pzt" },
                          { key: "TU", label: "Sal" },
                          { key: "WE", label: "Çar" },
                          { key: "TH", label: "Per" },
                          { key: "FR", label: "Cum" },
                          { key: "SA", label: "Cmt" },
                          { key: "SU", label: "Paz" },
                        ].map((day) => (
                          <Button
                            key={day.key}
                            type="button"
                            size="sm"
                            variant={selectedWeekDays.includes(day.key) ? "default" : "outline"}
                            onClick={() => {
                              if (selectedWeekDays.includes(day.key)) {
                                setSelectedWeekDays(selectedWeekDays.filter((d) => d !== day.key))
                              } else {
                                setSelectedWeekDays([...selectedWeekDays, day.key])
                              }
                            }}
                          >
                            {day.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Bitiş</Label>
                    <Select
                      value={watch("recurrence.endType") || "never"}
                      onValueChange={(value: RecurrenceEndType) => {
                        setValue("recurrence.endType", value)
                        if (value === "never") {
                          setValue("recurrence.endAfterOccurrences", undefined)
                          setValue("recurrence.endDate", undefined)
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Bitiş seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Asla</SelectItem>
                        <SelectItem value="after">Belirli sayıda tekrardan sonra</SelectItem>
                        <SelectItem value="on-date">Belirli bir tarihte</SelectItem>
                      </SelectContent>
                    </Select>

                    {watch("recurrence.endType") === "after" && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Input
                          type="number"
                          min={1}
                          max={100}
                          className="w-20"
                          {...register("recurrence.endAfterOccurrences", { valueAsNumber: true })}
                        />
                        <span>tekrardan sonra</span>
                      </div>
                    )}

                    {watch("recurrence.endType") === "on-date" && (
                      <div className="mt-2">
                        <Input
                          type="date"
                          {...register("recurrence.endDate")}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <Label>Özet</Label>
                    <div className="text-sm text-muted-foreground">
                      {(() => {
                        const recurrence = watch("recurrence")
                        if (!recurrence) return null

                        let summary = ""
                        switch (recurrence.type) {
                          case "daily":
                            summary = `Her ${recurrence.interval} günde bir`
                            break
                          case "weekly":
                            summary = `Her ${recurrence.interval} haftada bir`
                            if (selectedWeekDays.length > 0) {
                              const dayNames = selectedWeekDays.map(day => {
                                switch (day) {
                                  case "MO": return "Pazartesi"
                                  case "TU": return "Salı"
                                  case "WE": return "Çarşamba"
                                  case "TH": return "Perşembe"
                                  case "FR": return "Cuma"
                                  case "SA": return "Cumartesi"
                                  case "SU": return "Pazar"
                                  default: return ""
                                }
                              })
                              summary += ` (${dayNames.join(", ")})`
                            }
                            break
                          case "monthly":
                            summary = `Her ${recurrence.interval} ayda bir`
                            break
                          case "yearly":
                            summary = `Her ${recurrence.interval} yılda bir`
                            break
                        }

                        if (recurrence.endType === "after") {
                          summary += `, ${recurrence.endAfterOccurrences} kez`
                        } else if (recurrence.endType === "on-date" && recurrence.endDate) {
                          summary += `, ${format(parseISO(recurrence.endDate), "d MMMM yyyy", { locale: tr })} tarihine kadar`
                        }

                        return summary
                      })()}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openNewCustomer} onOpenChange={setOpenNewCustomer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni Müşteri</DialogTitle>
          </DialogHeader>
          <CustomerForm 
            isOpen={openNewCustomer}
            onClose={() => setOpenNewCustomer(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
