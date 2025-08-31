// test-connection.ts
import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config() // load .env

console.log('DATABASE_URL:', process.env.DATABASE_URL)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // make sure this is set
  // ssl is optional here because your URL already has sslmode=require
})

async function testConnection() {
  try {
    const res = await pool.query('SELECT * FROM moods')
    console.log('Connected! Current time:', res.rows)
  } catch (err) {
    console.error('Connection failed:', err)
  } finally {
    await pool.end() // close the pool
  }
}

testConnection()
