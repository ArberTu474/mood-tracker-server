import app from './app'
import { ENV } from './config/env'

console.log(ENV.DATABASE_URL)

app.listen(ENV.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${ENV.PORT}`)
})
