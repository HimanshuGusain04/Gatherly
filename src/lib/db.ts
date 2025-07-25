import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Export the Prisma client directly for new operations
export const db = prisma

// Types
export interface Poll {
  id: string
  slug: string
  title: string
  description?: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
  options: PollOption[]
}

export interface PollOption {
  id: string
  text: string
  pollId: string
  votes: Vote[]
  createdAt: Date
  updatedAt: Date
}

export interface Vote {
  id: string
  userId: string
  optionId: string
  createdAt: Date
}

// Database operations
export const pollDb = {
  // Create a new poll with user information
  createPoll: async (title: string, description: string, options: string[], userId: string): Promise<Poll> => {
    const poll = await prisma.poll.create({
      data: {
        slug: nanoid(8), // 8 character slug
        title,
        description,
        createdBy: userId,
        options: {
          create: options.map(text => ({
            text,
          }))
        }
      },
      include: {
        options: {
          include: {
            votes: true
          }
        }
      }
    })
    
    return poll as Poll
  },

  // Get poll by slug
  getPollBySlug: async (slug: string): Promise<Poll | null> => {
    const poll = await prisma.poll.findUnique({
      where: { slug },
      include: {
        options: {
          include: {
            votes: true
          }
        }
      }
    })
    
    return poll as Poll | null
  },

  // Add vote to poll option (updated to use userId)
  addVote: async (pollSlug: string, optionId: string, userId: string): Promise<boolean> => {
    try {
      // First check if the poll and option exist
      const poll = await prisma.poll.findUnique({
        where: { slug: pollSlug },
        include: {
          options: {
            where: { id: optionId }
          }
        }
      })
      
      if (!poll || poll.options.length === 0) {
        return false
      }
      
      // Try to create the vote (will fail if duplicate due to unique constraint)
      await prisma.vote.create({
        data: {
          userId,
          optionId
        }
      })
      
      return true
    } catch (error) {
      // If it's a unique constraint violation, the user already voted
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
        return false
      }
      throw error
    }
  },
} 