const config = require('./config')
const fs = require('fs');
const manageRemoveAction = require('./deleteActions');
const manageCreateAction = require('./createActions');
const prompt = require('prompt-sync')();


const printWelcome = () => {
    console.log("Welcome !!!");
    console.log("Enter: ")
    console.log(config.REMOVE_FILE + ": to remove file");
    console.log(config.CREATE_FILE + ": to create file");
    console.log(config.WRITE_FILE + ": to write into file");
    console.log(config.CREATE_FOLDER + ": to create folder");
    console.log(config.REMOVE_FOLDER + ": to remove folder")
    console.log(config.CREATE_FILE_IN_FOLDER + ": to create a file in a specific folder");
    console.log(config.REMOVE_FILE_FROM_FOLDER + ": to remove file from a specific folder");
    console.log(config.MERGE_FILES + ": to merge to files into the first one");
    console.log(config.EXIT + ": to exit the system");
}

const getAction =  () => {
    let action;
    let exit = false;
    while (!exit) {
        console.log("");
        action = prompt("Enter action: ");
        exit = manageAction(action);
    }
}

const writeToFile = () => {
    let filename = prompt("Enter the file's name: ");
    if (!fs.existsSync(config.DIR + filename) || !fs.lstatSync(config.DIR + filename).isFile()) { 
        console.log("File doesn't exists");
    } else {
        let data = prompt("Enter the data to write: ");
        fs.appendFileSync(config.DIR + filename, data)
    }
}

const mergeFile = () => {
    let firstFile = prompt("Enter the first file's name: ");
    let secondFile = prompt("Enter the second file's name: ");
    if (!fs.existsSync(config.DIR + firstFile) || !fs.lstatSync(config.DIR + firstFile).isFile()) { 
        console.log("First file doesn't exists");
        return;
    }
    if (!fs.existsSync(config.DIR + secondFile) || !fs.lstatSync(config.DIR + secondFile).isFile()) { 
        console.log("Second file doesn't exists");
        return;
    }

    let SecondFileData = fs.readFileSync(config.DIR + secondFile);
    fs.appendFileSync(config.DIR + firstFile, SecondFileData);
    fs.rmSync(config.DIR + secondFile);
}

const manageAction = (action) => {
    action = parseInt(action);
    switch(action){
        case config.REMOVE_FILE_FROM_FOLDER:
        case config.REMOVE_FOLDER:
        case config.REMOVE_FILE:
            manageRemoveAction(action);
            return false;
        case config.CREATE_FILE:
        case config.CREATE_FOLDER:
        case config.CREATE_FILE_IN_FOLDER:
            manageCreateAction(action);
            return false;
        case config.WRITE_FILE:
            writeToFile();
            return false;
        case config.MERGE_FILES:
            mergeFile();
            return false;
        case config.EXIT:
            return true;
        default:
            console.log("You entered an invalid input, try again");
            return false;
    }
}

printWelcome();
getAction();