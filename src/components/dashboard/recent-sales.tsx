"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ahmet Kaya</p>
          <p className="text-sm text-muted-foreground">
            ahmet.kaya@example.com
          </p>
        </div>
        <div className="ml-auto font-medium">+₺1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>MY</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Mehmet Yılmaz</p>
          <p className="text-sm text-muted-foreground">mehmet@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₺39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>AY</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ayşe Yıldız</p>
          <p className="text-sm text-muted-foreground">
            ayse.yildiz@example.com
          </p>
        </div>
        <div className="ml-auto font-medium">+₺299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>FD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Fatma Demir</p>
          <p className="text-sm text-muted-foreground">fatma@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₺99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>CK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Can Kara</p>
          <p className="text-sm text-muted-foreground">can.kara@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₺39.00</div>
      </div>
    </div>
  )
}
