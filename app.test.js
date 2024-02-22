import app from './app.js'
import request from 'supertest'
import { ReplyModel } from './db.js'

describe("App Test", () => {
    test('GET /', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
        expect(res.body.info).toBeDefined()
        expect(res.body.info).toBe("We're Getting Married!")
    })

    describe('GET /rsvp', () => {
        let res
        beforeEach(async () => {
             res = await request(app).get('/rsvp')
        })

        test('Returns correct response code', async () => {
            expect(res.status).toBe(200)
        })
        test('Returns json object', async () => {
            expect(res.header['content-type']).toContain('json')
        })
        
        test('Defined', async () => {
            expect(res.body).toBeDefined()
        })
        
        test('Returns an array', async () => {
            expect(res.body).toBeInstanceOf(Array)
        })

        test('An element is an object with the key "name" = " Michelle', async () => {
            expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({name: "Michelle"})]))
        })
       
    })
})

describe('POST /rsvp', () => {
    let res;
  
    beforeAll(async () => {
    //   Example form submission
      const requestBody = {
        name: 'Tester',
        number: '21342020',
        email: 'testingexample@test.com',
        ceremony: 'Yes',
        reception: 'No',
        guests: '2',
        dietry: 'Vegan',
        message: 'Hello!'
      };
  
    res = await request(app).post('/rsvp').send(requestBody);});
  
    test('Returns JSON with 201 status', () => {
      expect(res.status).toBe(201);
      expect(res.header['content-type']).toContain('json');
    });
  
    test('Body has all required fields', () => {
      expect(res.body._id).toBeDefined();
      expect(res.body.name).toBeDefined();
      expect(res.body.number).toBeDefined();
      expect(res.body.email).toBeDefined();
      expect(res.body.ceremony).toBeDefined();
      expect(res.body.reception).toBeDefined();
    });
  
    test('Correct data is returned', () => {
      expect(res.body.name).toBe('Tester');
      expect(res.body.number).toBe('21342020');
      expect(res.body.email).toBe('testingexample@test.com');
      expect(res.body.ceremony).toBe('Yes');
      expect(res.body.reception).toBe('No');
      expect(res.body.guests).toBe('2');
      expect(res.body.dietry).toBe('Vegan');
      expect(res.body.message).toBe('Hello!');
    });
  
    afterAll(async () => {
      await ReplyModel.findByIdAndDelete(res.body._id);
    });
  });
  

    