import { AnyMxRecord } from "dns";
import express from "express";
import {getAll, 
    getById,
    getByName,
    addGroup,
    addPersonToGroup,
    deleteGroup,
    removePersonFromGroup} from '../services/group.service';
import {getByFirstNameAndLastName} from '../services/person.service';

const router = express.Router();

// get all groups
router.get('/', (req, res) => {
    getAll().then((groups: any, err?: any) => {
        if (err) {
            res.status(500).send(err.message);
        }

        res.send(groups);
    })
})

// get by group name
router.get('/:name', (req, res) => {
    getByName(req.params.name).then((group: any, err?: any) => {
        if (err) {
            res.status(500).send(err.message);
        }

        res.send(group);
    })
})

// add group
router.post('/add', (req, res) => {
    addGroup(req.body).then((group: any, err?: any) => {
        if (err) {
            return console.error(err);
        } else {
            res.send(group);
        }
    })
})

// delete group
router.delete('/delete', (req, res) => {
    deleteGroup(req.body).then((deleted: number, err?: any) => {
        if (err) { 
            res.status(500).send(err.message);
        }

        res.send(deleted);
    })
})

// add person to group
router.post('/addPerson', async (req, res) => {
    const groupName = req.body.groupName;
    const personData = req.body.personData;
    const personToDelete = await getByFirstNameAndLastName(personData.firstName, personData.laseName);
    addPersonToGroup(groupName, personToDelete._id).then((result: any, err?: any) => {
        if (err) {
            res.status(500).send(err.message);
        }

        res.send(result);
    })
})

// remove person from the groups
router.put('/removePerson', async (req, res) => {
    const groupName = req.body.groupName;
    const personData = req.body.personData;
    const personToDelete = await getByFirstNameAndLastName(personData.firstName, personData.laseName);
    removePersonFromGroup(groupName, personToDelete._id).then((result: any, err?: any) => {
        if (err) {
            res.status(500).send(err.message);
        }

        res.send(result);
    })
})

export = router;