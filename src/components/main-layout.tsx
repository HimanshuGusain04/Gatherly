"use client"

import { Sidebar } from "./sidebar"
import { UserMenu } from "./user-menu"
import { ReactNode } from "react"

interface MainLayoutProps {
  activePage?: string
  children?: ReactNode
}

export function MainLayout({ activePage = "home", children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} />
      <div className="flex-1 overflow-auto flex flex-col">
        <header className="h-16 border-b bg-white flex items-center justify-end px-6">
          <UserMenu />
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 