"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import {
  Users,
  Truck,
  Wrench,
  ClipboardList,
  Bell,
  DollarSign,
  FileText,
  CheckSquare,
  GripVertical
} from "lucide-react"
import { useEffect, useState } from "react"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { toast } from "sonner"

// Widget bileşenleri
const widgets = {
  "total-customers": {
    title: "Toplam Müşteri",
    icon: Users,
    value: "2,350",
    change: "+180 bu ay"
  },
  "suppliers": {
    title: "Tedarikçiler",
    icon: Truck,
    value: "48",
    change: "+3 bu ay"
  },
  "equipments": {
    title: "Ekipmanlar",
    icon: Wrench,
    value: "145",
    change: "+12 bu ay"
  },
  "active-tasks": {
    title: "Aktif Görevler",
    icon: ClipboardList,
    value: "24",
    change: "8 görev bugün"
  },
  "pending-notifications": {
    title: "Bekleyen Bildirimler",
    icon: Bell,
    value: "12",
    change: "3 yüksek öncelikli"
  },
  "total-revenue": {
    title: "Toplam Gelir",
    icon: DollarSign,
    value: "₺145,231.89",
    change: "+22% bu ay"
  },
  "pending-proposals": {
    title: "Bekleyen Teklifler",
    icon: FileText,
    value: "15",
    change: "5 yeni teklif"
  },
  "completed-tasks": {
    title: "Tamamlanan Görevler",
    icon: CheckSquare,
    value: "128",
    change: "Bu ay içinde"
  }
}

export default function DashboardPage() {
  const [dashboardSettings, setDashboardSettings] = useState<any[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Gerçek uygulamada bu veriler API'dan gelecek
    const savedSettings = [
      { id: "total-customers", enabled: true, order: 1 },
      { id: "suppliers", enabled: true, order: 2 },
      { id: "equipments", enabled: true, order: 3 },
      { id: "active-tasks", enabled: true, order: 4 },
      { id: "pending-notifications", enabled: true, order: 5 },
      { id: "total-revenue", enabled: true, order: 6 },
      { id: "pending-proposals", enabled: true, order: 7 },
      { id: "completed-tasks", enabled: true, order: 8 },
      { id: "overview-chart", enabled: true, order: 9 },
      { id: "upcoming-tasks", enabled: true, order: 10 },
    ];
    setDashboardSettings(savedSettings);
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(dashboardSettings);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Sıralama numaralarını güncelle
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    setDashboardSettings(updatedItems);
    toast.success("Widget sıralaması güncellendi");
  };

  const renderWidget = (widgetId: string, dragHandleProps?: any) => {
    const widget = widgets[widgetId as keyof typeof widgets];
    if (!widget) return null;

    const Icon = widget.icon;

    return (
      <Card className={isEditMode ? "border-2 border-dashed" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            {isEditMode && (
              <div {...dragHandleProps} className="cursor-move">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            <CardTitle className="text-sm font-medium">
              {widget.title}
            </CardTitle>
          </div>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{widget.value}</div>
          <p className="text-xs text-muted-foreground">
            {widget.change}
          </p>
        </CardContent>
      </Card>
    );
  };

  const renderMetricWidgets = () => {
    const metricWidgets = dashboardSettings
      .filter(widget => widget.enabled && widget.id !== "overview-chart" && widget.id !== "upcoming-tasks")
      .sort((a, b) => a.order - b.order);

    if (!isEditMode) {
      return metricWidgets.map(widget => (
        <div key={widget.id}>
          {renderWidget(widget.id)}
        </div>
      ));
    }

    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard-widgets" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
              {metricWidgets.map((widget, index) => (
                <Draggable
                  key={widget.id}
                  draggableId={widget.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      {renderWidget(widget.id, provided.dragHandleProps)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button 
            variant={isEditMode ? "default" : "outline"}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? "Düzenlemeyi Bitir" : "Düzenle"}
          </Button>
          <CalendarDateRangePicker />
          <Button>Rapor İndir</Button>
        </div>
      </div>

      {/* Metrik Widget'ları */}
      <div className={!isEditMode ? "grid gap-4 md:grid-cols-2 lg:grid-cols-4" : ""}>
        {renderMetricWidgets()}
      </div>

      {/* Grafik ve Görevler */}
      {dashboardSettings.some(w => w.id === "overview-chart" && w.enabled) && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Genel Bakış</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>

          {dashboardSettings.some(w => w.id === "upcoming-tasks" && w.enabled) && (
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Yaklaşan Görevler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Müşteri Görüşmesi</p>
                      <p className="text-sm text-muted-foreground">
                        ABC Şirketi - 14:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Ekipman Bakımı</p>
                      <p className="text-sm text-muted-foreground">
                        XYZ Ltd. - Yarın
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Teklif Sunumu</p>
                      <p className="text-sm text-muted-foreground">
                        123 Holding - Çarşamba
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
