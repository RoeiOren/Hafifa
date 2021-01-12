import personModel from '../models/person.model';

export const getAll = () => {
    return personModel.find();
}

export const getById = (id: string) => {
    return personModel.findOne({_id: id});
}

export const getByFirstName = (firstName: string) => {
    return personModel.find({firstName: firstName});
}

export const getByFirstNameAndLastName = (firstName: string, lastName: string) => {
    return personModel.findOne({firstName: firstName, lastName: lastName});
}

export const addPerson = (newPerson: any) => {
    return personModel.create(newPerson);
}

export const deletePerson = (personToDelete: any) => {
    return personModel.remove({ firstName:  personToDelete.firstName, lastName:personToDelete.lastName});
}