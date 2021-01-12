import express from "express";
import { getAll, addPerson, getById, deletePerson, getByFirstNameAndLastName } from "../services/person.service";

const router = express.Router();


// get all persons
router.get('/', (req, res) => {
    getAll().then((persons: any, err?: any): void => {
        if (err) {
            res.status(500).send(err.message);
        }

        res.send(persons);
    })
})

// get by id
router.get('/:id', (req, res) => {
    getById(req.params.id).then((person: any, err?: any) => {
        if (err) {
            res.status(500).send(err.message);
        }
    
        res.send(person);
    })
})

// get by name
router.get('/:firstName/:lastName', (req, res) => {
    getByFirstNameAndLastName(req.params.firstName, req.params.lastName).then((person: any, err?: any) => {
        if (err) {
            res.status(500).send(err.message);
        }
    
        res.send(person);
    })
})

// add person
router.post('/', (req, res) => {
    addPerson(req.body).then((person: any, err?: any) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(person);
        }
    })
})

// update person
router.put('/changePhone', (req, res) => {
    getByFirstNameAndLastName(req.body.firstName, req.body.lastName).then((person: any, err?: any) => {
        if (err) { 
            res.status(500).send(err.message);
        } else {
            person.phoneNumber = req.body.phoneNumber;
            person.save();
            res.status(200).send();
        }
    })
})

// delete person
router.delete('/', (req, res) => {
    return deletePerson(req.body).then((result: any, err?: any) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
})


export = router;