import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import personRouter from "./routers/person.router";
import groupRouter from "./routers/group.router";

dotenv.config();

const app = express();
const port = 9000; // default port to listen

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/persons', personRouter);
app.use('/groups', groupRouter);

mongoose.connect(
    `mongodb+srv://RoeiHafifa:${process.env.DB_PASS}@backendtask.diqjo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );
const db = mongoose.connection;

db.on("error", () => {
    // tslint:disable-next-line:no-console
    console.error.bind(console, "connection error:")
});
db.once("open", () => {

    // Text index for persons
    db.collection('persons').createIndex({
        firstName: "text",
        lastName: "text",
        phoneNumber: "text"
    });

    // text index for groups
    db.collection('groups').createIndex({name: "text", fatherGroup: "text"});

    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`listening at http://localhost:${port}`);
    });
});