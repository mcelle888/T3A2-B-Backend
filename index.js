import express from 'express'
import { DetailModel } from './db.js'
import rsvpRoutes from './routes/rsvp_routes.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send({info: "We're Getting Married!"}))

app.get('/details', async (req, res) => res.status(200).send(await DetailModel.find()))

app.use(rsvpRoutes)

app.listen(8001)