import { AnyMxRecord } from "dns";
import express from "express";
import {getAll, 
    getById,
    getByName,
    addGroup,
    addPersonToGroup,
    deleteGroup,
    removePersonFromGroup,
    addGroupToSub,
    removeSubGroup,
    personInGroup,
    groupInGroup
} from '../services/group.service';
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
            addGroupToSub(req.body.fatherGroup, req.body.name).then((result: any, err?: any) => {
                if (err) {
                    res.status(500).send(err.message);
                }
        
                res.send(result);
            })
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
    const personToAdd = await getByFirstNameAndLastName(personData.firstName, personData.lastName);
    if (personToAdd) {
        personInGroup(groupName, personToAdd._id).then((person:any, err?: any) => {
            if (person) { 
                res.status(500).send("Person already in group");
            } else {
                addPersonToGroup(groupName, personToAdd._id).then((result: any, err?: any) => {
                    if (err) {
                        res.status(500).send(err.message);
                    }
            
                    res.send(result);
                })
            }
        })
    } else {
        res.status(500).send();
    }
})

// remove person from the groups
router.put('/removePerson', async (req, res) => {
    const groupName = req.body.groupName;
    const personData = req.body.personData;
    const personToDelete = await getByFirstNameAndLastName(personData.firstName, personData.laseName);
    if (personToDelete) {
        personInGroup(groupName, personToDelete._id).then((person:any, err?: any) => {
            if (person) { 
                res.status(500).send("Person not in group");
            } else {
                removePersonFromGroup(groupName, personToDelete._id).then((result: any, err?: any) => {
                    if (err) {
                        res.status(500).send(err.message);
                    }
            
                    res.send(result);
                })
            }
        })
    } else {
        res.status(500).send();
    }
})

// add group as sub group
router.put('/addGroupToSub', (req, res) => {
    groupInGroup(req.body.groupName, req.body.subGroupName).then((subGroup: any, err?: any) => {
        if (subGroup) { 
            res.status(500).send("Group already in " + req.body.subGroupName + " group");
        } else {
            addGroupToSub(req.body.groupName, req.body.subGroupName).then((result: any, err?: any) => {
                if (err) {
                    res.status(500).send(err.message);
                }
        
                res.send(result);
            })
        }
    })
})

// remove sub group
router.put('/removeSub', (req, res) => {
    groupInGroup(req.body.groupName, req.body.subGroupName).then((subGroup: any, err?: any) => {
        if (!subGroup) { 
            res.status(500).send("Group not in" + req.body.subGroupName + " group");
        } else {
            removeSubGroup(req.body.groupName, req.body.subGroupName).then((result: any, err?: any) => {
                if (err) {
                    res.status(500).send(err.message);
                }
        
                res.send(result);
            })
        }
    })
})

export = router;