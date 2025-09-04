import { DailyMood } from 'types/daily-mood'
import pool from '../config/db'
import { type Mood } from '../types/mood'
import { formatDateYYYYMMDD } from '../lib/utils'

export async function getMoodByDate(
  date: string,
  id: string
): Promise<Mood | null> {
  const { rows } = await pool.query(
    'SELECT * FROM moods WHERE date = $1 AND user_id = $2',
    [date, id]
  )
  return rows[0] || null
}

export async function getMoodsOfTheMonth(
  month: string,
  year: string,
  id: string
): Promise<(Mood | null)[] | null> {
  const currentMonth = Number(month) - 1
  const currentYear = Number(year)

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDay = formatDateYYYYMMDD(new Date(currentYear, currentMonth, 1))
  const lastDay = formatDateYYYYMMDD(new Date(currentYear, currentMonth + 1, 0))

  const { rows } = await pool.query(
    'SELECT mood, date FROM moods WHERE user_id = $1 AND date >= $2 AND date <= $3 ORDER BY date;',
    [id, firstDay, lastDay]
  )

  const moods: (Mood | null)[] = new Array(daysInMonth).fill(null)

  rows.forEach((row) => {
    const date = new Date(row.date)
    const dayOfMonth = date.getDate()

    moods[dayOfMonth - 1] = row
  })

  return moods || null
}

export async function getAllMoods(): Promise<Mood[] | null> {
  const { rows } = await pool.query('SELECT * FROM moods;')

  return rows || null
}

export async function createMood(reqData: DailyMood): Promise<Mood[] | null> {
  const { rows } = await pool.query(
    'INSERT INTO moods(user_id, mood, reflection) VALUES($1, $2, $3);',
    [reqData.userId, reqData.mood, reqData.reflection]
  )

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

  const { rows } = await pool.query(query, params)
  return rows || null
}
