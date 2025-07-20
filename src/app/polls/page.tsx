"use client"

import { useAuth } from "@/contexts/AuthContext"
import { MainLayout } from "@/components/main-layout"

export default function PollsPage() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      </div>
    )
  }

  return <MainLayout activePage="polls" />
} 