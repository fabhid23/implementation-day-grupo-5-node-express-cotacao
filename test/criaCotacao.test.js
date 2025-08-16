const request = require('supertest')
const { expect } = require("chai")
require('dotenv').config()

describe('Cotacao', () => {
    console.log('BASE_URL:', process.env.BASE_URL);
    let respostaToken
    before(async () => {
        const bodyLogin = {
                "username": "admin",
                "password": "admin123"
        }
        
        const resposta = await request(process.env.BASE_URL)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send(bodyLogin)

        expect(resposta.status).to.equal(200);
        expect(resposta.body.token).to.be.a('string');
        respostaToken = resposta.body.token
            
    })

    it('Deve retornar 201 ao criar a cotação', async () => {
        const respost = await request(process.env.BASE_URL)
            .post('/api/quotes')
            .set('Authorization', `Bearer ${respostaToken}`)
            .set('Content-Type', 'application/json')
            .send({
            "name": "string",
            "cpf": "12345678901",
            "birthDate": "1990-01-01",
            "address": {
                "street": "string",
                "neighborhood": "string",
                "zipCode": "05311000",
                "city": "string",
                "state": "sp",
                "country": "Brasil"
            },
            "financingData": {
                "term": 60,
                "amount": 190000.05,
                "contractDate": "2025-08-16"
            }
            })
            expect(respost.status).to.equal(201);


    })
})