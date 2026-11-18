import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load .env from the project root, no matter which folder the server is started from.
// (Needed because "npm run dev" in client/ starts the server from inside client/.)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '..', '.env'), quiet: true })

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    adminEmail: (process.env.ADMIN_EMAIL || '').toLowerCase(),
}

// Stop early with a clear message if a required setting is missing
if (!config.mongoUri || !config.jwtSecret) {
    console.error('Missing MONGODB_URI or JWT_SECRET. Create a .env file (see .env.example).')
    process.exit(1)
}

export default config
