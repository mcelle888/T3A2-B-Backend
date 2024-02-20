import { ReplyModel } from '../db.js'
import { Router } from "express"

const router = Router()

router.get('/rsvp', async (req, res) => res.status(200).send(await ReplyModel.find()))

router.get('/rsvp/:id', async (req, res) => {
    const response = await ReplyModel.findById(req.params.id)
    if (response) {
        res.send(response)
    } else {
        res.status(404).send({error: 'Response not found'})
    }
})

// Post request

router.post('/rsvp', async (req, res) => {
    try {

    const insertedReply = await ReplyModel.create(req.body)
    res.status(201).send(insertedReply)
    } 
    catch (err) {
        res.status(400).send( {error: err.message} )
    }

})

// Put request

router.put('/rsvp/:id', async (req, res) => {
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


router.delete('/rsvp/:id', async (req, res) => {
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

export default router