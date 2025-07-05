import { PrismaClient } from '@prisma/client'

async function testConnection() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔌 Testing database connection...')
    
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Test if tables exist
    const pollCount = await prisma.poll.count()
    console.log(`📊 Found ${pollCount} polls in database`)
    
    // Test creating a sample poll
    console.log('🧪 Creating test poll...')
    const testPoll = await prisma.poll.create({
      data: {
        slug: 'test-poll-' + Date.now(),
        title: 'Test Poll',
        description: 'This is a test poll to verify database functionality',
        options: {
          create: [
            { text: 'Option 1' },
            { text: 'Option 2' },
            { text: 'Option 3' }
          ]
        }
      },
      include: {
        options: true
      }
    })
    
    console.log('✅ Test poll created successfully!')
    console.log(`   Poll ID: ${testPoll.id}`)
    console.log(`   Poll Slug: ${testPoll.slug}`)
    console.log(`   Options: ${testPoll.options.length}`)
    
    // Clean up test data
    await prisma.poll.delete({
      where: { id: testPoll.id }
    })
    console.log('🧹 Test poll cleaned up')
    
  } catch (error) {
    console.error('❌ Database connection failed:')
    console.error(error.message)
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Troubleshooting tips:')
      console.log('1. Make sure PostgreSQL is running')
      console.log('2. Check your DATABASE_URL in .env file')
      console.log('3. Verify database credentials')
      console.log('4. Ensure database exists')
    }
    
    if (error.message.includes('does not exist')) {
      console.log('\n💡 Database setup tips:')
      console.log('1. Run: npx prisma db push')
      console.log('2. Or run: npx prisma migrate dev --name init')
    }
    
  } finally {
    await prisma.$disconnect()
  }
}

testConnection() 