import express from "express";
import bodyParser from "body-parser";

import personRouter from "./routers/person.router";
import groupRouter from "./routers/group.router";

const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/persons', personRouter);
app.use('/groups', groupRouter);

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
     // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );