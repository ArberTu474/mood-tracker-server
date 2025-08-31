import pool from '../config/db'
import { User } from 'types/user'

export async function checkIfUserExists(
  username: string
): Promise<{ exists: boolean } | null> {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE username = $1 LIMIT 1',
    [username]
  )

  return rows[0] || null
}

export async function createUser(username: string): Promise<User | null> {
  const { rows } = await pool.query(
    'INSERT INTO users(username) VALUES($1) RETURNING *;',
    [username]
  )

  return rows[0] || null
}
