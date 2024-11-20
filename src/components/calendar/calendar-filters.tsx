"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockCustomers, mockEmployees } from "@/data/mock"
import { Customer, Employee } from "@/types/calendar"

interface CalendarFiltersProps {
  onEmployeeChange: (employee: Employee | null) => void
  onCustomerChange: (customer: Customer | null) => void
  selectedEmployee: Employee | null
  selectedCustomer: Customer | null
}

export function CalendarFilters({
  onEmployeeChange,
  onCustomerChange,
  selectedEmployee,
  selectedCustomer,
}: CalendarFiltersProps) {
  const [openEmployee, setOpenEmployee] = useState(false)
  const [openCustomer, setOpenCustomer] = useState(false)

  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <div className="flex items-center gap-2">
        <Popover open={openEmployee} onOpenChange={setOpenEmployee}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openEmployee}
              className="w-[250px] justify-between"
            >
              {selectedEmployee?.name || "Çalışan seçin..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Çalışan ara..." />
              <CommandEmpty>Çalışan bulunamadı.</CommandEmpty>
              <CommandGroup>
                {mockEmployees.map((employee) => (
                  <CommandItem
                    key={employee.id}
                    value={employee.name}
                    onSelect={() => {
                      onEmployeeChange(employee)
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
                    <span className="ml-2 text-sm text-muted-foreground">
                      {employee.department}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        {selectedEmployee && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEmployeeChange(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Popover open={openCustomer} onOpenChange={setOpenCustomer}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCustomer}
              className="w-[250px] justify-between"
            >
              {selectedCustomer?.name || "Müşteri seçin..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Müşteri ara..." />
              <CommandEmpty>Müşteri bulunamadı.</CommandEmpty>
              <CommandGroup>
                {mockCustomers.map((customer) => (
                  <CommandItem
                    key={customer.id}
                    value={customer.name}
                    onSelect={() => {
                      onCustomerChange(customer)
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
        {selectedCustomer && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCustomerChange(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
