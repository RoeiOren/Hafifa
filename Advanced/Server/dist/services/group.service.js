"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.presonGroups = exports.removeFatherGroup = exports.addFatherGroup = exports.groupInGroup = exports.personInGroup = exports.removeSubGroup = exports.addGroupToSub = exports.removePersonFromGroup = exports.addPersonToGroup = exports.deleteGroup = exports.addGroup = exports.getByName = exports.getById = exports.getAll = void 0;
const group_mode_1 = __importDefault(require("../models/group.mode"));
const getAll = () => {
    return group_mode_1.default.find();
};
exports.getAll = getAll;
const getById = (id) => {
    return group_mode_1.default.findOne({ _id: id });
};
exports.getById = getById;
const getByName = (name) => {
    return group_mode_1.default.findOne({ name: name });
};
exports.getByName = getByName;
const addGroup = (newGroup) => {
    return group_mode_1.default.create(newGroup);
};
exports.addGroup = addGroup;
const deleteGroup = (groupID) => {
    return group_mode_1.default.deleteOne({ _id: groupID });
};
exports.deleteGroup = deleteGroup;
const addPersonToGroup = (groupID, personID) => {
    return group_mode_1.default.updateOne({ _id: groupID }, { $push: { persons: personID } });
};
exports.addPersonToGroup = addPersonToGroup;
const removePersonFromGroup = (groupID, personID) => {
    return group_mode_1.default.updateOne({ _id: groupID }, { $pull: { persons: personID } });
};
exports.removePersonFromGroup = removePersonFromGroup;
const addGroupToSub = (groupID, subGroupID) => {
    return group_mode_1.default.updateOne({ _id: groupID }, { $push: { subGroups: subGroupID } });
};
exports.addGroupToSub = addGroupToSub;
const removeSubGroup = (groupID, subGroupID) => {
    return group_mode_1.default.updateOne({ _id: groupID }, { $pull: { subGroups: subGroupID } });
};
exports.removeSubGroup = removeSubGroup;
const personInGroup = (groupID, personID) => {
    return group_mode_1.default.findOne({ _id: groupID, persons: personID });
};
exports.personInGroup = personInGroup;
const groupInGroup = (groupID, subGroupID) => {
    return group_mode_1.default.findOne({ _id: groupID, subGroups: subGroupID });
};
exports.groupInGroup = groupInGroup;
const addFatherGroup = (groupID, fatherGroup) => {
    return group_mode_1.default.updateOne({ _id: groupID }, { fatherGroup: fatherGroup });
};
exports.addFatherGroup = addFatherGroup;
const removeFatherGroup = (groupID) => {
    return group_mode_1.default.updateOne({ _id: groupID }, { fatherGroup: 0 });
};
exports.removeFatherGroup = removeFatherGroup;
const presonGroups = (personID) => {
    return group_mode_1.default.find({ persons: personID });
};
exports.presonGroups = presonGroups;
//# sourceMappingURL=group.service.js.map