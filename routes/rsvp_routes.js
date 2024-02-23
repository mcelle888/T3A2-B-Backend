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
        const insertedReply = await ReplyModel.create(req.body)
        return res.status(201).json(insertedReply)
      } else {
        return res.status(403).json({ error: 'Forbidden. Only admin users are allowed.' })
      }
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  })

  // Get a specific entry

  router.get('/rsvp/:response_id', async (req, res) => {
    try {
      const { response_id } = req.params
      const reply = await ReplyModel.findOne({ response_id })
      if (reply) {
        res.status(200).json(reply)
      } else {
        res.status(404).json({ error: 'Response not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  
// update an entry
  router.put('/rsvp/:response_id',  async (req, res) => {
    const { response_id } = req.params
    const { name, number, email, ceremony, reception, guests, dietry, message } = req.body
    
    try {
      const foundResponse = await ReplyModel.findOne({ response_id })
      if (!foundResponse) {
        return res.status(404).json({ error: 'Response not found' })
      }
  
      // Update response fields if they exist in the request body
      if (name !== undefined) foundResponse.name = name
      if (number !== undefined) foundResponse.number = number
      if (email !== undefined) foundResponse.email = email
      if (ceremony !== undefined) foundResponse.ceremony = ceremony
      if (reception !== undefined) foundResponse.reception = reception
      if (guests !== undefined) foundResponse.guests = guests
      if (dietry !== undefined) foundResponse.dietry = dietry
      if (message !== undefined) foundResponse.message = message
  
      await foundResponse.save()
  
      res.status(200).json(foundResponse)
    } catch (error) {
      console.error('Error updating response:', error)
      res.status(500).json({ error: 'An error occurred while updating response' })
    }
  })
  

// // Delete a reply (accessible to admin only)
// router.delete('/rsvp/:id', authenticateUser, authenticateAdmin, async (req, res) => {
//   try {
//     const deletedReply = await ReplyModel.findByIdAndDelete(req.params.id)
//     if (deletedReply) {
//       res.sendStatus(204)
//     } else {
//       res.status(404).json({ error: 'Reply not found' })
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })

export default router
