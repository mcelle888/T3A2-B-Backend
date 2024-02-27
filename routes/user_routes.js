import jwt from 'jsonwebtoken'

import { UserModel } from '../db.js'

import { Router } from "express"


const router = Router()

const jwtkey = process.env.JWT_SECRET_KEY


// POST request handler for user login
router.post('/', async (req, res) => {
  const { pincode } = req.body;  

  try {
    // Finding a user with the provided pincode
    const foundUser = await UserModel.findOne({ pincode });

    if (foundUser) {
      // Generating JWT token  
      const tokenPayload = {
        userID: foundUser._id,
        isAdmin: foundUser.isAdmin
      };
      // Signing the token with JWT secret key and setting expiration time to 2 hours
      const token = jwt.sign(tokenPayload, jwtkey, { expiresIn: '2h' });
      
      // Sending token in the response if user is found
      res.status(200).json({ token });
    } else {
      // Responding with error if user is not found
      res.status(401).json({ error: 'Invalid pincode' });
    }
  } catch (error) {
    // Handling errors that occur during login process
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

export default router;  

