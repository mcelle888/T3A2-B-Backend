import express from 'express'
import { ReplyModel, DetailModel } from './db.js'


const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send({info: "We're Getting Married!"}))

app.get('/details', async (req, res) => res.status(200).send(await DetailModel.find()))

app.get('/responses', async (req, res) => res.status(200).send(await ReplyModel.find()))

app.get('/responses/:id', async (req, res) => {
    const response = await ReplyModel.findById(req.params.id)
    if (response) {
        res.send(response)
    } else {
        res.status(404).send({error: 'Response not found'})
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

// Put request

app.put('/rsvp/:id', async (req, res) => {
    try {
    const updatedReply = await ReplyModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (updatedReply) {
        res.send(updatedReply)
    } else {
        res.status(404).send({ error: 'Reply not found'})
    }
    
    } 
    catch (err) {
        res.status(500).send( {error: err.message} )
    }

})

// Delete reply


app.delete('/rsvp/:id', async (req, res) => {
    try {
    const deletedReply = await ReplyModel.findByIdAndDelete(req.params.id)

    if (deletedReply) {
        res.sendStatus(204)
    } else {
        res.status(404).send({ error: 'Reply not found'})
    }
    
    } 
    catch (err) {
        res.status(500).send( {error: err.message} )
    }

})

app.listen(8001)