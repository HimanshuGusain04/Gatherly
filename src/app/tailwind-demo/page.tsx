"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function TailwindDemo() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Multiple Tailwind Classes Demo</h1>
      
      {/* Example 1: Basic Class Override */}
      <Card>
        <CardHeader>
          <CardTitle>1. Basic Class Override</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Default button:</p>
            <Button>Default Button</Button>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Override with multiple classes:</p>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg shadow-lg">
              Custom Purple Button
            </Button>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Conflicting classes (twMerge resolves them):</p>
            <Button className="bg-red-500 bg-green-500 hover:bg-blue-600">
              Last Color Wins (Green → Blue on hover)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Example 2: Conditional Classes */}
      <Card>
        <CardHeader>
          <CardTitle>2. Conditional Classes with cn()</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Click to toggle state (conditional classes):
            </p>
            <Button
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "transition-all duration-300",
                isActive 
                  ? "bg-green-500 hover:bg-green-600 text-white scale-105" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700 scale-100",
                "shadow-md hover:shadow-lg"
              )}
            >
              {isActive ? "Active State" : "Inactive State"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Example 3: Complex Conditional Logic */}
      <Card>
        <CardHeader>
          <CardTitle>3. Complex Conditional Logic</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Type something..."
            className={cn(
              // Base classes
              "border-2 transition-all duration-200",
              // Conditional classes
              isActive && "border-blue-500 bg-blue-50",
              !isActive && "border-gray-300",
              // Always applied classes
              "focus:ring-2 focus:ring-blue-200"
            )}
          />
        </CardContent>
      </Card>

      {/* Example 4: Utility Function Pattern */}
      <Card>
        <CardHeader>
          <CardTitle>4. Reusable Utility Pattern</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className={getButtonVariant("primary")}>
              Primary
            </Button>
            <Button className={getButtonVariant("secondary")}>
              Secondary
            </Button>
            <Button className={getButtonVariant("danger")}>
              Danger
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Example 5: Override Component Defaults */}
      <Card>
        <CardHeader>
          <CardTitle>5. Override Component Defaults</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Completely override default button styles:
            </p>
            <Button className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Gradient Button
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Example 6: Responsive Classes */}
      <Card>
        <CardHeader>
          <CardTitle>6. Responsive Multiple Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full sm:w-auto md:w-64 lg:w-96 bg-blue-500 hover:bg-blue-600 sm:bg-green-500 sm:hover:bg-green-600 md:bg-purple-500 md:hover:bg-purple-600 lg:bg-orange-500 lg:hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors">
            Responsive Colors (resize window)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Utility function for reusable button variants
function getButtonVariant(variant: "primary" | "secondary" | "danger") {
  return cn(
    // Base classes for all variants
    "font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg",
    // Variant-specific classes
    {
      "bg-blue-500 hover:bg-blue-600 text-white": variant === "primary",
      "bg-gray-200 hover:bg-gray-300 text-gray-800": variant === "secondary", 
      "bg-red-500 hover:bg-red-600 text-white": variant === "danger",
    }
  )
} 