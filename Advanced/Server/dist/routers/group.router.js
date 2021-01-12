"use strict";
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
const group_service_1 = require("../services/group.service");
const person_service_1 = require("../services/person.service");
const router = express_1.default.Router();
// get all groups
router.get('/', (req, res) => {
    group_service_1.getAll().then((groups, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.send(groups);
    });
});
// get by group name
router.get('/:name', (req, res) => {
    group_service_1.getByName(req.params.name).then((group, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.send(group);
    });
});
// add group
router.post('/add', (req, res) => {
    group_service_1.addGroup(req.body).then((group, err) => {
        if (err) {
            return console.error(err);
        }
        else {
            group_service_1.addGroupToSub(req.body.fatherGroup, req.body.name).then((result, err) => {
                if (err) {
                    res.status(500).send(err.message);
                }
                res.send(result);
            });
        }
    });
});
// delete group
router.delete('/delete', (req, res) => {
    group_service_1.deleteGroup(req.body).then((deleted, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.send(deleted);
    });
});
// add person to group
router.post('/addPerson', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupName = req.body.groupName;
    const personData = req.body.personData;
    console.log(req.body);
    const personToAdd = yield person_service_1.getByFirstNameAndLastName(personData.firstName, personData.lastName);
    if (personToAdd) {
        group_service_1.addPersonToGroup(groupName, personToAdd._id).then((result, err) => {
            if (err) {
                res.status(500).send(err.message);
            }
            res.send(result);
        });
    }
    else {
        res.status(500).send();
    }
}));
// remove person from the groups
router.put('/removePerson', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupName = req.body.groupName;
    const personData = req.body.personData;
    const personToDelete = yield person_service_1.getByFirstNameAndLastName(personData.firstName, personData.laseName);
    group_service_1.removePersonFromGroup(groupName, personToDelete._id).then((result, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.send(result);
    });
}));
// add group as sub group
router.put('/addGroupToSub', (req, res) => {
    group_service_1.addGroupToSub(req.body.groupName, req.body.subGroupName).then((result, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.send(result);
    });
});
// remove sub group
router.put('/removeSub', (req, res) => {
    group_service_1.removeSubGroup(req.body.groupName, req.body.subGroupName).then((result, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.send(result);
    });
});
module.exports = router;
//# sourceMappingURL=group.router.js.map