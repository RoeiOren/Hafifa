const fsx = require('fs-extra');
const fs = require('fs');

var newTxtFile = './moved_files.txt';
if (!fs.existsSync(newTxtFile)){
    fs.appendFile(newTxtFile, "", function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}

var fileStream = fs.createWriteStream(newTxtFile);

var dir = './moved_files/';
if (fs.existsSync(dir)){
    fsx.removeSync(dir);
}

fsx.moveSync('./files_to_move/', dir);

fs.mkdirSync('./files_to_move');

const readFiles = (dir) => {
    fs.readdirSync(dir).forEach(file => {
        if (fs.lstatSync(dir + file).isDirectory()) { 
            fileStream.write('folder: ' + file + '\n');
            console.log('folder: ' + file);
            readFiles(dir + file + '/')
        } else {
            fileStream.write('file: ' + file + '\n');
            console.log('file: ' + file);
        }
    })
}

readFiles('./moved_files/');