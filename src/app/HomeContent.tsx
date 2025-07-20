import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, BarChart3, User, Settings } from "lucide-react"

const HomeContent = () => (
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

export default HomeContent; 