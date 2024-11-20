"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Equipment {
  id: number;
  name: string;
  type: string;
  serialNumber: string;
  status: string;
  assignedTo: string;
  purchaseDate: string;
  warranty: string;
  condition: string;
  notes: string;
  customerId: number;
  customerName: string;
}

// Mock müşteri verisi
const customers = [
  { id: 1, name: "ABC Şirketi", code: "ABC001" },
  { id: 2, name: "XYZ Limited", code: "XYZ002" },
  { id: 3, name: "123 Holding", code: "123003" },
  { id: 4, name: "Tech Solutions", code: "TECH004" },
];

// Mock veri
const initialEquipments: Equipment[] = [
  {
    id: 1,
    name: "ThinkPad X1 Carbon",
    type: "Laptop",
    serialNumber: "LP2023001",
    status: "Aktif",
    assignedTo: "Ahmet Yılmaz",
    purchaseDate: "2023-01-15",
    warranty: "2025-01-15",
    condition: "İyi",
    notes: "Windows 11 Pro yüklü, 16GB RAM",
    customerId: 1,
    customerName: "ABC Şirketi",
  },
  {
    id: 2,
    name: "iPhone 13 Pro",
    type: "Telefon",
    serialNumber: "IP2023045",
    status: "Tamirde",
    assignedTo: "Ayşe Demir",
    purchaseDate: "2023-03-20",
    warranty: "2025-03-20",
    condition: "Onarımda",
    notes: "Ekran değişimi yapılacak",
    customerId: 2,
    customerName: "XYZ Limited",
  },
  {
    id: 3,
    name: "Dell U2419H",
    type: "Monitör",
    serialNumber: "MN2023012",
    status: "Aktif",
    assignedTo: "Mehmet Kaya",
    purchaseDate: "2023-02-10",
    warranty: "2026-02-10",
    condition: "İyi",
    notes: "24 inç, Full HD",
    customerId: 3,
    customerName: "123 Holding",
  },
];

const equipmentTypes = [
  "Laptop",
  "Masaüstü",
  "Telefon",
  "Tablet",
  "Monitör",
  "Yazıcı",
  "Tarayıcı",
  "Diğer",
];

const statusTypes = [
  "Aktif",
  "Pasif",
  "Tamirde",
  "Kayıp",
  "Hurda",
];

const conditionTypes = [
  "Yeni",
  "İyi",
  "Orta",
  "Kötü",
  "Onarımda",
];

