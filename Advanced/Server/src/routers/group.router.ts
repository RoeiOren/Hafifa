import { AnyMxRecord } from "dns";
import express from "express";
import * as groupService from '../services/group.service';
import { getByFirstNameAndLastName } from '../services/person.service';
let groupsDeleted = 0;

const router = express.Router();

// get all groups
router.get('/', (req, res) => {
    groupService.getAll().then((groups: any, err?: any) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(groups);
        }

    })
})

// get by group name
router.get('/:name', (req, res) => {
    groupService.getByName(req.params.name).then((group: any, err?: any) => {
        if (err) {
            res.status(500).send(err.message);
        }

        if (!group) { 
            res.status(406).send("Group not found");
        } else {
            res.send(group);
        }

    })
})

// add group
router.post('/add', async (req, res) => {
    let groupToAdd: any = await groupService.getByName(req.body.name);
    if (groupToAdd) { 
        res.status(406).send("Group with this name already exists");
    } else {
        groupToAdd = req.body;
        const fatherGroup: any = await groupService.getByName(groupToAdd.fatherGroup);
        
        if (groupToAdd.name === groupToAdd.fatherGroup) {
            res.status(406).send("Group can't be a sub group of itself");
        } else if (groupToAdd.fatherGroup !== '' && !fatherGroup) {
            res.status(406).send("Father group not found");
        } else {
            groupToAdd.fatherGroup = groupToAdd.fatherGroup === '' ? 0 : fatherGroup._id;
            groupService.addGroup(groupToAdd).then(async (group: any, err?: any) => {
                if (err) {
                    return console.error(err);
                } else {
                    if (groupToAdd.fatherGroup !== 0) {
                        await groupService.addGroupToSub(fatherGroup._id, group._id).then((result: any, err?: any) => {
                            if (err) {
                                res.status(500).send(err.message);
                            }
                        })
                    }
    
                    res.send(group);
                }
            })
        }
    }

})

// delete group
router.delete('/delete', async (req, res) => {
    const groupToDelete: any = await groupService.getByName(req.body.name);
    if (!groupToDelete) { 
        res.status(406).send("Group to delete not found");
    } else {
        groupsDeleted = 0;
        await deleteGroupRec(groupToDelete._id);
        res.send(groupsDeleted.toString());
    }
})

// add person to group
router.post('/addPerson', async (req, res) => {
    const groupName = req.body.groupName;
    const personData = req.body.personData;
    const personToAdd = await getByFirstNameAndLastName(personData.firstName, personData.lastName);
    const group = await groupService.getByName(groupName);
    if (personToAdd && group) {
        groupService.personInGroup(group._id, personToAdd._id).then((person:any, err?: any) => {
            if (person) { 
                res.status(406).send("Person already in group");
            } else {
                groupService.addPersonToGroup(group._id, personToAdd._id).then((result: any, err?: any) => {
                    if (err) {
                        res.status(500).send(err.message);
                    }
            
                    res.send(personToAdd);
                })
            }
        })
    } else {
        res.status(406).send("Person or group not found");
    }
})

// remove person from the groups
router.post('/removePerson', async (req, res) => {
    const groupName = req.body.groupName;
    const personData = req.body.personData;
    const personToDelete = await getByFirstNameAndLastName(personData.firstName, personData.laseName);
    const group = await groupService.getByName(groupName);
    if (personToDelete && group) {
        groupService.personInGroup(group._id, personToDelete._id).then((person:any, err?: any) => {
            if (!person) { 
                res.status(500).send("Person not in group");
            } else {
                groupService.removePersonFromGroup(group._id, personToDelete._id).then((result: any, err?: any) => {
                    if (err) {
                        res.status(500).send(err.message);
                    }
            
                    res.send(person);
                })
            }
        })
    } else {
        res.status(406).send("Person or group not found");
    }
})

// add group as sub group
router.post('/addGroupToSub', async (req, res) => {
    if (req.body.groupName === req.body.subGroupName) { 
        res.status(406).send("Group can't be subGroup of itself");
    }
    
    const subGroupToAdd: any = await groupService.getByName(req.body.subGroupName);
    const fatherGroup: any = await groupService.getByName(req.body.groupName)
    if (subGroupToAdd && subGroupToAdd.fatherGroup !== 0) {
        res.status(406).send(req.body.subGroupName + " is already a sub group");
    } else {
        if (subGroupToAdd && fatherGroup) { 
            const subGroupInGroup = await groupService.groupInGroup(fatherGroup._id, subGroupToAdd._id);
            if (!subGroupInGroup) {
                groupService.addGroupToSub(fatherGroup._id, subGroupToAdd._id).then(async (result: any, err?: any) => {
                    if (err) {
                        res.status(500).send(err.message);
                    }
                    
                    await groupService.addFatherGroup(subGroupToAdd.name, fatherGroup.name);
                    res.send(subGroupToAdd);
                })
            } else {
                res.status(406).send(`${subGroupToAdd.name} already sub group og ${fatherGroup.name}`);
            }
        } else {
            res.status(406).send("Sub group or father group not found");
        }
    }
})

// remove sub group
router.post('/removeSub', async (req, res) => {
    const fatherGroup: any = await groupService.getByName(req.body.groupName);
    if (!fatherGroup) {
        res.status(406).send(req.body.groupName + " group not found");
    }
    
    const subGroupToRemove: any = await groupService.getByName(req.body.subGroupName);
    if (!subGroupToRemove) { 
        res.status(406).send(req.body.subGroupName + " not found");
    }
    if (subGroupToRemove && subGroupToRemove.fatherGroup !== fatherGroup._id) {
        res.status(406).send(subGroupToRemove + " is not in " + fatherGroup.name);
    } else {
        groupService.removeSubGroup(fatherGroup._id, subGroupToRemove._id).then(async (result: any, err?: any) => {
            if (err) {
                res.status(500).send(err.message);
            }
    
            await groupService.removeFatherGroup(subGroupToRemove._id);
            res.send(subGroupToRemove);
        })
    }
})


// get person in group
router.get('/:groupName/:personName', async (req, res) => {
    let names = req.params.personName.split(' ');
    let firstName = names[0];
    names.shift();

    const group: any = await groupService.getByName(req.params.groupName);
    if (!group) { 
        res.status(406).send("Group not found");
    }

    const personToSearch = await getByFirstNameAndLastName(firstName, names.join(' '));
    if (!personToSearch) { 
        res.status(406).send("Person not found in DB");
    }

    groupService.personInGroup(group._id, personToSearch._id).then((person: any, err?: any) => {
        if (err) { 
            res.status(500).send();
        }

        if (!person) { 
            res.status(406).send("Person not found in group");
        } else {

            res.send(personToSearch);
        }
    })
})


const deleteGroupRec = async (groupID: number) => {
    groupsDeleted++;
    let groupToDelete: any = await groupService.getById(groupID);

    let subGroupsArr: any[] = groupToDelete.subGroups;

    if(subGroupsArr.length > 0) { 
        subGroupsArr.map(subGroup => {
           deleteGroupRec(subGroup);
        })
    }

    await groupService.deleteGroup(groupToDelete._id);
    
}

export = router;