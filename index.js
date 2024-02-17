import express from 'express'

const rsvp = ["name", "number", "email"]

const reply = [
    {name: 'Michelle', number: '0400000230', email: 'michelle@gmail.com'},
    {name: 'Tim', number: '0434000200', email: 'tim@gmail.com'}
]

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send({info: "We're Getting Married!"}))

app.get('/rsvp', (req, res) => res.status(200).send(rsvp))

app.get('/responses', (req, res) => res.status(200).send(reply))

app.get('/responses/:id', (req, res) => {
    const response = reply[req.params.id -1]
    if (response) {
        res.send(response)
    } else {
        res.status(404).send({error: 'Entry not found'})
    }
})


// Post request

app.post('/rsvp',(req, res) => {
    console.log(req.body)

    reply.push(req.body)

    res.status(201).send(reply[reply.length -1])
})

app.listen(8001)