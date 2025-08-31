export const Mood = {
  Happy: 'Happy',
  Neutral: 'Normal',
  Angry: 'Angry',
  Excited: 'Excited',
  Sad: 'Sad',
  Tired: 'Tired',
} as const

export type Mood = (typeof Mood)[keyof typeof Mood]
