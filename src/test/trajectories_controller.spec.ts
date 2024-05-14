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

