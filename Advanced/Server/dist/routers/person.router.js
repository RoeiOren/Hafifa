"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const person_service_1 = require("../services/person.service");
const router = express_1.default.Router();
// get all persons
router.get('/', (req, res) => {
    person_service_1.getAll().then((persons, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.send(persons);
    });
});
// get by id
router.get('/:id', (req, res) => {
    person_service_1.getById(req.params.id).then((person, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.send(person);
    });
});
// get by name
router.get('/:firstName/:lastName', (req, res) => {
    person_service_1.getByFirstNameAndLastName(req.params.firstName, req.params.lastName).then((person, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.send(person);
    });
});
// add person
router.post('/', (req, res) => {
    person_service_1.addPerson(req.body).then((person, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.send(person);
        }
    });
});
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
router.delete('/', (req, res) => {
    return person_service_1.deletePerson(req.body).then((result, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.send(result);
        }
    });
});
module.exports = router;
//# sourceMappingURL=person.router.js.map