import { Router } from 'express'
import * as moodController from '../controllers/mood.controller'

const router = Router()

router.get('/:id/:date', moodController.getMood)
router.post('/', moodController.createMood)
router.patch('/:id/:date', moodController.updateMood)

export default router
