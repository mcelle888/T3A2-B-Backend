
import { ReplyModel, UserModel, closeConnection } from "./db.js"

// Initial seeding data for some rsvps to test
const replies = [
    { name: 'Michelle', number: '0420222000', email: 'michelle@gmail.com', ceremony: 'True',reception: 'True', guests: 'Noone',dietry: 'Vegan', message: 'Congrats!', response_id: 1234},
    { name: 'Tim', number: '0420000220', email: 'tim@example.com', ceremony: 'True', reception: 'True', guests: 'None', dietry: 'Vegan', message: 'hi', response_id: 1232}

]

// Seeding for two types of users: admins and guests
const users = [
    { user: 'admin', pincode: '1234567890', isAdmin: true },
    { user: 'guest', pincode: '1234', isAdmin: false }
]

// Drops before seeding
await ReplyModel.deleteMany()
console.log('Deleted Replies')
await ReplyModel.insertMany(replies)
console.log('Added Replies')

await UserModel.deleteMany()
console.log('Deleted Users')
await UserModel.insertMany(users)
console.log('Added Users')

closeConnection()