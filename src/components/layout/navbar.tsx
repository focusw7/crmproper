"use client"

import { UserButton } from "@/components/user-button"

export function Navbar() {
  return (
    <div className="flex items-center p-4">
      <div className="flex w-full justify-end">
        <UserButton />
      </div>
    </div>
  )
}
