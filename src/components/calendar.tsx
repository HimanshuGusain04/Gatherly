"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TimeOptions } from "@/components/time-options"
import { cn } from "@/lib/utils"

interface TimeOption {
  id: string
  date: Date
  startTime: string
  endTime: string
}

interface CalendarProps {
  selectedDates?: Date[]
  onDateSelect?: (dates: Date[]) => void
  onTimeOptionsChange?: (options: TimeOption[]) => void
  className?: string
}

type ViewMode = 'month' | 'week'

export function Calendar({
  selectedDates = [],
  onDateSelect,
  onTimeOptionsChange,
  className
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [viewMode, setViewMode] = React.useState<ViewMode>('month')

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isDateSelected = (date: Date) => {
    return selectedDates.some(selectedDate => 
      selectedDate.toDateString() === date.toDateString()
    )
  }

  const toggleDateSelection = (date: Date) => {
    if (!onDateSelect) return
    
    const dateString = date.toDateString()
    const isSelected = selectedDates.some(d => d.toDateString() === dateString)
    
    if (isSelected) {
      onDateSelect(selectedDates.filter(d => d.toDateString() !== dateString))
    } else {
      onDateSelect([...selectedDates, date])
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() + 7)
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    
    // Start from Monday
    const dayOfWeek = (firstDay.getDay() + 6) % 7
    startDate.setDate(startDate.getDate() - dayOfWeek)
    
    const days = []
    const current = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Adjust for Monday start
    startOfWeek.setDate(diff)
    
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      days.push(date)
    }
    
    return days
  }

  const getWeekTimeSlots = () => {
    const slots = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        slots.push(timeString)
      }
    }
    return slots
  }

  const getWeekDateRange = () => {
    const weekDays = getWeekDays()
    const start = weekDays[0]
    const end = weekDays[6]
    
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
  }

  const monthDays = getMonthDays()
  const weekDays = getWeekDays()
  const timeSlots = getWeekTimeSlots()

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Calendar</h2>
            <p className="text-sm text-muted-foreground">
              Select potential dates or times for your event
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
              className={cn(
                "gap-2",
                viewMode === 'month' ? "bg-sage hover:bg-sage-600" : "border-sage text-sage hover:bg-sage-50"
              )}
            >
              <CalendarIcon className="h-4 w-4" />
              Month view
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
              className={cn(
                "gap-2",
                viewMode === 'week' ? "bg-sage hover:bg-sage-600" : "border-sage text-sage hover:bg-sage-50"
              )}
            >
              <Clock className="h-4 w-4" />
              Week view
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-6">
          {/* Calendar Section */}
          <div className="space-y-4">
            {viewMode === 'month' ? (
              <div className="space-y-4">
                {/* Month Navigation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                                      <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateMonth('prev')}
                    className="border-teal text-teal hover:bg-teal-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                    <h3 className="text-lg font-semibold min-w-[200px] text-center">
                      {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                                      <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateMonth('next')}
                    className="border-teal text-teal hover:bg-teal-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  </div>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-muted-foreground">
                  <div>Mo</div>
                  <div>Tu</div>
                  <div>We</div>
                  <div>Th</div>
                  <div>Fr</div>
                  <div>Sa</div>
                  <div>Su</div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {monthDays.map((day, index) => {
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth()
                    const isToday = day.toDateString() === today.toDateString()
                    const isSelected = isDateSelected(day)
                    
                    return (
                      <button
                        key={index}
                        onClick={() => toggleDateSelection(day)}
                        disabled={!isCurrentMonth}
                        className={cn(
                          "h-10 w-10 text-sm rounded-md transition-colors",
                          "hover:bg-sage-100 hover:text-sage-800",
                          "disabled:opacity-30 disabled:cursor-not-allowed",
                          isToday && "bg-amber-100 text-amber-800 font-semibold",
                          isSelected && "bg-sage text-white hover:bg-sage-600",
                          !isCurrentMonth && "text-muted-foreground"
                        )}
                      >
                        {day.getDate()}
                      </button>
                    )
                  })}
                </div>

                {/* Today Button */}
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    onClick={goToToday}
                    className="border-amber text-amber-700 hover:bg-amber-50"
                  >
                    Today
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Week Navigation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                                      <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateWeek('prev')}
                    className="border-teal text-teal hover:bg-teal-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                    <h3 className="text-lg font-semibold min-w-[300px] text-center">
                      {currentDate.getFullYear()} {getWeekDateRange()}
                    </h3>
                                      <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateWeek('next')}
                    className="border-teal text-teal hover:bg-teal-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  </div>
                  
                                  <Button 
                  variant="outline" 
                  onClick={goToToday}
                  className="border-amber text-amber-700 hover:bg-amber-50"
                >
                  Today
                </Button>
                </div>

                {/* Week View */}
                <div className="border rounded-lg overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-8 border-b bg-muted/50">
                    <div className="p-2"></div>
                    {weekDays.map((day) => (
                      <div key={day.toDateString()} className="p-2 text-center">
                        <div className="text-xs text-muted-foreground">
                          {day.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-sm font-medium">
                          {day.getDate()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Time Slots */}
                  <div className="max-h-96 overflow-y-auto">
                    {timeSlots.slice(0, 20).map((time) => (
                      <div key={time} className="grid grid-cols-8 border-b border-border/50 hover:bg-muted/30">
                        <div className="p-2 text-xs text-muted-foreground border-r">
                          {time}
                        </div>
                        {weekDays.map((day) => (
                          <div
                            key={`${day.toDateString()}-${time}`}
                            className="p-2 border-r border-border/50 cursor-pointer hover:bg-accent/50"
                            onClick={() => {
                              // Handle time slot selection
                              console.log('Selected:', day, time)
                            }}
                          >
                            <div className="h-4"></div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Time Options Section */}
          <div>
            <TimeOptions
              selectedDates={selectedDates}
              onTimeOptionsChange={onTimeOptionsChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 