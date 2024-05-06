import request from 'supertest'
import app from '../index'

describe ('Probando Get', ()=>{
    it ('obtener el listado', async()=>{
        const response = await request(app).get("/taxis?skip=0&take=10")
        expect(response.status).toBe(200)
    })
})

