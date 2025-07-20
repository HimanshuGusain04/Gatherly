"use client"

import { Sidebar } from "./sidebar"
import { Homepage } from "./homepage"

interface MainLayoutProps {
  activePage?: string
}

export function MainLayout({ activePage = "home" }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} />
      <Homepage activePage={activePage} />
    </div>
  )
} 