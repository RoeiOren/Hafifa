var fs = require('fs');

if (process.argv.length < 4) { 
    throw new Error("Missing arguments");
} else {
    
    var dir = './created_files';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
    var wordsQuantity = process.argv[3];
    for (let fileNo = 1; fileNo <= process.argv[2]; fileNo++) { 

        var newFile = fs.createWriteStream(`./created_files/file${fileNo}.txt`);
        console.log(`file${fileNo}.txt: ${wordsQuantity} words`);
        for (let i = 1; i <= wordsQuantity; i++) {
            newFile.write(randomString() + " ");
        }
        wordsQuantity *= 2;
    }

}

function randomString() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }