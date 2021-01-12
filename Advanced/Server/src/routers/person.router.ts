import express from "express";
const router = express.Router();

import { getAll } from "../services/person.service";


// get all persons
router.get('/', (req, res) => {
    getAll();
})

// get by id
router.get('/:personID', (req, res) => {

})

// get by name
router.get('/:name', (req, res) => {

})

// add person
router.post('/add', async (req, res) => {

})

// update person
router.put('/update', async (req, res) => {

})

// delete person
router.delete('/delete', (req, res) => {
    
})


module.exports = router;