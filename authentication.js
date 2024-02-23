import jwt from 'jsonwebtoken'
import express from 'express'
import { UserModel } from './db.js'

const router = express.Router()

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    // Check if authorisation header is present
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is missing' })
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'Token is missing' })
    }

    // Verifies token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.decodedToken = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

// Middleware to authenticate admin
const authenticateAdmin = async (req, res, next) => {
    try {
      if (!req.decodedToken) {
        return res.status(401).json({ error: 'Token is missing' });
      }
      
      // Check if user exists and isAdmin is true
      const user = await UserModel.findById(req.decodedToken.userID);
      if (!user || !user.isAdmin) {
        return res.status(403).json({ error: 'Unauthorized: Only admins can access this endpoint' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  


export {authenticateAdmin, authenticateUser}
