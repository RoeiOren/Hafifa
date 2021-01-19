import express from "express";
import * as groupService from '../services/group.service';
import * as personService from '../services/person.service';
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
        } else {
            if (!group) { 
                res.status(406).send("Group not found");
            } else {
                res.send(group);
            }
        }


    })
})

// add group
router.post('/', async (req, res) => {
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
            groupToAdd.fatherGroup = groupToAdd.fatherGroup === '' ? "None" : fatherGroup._id;
            groupService.addGroup(groupToAdd).then(async (group: any, err?: any) => {
                if (err) {
                    return console.error(err);
                } else {
                    if (groupToAdd.fatherGroup !== "None") {
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
router.delete('/:name', async (req, res) => {
    const groupToDelete: any = await groupService.getByName(req.params.name);
    if (!groupToDelete) { 
        res.status(406).send("Group to delete not found");
    } else {
        if (groupToDelete.fatherGroup !== 'None') { 
            await groupService.removeSubGroup(groupToDelete.fatherGroup, groupToDelete._id);
        }
        groupsDeleted = 0;
        await deleteGroupRec(groupToDelete._id);
        res.send(groupsDeleted.toString());
    }
})

// add person to group
router.post('/person', async (req, res) => {
    const groupName = req.body.groupName;
    const personData = req.body.personData;
    const personToAdd = await personService.getByFirstNameAndLastName(personData.firstName, personData.lastName);
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
    const personToDelete = await personService.getByFirstNameAndLastName(personData.firstName, personData.lastName);
    const group = await groupService.getByName(groupName);
    if (personToDelete && group) {
        groupService.personInGroup(group._id, personToDelete._id).then((personsGroups:any, err?: any) => {
            if (!personsGroups) { 
                res.status(406).send("Person not in group");
            } else {
                groupService.removePersonFromGroup(group._id, personToDelete._id).then((result: any, err?: any) => {
                    if (err) {
                        res.status(500).send(err.message);
                    }
            
                    res.send(personToDelete);
                })
            }
        })
    } else {
        res.status(406).send("Person or group not found");
    }
})

// add group as sub group
router.post('/subGroup', async (req, res) => {
    if (req.body.groupName === req.body.subGroupName) { 
        res.status(406).send("Group can't be subGroup of itself");
    }
    
    const subGroupToAdd: any = await groupService.getByName(req.body.subGroupName);
    const fatherGroup: any = await groupService.getByName(req.body.groupName)
    if (subGroupToAdd && subGroupToAdd.fatherGroup !== "0") {
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
                res.status(406).send(`${subGroupToAdd.name} already sub group of ${fatherGroup.name}`);
            }
        } else {
            res.status(406).send("Sub group or father group not found");
        }
    }
})

// remove sub group
router.post('/removeSubGroup', async (req, res) => {
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
router.get('/personInGroup/:groupName/:personName', async (req, res) => {
    let names = req.params.personName.split(' ');
    let firstName = names[0];
    names.shift();

    const group: any = await groupService.getByName(req.params.groupName);
    if (!group) { 
        res.status(406).send("Group not found");
    }

    const personToSearch = await personService.getByFirstNameAndLastName(firstName, names.join(' '));
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


// get hierarchy of a groups
router.get('/:groupName/hierarchy', async (req, res) => {
    let group: any = await groupService.getByName(req.params.groupName);

    if(!group) { 
        res.status(406).send("Group " + req.params.groupName + " not found");
    } else {
    
        let hierarchy = '';
        let depth: number = await getGroupDepth(group);
        if (group.fatherGroup !== 'None') {
            let fatherGroup = await groupService.getById(group.fatherGroup);
            hierarchy = await getUpperGroups(fatherGroup, group.name, depth - 1);
        }

        hierarchy += await getLowerGroups(group, depth);

        console.log(hierarchy);

        res.send(hierarchy);
    }

})


// Delete group and its' down hierarchy
const deleteGroupRec = async (groupID: string) => {
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

const getGroupDepth = async (group: any): Promise<number> => {
    let depth = 0;
    while(group.fatherGroup !== 'None') { 
        group = await groupService.getById(group.fatherGroup);
        depth++;
    }

    return depth;
}

// Get upper groups in a group hierarchy
const getUpperGroups = async (currGroup: any, prevGroupName: string, depth: number) => {
    
    let str: string = '';
    if (currGroup.fatherGroup !== 'None') {
        let fatherGroup = await groupService.getById(currGroup.fatherGroup);
        str = await getUpperGroups(fatherGroup, currGroup.name, depth - 1);
    }

    let personsArr: string[] = [];
    for (const personID of currGroup.persons) { 
        let currPerson: any = await personService.getById(personID);
        personsArr.push(currPerson.firstName + " " + currPerson.lastName)
    }

    const tab = '\t';
    str +=
    `${tab.repeat(depth)}Group: ${currGroup.name}
${tab.repeat(depth)}persons: ${personsArr.length ? personsArr.join(', ') : 'None'}
${tab.repeat(depth)}subGroup: ${prevGroupName}\n\n`;

    return str;
}


// Get lower groups in a group hierarchy
const getLowerGroups = async (currGroup: any, depth: number) => {

    // Sync loop
    let personsArr: string[] = [];
    for (const personID of currGroup.persons) { 
        let currPerson: any = await personService.getById(personID);
        personsArr.push(currPerson.firstName + " " + currPerson.lastName)
    }

    const tab = '\t';

    let str =
    `${tab.repeat(depth)}Group: ${currGroup.name}
${tab.repeat(depth)}persons: ${personsArr.length ? personsArr.join(', ') : 'None'}
${tab.repeat(depth)}subGroups: `;

    // Sync loop
    let subGroupsArr: any[] = [];
    for (const subGroupID of currGroup.subGroups) { 
        let currSubGroup: any = await groupService.getById(subGroupID);
        subGroupsArr.push(currSubGroup);
        str += currSubGroup.name + ", ";
    }

    if (subGroupsArr.length) { 
        str = str.substring(0, str.length - 2);
    } else { 
        str += "None";
    }

    str += '\n\n';

    for (const subGroup of subGroupsArr) {
        str += await getLowerGroups(subGroup, depth + 1);
    }

    return str;
}

export = router;