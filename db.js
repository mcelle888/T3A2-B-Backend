import mongoose from 'mongoose'
import dotenv from 'dotenv'

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

const detailsSchema = new mongoose.Schema({
    name1: { type: String, required: true },
    name2: { type: String, required: true},
    date: {type: Date, required: true},
    venue: {type: String, required: true}
})

const DetailModel = mongoose.model('Detail', detailsSchema)

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

export { ReplyModel, DetailModel, closeConnection }