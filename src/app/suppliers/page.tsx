"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Mock veri
const initialSuppliers = [
  {
    id: 1,
    name: "ABC Tedarik Ltd. Şti.",
    contactPerson: "Ahmet Yılmaz",
    email: "ahmet@abctedarik.com",
    phone: "0212 555 1234",
    address: "İstanbul, Türkiye",
    category: "Elektronik",
    notes: "Düzenli tedarikçi, hızlı teslimat",
  },
  {
    id: 2,
    name: "XYZ Dağıtım A.Ş.",
    contactPerson: "Ayşe Demir",
    email: "ayse@xyzdagitim.com",
    phone: "0216 444 5678",
    address: "Ankara, Türkiye",
    category: "Ofis Malzemeleri",
    notes: "Toplu alımlarda indirim",
  },
];

export default function SuppliersPage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [isOpen, setIsOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSupplier) {
      setSuppliers(
        suppliers.map((supplier) =>
          supplier.id === editingSupplier.id
            ? { ...formData, id: editingSupplier.id }
            : supplier
        )
      );
      toast.success("Tedarikçi güncellendi");
    } else {
      setSuppliers([...suppliers, { ...formData, id: Date.now() }]);
      toast.success("Tedarikçi eklendi");
    }
    setIsOpen(false);
    setEditingSupplier(null);
    setFormData({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      category: "",
      notes: "",
    });
  };

  const handleEdit = (supplier: any) => {
    setEditingSupplier(supplier);
    setFormData(supplier);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tedarikçiyi silmek istediğinizden emin misiniz?")) {
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
      toast.success("Tedarikçi silindi");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tedarikçiler</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Tedarikçi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingSupplier ? "Tedarikçi Düzenle" : "Yeni Tedarikçi Ekle"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Firma Adı</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactPerson">İletişim Kişisi</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Adres</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="notes">Notlar</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                {editingSupplier ? "Güncelle" : "Ekle"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tedarikçi</TableHead>
              <TableHead>İletişim Kişisi</TableHead>
              <TableHead>E-posta</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="w-[100px]">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow
                key={supplier.id}
                className="cursor-pointer hover:bg-muted/50 [&>td]:p-2"
                onClick={() => router.push(`/suppliers/${supplier.id}`)}
              >
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contactPerson}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.category}</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(supplier)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(supplier.id)}
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
  );
}
