"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Contract, ContractStatus } from "@/types/contract"
import { Badge } from "@/components/ui/badge"
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
import { mockCustomers } from "@/data/mock"

interface ContractsTableProps {
  contracts: Contract[]
  onEditContract: (contract: Contract) => void
}

const statusColors: Record<ContractStatus, string> = {
  draft: "bg-gray-500",
  pending: "bg-yellow-500",
  active: "bg-green-500",
  expired: "bg-red-500",
  terminated: "bg-purple-500",
}

const statusLabels: Record<ContractStatus, string> = {
  draft: "Taslak",
  pending: "Beklemede",
  active: "Aktif",
  expired: "Süresi Dolmuş",
  terminated: "Feshedilmiş",
}

export function ContractsTable({
  contracts,
  onEditContract,
}: ContractsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [openCustomer, setOpenCustomer] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null)

  const columns: ColumnDef<Contract>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Başlık
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Müşteri
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("customerName")}</div>,
    },
    {
      accessorKey: "type",
      header: "Tür",
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
      accessorKey: "status",
      header: "Durum",
      cell: ({ row }) => {
        const status = row.getValue("status") as ContractStatus
        return (
          <Badge className={statusColors[status]}>{statusLabels[status]}</Badge>
        )
      },
    },
    {
      accessorKey: "startDate",
      header: "Başlangıç",
      cell: ({ row }) => (
        <div>
          {format(row.getValue("startDate"), "dd MMM yyyy", { locale: tr })}
        </div>
      ),
    },
    {
      accessorKey: "endDate",
      header: "Bitiş",
      cell: ({ row }) => (
        <div>
          {format(row.getValue("endDate"), "dd MMM yyyy", { locale: tr })}
        </div>
      ),
    },
    {
      accessorKey: "value",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tutar
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("value"))
        const formatted = new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: "TRY",
        }).format(amount)

        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const contract = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Menüyü aç</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEditContract(contract)}>
                <PencilIcon className="mr-2 h-4 w-4" />
                Düzenle
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <TrashIcon className="mr-2 h-4 w-4" />
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: contracts,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Sözleşme ara..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex-1 max-w-sm">
          <Popover open={openCustomer} onOpenChange={setOpenCustomer}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCustomer}
                className="w-full justify-between"
              >
                {selectedCustomer?.name || "Müşteri seç..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Müşteri ara..." />
                <CommandEmpty>Müşteri bulunamadı.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedCustomer(null)
                      table.getColumn("customerName")?.setFilterValue("")
                      setOpenCustomer(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        !selectedCustomer ? "opacity-100" : "opacity-0"
                      )}
                    />
                    Tümü
                  </CommandItem>
                  {mockCustomers.map((customer) => (
                    <CommandItem
                      key={customer.id}
                      value={customer.name}
                      onSelect={() => {
                        setSelectedCustomer(customer)
                        table.getColumn("customerName")?.setFilterValue(customer.name)
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

        {selectedCustomer && (
          <Button
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => {
              setSelectedCustomer(null)
              table.getColumn("customerName")?.setFilterValue("")
            }}
          >
            Filtreyi Temizle
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sonuç bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} / {" "}
          {table.getFilteredRowModel().rows.length} satır seçildi.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Önceki
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Sonraki
          </Button>
        </div>
      </div>
    </div>
  )
}
