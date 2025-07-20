"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Separator } from "@/components/ui/separator"
import { 
  Home, 
  BarChart3, 
  Calendar, 
  Plus, 
  CheckSquare
} from "lucide-react"

interface SidebarProps {
  activePage?: string
}

export function Sidebar({ activePage = "home" }: SidebarProps) {
  const { user } = useAuth()

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Top Section */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-sage-600 rounded flex items-center justify-center">
            <CheckSquare className="w-4 h-4 text-white" />
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded flex items-center justify-center">
              <CheckSquare className="w-3 h-3 text-gray-600" />
            </div>
            <div className="w-4 h-4 bg-gray-300 rounded flex items-center justify-center">
              <Calendar className="w-3 h-3 text-gray-600" />
            </div>
            <div className="w-4 h-4 bg-gray-300 rounded flex items-center justify-center">
              <Plus className="w-3 h-3 text-gray-600" />
            </div>
          </div>
        </div>
        
        <Separator className="mb-4" />
        
        {/* Navigation */}
        <div className="space-y-1">
          <Link href="/">
            <div className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activePage === "home" 
                ? "bg-sage-100 text-sage-700" 
                : "text-gray-700 hover:bg-gray-100"
            }`}>
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </div>
          </Link>
        </div>
        
        <div className="mt-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
            Content
          </h3>
          <div className="space-y-1">
            <Link href="/polls">
              <div className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activePage === "polls" 
                  ? "bg-sage-100 text-sage-700" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}>
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Polls</span>
              </div>
            </Link>
            <Link href="/events">
              <div className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activePage === "events" 
                  ? "bg-sage-100 text-sage-700" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}>
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Events</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Spacer */}
      <div className="flex-1" />
      

      
      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">Free</p>
          </div>
        </div>
      </div>
    </div>
  )
} 