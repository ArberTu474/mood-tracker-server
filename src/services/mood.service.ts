import { DailyMood } from 'types/daily-mood'
import pool from '../config/db'
import { type Mood } from '../types/mood'

export async function getMoodByDate(
  date: string,
  id: string
): Promise<Mood | null> {
  const { rows } = await pool.query(
    'SELECT * FROM moods WHERE date = $1 AND id = $2',
    [date, id]
  )
  return rows[0] || null
}

export async function getAllMoods(): Promise<Mood[] | null> {
  const { rows } = await pool.query('SELECT * FROM moods;')
  console.log(rows)
  return rows || null
}

export async function createMood(reqData: DailyMood): Promise<Mood[] | null> {
  const { rows } = await pool.query(
    'INSERT INTO moods(user_id, mood, reflection) VALUES($1, $2, $3);',
    [reqData.userId, reqData.mood, reqData.reflection]
  )
  console.log(rows)
  return rows || null
}

export async function updateMood(
  date: string,
  id: string,
  newData: Partial<DailyMood>
): Promise<Mood[] | null> {
  const { mood, reflection } = newData

  let query = 'UPDATE moods SET mood = $1'
  const params: any[] = [mood]

  if (reflection) {
    query += ', reflection = $2'
    params.push(reflection)
  }

  query +=
    ' WHERE date = $' +
    (params.length + 1) +
    ' AND user_id = $' +
    (params.length + 2)
  params.push(date)
  params.push(id)

  query += ' RETURNING *' // return the updated row/s

  console.log(query)
  const { rows } = await pool.query(query, params)
  return rows || null
}
