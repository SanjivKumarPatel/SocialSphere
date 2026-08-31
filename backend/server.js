import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import connectDB from './config/db.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('🚀 SocialSphere API is running')
})

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

startServer()