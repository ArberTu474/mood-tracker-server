import app from './app'
import { ENV } from './config/env'

app.listen(ENV.PORT || 3000, () => {
  console.log(`🚀 Server running on http://localhost:${ENV.PORT}`)
})
