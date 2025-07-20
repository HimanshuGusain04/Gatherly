"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Share2, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Poll } from "@/lib/db"

export default function ResultsPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [poll, setPoll] = useState<Poll | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await fetch(`/api/polls/${params.slug}`)
        const result = await response.json()
        
        if (result.success) {
          setPoll(result.poll)
        } else {
          router.push("/")
        }
      } catch {
        router.push("/")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPoll()
  }, [params.slug, router])

  const sharePoll = () => {
    const url = `${window.location.origin}/poll/${params.slug}`
    navigator.clipboard.writeText(url)
    // You could add a toast notification here
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-sage-100 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  if (!poll) return null

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes.length, 0)
  const maxVotes = Math.max(...poll.options.map(option => option.votes.length))
  const winningOptions = poll.options.filter(option => option.votes.length === maxVotes && maxVotes > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-sage-100 py-12 px-4">
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
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Total votes: {totalVotes}
              </p>
              <Button variant="outline" size="sm" onClick={sharePoll}>
                <Share2 className="h-4 w-4 mr-2" />
                Share Poll
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {poll.options.map((option) => {
                const voteCount = option.votes.length
                const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0
                const isWinning = winningOptions.includes(option)

                return (
                  <div key={option.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{option.text}</span>
                        {isWinning && (
                          <Trophy className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{voteCount} vote{voteCount !== 1 ? 's' : ''}</div>
                        <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                    <Progress 
                      value={percentage} 
                      className={`h-3 ${isWinning ? 'bg-yellow-100' : ''}`}
                    />
                  </div>
                )
              })}
            </div>

            {winningOptions.length > 0 && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">
                    {winningOptions.length === 1 ? 'Winner' : 'Tied Winners'}:
                  </span>
                </div>
                <p className="mt-2 text-yellow-700">
                  {winningOptions.map(option => option.text).join(', ')}
                </p>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <Button
                onClick={() => router.push(`/poll/${params.slug}`)}
                className="w-full"
              >
                Vote Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 