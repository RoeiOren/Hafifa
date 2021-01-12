import groupModel from '../models/group.mode';

export const getAll = () => {
    return groupModel.find();
}

export const getById = (id: string) => {
    return groupModel.find({_id: id});
}

export const getByName = (name: string) => {
    return groupModel.find({name: name});
}

export const addGroup = (newGroup: any) => {
    return groupModel.create(newGroup);
}

export const deleteGroup = (groupName: string) => {
    return groupModel.remove({name: groupName});
}

export const addPersonToGroup = (groupName: string, personID: number) => {
    return groupModel.updateOne({name: groupName}, {$push: {persons: personID}});
}

export const removePersonFromGroup = (groupName: string, personID: number) => {
    return groupModel.updateOne({name: groupName}, {$pull: {persons: personID}});
}

export const addGroupToSub = (groupName: string, subGroupName: string) => {
    return groupModel.updateOne({name: groupName}, {$push: {subGroups: subGroupName}});
}

export const removeSubGroup = (groupName: string, subGroupName: string) => {
    return groupModel.updateOne({name: groupName}, {$pull: {subGroups: subGroupName}});
}