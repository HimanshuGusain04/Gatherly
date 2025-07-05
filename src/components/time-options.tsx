"use client"

import * as React from "react"
import { Plus, X, Clock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface TimeOption {
  id: string
  date: Date
  startTime: string
  endTime: string
}

interface TimeOptionsProps {
  selectedDates?: Date[]
  onTimeOptionsChange?: (options: TimeOption[]) => void
  className?: string
}

export function TimeOptions({
  selectedDates = [],
  onTimeOptionsChange,
  className
}: TimeOptionsProps) {
  const [specifyTimes, setSpecifyTimes] = React.useState(true)
  const [autoTimeZone, setAutoTimeZone] = React.useState(true)
  const [timeOptions, setTimeOptions] = React.useState<TimeOption[]>([])

  // Generate time options from selected dates
  React.useEffect(() => {
    if (selectedDates.length > 0 && timeOptions.length === 0) {
      const initialOptions = selectedDates.map(date => ({
        id: `${date.getTime()}-${Math.random()}`,
        date,
        startTime: "12:00",
        endTime: "13:00"
      }))
      setTimeOptions(initialOptions)
    }
  }, [selectedDates, timeOptions.length])

  const addTimeOption = (date: Date) => {
    const newOption: TimeOption = {
      id: `${date.getTime()}-${Math.random()}`,
      date,
      startTime: "12:00",
      endTime: "13:00"
    }
    const updatedOptions = [...timeOptions, newOption]
    setTimeOptions(updatedOptions)
    onTimeOptionsChange?.(updatedOptions)
  }

  const removeTimeOption = (id: string) => {
    const updatedOptions = timeOptions.filter(option => option.id !== id)
    setTimeOptions(updatedOptions)
    onTimeOptionsChange?.(updatedOptions)
  }

  const updateTimeOption = (id: string, field: 'startTime' | 'endTime', value: string) => {
    const updatedOptions = timeOptions.map(option => 
      option.id === id ? { ...option, [field]: value } : option
    )
    setTimeOptions(updatedOptions)
    onTimeOptionsChange?.(updatedOptions)
  }

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`1970-01-01T${startTime}:00`)
    const end = new Date(`1970-01-01T${endTime}:00`)
    const diffMs = end.getTime() - start.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    
    if (diffHours < 1) {
      const minutes = Math.round(diffHours * 60)
      return `${minutes}m`
    } else if (diffHours % 1 === 0) {
      return `${Math.round(diffHours)}h`
    } else {
      const hours = Math.floor(diffHours)
      const minutes = Math.round((diffHours - hours) * 60)
      return `${hours}h ${minutes}m`
    }
  }

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const timeSlots = React.useMemo(() => {
    const slots = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        slots.push(timeString)
      }
    }
    return slots
  }, [])

  // Group time options by date
  const groupedOptions = React.useMemo(() => {
    const grouped: { [key: string]: TimeOption[] } = {}
    timeOptions.forEach(option => {
      const dateKey = option.date.toDateString()
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(option)
    })
    return grouped
  }, [timeOptions])

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-4 border-b border-cream-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-teal-800">Time Options</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Specify Times Toggle */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="specify-times" className="text-base font-medium">
              Specify times
            </Label>
            <Switch
              id="specify-times"
              checked={specifyTimes}
              onCheckedChange={setSpecifyTimes}
              className="data-[state=checked]:bg-sage"
            />
          </div>
          {specifyTimes && (
            <p className="text-sm text-muted-foreground">
              Include start and end times for each option
            </p>
          )}
        </div>

        {/* Time Options List */}
        {specifyTimes && (
          <div className="space-y-4">
            {Object.entries(groupedOptions).map(([dateString, options]) => {
              const date = new Date(dateString)
              return (
                <div key={dateString} className="space-y-2">
                  {options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center gap-3 p-3 border border-cream-300 rounded-lg bg-cream-50"
                    >
                      {/* Date Display */}
                      <div className="flex flex-col items-center justify-center bg-teal-100 rounded-lg p-2 min-w-[60px]">
                        <span className="text-xs text-teal-600">
                          {formatDateDisplay(option.date).split(' ')[0]}
                        </span>
                        <span className="text-lg font-semibold text-teal-800">
                          {formatDateDisplay(option.date).split(' ')[1]}
                        </span>
                      </div>

                      {/* Time Selectors */}
                      <div className="flex items-center gap-2">
                        <Select
                          value={option.startTime}
                          onValueChange={(value: string) => updateTimeOption(option.id, 'startTime', value)}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <span className="text-muted-foreground">–</span>

                        <Select
                          value={option.endTime}
                          onValueChange={(value: string) => updateTimeOption(option.id, 'endTime', value)}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <span className="text-sm text-muted-foreground min-w-[40px]">
                          {calculateDuration(option.startTime, option.endTime)}
                        </span>
                      </div>

                      {/* Delete Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTimeOption(option.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {/* Add Time Option Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addTimeOption(date)}
                    className="w-full gap-2 border-sage text-sage hover:bg-sage-50"
                  >
                    <Plus className="h-4 w-4" />
                    Add time option
                  </Button>
                </div>
              )
            })}
          </div>
        )}

        {/* Automatic Time Zone Conversion Toggle */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="auto-timezone" className="text-sm font-medium">
              Automatic Time Zone Conversion
            </Label>
          </div>
          <Switch
            id="auto-timezone"
            checked={autoTimeZone}
            onCheckedChange={setAutoTimeZone}
            className="data-[state=checked]:bg-sage"
          />
        </div>

        {/* Time Zone Display */}
        {autoTimeZone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Asia/Calcutta</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 