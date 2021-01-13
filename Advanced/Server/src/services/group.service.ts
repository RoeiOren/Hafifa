import groupModel from '../models/group.mode';

export const getAll = () => {
    return groupModel.find();
}

export const getById = (id: number) => {
    return groupModel.findOne({_id: id});
}

export const getByName = (name: string) => {
    return groupModel.findOne({name: name});
}

export const addGroup = (newGroup: any) => {
    return groupModel.create(newGroup);
}

export const deleteGroup = (groupID: number) => {
    return groupModel.deleteOne({_id: groupID});
}

export const addPersonToGroup = (groupID: number, personID: number) => {
    return groupModel.updateOne({_id: groupID}, {$push: {persons: personID}});
}

export const removePersonFromGroup = (groupID: number, personID: number) => {
    return groupModel.updateOne({_id: groupID}, {$pull: {persons: personID}});
}

export const addGroupToSub = (groupID: number, subGroupID: number) => {
    return groupModel.updateOne({_id: groupID}, {$push: {subGroups: subGroupID}});
}

export const removeSubGroup = (groupID: number, subGroupID: number) => {
    return groupModel.updateOne({_id: groupID}, {$pull: {subGroups: subGroupID}});
}

export const personInGroup = (groupID: number, personID: number) => {
    return groupModel.findOne({_id: groupID, persons: personID});
}

export const groupInGroup = (groupID: number, subGroupID: number) => {
    return groupModel.findOne({_id: groupID, subGroups: subGroupID});
}

export const addFatherGroup = (groupID: number, fatherGroup: number) => {
    return groupModel.updateOne({_id: groupID}, {fatherGroup: fatherGroup});
}

export const removeFatherGroup = (groupID: number) => {
    return groupModel.updateOne({_id: groupID}, {fatherGroup: 0});
}

export const presonGroups = (personID: number) => {
    return groupModel.find({persons: personID});
}