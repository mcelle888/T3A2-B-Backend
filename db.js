import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

try {
    const m = await mongoose.connect(process.env.DB_URI)
    console.log(m.connection.readyState === 1 ? 'MongoDB connected!' : 'MongoDB failed to connect')
} catch (err) {
    console.log(err)
}

const closeConnection = () => {
    console.log('Mongoose Disconnecting...')
    mongoose.disconnect()
}

const userSchema = new mongoose.Schema({
    user: { type: String, required: true },
    pincode: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
})

const UserModel = mongoose.model('User', userSchema)

const repliesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true },
    ceremony: { type: String, required: true },
    reception: { type: String, required: true },
    guests: String,
    dietry: String,
    message: String,
    response_id: { type: Number }
})

repliesSchema.pre('save', async function (next) {
    try {
        if (!this.response_id) {
            const count = await this.constructor.countDocuments()
            this.response_id = count + 1
        }
        next()
    } catch (error) {
        next(error)
    }
})

const ReplyModel = mongoose.model('Reply', repliesSchema)

export { ReplyModel, UserModel, closeConnection }
