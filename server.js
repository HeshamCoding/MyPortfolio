import mongoose from 'mongoose'
import config from './server/config/config.js'
import app from './server/express.js'

// Connect to MongoDB. dbName makes sure the database is called "Portfolio".
mongoose
    .connect(config.mongoUri, { dbName: 'Portfolio' })
    .then(() => {
        console.log('Connected to the database!')
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err.message)
        process.exit(1)
    })

app.listen(config.port, () => {
    console.info(`Server started on port ${config.port}.`)
})
