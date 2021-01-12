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
router.get('/id/:id', (req, res) => {
    person_service_1.getById(req.params.id).then((person, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.send(person);
    });
});
// get by name
router.get('/name/:name', (req, res) => {
    person_service_1.getByFirstName(req.params.name).then((person, err) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.send(person);
    });
});
// add person
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    person_service_1.addPerson(req.body).then((user, err) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.send(user);
        }
    });
}));
// update person
router.put('/changePhone', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    person_service_1.getByFirstNameAndLastName(req.body.firstName, req.body.lastName).then((person, err) => {
        if (err) {
            return console.error(err);
        }
        else {
            person.phoneNumber = req.body.phoneNumber;
            person.save();
            res.status(200).send();
        }
    });
}));
// delete person
router.delete('/delete', (req, res) => {
    return person_service_1.deletePerson(req.body).then((result, err) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.send(result);
        }
    });
});
module.exports = router;
//# sourceMappingURL=person.router.js.map