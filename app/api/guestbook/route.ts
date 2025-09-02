import { NextRequest, NextResponse } from 'next/server'
import { getGuestbookEntries, createGuestbookEntry } from '@/lib/db'

export async function GET() {
  try {
    const entries = await getGuestbookEntries()
    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error fetching guestbook entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guestbook entries' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, message } = await request.json()
    
    console.log('Received data:', { name, message })
    
    if (!name || !message) {
      console.log('Validation failed: missing name or message')
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      )
    }

    console.log('Attempting to create guestbook entry...')
    const entry = await createGuestbookEntry(name, message)
    console.log('Successfully created entry:', entry)
    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error('Error creating guestbook entry:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      code: (error as any)?.code
    })
    return NextResponse.json(
      { error: 'Failed to create guestbook entry', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
