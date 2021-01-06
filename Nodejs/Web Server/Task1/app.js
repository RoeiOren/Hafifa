var http = require('http');
const url = require('url');
const config = require('./config');


const isPrime = (number) => {
    for (let i = 2; i <= Math.sqrt(number); i++){
        if (number % i === 0) { 
            return false;
        }
    }

    return true;
}

const checkAllPrime = (arr) => {
    for (let i = 0; i < arr.length; i++) { 
        if (!isPrime(arr[i])) { 
            return false;
        }
    }

    return true;
}

const getNFirstPrimes = (amount) => {
    let arr = [];
    if (amount < 1) { 
        return arr;
    }
    if (amount > 32) { 
        amount = 32;
    }
    let currNumber = 2;
    while (arr.length <= amount) { 
        if (isPrime(currNumber)) { 
            arr.push(currNumber);
        }
        currNumber++;
    }
    return arr;
}

//create a server object:
http.createServer((req, res) => {

    if(req.url === "/api/numbers/prime/validate" && req.method === "POST") { 
        req.on('data', (data) => {
            const ans = checkAllPrime(JSON.parse(data));
            res.end(JSON.stringify(ans));
        })
    } else if ("/api/numbers/prime"){ 
        const queryObject = url.parse(req.url,true).query;
        res.end(JSON.stringify(getNFirstPrimes(queryObject.amount)));
    }


}).listen(process.env.SERVER_PORT || config.SERVER_PORT);