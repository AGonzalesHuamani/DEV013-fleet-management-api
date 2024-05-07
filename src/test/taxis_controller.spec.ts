import request from 'supertest'
import app from '../app'

describe ('metodo GET /taxis', ()=>{
    
    it ('debe retornar un mensaje 200 si se ingresa los parametros correctos', async () =>{
        const response = await request(app).get('/taxis').query({ skip: 0, take: 10 });
        expect(response.status).toBe(200)
    })
    it ('Debe retornar un mensaje 500 si no se singresa skip y take', async () =>{
        const response = await request(app).get("/taxis")
        expect(response.status).toBe(400)
    })
    it('Debería responder con 10 taxis como resultado', async () => {
        const response = await request(app).get('/taxis').query({ skip: 0, take: 10 });
        expect(response.body).toHaveLength(10)
      });
})