export default function EquipmentsPage() {
  const [equipments, setEquipments] = useState(initialEquipments);
  const [isOpen, setIsOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("all");
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isChangingCustomer, setIsChangingCustomer] = useState(false);
  const [formData, setFormData] = useState<Equipment>({
    id: 0,
    name: "",
    type: "",
    serialNumber: "",
    status: "",
    assignedTo: "",
    purchaseDate: "",
    warranty: "",
    condition: "",
    notes: "",
    customerId: 0,
    customerName: "",
  });

  const handleFilterChange = (prev: Equipment[], customerId: string) => {
    return prev.filter((equipment) => equipment.customerId === parseInt(customerId));
  };

  const filteredEquipments = selectedCustomer === "all"
    ? equipments
    : handleFilterChange(equipments, selectedCustomer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEquipment) {
      setEquipments(
        equipments.map((equipment) =>
          equipment.id === editingEquipment.id
            ? { ...formData, id: editingEquipment.id }
            : equipment
        )
      );
      toast.success("Teçhizat güncellendi");
    } else {
      setEquipments([...equipments, { ...formData, id: Date.now() }]);
      toast.success("Teçhizat eklendi");
    }
    setIsOpen(false);
    setEditingEquipment(null);
    setFormData({
      id: 0,
      name: "",
      type: "",
      serialNumber: "",
      status: "",
      assignedTo: "",
      purchaseDate: "",
      warranty: "",
      condition: "",
      notes: "",
      customerId: 0,
      customerName: "",
    });
  };

  const handleEdit = (equipment: Equipment) => {
    setEditingEquipment(equipment);
    setFormData(equipment);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Teçhizatı silmek istediğinizden emin misiniz?")) {
      setEquipments(equipments.filter((equipment) => equipment.id !== id));
      toast.success("Teçhizat silindi");
    }
  };

  const handleCustomerChange = (equipmentId: number, customerId: string) => {
    const customer = customers.find(c => c.id.toString() === customerId);
    if (customer) {
      setEquipments(equipments.map(eq => 
        eq.id === equipmentId 
          ? { ...eq, customerId: customer.id, customerName: customer.name }
          : eq
      ));
      setSelectedEquipment(prev => prev ? { ...prev, customerId: customer.id, customerName: customer.name } : null);
      setIsChangingCustomer(false);
      toast.success("Müşteri başarıyla değiştirildi");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-500";
      case "Pasif":
        return "bg-gray-500";
      case "Tamirde":
        return "bg-yellow-500";
      case "Kayıp":
        return "bg-red-500";
      case "Hurda":
        return "bg-black";
      default:
        return "bg-blue-500";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Yeni":
        return "bg-green-500";
      case "İyi":
        return "bg-blue-500";
      case "Orta":
        return "bg-yellow-500";
      case "Kötü":
        return "bg-red-500";
      case "Onarımda":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Teçhizatlar</h2>
          <p className="text-sm text-muted-foreground">
            Tüm teçhizatları görüntüleyin ve yönetin
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Teçhizat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingEquipment ? "Teçhizat Düzenle" : "Yeni Teçhizat Ekle"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Teçhizat Adı</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer">Müşteri</Label>
                  <Select
                    value={formData.customerId ? formData.customerId.toString() : ""}
                    onValueChange={(value) => {
                      const customer = customers.find(c => c.id.toString() === value);
                      setFormData({
                        ...formData,
                        customerId: parseInt(value),
                        customerName: customer ? customer.name : ""
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Müşteri Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id.toString()}>
                          {customer.name} ({customer.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tip</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Seri No</Label>
                  <Input
                    id="serialNumber"
                    value={formData.serialNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, serialNumber: e.target.value })
                    }
                    required
                  />
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
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusTypes.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Atanan Kişi</Label>
                  <Input
                    id="assignedTo"
                    value={formData.assignedTo}
                    onChange={(e) =>
                      setFormData({ ...formData, assignedTo: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Kondisyon</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) =>
                      setFormData({ ...formData, condition: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditionTypes.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Alım Tarihi</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) =>
                      setFormData({ ...formData, purchaseDate: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="warranty">Garanti Bitiş</Label>
                  <Input
                    id="warranty"
                    type="date"
                    value={formData.warranty}
                    onChange={(e) =>
                      setFormData({ ...formData, warranty: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notlar</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="h-20"
                />
              </div>

              <Button type="submit" className="w-full">
                {editingEquipment ? "Güncelle" : "Ekle"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
          <SelectTrigger>
            <SelectValue placeholder="Tüm Müşteriler" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Müşteriler</SelectItem>
            {customers.map((customer) => (
              <SelectItem key={customer.id} value={customer.id.toString()}>
                {customer.name} ({customer.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Dialog open={!!selectedEquipment} onOpenChange={() => setSelectedEquipment(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Teçhizat Detayları</DialogTitle>
          </DialogHeader>
          {selectedEquipment && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Teçhizat Adı</Label>
                  <div className="font-medium">{selectedEquipment.name}</div>
                </div>
                <div>
                  <Label>Seri Numarası</Label>
                  <div className="font-medium">{selectedEquipment.serialNumber}</div>
                </div>
                <div>
                  <Label>Tip</Label>
                  <div className="font-medium">{selectedEquipment.type}</div>
                </div>
                <div>
                  <Label>Durum</Label>
                  <div>
                    <Badge className={getStatusColor(selectedEquipment.status)}>
                      {selectedEquipment.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Atanan Kişi</Label>
                  <div className="font-medium">{selectedEquipment.assignedTo}</div>
                </div>
                <div>
                  <Label>Müşteri</Label>
                  {isChangingCustomer ? (
                    <div className="flex items-center space-x-2">
                      <Select
                        value={selectedEquipment.customerId.toString()}
                        onValueChange={(value) => handleCustomerChange(selectedEquipment.id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Müşteri Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {customers.map((customer) => (
                            <SelectItem key={customer.id} value={customer.id.toString()}>
                              {customer.name} ({customer.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setIsChangingCustomer(false)}
                      >
                        İptal
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="font-medium">{selectedEquipment.customerName}</div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setIsChangingCustomer(true)}
                      >
                        Değiştir
                      </Button>
                    </div>
                  )}
                </div>
                <div>
                  <Label>Alım Tarihi</Label>
                  <div className="font-medium">{selectedEquipment.purchaseDate}</div>
                </div>
                <div>
                  <Label>Garanti Bitiş</Label>
                  <div className="font-medium">{selectedEquipment.warranty}</div>
                </div>
                <div>
                  <Label>Durum</Label>
                  <div>
                    <Badge variant="outline">{selectedEquipment.condition}</Badge>
                  </div>
                </div>
              </div>
              <div>
                <Label>Notlar</Label>
                <div className="font-medium whitespace-pre-wrap">{selectedEquipment.notes}</div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => handleEdit(selectedEquipment)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Düzenle
                </Button>
                <Button variant="destructive" onClick={() => {
                  handleDelete(selectedEquipment.id);
                  setSelectedEquipment(null);
                }}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Sil
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="py-1.5 text-xs">Teçhizat Adı</TableHead>
            <TableHead className="py-1.5 text-xs">Tip</TableHead>
            <TableHead className="py-1.5 text-xs">Müşteri</TableHead>
            <TableHead className="py-1.5 text-xs">Seri No</TableHead>
            <TableHead className="py-1.5 text-xs">Durum</TableHead>
            <TableHead className="py-1.5 text-xs">Atanan Kişi</TableHead>
            <TableHead className="py-1.5 text-xs">Kondisyon</TableHead>
            <TableHead className="py-1.5 text-xs">Garanti</TableHead>
            <TableHead className="py-1.5 text-xs">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEquipments.map((equipment) => (
            <TableRow
              key={equipment.id}
              className="cursor-pointer hover:bg-muted/50 [&>td]:py-1.5"
              onClick={() => setSelectedEquipment(equipment)}
            >
              <TableCell className="text-sm font-medium">{equipment.name}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{equipment.type}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{equipment.customerName}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{equipment.serialNumber}</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(equipment.status)} text-[10px] py-0 px-2 font-normal`}>
                  {equipment.status}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">{equipment.assignedTo}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-[10px] py-0 px-2 font-normal">
                  {equipment.condition}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">{equipment.warranty}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(equipment);
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(equipment.id);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
