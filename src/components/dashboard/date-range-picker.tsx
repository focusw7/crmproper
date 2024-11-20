import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CalendarDateRangePicker() {
  return (
    <Button
      variant={"outline"}
      className="w-[260px] justify-start text-left font-normal"
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      <span>Tarih Seç</span>
    </Button>
  )
}
