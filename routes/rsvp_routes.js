import { Router } from 'express'
import { ReplyModel } from '../db.js'
import { authenticateUser, authenticateAdmin } from '../authentication.js'



const router = Router()

// Get all replies (admin only)
router.get('/responses', authenticateUser, authenticateAdmin, async (req, res) => {
  try {
    const replies = await ReplyModel.find()
    res.status(200).json(replies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create a new reply (token holders only)
router.post('/rsvp', authenticateUser, async (req, res) => {
    try {
      if (req.decodedToken && req.decodedToken.isAdmin) {
        const insertedReply = await ReplyModel.create(req.body);
        return res.status(201).json(insertedReply);
      } else {
        return res.status(403).json({ error: 'Forbidden. Only admin users are allowed.' });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });
  

// Update a reply (token holders only)
router.put('/rsvp/:id', authenticateUser, async (req, res) => {
  try {
    const updatedReply = await ReplyModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (updatedReply) {
      res.status(200).json(updatedReply)
    } else {
      res.status(404).json({ error: 'Reply not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete a reply (accessible to admin only)
router.delete('/rsvp/:id', authenticateUser, authenticateAdmin, async (req, res) => {
  try {
    const deletedReply = await ReplyModel.findByIdAndDelete(req.params.id)
    if (deletedReply) {
      res.sendStatus(204)
    } else {
      res.status(404).json({ error: 'Reply not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
