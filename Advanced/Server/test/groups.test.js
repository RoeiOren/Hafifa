const express = require("express"); // import express
const serverRoutes = require("../dist/routers/group.router"); //import file we are testing
const request = require("supertest"); // supertest is a framework that allows to easily test web apis
const bodyParser = require("body-parser");
const groupService = require('../dist/services/group.service');


const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Test } = require("tslint");

const app = express(); //an instance of an express app, a 'fake' express app
app.use(bodyParser.json());
app.use("/groups", serverRoutes); //routes

dotenv.config();
mongoose.connect(
    `mongodb+srv://RoeiHafifa:${process.env.DB_PASS}@backendtask.diqjo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);
  
const db = mongoose.connection;

jest.setTimeout(30000)

// test('GET /groups - success', async () => {
//     const EXPECTED = await groupService.getAll();
//     const { body } = await request(app).get("/groups").expect(200); //uses the request function that calls on express app instance
//     expect(body.length).toEqual(EXPECTED.length);
// })

// test('GET /groups/:name - sucess', async () => {
//     await request(app).get('/groups/3').expect(200);
// })

// test('GET /groups/:name - fail', async () => {
//     await request(app).get('/groups/20').expect(406);
// })

test('POST /groups - success', async () => {
    let before = await groupService.getAll();
    before = before.length;

    let newGroup = {
        name: "test",
        fatherGroup: "",
        subGroups: [],
        persons: []
    };

    await request(app).post('/groups').type('form').set('Content-Type', 'application/json')
    .set('Accept', /application\/json/).send(newGroup).expect(200);

    let after = await groupService.getAll();
    after = after.length;

    expect(after).toBe(before + 1);
})


test('POST /groups - fail(already exists)', async () => {

    let before = await groupService.getAll();
    before = before.length;

    let newGroup = {
        name: "test",
        fatherGroup: "",
        subGroups: [],
        persons: []
    };

    await request(app).post('/groups').type('form').set('Content-Type', 'application/json')
    .set('Accept', /application\/json/).send(newGroup).expect(406);

    let after = await groupService.getAll();
    after = after.length;

    expect(after).toBe(before);

})

test('POST /groups - fail(self sub group)', async () => {

    let before = await groupService.getAll();
    before = before.length;

    let newGroup = {
        name: "test",
        fatherGroup: "test",
        subGroups: [],
        persons: []
    };

    await request(app).post('/groups').type('form').set('Content-Type', 'application/json')
    .set('Accept', /application\/json/).send(newGroup).expect(406);

    let after = await groupService.getAll();
    after = after.length;

    expect(after).toBe(before);

})


test('DELETE /groups', async () => {
    let before = await groupService.getAll();
    before = before.length;

    await request(app).delete('/groups/test').expect(200);

    let after = await groupService.getAll();
    after = after.length;

    expect(after).toBe(before - 1);
})