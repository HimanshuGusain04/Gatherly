"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, BarChart3, ArrowLeft } from "lucide-react"
import { nanoid } from "nanoid"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import type { Poll } from "@/lib/db"

export default function PollPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [poll, setPoll] = useState<Poll | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [voterId] = useState(() => nanoid())

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await fetch(`/api/polls/${params.slug}`)
        const result = await response.json()
        
        if (result.success) {
          setPoll(result.poll)
        } else {
          toast({
            title: "Error",
            description: "Poll not found",
            variant: "destructive",
          })
          router.push("/")
        }
      } catch {
        toast({
          title: "Error",
          description: "Failed to load poll",
          variant: "destructive",
        })
        router.push("/")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPoll()
  }, [params.slug, router, toast])

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  const handleSubmitVotes = async () => {
    if (selectedOptions.length === 0) {
      toast({
        title: "No options selected",
        description: "Please select at least one option to vote",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const votePromises = selectedOptions.map(optionId =>
        fetch(`/api/polls/${params.slug}/vote`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ optionId, voterId }),
        })
      )

      const results = await Promise.all(votePromises)
      const allSuccessful = results.every(result => result.ok)

      if (allSuccessful) {
        toast({
          title: "Vote submitted successfully!",
          description: "Your votes have been recorded.",
        })
        router.push(`/poll/${params.slug}/results`)
      } else {
        toast({
          title: "Error",
          description: "Some votes failed to submit",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit votes",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading poll...</p>
        </div>
      </div>
    )
  }

  if (!poll) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{poll.title}</CardTitle>
            {poll.description && (
              <CardDescription className="text-base">{poll.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Select the time options that work for you:</p>
              
              {poll.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={option.id}
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => handleOptionToggle(option.id)}
                  />
                  <label htmlFor={option.id} className="flex-1 text-sm font-medium cursor-pointer">
                    {option.text}
                  </label>
                  <span className="text-sm text-gray-500">
                    {option.votes.length} vote{option.votes.length !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <Button
                onClick={handleSubmitVotes}
                disabled={isSubmitting || selectedOptions.length === 0}
                className="w-full"
              >
                {isSubmitting ? "Submitting..." : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Submit Votes
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push(`/poll/${params.slug}/results`)}
                className="w-full"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 