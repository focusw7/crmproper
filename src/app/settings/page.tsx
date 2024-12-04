"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { GripVertical } from "lucide-react";

export default function SettingsPage() {
  // Genel ayarlar state'leri
  const [companyName, setCompanyName] = useState("CRM Yazılım Ltd. Şti.");
  const [companyEmail, setCompanyEmail] = useState("info@crm.com");
  const [companyPhone, setCompanyPhone] = useState("0212 555 0000");
  const [companyAddress, setCompanyAddress] = useState("İstanbul, Türkiye");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("tr");

  // Bildirim ayarları state'leri
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [customerUpdates, setCustomerUpdates] = useState(true);
  const [warrantyAlerts, setWarrantyAlerts] = useState(true);

  // Fatura ayarları state'leri
  const [invoicePrefix, setInvoicePrefix] = useState("INV");
  const [defaultDueDate, setDefaultDueDate] = useState("30");
  const [defaultCurrency, setDefaultCurrency] = useState("TRY");
  const [autoNumbering, setAutoNumbering] = useState(true);

  // Müşteri ayarları state'leri
  const [customerCodePrefix, setCustomerCodePrefix] = useState("CUS");
  const [autoCustomerCode, setAutoCustomerCode] = useState(true);
  const [requiredFields, setRequiredFields] = useState(["email", "phone"]);

  // Dashboard widget ayarları state'i
  const [dashboardWidgets, setDashboardWidgets] = useState([
    { id: "total-customers", name: "Toplam Müşteri", enabled: true, order: 1, size: "normal" },
    { id: "suppliers", name: "Tedarikçiler", enabled: true, order: 2, size: "normal" },
    { id: "equipments", name: "Ekipmanlar", enabled: true, order: 3, size: "normal" },
    { id: "active-tasks", name: "Aktif Görevler", enabled: true, order: 4, size: "normal" },
    { id: "pending-notifications", name: "Bekleyen Bildirimler", enabled: true, order: 5, size: "normal" },
    { id: "total-revenue", name: "Toplam Gelir", enabled: true, order: 6, size: "normal" },
    { id: "pending-proposals", name: "Bekleyen Teklifler", enabled: true, order: 7, size: "normal" },
    { id: "completed-tasks", name: "Tamamlanan Görevler", enabled: true, order: 8, size: "normal" },
    { id: "overview-chart", name: "Genel Bakış Grafiği", enabled: true, order: 9, size: "large" },
    { id: "upcoming-tasks", name: "Yaklaşan Görevler", enabled: true, order: 10, size: "medium" },
  ]);

  const toggleWidget = (widgetId: string) => {
    setDashboardWidgets(
      dashboardWidgets.map((widget) =>
        widget.id === widgetId
          ? { ...widget, enabled: !widget.enabled }
          : widget
      )
    );
  };

  const handleSave = (section: string) => {
    // Burada API çağrısı yapılacak
    toast.success(`${section} ayarları kaydedildi`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ayarlar</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="appearance">Görünüm</TabsTrigger>
          <TabsTrigger value="users">Kullanıcılar</TabsTrigger>
        </TabsList>

        {/* Genel Ayarlar */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Genel Ayarlar</CardTitle>
              <CardDescription>
                Şirket bilgileri ve uygulama tercihlerinizi yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Şirket Adı</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">E-posta</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">Telefon</Label>
                  <Input
                    id="companyPhone"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Adres</Label>
                  <Input
                    id="companyAddress"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Dil</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Dil seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">Türkçe</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between pt-8">
                  <Label htmlFor="darkMode">Karanlık Mod</Label>
                  <Switch
                    id="darkMode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("Genel")} className="mt-4">
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bildirim Ayarları */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>
                Bildirim tercihlerinizi özelleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications">E-posta Bildirimleri</Label>
                  <Switch
                    id="emailNotifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="taskReminders">Görev Hatırlatmaları</Label>
                  <Switch
                    id="taskReminders"
                    checked={taskReminders}
                    onCheckedChange={setTaskReminders}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="customerUpdates">Müşteri Güncellemeleri</Label>
                  <Switch
                    id="customerUpdates"
                    checked={customerUpdates}
                    onCheckedChange={setCustomerUpdates}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="warrantyAlerts">Garanti Uyarıları</Label>
                  <Switch
                    id="warrantyAlerts"
                    checked={warrantyAlerts}
                    onCheckedChange={setWarrantyAlerts}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("Bildirimler")} className="mt-4">
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fatura Ayarları */}
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Fatura Ayarları</CardTitle>
              <CardDescription>
                Fatura oluşturma ve numaralandırma ayarlarını yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoicePrefix">Fatura Öneki</Label>
                  <Input
                    id="invoicePrefix"
                    value={invoicePrefix}
                    onChange={(e) => setInvoicePrefix(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultDueDate">Varsayılan Vade (Gün)</Label>
                  <Input
                    id="defaultDueDate"
                    type="number"
                    value={defaultDueDate}
                    onChange={(e) => setDefaultDueDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultCurrency">Varsayılan Para Birimi</Label>
                  <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Para birimi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TRY">TRY - Türk Lirası</SelectItem>
                      <SelectItem value="USD">USD - Amerikan Doları</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between pt-8">
                  <Label htmlFor="autoNumbering">Otomatik Numaralandırma</Label>
                  <Switch
                    id="autoNumbering"
                    checked={autoNumbering}
                    onCheckedChange={setAutoNumbering}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("Faturalar")} className="mt-4">
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Müşteri Ayarları */}
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Müşteri Ayarları</CardTitle>
              <CardDescription>
                Müşteri kayıt ve görüntüleme tercihlerini yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerCodePrefix">Müşteri Kodu Öneki</Label>
                  <Input
                    id="customerCodePrefix"
                    value={customerCodePrefix}
                    onChange={(e) => setCustomerCodePrefix(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between pt-8">
                  <Label htmlFor="autoCustomerCode">Otomatik Müşteri Kodu</Label>
                  <Switch
                    id="autoCustomerCode"
                    checked={autoCustomerCode}
                    onCheckedChange={setAutoCustomerCode}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("Müşteriler")} className="mt-4">
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Görev Ayarları */}
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Görev Ayarları</CardTitle>
              <CardDescription>
                Görev yönetimi ve hatırlatma ayarlarını özelleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Otomatik Görev Hatırlatmaları</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Görev Tamamlandı Bildirimleri</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Görev Atama Bildirimleri</Label>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button onClick={() => handleSave("Görevler")} className="mt-4">
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teçhizat Ayarları */}
        <TabsContent value="equipments">
          <Card>
            <CardHeader>
              <CardTitle>Teçhizat Ayarları</CardTitle>
              <CardDescription>
                Teçhizat takip ve garanti ayarlarını yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Garanti Süresi Bildirimleri</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Bakım Hatırlatmaları</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Envanter Uyarıları</Label>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button onClick={() => handleSave("Teçhizatlar")} className="mt-4">
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tedarikçi Ayarları */}
        <TabsContent value="suppliers">
          <Card>
            <CardHeader>
              <CardTitle>Tedarikçi Ayarları</CardTitle>
              <CardDescription>
                Tedarikçi yönetimi ve sipariş ayarlarını özelleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Otomatik Sipariş Oluşturma</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Stok Uyarıları</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Tedarikçi Değerlendirme Sistemi</Label>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button onClick={() => handleSave("Tedarikçiler")} className="mt-4">
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dashboard Ayarları */}
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Ayarları</CardTitle>
              <CardDescription>
                Dashboard'da görüntülenecek widget'ları özelleştirin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Widget'ları Özelleştirin</h3>
                  <div className="space-y-2">
                    {dashboardWidgets
                      .sort((a, b) => a.order - b.order)
                      .map((widget) => (
                        <div
                          key={widget.id}
                          className="flex items-center justify-between py-2 px-3 border rounded-lg bg-card hover:bg-accent/10 transition-colors"
                        >
                          <span className="text-sm">{widget.name}</span>
                          <div className="flex items-center space-x-3">
                            <Switch
                              checked={widget.enabled}
                              onCheckedChange={() => toggleWidget(widget.id)}
                              className="data-[state=checked]:bg-primary"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave("Dashboard")}>
                    Değişiklikleri Kaydet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Kullanıcı Ayarları */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Kullanıcı Yönetimi</CardTitle>
              <CardDescription>
                Sistem kullanıcılarını buradan yönetebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  onClick={() => window.location.href = '/settings/users'}
                  variant="outline"
                >
                  Kullanıcı Yönetimi Sayfasına Git
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
