"use client"

import { useState } from "react"
import { Calendar } from "@/components/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimeOption {
  id: string
  date: Date
  startTime: string
  endTime: string
}

export default function CalendarDemoPage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [timeOptions, setTimeOptions] = useState<TimeOption[]>([])

  const handleDateSelect = (dates: Date[]) => {
    setSelectedDates(dates)
  }

  const handleTimeOptionsChange = (options: TimeOption[]) => {
    setTimeOptions(options)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Calendar Demo</h1>
        <p className="text-muted-foreground">
          Interactive calendar component with month and week views for date/time selection
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Calendar
            selectedDates={selectedDates}
            onDateSelect={handleDateSelect}
            onTimeOptionsChange={handleTimeOptionsChange}
          />
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Selected Dates</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDates.length > 0 ? (
                <div className="space-y-2">
                  {selectedDates.map((date) => (
                    <div key={date.toDateString()} className="text-sm">
                      {date.toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No dates selected</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Time Options</CardTitle>
            </CardHeader>
            <CardContent>
              {timeOptions.length > 0 ? (
                <div className="space-y-2">
                  {timeOptions.map((option) => (
                    <div key={option.id} className="text-sm p-2 border rounded">
                      <div className="font-medium">
                        {option.date.toLocaleDateString('en-US', { 
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
                <strong>Month View:</strong>
                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                  <li>Click dates to select/deselect</li>
                  <li>Navigate months with arrows</li>
                  <li>Toggle Specify times mode</li>
                  <li>Today button for quick navigation</li>
                </ul>
              </div>
              
              <div className="text-sm">
                <strong>Week View:</strong>
                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                  <li>Time slot selection</li>
                  <li>Navigate weeks with arrows</li>
                  <li>Detailed time grid</li>
                  <li>Hover interactions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 