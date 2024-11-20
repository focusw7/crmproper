"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { format, parseISO, addHours } from "date-fns"
import { tr } from "date-fns/locale"
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
import { CalendarEvent, Customer, Employee } from "@/types/calendar"
import { mockCustomers, mockEmployees } from "@/data/mock"

interface EventFormProps {
  event?: CalendarEvent | null
  defaultStartTime?: Date | null
  onSubmit: (values: CalendarEvent) => void
  onCancel: () => void
  defaultEmployee?: Employee | null
  defaultCustomer?: Customer | null
}

interface EventFormValues {
  title: string
  description?: string
  location?: string
  priority: CalendarEvent["priority"]
  status: CalendarEvent["status"]
  startTime: string
  endTime: string
  customerId?: string | number
  employeeId?: string | number
}

export function EventForm({
  event,
  defaultStartTime,
  onSubmit,
  onCancel,
  defaultEmployee,
  defaultCustomer,
}: EventFormProps) {
  const [openCustomer, setOpenCustomer] = useState(false)
  const [openEmployee, setOpenEmployee] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const { register, handleSubmit, setValue, reset, watch } =
    useForm<EventFormValues>({
      defaultValues: {
        title: "",
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
      ...data,
      startTime: parseISO(data.startTime),
      endTime: parseISO(data.endTime),
      customerName: selectedCustomer?.name,
      employeeName: selectedEmployee?.name,
    }
    onSubmit(formattedEvent)
  })

  return (
    <form onSubmit={onSubmitForm} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Başlık</Label>
        <Input
          id="title"
          {...register("title", { required: true })}
          placeholder="Etkinlik başlığı"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Açıklama</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Etkinlik açıklaması"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Konum</Label>
        <Input
          id="location"
          {...register("location")}
          placeholder="Etkinlik konumu"
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
            <PopoverContent className="w-[300px] p-0">
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Başlangıç Zamanı</Label>
          <Input
            id="startTime"
            type="datetime-local"
            {...register("startTime", { required: true })}
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

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit">
          {event ? "Güncelle" : "Oluştur"}
        </Button>
      </div>
    </form>
  )
}
