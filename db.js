import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Database connection
dotenv.config()

try {
    const m = await mongoose.connect(process.env.DB_URI)
    console.log(m.connection.readyState === 1 ? 'MongoDB connected!' : 'MongoDB failed  to connect')
}

    catch (err) {
        console.log(err)
    }

const closeConnection = () => {
    console.log('Mongoose Disconnecting...')
    mongoose.disconnect()
}

// User Schema
const userSchema = new mongoose.Schema({
    user: {type: String, required: true},
    pincode: {type: String, required: true},
    isAdmin: {type: Boolean, required: true}
})

const UserModel = mongoose.model('User', userSchema)

// Rsvp Replies Schema
const repliesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true },
    ceremony: { type: String, required: true },
    reception: { type: String, required: true },
    guests: String,
    dietry: String,
    message: String,
    response_id: {type: Number, unique: true,}

})

// Function to add a response_id to new entries through a pre-save hook meaning it runs before documents are saved into the database
repliesSchema.pre('save', function(next) {
    if (!this.response_id) {
      // Generates a random 4-digit number 
      this.response_id = Math.floor(1000 + Math.random() * 9000)
    }
    next()
  })


const ReplyModel = mongoose.model('Reply', repliesSchema)

export { ReplyModel, UserModel, closeConnection }

