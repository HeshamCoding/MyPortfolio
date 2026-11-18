import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'

import contactRoutes from './routes/contact.routes.js'
import projectRoutes from './routes/project.routes.js'
import qualificationRoutes from './routes/qualification.routes.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

// Middleware: read JSON bodies, form bodies and cookies; add security headers; allow the React app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// Welcome message at http://localhost:3000/
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to My Portfolio application.' })
})

// API routes
app.use('/', contactRoutes)
app.use('/', projectRoutes)
app.use('/', qualificationRoutes)
app.use('/', userRoutes)
app.use('/', authRoutes)

// Unknown URL -> 404
app.use((req, res) => {
    res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` })
})

// Error handler (runs when something above throws or calls next(err))
app.use((err, req, res, next) => {
    // Missing, invalid or expired JWT (thrown by express-jwt)
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Unauthorized: please sign in.' })
    }
    // Request body is not valid JSON
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Request body must be valid JSON.' })
    }
    console.error(err)
    res.status(500).json({ error: 'Something went wrong on the server.' })
})

export default app
