"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  BarChart3, 
  Calendar, 
  User, 
  Settings
} from "lucide-react"


interface HomepageProps {
  activePage?: string
}

export function Homepage({ activePage = "home" }: HomepageProps) {

  const getPageTitle = () => {
    switch (activePage) {
      case "polls":
        return "Polls"
      case "events":
        return "Events"
      default:
        return "Home"
    }
  }

  const renderPageContent = () => {
    switch (activePage) {
      case "polls":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Your Polls</h2>
              <Button className="bg-sage hover:bg-sage-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Poll
              </Button>
            </div>
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No polls created yet</p>
                <p className="text-sm text-gray-500 mt-1">Create your first poll to get started</p>
              </CardContent>
            </Card>
          </div>
        )
      case "events":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Your Events</h2>
              <Button className="bg-amber hover:bg-amber-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No events scheduled yet</p>
                <p className="text-sm text-gray-500 mt-1">Create your first event to get started</p>
              </CardContent>
            </Card>
          </div>
        )
              default:
          return (
            <>
              {/* Actions Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
                <Card className="w-full max-w-sm">
                  <CardContent className="p-6 text-center">
                    <Plus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-900">Create</p>
                  </CardContent>
                </Card>
              </div>

              {/* Navigation Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                  <Link href="/polls">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <BarChart3 className="w-6 h-6 text-sage-600" />
                            <span className="text-sm font-medium text-gray-900">Polls</span>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            0 live
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/events">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-amber-600" />
                            <span className="text-sm font-medium text-gray-900">Events</span>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            0 upcoming
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>

              {/* Account Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                  <Link href="/profile">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <User className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-900">Profile</span>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/preferences">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Settings className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-900">Preferences</span>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>
            </>
          )
    }
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
      </div>

      {renderPageContent()}
    </div>
  )
} 