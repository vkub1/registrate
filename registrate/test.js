const request = require('supertest')
const app = require('./index') 
const chai = require('chai')
var expect = chai.expect;


describe("POST /registrants", () => {
    describe("when passed a first name, last name, phone number, age, and country", () => {
        it("Should respond with a 201 status code", async () => {
            const response = await request(app).post("/registrants").send({ 
                first_name: "Vladimir", 
                last_name: "Kubliy",
                age: 18,
                phone_number: "9999999",
                country: "Canada"
            })
            expect(response.statusCode).equal(201);
        })
    })
    describe("when passed an incorrect or missing first name, last name, phone number, age, and country", () => {  
        it("Should respond with a 400 status code", async () => {
            const response = await request(app).post("/registrants").send({ 
                first_name: "", 
                last_name: "Kubliy",
                age: 18,
                phone_number: "9999999",
                country: "Canada"
            })
            expect(response.statusCode).equal(400);
            
        })
    })
})