import jwt from 'jsonwebtoken'

import { UserModel } from '../db.js'

import { Router } from "express"


const router = Router()

const jwtkey = process.env.JWT_SECRET_KEY


// POST request for user login
router.post('/', async (req, res) => {
  const { pincode } = req.body
  

  try {
    const foundUser = await UserModel.findOne({ pincode })
    

    if (foundUser) {
      const tokenPayload = {
        userID: foundUser._id,
        isAdmin: foundUser.isAdmin
      };
      const token = jwt.sign(tokenPayload, jwtkey, { expiresIn: '2h' });
      
      res.status(200).json({ token })
      
    } else {
      res.status(401).json({ error: 'Invalid pincode' })
      
    }
  } catch (error) {
    console.error('Error logging in:', error)
    
    res.status(500).json({ error: 'An error occurred while logging in' })
    
  }
})


export default router

