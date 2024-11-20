"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  UserCircle,
  CalendarDays,
  ListTodo,
  Receipt,
  Settings,
  ChevronDown,
  Users2,
  Map,
  Calculator,
  DollarSign,
  FileText,
  Truck,
  ClipboardList,
  FolderOpen,
  HardDrive,
  Car,
} from 'lucide-react'
import { useState } from 'react'

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-600"
  },
  {
    label: 'Takvim',
    icon: CalendarDays,
    href: '/calendar',
    color: "text-orange-600",
  },
  {
    label: 'Müşteriler',
    icon: Users,
    color: "text-violet-600",
    subItems: [
      {
        label: 'Müşteri Listesi',
        href: '/customers',
        icon: Users2,
      },
      {
        label: 'Sözleşmeler',
        href: '/contracts',
        icon: ClipboardList,
      },
      {
        label: 'Müşteri Alanı',
        href: '/customer-files',
        icon: FolderOpen,
      },
    ]
  },
  {
    label: 'Çalışanlar',
    icon: UserCircle,
    color: "text-pink-600",
    subItems: [
      {
        label: 'Çalışan Listesi',
        href: '/employees',
        icon: Users,
      },
      {
        label: 'Araçlar',
        href: '/tools',
        icon: Car,
      },
      {
        label: 'Ekipler',
        href: '/teams',
        icon: Users2,
      },
    ]
  },
  {
    label: 'İşler',
    icon: ListTodo,
    href: '/tasks',
    color: "text-emerald-600",
  },
  {
    label: 'Harita',
    icon: Map,
    href: '/map',
    color: "text-blue-600",
  },
  {
    label: 'Muhasebe',
    icon: Calculator,
    color: "text-amber-600",
    subItems: [
      {
        label: 'Faturalar',
        href: '/invoices',
        icon: Receipt,
      },
      {
        label: 'Giderler',
        href: '/expenses',
        icon: DollarSign,
      },
      {
        label: 'Teklifler',
        href: '/proposals',
        icon: FileText,
      },
      {
        label: 'Tedarikçiler',
        href: '/suppliers',
        icon: Truck,
      },
    ]
  },
  {
    label: 'Teçhizatlar',
    icon: HardDrive,
    href: '/equipments',
    color: "text-indigo-600",
  },
  {
    label: 'Ayarlar',
    icon: Settings,
    href: '/settings',
    color: "text-slate-600",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="flex flex-col h-full bg-white border-r overflow-y-auto">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center">
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
            CRM
          </h1>
        </Link>
      </div>

      <div className="flex-1 px-3">
        <div className="space-y-1">
          {routes.map((route) => (
            <div key={route.label}>
              {route.subItems ? (
                <>
                  <button
                    onClick={() => toggleExpand(route.label)}
                    className={cn(
                      "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      "hover:bg-slate-100",
                      isActive(route.subItems[0].href)
                        ? "text-slate-900 bg-slate-100"
                        : "text-slate-600",
                    )}
                  >
                    <route.icon className={cn("h-4 w-4 mr-3", route.color)} />
                    <span className="flex-1 text-left">{route.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform",
                        expandedItems.includes(route.label) ? "transform rotate-180" : ""
                      )}
                    />
                  </button>
                  {expandedItems.includes(route.label) && (
                    <div className="ml-4 mt-1 space-y-1">
                      {route.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                            "hover:bg-slate-100",
                            isActive(subItem.href)
                              ? "text-slate-900 bg-slate-100"
                              : "text-slate-600",
                          )}
                        >
                          {subItem.icon && <subItem.icon className="h-4 w-4 mr-3" />}
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={route.href}
                  className={cn(
                    "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    "hover:bg-slate-100",
                    isActive(route.href)
                      ? "text-slate-900 bg-slate-100"
                      : "text-slate-600",
                  )}
                >
                  <route.icon className={cn("h-4 w-4 mr-3", route.color)} />
                  <span>{route.label}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
