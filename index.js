import express from 'express'
import mongoose from 'mongoose'

const rsvp = ["name", "number", "email"]

const reply = [
    {name: 'Michelle', number: '0400000230', email: 'michelle@gmail.com'},
    {name: 'Tim', number: '0434000200', email: 'tim@gmail.com'}
]

mongoose.connect("")
    .then(m => console.log(m.connection.readyState === 1 ? 'MongoDB connected!' : 'MongoDB failed  to connect'))
    .catch(err => console.log(err))

const repliesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true },
    ceremony: { type: String, required: true },
    reception: { type: String, required: true },
    guests: String,
    dietry: String,
    message: String,

})

const ReplyModel = mongoose.model('Reply', repliesSchema)

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send({info: "We're Getting Married!"}))

app.get('/rsvp', (req, res) => res.status(200).send(rsvp))

app.get('/responses', (req, res) => res.status(200).send(reply))

app.get('/responses/:id', (req, res) => {
    const response = reply[req.params.id -1]
    if (response) {
        res.send(response)
    } else {
        res.status(404).send({error: 'Entry not found'})
    }
})

// Post request

app.post('/rsvp', async (req, res) => {
    try {

    const insertedReply = await ReplyModel.create(req.body)
    res.status(201).send(insertedReply)
    } 
    catch (err) {
        res.status(400).send( {error: err.message} )
    }

})

app.listen(8001)