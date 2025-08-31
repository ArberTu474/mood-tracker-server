import { Router } from 'express'
import * as userController from '../controllers/user.controller'

const router = Router()

router.get('/:username/exists', userController.checkUser)
router.post('/:username/create', userController.createUser)

export default router
