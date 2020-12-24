// -------------------- 1 -------------------------
// A
const messageInfo = (str) => {
    return new Promise((resolve, reject) => {
        resolve("message info: " + str);
    })
}

// B
const isGood = (str) => {
    return new Promise((resolve, reject) => {
        if (str === 'good') { 
            resolve('ok');
        } else {
            reject(new Error("the message is incorrect"));
        }
    })
}

// C
const compareNumbers = (firstNum, secondNum) => {
    return new Promise((resolve, reject) => {
        if (!firstNum || !secondNum) { 
            reject("Wrong input");
        } else if (isNaN(firstNum) || isNaN(secondNum)) {
            reject("Wrong input");
        }
        resolve(`${firstNum > secondNum ? "First" : "Second"} number is bigger`);
    })
}

// -------------------- 2 -------------------------
const secFunc = async () => {

    //Async/await solution
    let isOk = await isGood("good");
    console.log(isOk);
    let info = await messageInfo("roei oren");
    console.log(info);
    let biggerMsg = await compareNumbers(5, 6);
    console.log(biggerMsg);

    // Promise.all solution
    // const promises = [isGood("good"), messageInfo("roei oren"), compareNumbers(5, 6)];
    // Promise.all(promises)
    //     .then(msgs => {
    //         msgs.map(msg => {
    //             console.log(msg);
    //         })
    //     })
}

// -------------------- 3 -------------------------
const thirdFunc = async () => {
    try {
        let biggerMsg = await compareNumbers('3', 6);
        console.log(biggerMsg);
    } catch(err) {
        console.log(err.message);
    }
    try {
        let isOk = await isGood("no good");
        console.log(isOk);
    } catch (err) {
        console.log(err.message);
    }
}

// -------------------- 4 ------------------------
const forthFunc = async () => {
    let info = await messageInfo("roei oren");
    console.log(info);
    let isOk = await isGood("good");
    console.log(isOk);
    let biggerMsg = await compareNumbers(5, 6);
    console.log(biggerMsg);
}


const runAll = async () => {
    await secFunc();
    console.log('-------------------------');
    await thirdFunc();
    console.log('-------------------------');
    await forthFunc();
}

runAll();