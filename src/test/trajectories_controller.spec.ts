import request from 'supertest'
import app from '../app'

describe('GET /trajectories', () => {
    it('should return 400 when skip or take are missing', async () => {
        const response = await request(app).get('/trajectories');
        expect(response.status).toBe(400);
    });

    it('should return 200 when skip and take parametes are provided', async () => {
        const response = await request(app).get('/trajectories?skip=5&take=10');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length > 0).toBeTruthy();
    });
    // los objetos de respuesta 
    // id exista etc.
    it('should respond with a date, latitude and longitude inside the body response', async () => {
        const response = await request(app).get("/trajectories?skip=5&take=10");
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('date');
        expect(response.body[0]).toHaveProperty('latitude');
        expect(response.body[0]).toHaveProperty('longitude');
        expect(typeof response.body[0].date).toBe('string');
        expect(typeof response.body[0].latitude).toBe('number');
        expect(typeof response.body[0].longitude).toBe('number');
    });
    it('should respond with 10 trajectories as result', async () => {
        const response = await request(app).get('/trajectories?skip=5&take=10');
        expect(response.body).toHaveLength(10)
    });
});

describe('GET /trajectories/:id', () => {
    it('should return 200 when an existing id is entered', async () => {
        const response = await request(app).get("/trajectories/6418?date=2008-02-02").send();
        expect(response.status).toBe(200);
    });

    it('should respond with a latitude,longitude and date inside the body response', async () => {
        const response = await request(app).get(`/trajectories/6418?date='2008-02-02'`);
        // console.log('f', response.body[0])
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('latitude');
        expect(typeof response.body[0].latitude).toBe('number');
        expect(response.body[0]).toHaveProperty('longitude');
        expect(typeof response.body[0].longitude).toBe('number');
        expect(response.body[0]).toHaveProperty('date');
        expect(typeof response.body[0].date).toBe('string');
      });
    it('should return 400 when omit id or date are missing',async() =>{
        const response = await request(app).get("/trajectories/1203a22220").send();
        expect(response.statusCode).toBe(400);
      });
    it('should return 404 when no path found for id',async() =>{
        const response = await request(app).get("/trajectories/641000008?date='2008-02-02").send();
        expect(response.statusCode).toBe(404);
      });
});

describe('GET /lastlocation', () =>{
    it('should return 200 when skip and take parametes are provided', async () => {
        const response = await request(app).get("/lastlocation?skip=2&take=2").send();
        expect(response.status).toBe(200);
      });
    it('should return 400 when skip or take are missing', async () => {
        const response = await request(app).get(`/lastLocation`);
        expect(response.status).toBe(400);
    });
});