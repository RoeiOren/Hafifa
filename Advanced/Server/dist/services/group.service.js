"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPesronInGroup = exports.removeSubGroup = exports.addGroupToSub = exports.removePersonFromGroup = exports.addPersonToGroup = exports.deleteGroup = exports.addGroup = exports.getByName = exports.getById = exports.getAll = void 0;
const group_mode_1 = __importDefault(require("../models/group.mode"));
const getAll = () => {
    return group_mode_1.default.find();
};
exports.getAll = getAll;
const getById = (id) => {
    return group_mode_1.default.find({ _id: id });
};
exports.getById = getById;
const getByName = (name) => {
    return group_mode_1.default.find({ name: name });
};
exports.getByName = getByName;
const addGroup = (newGroup) => {
    return group_mode_1.default.create(newGroup);
};
exports.addGroup = addGroup;
const deleteGroup = (groupName) => {
    return group_mode_1.default.remove({ name: groupName });
};
exports.deleteGroup = deleteGroup;
const addPersonToGroup = (groupName, personID) => {
    return group_mode_1.default.updateOne({ name: groupName }, { $push: { persons: personID } });
};
exports.addPersonToGroup = addPersonToGroup;
const removePersonFromGroup = (groupName, personID) => {
    return group_mode_1.default.updateOne({ name: groupName }, { $pull: { persons: personID } });
};
exports.removePersonFromGroup = removePersonFromGroup;
const addGroupToSub = (groupName, subGroupName) => {
    return group_mode_1.default.updateOne({ name: groupName }, { $push: { subGroups: subGroupName } });
};
exports.addGroupToSub = addGroupToSub;
const removeSubGroup = (groupName, subGroupName) => {
    return group_mode_1.default.updateOne({ name: groupName }, { $pull: { subGroups: subGroupName } });
};
exports.removeSubGroup = removeSubGroup;
const isPesronInGroup = (groupName, personID) => {
    return group_mode_1.default.findOne({ name: groupName, persons: personID });
};
exports.isPesronInGroup = isPesronInGroup;
//# sourceMappingURL=group.service.js.map