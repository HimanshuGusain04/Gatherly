import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const createPollSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  options: z.array(z.string().min(1, 'Option text is required')).min(2, 'At least 2 options are required')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createPollSchema.parse(body)
    
    const poll = await db.createPoll(
      validatedData.title,
      validatedData.description || '',
      validatedData.options
    )
    
    return NextResponse.json({ success: true, poll })
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

 