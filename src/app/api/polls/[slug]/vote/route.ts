import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const voteSchema = z.object({
  pollSlug: z.string(),
  optionId: z.string(),
  voterId: z.string()
})

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    const validatedData = voteSchema.parse({
      ...body,
      pollSlug: params.slug
    })
    
    const success = await db.addVote(
      validatedData.pollSlug,
      validatedData.optionId,
      validatedData.voterId
    )
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to add vote' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 