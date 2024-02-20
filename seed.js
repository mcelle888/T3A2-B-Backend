
import { ReplyModel, DetailModel, closeConnection } from "./db.js"

const replies = [
    { name: 'Michelle', number: '0420222000', email: 'michelle@gmail.com', ceremony: 'True',reception: 'True', guests: 'Noone',dietry: 'Vegan', message: 'Congrats!'},
    { name: 'Tim', number: '0420000220', email: 'tim@example.com', ceremony: 'True', reception: 'True', guests: 'None', dietry: 'Vegan', message: 'hi'}
]

const details = [
    { name1: 'Tim', name2: 'Michelle', date: '2024-10-2', venue: 'City' }
]

await ReplyModel.deleteMany()
console.log('Deleted Replies')
await ReplyModel.insertMany(replies)
console.log('Added Replies')

await DetailModel.deleteMany()
console.log('Deleted Details')
await DetailModel.insertMany(details)
console.log('Added Details')

closeConnection()