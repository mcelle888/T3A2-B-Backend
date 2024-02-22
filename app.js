import express from 'express'
import rsvpRoutes from './routes/rsvp_routes.js'
import userRoutes from './routes/user_routes.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const app = express()

app.use(cors())

app.use(express.json())

app.use(rsvpRoutes, userRoutes)

export default app