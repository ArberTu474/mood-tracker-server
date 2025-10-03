import { type Request, type Response } from 'express'
import * as moodService from '../services/mood.service'
import { DailyMood } from 'types/daily-mood'

export async function getMood(req: Request, res: Response) {
  const { date, id } = req.params

  try {
    const mood = await moodService.getMoodByDate(date, id)

    if (!mood) {
      return res.status(404).json({ message: 'Mood not found' })
    }
    res.json(mood)
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}

export async function getReflection(req: Request, res: Response) {
  const { date, id } = req.params

  try {
    const reflection = await moodService.getReflection(date, id)

    if (!reflection) {
      return res.status(404).json({ message: 'Reflection not found' })
    }
    res.json(reflection)
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}

export async function updateReflection(req: Request, res: Response) {
  const newReflection: { reflection: string } = req.body
  const { date, id } = req.params

  try {
    const reflection = await moodService.updateReflection(newReflection, date, id)

    if (!reflection) {
      return res.status(404).json({ message: 'Reflection not found' })
    }
    res.json(reflection)
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}

export async function getMonthsMoods(req: Request, res: Response) {
  const { month, year, id } = req.params

  try {
    const moods = await moodService.getMoodsOfTheMonth(month, year, id)

    if (!moods) {
      return res.status(404).json({ message: 'Mood not found' })
    }

    res.json(moods)
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}

export async function createMood(req: Request, res: Response) {
  const { userId } = req.params

  try {
    const mood = await moodService.createMood(req.body as DailyMood)

    if (!mood) {
      return res.status(404).json({ message: 'Mood was not created' })
    }

    res.json({ message: 'Mood created' })
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}

// Get all moods
export async function getAllMoods(req: Request, res: Response) {
  try {
    const moods = await moodService.getAllMoods()

    if (!moods) {
      return res.status(404).json({ message: 'Mood not found' })
    }

    res.json(moods)
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}

export async function updateMood(req: Request, res: Response) {
  const newData = req.body as DailyMood
  const { date, id } = req.params

  try {
    const moodUpdate = await moodService.updateMood(date, id, newData)

    if (!moodUpdate) {
      return res.status(404).json({ message: 'Mood was not updated' })
    }

    res.json(moodUpdate)
  } catch (error) {
    res.status(500).json({ message: error.message || 'Can not update mood' })
  }
}
