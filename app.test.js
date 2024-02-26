// Importing necessary modules and dependencies
import app from './app.js'; // Importing the Express application instance
import request from 'supertest'; // Importing supertest for making HTTP requests
import { ReplyModel } from './db.js'; // Importing the ReplyModel from the database module

// Test suite for the application
describe("App Test", () => {
    // Testing the GET endpoint '/'
    test('GET /', async () => {
        const res = await request(app).get('/');
        // Assertions
        expect(res.status).toBe(200);
        expect(res.body.info).toBeDefined();
        expect(res.body.info).toBe("We're Getting Married!");
    });

    // Test suite for the GET endpoint '/rsvp'
    describe('GET /rsvp', () => {
        let res;
        beforeEach(async () => {
            // Making a GET request to '/rsvp' before each test
            res = await request(app).get('/rsvp');
        });

        // Testing the response status code
        test('Returns correct response code', async () => {
            expect(res.status).toBe(200);
        });

        // Testing the response content type
        test('Returns json object', async () => {
            expect(res.header['content-type']).toContain('json');
        });
        
        // Testing if response body is defined
        test('Defined', async () => {
            expect(res.body).toBeDefined();
        });
        
        // Testing if response body is an array
        test('Returns an array', async () => {
            expect(res.body).toBeInstanceOf(Array);
        });

        // Testing if an element in the response body has a specific structure
        test('An element is an object with the key "name" = " Michelle', async () => {
            expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({name: "Michelle"})]));
        });
    });
});

// Test suite for the POST endpoint '/rsvp'
describe('POST /rsvp', () => {
    let res;

    // Making a POST request to '/rsvp' before all tests in this suite
    beforeAll(async () => {
        // Example request body for testing
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

        res = await request(app).post('/rsvp').send(requestBody);
    });

    // Testing the response status code and content type
    test('Returns JSON with 201 status', () => {
        expect(res.status).toBe(201);
        expect(res.header['content-type']).toContain('json');
    });

    // Testing if response body has all required fields
    test('Body has all required fields', () => {
        expect(res.body._id).toBeDefined();
        expect(res.body.name).toBeDefined();
        expect(res.body.number).toBeDefined();
        expect(res.body.email).toBeDefined();
        expect(res.body.ceremony).toBeDefined();
        expect(res.body.reception).toBeDefined();
    });

    // Testing if correct data is returned in the response body
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

    // Cleaning up after all tests in this suite
    afterAll(async () => {
        await ReplyModel.findByIdAndDelete(res.body._id);
    });
});


    