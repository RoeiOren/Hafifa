const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'task';

const createTextIndex = (db) => {
    db.collection('books').createIndex({
        name: "text",
        description: "text",
        writer: "text"
    });
}

const createPagesIndex = (db) => {
    db.collection('books').createIndex({pages: 1});
}

const createBookDoc = (db) => {
    db.collection('books').insertMany([{
        name: "First",
        description: "The first book in the collection",
        releaseDate: new Date(2016, 1, 1,),
        writer: "Roei Oren",
        pages: 300
    },
    {
        name: "Second",
        description: "The second book in the collection",
        releaseDate: new Date(2017, 1, 1),
        writer: "Poei Oren",
        pages: 275
    },
    {
        name: "Third",
        description: "The third book in the collection",
        releaseDate: new Date(2014, 1, 1),
        writer: "Roei Oren",
        pages: 250
    },
    {
        name: "Forth",
        description: "The forth book in the collection",
        releaseDate: new Date(2018, 1, 1),
        writer: "Poei Oren",
        pages: 300
    },
    ]);
}

const createWriterDoc = (db) => {
    db.collection('writers').insertOne({
        firstname: "Roei",
        lastName: "Oren",
        birthYear: "2001"
    });
}

const allWriterBooks = (db, writerName) => {
  db.collection('books').find({
        $text: {
            $search: writerName
        }
    }).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
      });
}

const findBook = (db, input) => {
    db.collection('books').findOne({
        $text: {
            $search: input
        }
    }).then((book, err) => {
        console.log(book);
    });
}

const booksByPages = (db) => {
    db.collection('books').find({
        pages: {$gt: 250}
    })
    .sort({pages: 1})
    .toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
    });
}

const createWriterAndPagesIndex = (db) => {
    db.collection('books').createIndex({
        writer: 1,
        pages: 1
    });
}

const aggregationQurey = (db) => {
    db.collection('books').aggregate([
        { $match: {
            pages : {$gt: 200}, 
            $and: [{releaseDate: {$gte: new Date(2015, 1, 1)}}, {releaseDate: {$lt: new Date(2021, 1, 1)}}],
            writer: /^P/
        } },
        {$project: {name: 1, writer: 1, _id: 0}},
        {$sort: {writer: 1, pages: 1}}
    ]).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
    });
}

 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);

  createTextIndex(db);
  createPagesIndex(db);
  createBookDoc(db);
  createWriterDoc(db);


//   allWriterBooks(db, "Roei Oren");

//   findBook(db, "first book");

//   booksByPages(db);

  createWriterAndPagesIndex(db);

  aggregationQurey(db);

  client.close();
 
});