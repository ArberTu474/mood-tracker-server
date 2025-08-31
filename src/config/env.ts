import dotenv from 'dotenv'

dotenv.config()

function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing env variable: ${key}`)
  return value
}

export const ENV = {
  PORT: requireEnv('PORT') || 3000,
  DATABASE_URL: requireEnv('DATABASE_URL'),
  CORS_ORIGIN: requireEnv('CORS_ORIGIN'),
}
