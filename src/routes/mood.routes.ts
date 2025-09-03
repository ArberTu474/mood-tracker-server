import { Router } from 'express'
import * as moodController from '../controllers/mood.controller'

const router = Router()

router.get('/:id/:date', moodController.getMood)
router.get('/:id/:month/:year/month', moodController.getMonthsMoods)
router.post('/', moodController.createMood)
router.patch('/:id/:date', moodController.updateMood)

export default router
