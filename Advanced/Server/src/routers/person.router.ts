import express from "express";
import { getAll, addPerson, deletePerson, getByFirstNameAndLastName } from "../services/person.service";
import { presonGroups } from '../services/group.service';


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

// get by name
router.get('/:fullName', (req, res) => {
    const names = req.params.fullName.split(' ');
    let firstName = names[0];
    names.shift();
    getByFirstNameAndLastName(firstName, names.join(' ')).then((person: any, err?: any) => {
        if (err) {
            res.status(500).send(err.message);
        }
    
        if (!person) { 
            res.status(406).send("Person not found");
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

// get persons' all groups
router.get('/:fullName/groups', async (req, res) => {
    let names = req.params.fullName.split(' ');
    let firstName = names[0];
    names.shift();
    const person = await getByFirstNameAndLastName(firstName, names.join(' '));
    presonGroups(person._id).then((groups: any, err?: any) => {
        if (err) { 
            res.status(500).send();
        }

        res.send(groups);
    })
})


export = router;