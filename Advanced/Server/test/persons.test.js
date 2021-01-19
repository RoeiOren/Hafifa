const express = require("express"); // import express
const serverRoutes = require("../dist/routers/person.router"); //import file we are testing
const request = require("supertest"); // supertest is a framework that allows to easily test web apis
const personService = require('../dist/services/person.service');
const bodyParser = require('body-parser');


const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express(); //an instance of an express app, a 'fake' express app
app.use(bodyParser.json());
app.use("/persons", serverRoutes); //routes

dotenv.config();
mongoose.connect(
    `mongodb+srv://RoeiHafifa:${process.env.DB_PASS}@backendtask.diqjo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );
const db = mongoose.connection;

jest.setTimeout(30000)

test("GET /persons - success", async () => {
  const EXPECTED = await personService.getAll();
  const { body } = await request(app).get("/persons").expect(200); //uses the request function that calls on express app instance
  expect(body.length).toEqual(EXPECTED.length);
});

// test("GET person by name - success", async () => {
//   const { body } = await request(app).get("/persons/Roei Oren").expect(200);
// })

// test ('GET person by name - not found', async () => {
//   const { body } = await request(app).get('/persons/a b').expect(406);
//   expect(body).toEqual({});
// })

// test('POST /persons - success ', async () => {

//   let before = await personService.getAll();
//   before = before.length;

//   let newPerson = {
//     firstName: "A",
//     lastName: "b",
//     phoneNumber: "0521234567"
//   }

//   await request(app).post('/persons').type('form').set('Content-Type', 'application/json')
//     .set('Accept', /application\/json/).send(newPerson).expect(200);

//   let after = await personService.getAll();
//   after = after.length;

//   expect(after).toBe(before + 1);
// })

// test('POST /persons - fail ', async () => {

//   let before = await personService.getAll();
//   before = before.length;

//   let newPerson = {
//     firstName: "A",
//     lastName: "b",
//     phoneNumber: "0521234569"
//   }

//   await request(app).post('/persons').type('form').set('Content-Type', 'application/json')
//     .set('Accept', /application\/json/).send(newPerson).expect(406);

//   let after = await personService.getAll();
//   after = after.length;

//   expect(after).toBe(before);
// })

// test("DELETE /persons", async () => {

//   let before = await personService.getAll();
//   before = before.length;

//   await request(app).delete('/persons/A b').expect(200);
  
//   let after = await personService.getAll();
//   after = after.length;

//   expect(after).toBe(before - 1);

// })
