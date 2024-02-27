import app from './app.js'; 
import request from 'supertest'; 

describe("App Test", () => {


    // Test for the GET endpoint '/responses'
    describe('GET /responses', () => {
        let res;
        beforeEach(async () => {
            // Making a GET request to '/rsvp' before each test
            res = await request(app).get('/responses');
        });

        // Testing the response status code when user is not logged in
        test('Returns correct response code', async () => {
            expect(res.status).toBe(401);
        });

        // Testing the response content type
        test('Returns json object', async () => {
            expect(res.header['content-type']).toContain('json');
        });
        
        // Testing if response body is defined
        test('Defined', async () => {
            expect(res.body).toBeDefined();
        });
        
        // Testing if response body is an object
        test('Returns an object', async () => {
            expect(res.body).toBeInstanceOf(Object);
        });

    });
});

