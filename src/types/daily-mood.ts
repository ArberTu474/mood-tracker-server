import type { Mood } from './mood'

type DailyMood = {
  userId: string
  mood: Mood
  reflection: string | null
}

export type { DailyMood }
