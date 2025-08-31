import { type Request, type Response } from 'express'
import * as userService from '../services/user.service'

export async function checkUser(req: Request, res: Response) {
  const { username } = req.params

  try {
    const result = await userService.checkIfUserExists(username)

    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}

export async function createUser(req: Request, res: Response) {
  const { username } = req.params

  try {
    const user = await userService.createUser(username)

    if (!user) {
      return res.status(404).json({ message: 'User exists' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}
