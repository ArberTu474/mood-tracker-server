import express from 'express'
import moodRoutes from './routes/mood.routes'
import userRoutes from './routes/user.routes'
import { getAllMoods } from './controllers/mood.controller'
// import { ENV } from 'config/env'
import cors from 'cors'
import { ENV } from './config/env'

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: ENV.CORS_ORIGIN,
    credentials: true,
  })
)

app.get('/', getAllMoods)

app.use('/mood', moodRoutes)
app.use('/user', userRoutes)

// Only for render hosting
app.get('/wakeup', (req, res) => {
  res.status(200).send('Wake up!')
})

export default app
