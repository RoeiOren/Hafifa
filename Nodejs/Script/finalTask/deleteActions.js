const fs = require('fs');
const config = require('./config');
const prompt = require('prompt-sync')();
const rimraf = require('rimraf');

const removeFile = () =>  {
    const filename = prompt("Enter file to remove: ");
    if (fs.existsSync(config.DIR + filename) && fs.lstatSync(config.DIR + filename).isFile()) { 
        fs.rmSync(config.DIR + filename);
        console.log('File removed');
    } else {
        console.log("File doesn't exist");
    }
}

const removeFolder = () => {
    const folderName = prompt("Enter folder to remove: ");
    if (fs.existsSync(config.DIR + folderName) && fs.lstatSync(config.DIR + folderName).isDirectory()) { 
        rimraf.sync(config.DIR + folderName);
        console.log('Folder removed');
    } else {
        console.log("Folder doesn't exist");
    }
}

const removeFileFromFolder = () => {
    const filename = prompt("Enter file to remove: ");
    const folderName = prompt("Enter the file's folder: ");
    if (fs.existsSync(`${config.DIR}${folderName}/${filename}`) 
        && fs.lstatSync(`${config.DIR}${folderName}/${filename}`).isFile()) { 
        fs.rmSync(`${config.DIR}${folderName}/${filename}`);
        console.log("File removed from folder");
    } else {
        console.log("File + folder directory doesn't exist");
    }
}

const manageRemoveAction = (action) => {
    switch (action) { 
        case (config.REMOVE_FILE):
            removeFile();
            break;
        case config.REMOVE_FOLDER:
            removeFolder();
            break;
        case config.REMOVE_FILE_FROM_FOLDER:
            removeFileFromFolder();
            break;
    }

}

module.exports = manageRemoveAction;
