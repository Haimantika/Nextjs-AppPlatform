import { Pool } from 'pg'

// Set Node.js to ignore SSL certificate issues
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    checkServerIdentity: () => undefined,
    secureProtocol: 'TLSv1_2_method'
  }
})

export default pool

export interface GuestbookEntry {
  id: number
  name: string
  message: string
  created_at: Date
}

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  const client = await pool.connect()
  try {
    console.log('Executing query to fetch guestbook entries...')
    const result = await client.query(
      'SELECT id, name, message, created_at FROM guestbook_entries ORDER BY created_at DESC'
    )
    console.log('Query successful, found', result.rows.length, 'entries')
    return result.rows
  } catch (error) {
    console.error('Database error in getGuestbookEntries:', error)
    throw error
  } finally {
    client.release()
  }
}

export async function createGuestbookEntry(name: string, message: string): Promise<GuestbookEntry> {
  const client = await pool.connect()
  try {
    console.log('Executing query to create guestbook entry...', { name, message })
    const result = await client.query(
      'INSERT INTO guestbook_entries (name, message) VALUES ($1, $2) RETURNING id, name, message, created_at',
      [name, message]
    )
    console.log('Insert successful, created entry:', result.rows[0])
    return result.rows[0]
  } catch (error) {
    console.error('Database error in createGuestbookEntry:', error)
    throw error
  } finally {
    client.release()
  }
}
