"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CustomerFormProps {
  isOpen: boolean
  onClose: () => void
  customer?: {
    id: string
    type: 'individual' | 'corporate'
    name?: string
    companyName?: string
    shortName?: string
    email: string
    phone: string
    status: string
    address: string
    postalCode?: string
    district?: string
    city?: string
    taxNumber?: string
    taxOffice?: string
    openingBalance?: number
    paymentMethod?: string
  }
  onSubmit?: (customer: {
    id: string
    type: 'individual' | 'corporate'
    name?: string
    companyName?: string
    shortName?: string
    email: string
    phone: string
    status: string
    address: string
    postalCode?: string
    district?: string
    city?: string
    taxNumber?: string
    taxOffice?: string
    openingBalance?: number
    paymentMethod?: string
  }) => void
}

interface CustomerFormData {
  type: 'individual' | 'corporate'
  name: string
  companyName?: string
  shortName?: string
  email: string
  phone: string
  status: string
  address: string
  postalCode: string
  district: string
  city: string
  taxNumber?: string
  taxOffice?: string
  openingBalance?: number
  paymentMethod: string
}

export function CustomerForm({ isOpen, onClose, customer, onSubmit }: CustomerFormProps) {
  const [customerType, setCustomerType] = useState<'individual' | 'corporate'>(
    customer?.type || 'corporate'
  )
  const [showOpeningBalance, setShowOpeningBalance] = useState(false)
  const [formData, setFormData] = useState<CustomerFormData>({
    type: customer?.type || 'corporate',
    name: customer?.name || "",
    companyName: customer?.companyName || "",
    shortName: customer?.shortName || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    status: customer?.status || "active",
    address: customer?.address || "",
    postalCode: customer?.postalCode || "",
    district: customer?.district || "",
    city: customer?.city || "",
    taxNumber: customer?.taxNumber || "",
    taxOffice: customer?.taxOffice || "",
    openingBalance: customer?.openingBalance || 0,
    paymentMethod: customer?.paymentMethod || "havale-eft"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({
        id: customer?.id || "",
        type: formData.type,
        name: formData.name,
        companyName: formData.companyName,
        shortName: formData.shortName,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        address: formData.address,
        postalCode: formData.postalCode,
        district: formData.district,
        city: formData.city,
        taxNumber: formData.taxNumber,
        taxOffice: formData.taxOffice,
        openingBalance: formData.openingBalance,
        paymentMethod: formData.paymentMethod,
      })
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {customer ? "Müşteri Düzenle" : "Yeni Müşteri Ekle"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Müşteri Tipi</Label>
            <div className="flex space-x-4 mt-1">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="corporate"
                  name="customerType"
                  value="corporate"
                  checked={customerType === 'corporate'}
                  onChange={(e) => {
                    setCustomerType('corporate')
                    setFormData({ ...formData, type: 'corporate' })
                  }}
                  className="h-4 w-4"
                />
                <Label htmlFor="corporate" className="cursor-pointer">Tüzel Kişi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="individual"
                  name="customerType"
                  value="individual"
                  checked={customerType === 'individual'}
                  onChange={(e) => {
                    setCustomerType('individual')
                    setFormData({ ...formData, type: 'individual' })
                  }}
                  className="h-4 w-4"
                />
                <Label htmlFor="individual" className="cursor-pointer">Gerçek Kişi</Label>
              </div>
            </div>
          </div>

          {customerType === 'individual' ? (
            <div className="space-y-2">
              <Label htmlFor="name">Ad Soyad</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ad Soyad"
                required
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="companyName">Firma Ünvanı</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  placeholder="Firma Ünvanı"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortName">Kısa İsim</Label>
                <Input
                  id="shortName"
                  value={formData.shortName}
                  onChange={(e) =>
                    setFormData({ ...formData, shortName: e.target.value })
                  }
                  placeholder="Kısa İsim"
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="ornek@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+90 555 123 4567"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adres</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Adres"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postalCode">Posta Kodu</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                placeholder="34100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">İlçe</Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
                placeholder="İlçe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">İl</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="İl"
              />
            </div>
          </div>

          {customerType === 'corporate' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxNumber">Vergi No</Label>
                <Input
                  id="taxNumber"
                  value={formData.taxNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, taxNumber: e.target.value })
                  }
                  placeholder="Vergi No"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxOffice">Vergi Dairesi</Label>
                <Input
                  id="taxOffice"
                  value={formData.taxOffice}
                  onChange={(e) =>
                    setFormData({ ...formData, taxOffice: e.target.value })
                  }
                  placeholder="Vergi Dairesi"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showOpeningBalance"
                checked={showOpeningBalance}
                onChange={(e) => setShowOpeningBalance(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="showOpeningBalance">Açılış Bakiyesi</Label>
            </div>
            {showOpeningBalance && (
              <Input
                id="openingBalance"
                type="number"
                value={formData.openingBalance}
                onChange={(e) =>
                  setFormData({ ...formData, openingBalance: parseFloat(e.target.value) })
                }
                placeholder="0.00"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label>Ödeme Yöntemi</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ödeme yöntemi seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="havale-eft">Havale/EFT</SelectItem>
                <SelectItem value="kredi-karti">Kredi Kartı</SelectItem>
                <SelectItem value="nakit">Nakit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Durum</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Durum seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="passive">Pasif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit">
              {customer ? "Güncelle" : "Ekle"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
