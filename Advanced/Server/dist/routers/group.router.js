"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const groupService = __importStar(require("../services/group.service"));
const personService = __importStar(require("../services/person.service"));
let groupsDeleted = 0;
const router = express_1.default.Router();
// get all groups
router.get('/', (req, res) => {
    groupService.getAll().then((groups, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.send(groups);
        }
    });
});
// get by group name
router.get('/:name', (req, res) => {
    groupService.getByName(req.params.name).then((group, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        if (!group) {
            res.status(406).send("Group not found");
        }
        else {
            res.send(group);
        }
    });
});
// add group
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let groupToAdd = yield groupService.getByName(req.body.name);
    if (groupToAdd) {
        res.status(406).send("Group with this name already exists");
    }
    else {
        groupToAdd = req.body;
        const fatherGroup = yield groupService.getByName(groupToAdd.fatherGroup);
        if (groupToAdd.name === groupToAdd.fatherGroup) {
            res.status(406).send("Group can't be a sub group of itself");
        }
        else if (groupToAdd.fatherGroup !== '' && !fatherGroup) {
            res.status(406).send("Father group not found");
        }
        else {
            groupToAdd.fatherGroup = groupToAdd.fatherGroup === '' ? "0" : fatherGroup._id;
            groupService.addGroup(groupToAdd).then((group, err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return console.error(err);
                }
                else {
                    if (groupToAdd.fatherGroup !== "0") {
                        yield groupService.addGroupToSub(fatherGroup._id, group._id).then((result, err) => {
                            if (err) {
                                res.status(500).send(err.message);
                            }
                        });
                    }
                    res.send(group);
                }
            }));
        }
    }
}));
// delete group
router.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupToDelete = yield groupService.getByName(req.body.name);
    if (!groupToDelete) {
        res.status(406).send("Group to delete not found");
    }
    else {
        yield groupService.removeSubGroup(groupToDelete.fatherGroup, groupToDelete._id);
        groupsDeleted = 0;
        yield deleteGroupRec(groupToDelete._id);
        res.send(groupsDeleted.toString());
    }
}));
// add person to group
router.post('/addPerson', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupName = req.body.groupName;
    const personData = req.body.personData;
    const personToAdd = yield personService.getByFirstNameAndLastName(personData.firstName, personData.lastName);
    const group = yield groupService.getByName(groupName);
    if (personToAdd && group) {
        groupService.personInGroup(group._id, personToAdd._id).then((person, err) => {
            if (person) {
                res.status(406).send("Person already in group");
            }
            else {
                groupService.addPersonToGroup(group._id, personToAdd._id).then((result, err) => {
                    if (err) {
                        res.status(500).send(err.message);
                    }
                    res.send(personToAdd);
                });
            }
        });
    }
    else {
        res.status(406).send("Person or group not found");
    }
}));
// remove person from the groups
router.post('/removePerson', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupName = req.body.groupName;
    const personData = req.body.personData;
    const personToDelete = yield personService.getByFirstNameAndLastName(personData.firstName, personData.lastName);
    const group = yield groupService.getByName(groupName);
    if (personToDelete && group) {
        groupService.personInGroup(group._id, personToDelete._id).then((personsGroups, err) => {
            if (!personsGroups) {
                res.status(500).send("Person not in group");
            }
            else {
                groupService.removePersonFromGroup(group._id, personToDelete._id).then((result, err) => {
                    if (err) {
                        res.status(500).send(err.message);
                    }
                    res.send(personToDelete);
                });
            }
        });
    }
    else {
        res.status(406).send("Person or group not found");
    }
}));
// add group as sub group
router.post('/addGroupToSub', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.groupName === req.body.subGroupName) {
        res.status(406).send("Group can't be subGroup of itself");
    }
    const subGroupToAdd = yield groupService.getByName(req.body.subGroupName);
    const fatherGroup = yield groupService.getByName(req.body.groupName);
    if (subGroupToAdd && subGroupToAdd.fatherGroup !== "0") {
        res.status(406).send(req.body.subGroupName + " is already a sub group");
    }
    else {
        if (subGroupToAdd && fatherGroup) {
            const subGroupInGroup = yield groupService.groupInGroup(fatherGroup._id, subGroupToAdd._id);
            if (!subGroupInGroup) {
                groupService.addGroupToSub(fatherGroup._id, subGroupToAdd._id).then((result, err) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err) {
                        res.status(500).send(err.message);
                    }
                    yield groupService.addFatherGroup(subGroupToAdd.name, fatherGroup.name);
                    res.send(subGroupToAdd);
                }));
            }
            else {
                res.status(406).send(`${subGroupToAdd.name} already sub group og ${fatherGroup.name}`);
            }
        }
        else {
            res.status(406).send("Sub group or father group not found");
        }
    }
}));
// remove sub group
router.post('/removeSub', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fatherGroup = yield groupService.getByName(req.body.groupName);
    if (!fatherGroup) {
        res.status(406).send(req.body.groupName + " group not found");
    }
    const subGroupToRemove = yield groupService.getByName(req.body.subGroupName);
    if (!subGroupToRemove) {
        res.status(406).send(req.body.subGroupName + " not found");
    }
    if (subGroupToRemove && subGroupToRemove.fatherGroup !== fatherGroup._id) {
        res.status(406).send(subGroupToRemove + " is not in " + fatherGroup.name);
    }
    else {
        groupService.removeSubGroup(fatherGroup._id, subGroupToRemove._id).then((result, err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(500).send(err.message);
            }
            yield groupService.removeFatherGroup(subGroupToRemove._id);
            res.send(subGroupToRemove);
        }));
    }
}));
// get person in group
router.get('/personInGroup/:groupName/:personName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let names = req.params.personName.split(' ');
    let firstName = names[0];
    names.shift();
    const group = yield groupService.getByName(req.params.groupName);
    if (!group) {
        res.status(406).send("Group not found");
    }
    const personToSearch = yield personService.getByFirstNameAndLastName(firstName, names.join(' '));
    if (!personToSearch) {
        res.status(406).send("Person not found in DB");
    }
    groupService.personInGroup(group._id, personToSearch._id).then((person, err) => {
        if (err) {
            res.status(500).send();
        }
        if (!person) {
            res.status(406).send("Person not found in group");
        }
        else {
            res.send(personToSearch);
        }
    });
}));
// get hierarchy of a groups
router.get('/:groupName/hierarchy', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let group = yield groupService.getByName(req.params.groupName);
    if (!group) {
        res.status(406).send("Group " + req.params.groupName + " not found");
    }
    else {
        let hierarchy = '';
        let depth = yield getGroupDepth(group);
        if (group.fatherGroup !== '0') {
            let fatherGroup = yield groupService.getById(group.fatherGroup);
            hierarchy = yield getUpperGroups(fatherGroup, group.name, depth - 1);
        }
        hierarchy += yield getLowerGroups(group, depth);
        console.log(hierarchy);
        res.send(hierarchy);
    }
}));
const deleteGroupRec = (groupID) => __awaiter(void 0, void 0, void 0, function* () {
    groupsDeleted++;
    let groupToDelete = yield groupService.getById(groupID);
    let subGroupsArr = groupToDelete.subGroups;
    if (subGroupsArr.length > 0) {
        subGroupsArr.map(subGroup => {
            deleteGroupRec(subGroup);
        });
    }
    yield groupService.deleteGroup(groupToDelete._id);
});
const getGroupDepth = (group) => __awaiter(void 0, void 0, void 0, function* () {
    let depth = 0;
    while (group.fatherGroup !== '0') {
        group = yield groupService.getById(group.fatherGroup);
        depth++;
    }
    return depth;
});
const getUpperGroups = (currGroup, prevGroupName, depth) => __awaiter(void 0, void 0, void 0, function* () {
    let str = '';
    if (currGroup.fatherGroup !== '0') {
        let fatherGroup = yield groupService.getById(currGroup.fatherGroup);
        str = yield getUpperGroups(fatherGroup, currGroup.name, depth - 1);
    }
    let personsArr = [];
    for (const personID of currGroup.persons) {
        let currPerson = yield personService.getById(personID);
        personsArr.push(currPerson.firstName + " " + currPerson.lastName);
    }
    const tab = '\t';
    str +=
        `${tab.repeat(depth)}Group: ${currGroup.name}
${tab.repeat(depth)}persons: ${personsArr.length ? personsArr.join(', ') : 'None'}
${tab.repeat(depth)}subGroup: ${prevGroupName}\n\n`;
    return str;
});
const getLowerGroups = (currGroup, depth) => __awaiter(void 0, void 0, void 0, function* () {
    // Sync loop
    let personsArr = [];
    for (const personID of currGroup.persons) {
        let currPerson = yield personService.getById(personID);
        personsArr.push(currPerson.firstName + " " + currPerson.lastName);
    }
    const tab = '\t';
    let str = `${tab.repeat(depth)}Group: ${currGroup.name}
${tab.repeat(depth)}persons: ${personsArr.length ? personsArr.join(', ') : 'None'}
${tab.repeat(depth)}subGroups: `;
    // Sync loop
    let subGroupsArr = [];
    for (const subGroupID of currGroup.subGroups) {
        let currSubGroup = yield groupService.getById(subGroupID);
        subGroupsArr.push(currSubGroup);
        str += currSubGroup.name + ", ";
    }
    if (subGroupsArr.length) {
        str = str.substring(0, str.length - 2);
    }
    else {
        str += "None";
    }
    str += '\n\n';
    for (const subGroup of subGroupsArr) {
        str += yield getLowerGroups(subGroup, depth + 1);
    }
    return str;
});
module.exports = router;
//# sourceMappingURL=group.router.js.map