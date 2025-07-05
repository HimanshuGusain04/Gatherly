"use client"

import { useState } from "react"
import { TimeOptions } from "@/components/time-options"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimeOption {
  id: string
  date: Date
  startTime: string
  endTime: string
}

export default function TimeOptionsDemoPage() {
  // Sample dates matching the screenshot
  const [selectedDates] = useState<Date[]>([
    new Date(2024, 6, 5),  // July 5, 2024
    new Date(2024, 6, 6),  // July 6, 2024
    new Date(2024, 6, 20), // July 20, 2024
    new Date(2024, 7, 1),  // August 1, 2024
  ])

  const [timeOptions, setTimeOptions] = useState<TimeOption[]>([])

  const handleTimeOptionsChange = (options: TimeOption[]) => {
    setTimeOptions(options)
    console.log('Time options changed:', options)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Time Options Demo</h1>
        <p className="text-muted-foreground">
          Interactive time selection component for scheduling events
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TimeOptions
            selectedDates={selectedDates}
            onTimeOptionsChange={handleTimeOptionsChange}
          />
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Selected Time Options</CardTitle>
            </CardHeader>
            <CardContent>
              {timeOptions.length > 0 ? (
                <div className="space-y-3">
                  {timeOptions.map((option) => (
                    <div key={option.id} className="text-sm p-3 border rounded-lg">
                      <div className="font-medium">
                        {option.date.toLocaleDateString('en-US', { 
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-muted-foreground">
                        {option.startTime} - {option.endTime}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No time options configured</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <strong>Time Selection:</strong>
                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                  <li>15-minute interval time slots</li>
                  <li>Automatic duration calculation</li>
                  <li>Multiple time slots per date</li>
                  <li>Easy add/remove functionality</li>
                </ul>
              </div>
              
              <div className="text-sm">
                <strong>Time Zone Support:</strong>
                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                  <li>Automatic time zone conversion</li>
                  <li>Display current time zone</li>
                  <li>Toggle on/off conversion</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 