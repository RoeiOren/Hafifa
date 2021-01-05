const fs = require('fs');
const config = require('./config');
const prompt = require('prompt-sync')();


const createFile = () => {
    let filename = prompt("Enter new file's name: ");
    if (fs.existsSync(config.DIR + filename) && fs.lstatSync(config.DIR + filename).isFile()) { 
        console.log('File with this name already exists');
    } else {
        fs.open(config.DIR + filename, 'w', (err, res) => {
            if (err) throw err;
            console.log("File created!");
        })
    }
}

const createFolder = () => { 
    let folderName = prompt("Enter new folder's name: ");
    if (fs.existsSync(config.DIR + folderName) && fs.lstatSync(config.DIR + folderName).isDirectory()) { 
        console.log("Folder with this name already exists");
    } else {
        fs.mkdirSync(config.DIR + folderName);
        console.log("Folder created !");
    }
}


const createFileInFolder = () => { 
    const filename = prompt("Enter new file's name: ");
    const folderName = prompt("Enter the file's folder: ");
    if (fs.existsSync(`${config.DIR}${folderName}/${filename}`) 
        && fs.lstatSync(`${config.DIR}${folderName}/${filename}`).isFile()) { 
            console.log("File already exists");
    } else {
        fs.open(`${config.DIR}${folderName}/${filename}`, 'w', (err, res) => {
            if (err) throw err;
            console.log("File created!");
        })
    }
}

const manageCreateAction = (action) => {
    switch (action) { 
        case (config.CREATE_FILE):
            createFile();
            break;
        case config.CREATE_FOLDER:
            createFolder();
            break;
        case config.CREATE_FILE_IN_FOLDER:
            createFileInFolder();
            break;
    }
}

module.exports = manageCreateAction;