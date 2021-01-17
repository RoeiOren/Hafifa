import groupModel from '../models/group.mode';

export const getAll = () => {
    return groupModel.find();
}

export const getById = (id: string) => {
    return groupModel.findOne({_id: id});
}

export const getByName = (name: string) => {
    return groupModel.findOne({name: name});
}

export const addGroup = (newGroup: any) => {
    return groupModel.create(newGroup);
}

export const deleteGroup = (groupID: string) => {
    return groupModel.deleteOne({_id: groupID});
}

export const addPersonToGroup = (groupID: string, personID: string) => {
    return groupModel.updateOne({_id: groupID}, {$push: {persons: personID}});
}

export const removePersonFromGroup = (groupID: string, personID: string) => {
    return groupModel.updateOne({_id: groupID}, {$pull: {persons: personID}});
}

export const addGroupToSub = (groupID: string, subGroupID: string) => {
    return groupModel.updateOne({_id: groupID}, {$push: {subGroups: subGroupID}});
}

export const removeSubGroup = (groupID: string, subGroupID: string) => {
    return groupModel.updateOne({_id: groupID}, {$pull: {subGroups: subGroupID}});
}

export const personInGroup = (groupID: string, personID: string) => {
    return groupModel.findOne({_id: groupID, persons: personID});
}

export const groupInGroup = (groupID: string, subGroupID: string) => {
    return groupModel.findOne({_id: groupID, subGroups: subGroupID});
}

export const addFatherGroup = (groupID: string, fatherGroup: string) => {
    return groupModel.updateOne({_id: groupID}, {fatherGroup: fatherGroup});
}

export const removeFatherGroup = (groupID: string) => {
    return groupModel.updateOne({_id: groupID}, {fatherGroup: 0});
}

export const personGroups = (personID: string) => {
    return groupModel.find({persons: personID});
}