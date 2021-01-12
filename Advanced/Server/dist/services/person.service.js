"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.addPerson = exports.getByFirstNameAndLastName = exports.getById = exports.getAll = void 0;
const person_model_1 = __importDefault(require("../models/person.model"));
const getAll = () => {
    return person_model_1.default.find();
};
exports.getAll = getAll;
const getById = (id) => {
    return person_model_1.default.findOne({ _id: id });
};
exports.getById = getById;
const getByFirstNameAndLastName = (firstName, lastName) => {
    return person_model_1.default.findOne({ firstName: firstName, lastName: lastName });
};
exports.getByFirstNameAndLastName = getByFirstNameAndLastName;
const addPerson = (newPerson) => {
    return person_model_1.default.create(newPerson);
};
exports.addPerson = addPerson;
const deletePerson = (personToDelete) => {
    return person_model_1.default.remove({ firstName: personToDelete.firstName, lastName: personToDelete.lastName });
};
exports.deletePerson = deletePerson;
//# sourceMappingURL=person.service.js.map