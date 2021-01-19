import personModel from '../models/person.model';

export const getAll = () => {
    return personModel.find();
}

export const getById = (id: string) => {
    return personModel.findOne({_id: id});
}

export const getByFirstNameAndLastName = (firstName: string, lastName: string) => {
    return personModel.findOne({firstName: firstName, lastName: lastName});
}

export const addPerson = (newPerson: any) => {
    return personModel.create(newPerson);
}

export const deletePerson = (personToDelete: any) => {
    return personModel.deleteOne({ firstName:  personToDelete.firstName, lastName: personToDelete.lastName});
}

export const getByPhoneNumber = (phoneNumber: string) => {
    return personModel.findOne({phoneNumber: phoneNumber});
}