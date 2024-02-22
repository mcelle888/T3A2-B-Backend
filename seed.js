
import { ReplyModel, UserModel, closeConnection } from "./db.js"

const replies = [
    { name: 'Michelle', number: '0420222000', email: 'michelle@gmail.com', ceremony: 'True',reception: 'True', guests: 'Noone',dietry: 'Vegan', message: 'Congrats!'},
    { name: 'Tim', number: '0420000220', email: 'tim@example.com', ceremony: 'True', reception: 'True', guests: 'None', dietry: 'Vegan', message: 'hi'}
]

const users = [
    { user: 'admin', pincode: '1234567890', isAdmin: true },
    { user: 'guest', pincode: '1234', isAdmin: false }
]

await ReplyModel.deleteMany()
console.log('Deleted Replies')
await ReplyModel.insertMany(replies)
console.log('Added Replies')

await UserModel.deleteMany()
console.log('Deleted Users')
await UserModel.insertMany(users)
console.log('Added Users')

closeConnection()