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
const person_service_1 = require("../services/person.service");
const group_service_1 = require("../services/group.service");
const router = express_1.default.Router();
// get all persons
router.get('/', (req, res) => {
    person_service_1.getAll().then((persons, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.send(persons);
        }
    });
});
// get by name
router.get('/:fullName', (req, res) => {
    const names = req.params.fullName.split(' ');
    let firstName = names[0];
    names.shift();
    person_service_1.getByFirstNameAndLastName(firstName, names.join(' ')).then((person, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            if (!person) {
                res.status(406).send("Person not found");
            }
            else {
                res.send(person);
            }
        }
    });
});
// add person
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let person = yield person_service_1.getByFirstNameAndLastName(req.body.firstName, req.body.lastName);
    if (person) {
        res.status(406).send("Person with this name already exists");
    }
    else {
        person = yield person_service_1.getByPhoneNumber(req.body.phoneNumber);
        if (person) {
            res.status(406).send("Phone number already taken");
        }
        else {
            person_service_1.addPerson(req.body).then((person, err) => {
                if (err) {
                    res.status(500).send(err.message);
                }
                else {
                    res.send(person);
                }
            });
        }
    }
}));
// update person
router.put('/changePhone', (req, res) => {
    person_service_1.getByFirstNameAndLastName(req.body.firstName, req.body.lastName).then((person, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            person.phoneNumber = req.body.phoneNumber;
            person.save();
            res.status(200).send();
        }
    });
});
// delete person
router.delete('/:fullName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let names = req.params.fullName.split(' ');
    let firstName = names[0];
    names.shift();
    const personToDelete = yield person_service_1.getByFirstNameAndLastName(firstName, names.join(' '));
    person_service_1.deletePerson(personToDelete).then((result, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            group_service_1.personGroups(personToDelete._id).then((groups, err) => {
                if (err) {
                    res.status(500).send();
                }
                else {
                    groups.forEach((group) => __awaiter(void 0, void 0, void 0, function* () {
                        yield group_service_1.removePersonFromGroup(group._id, personToDelete._id);
                    }));
                    res.send(personToDelete);
                }
            });
        }
    });
}));
// get persons' all groups
router.get('/:fullName/groups', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let names = req.params.fullName.split(' ');
    let firstName = names[0];
    names.shift();
    const person = yield person_service_1.getByFirstNameAndLastName(firstName, names.join(' '));
    group_service_1.personGroups(person._id).then((groups, err) => {
        if (err) {
            res.status(500).send();
        }
        res.send(groups);
    });
}));
module.exports = router;
//# sourceMappingURL=person.router.js.map