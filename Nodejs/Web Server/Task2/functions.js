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

module.exports = { checkAllPrime, getNFirstPrimes };