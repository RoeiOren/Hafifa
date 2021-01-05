var fs = require('fs');
var oneLinerJoke = require('one-liner-joke');
const dotenv = require('dotenv');
dotenv.config();

var newFile = fs.createWriteStream("./jokes.txt");
var jokesAmount = process.env.JOKE_AMOUNT || 50;

const jokes = oneLinerJoke.getAllJokesWithTag(process.env.JOKE_SUBJECT).map(joke => {
    return joke.body;
})

const randomIndexes = (quantity, arrLength) => {
    const indexes = Array.from(Array(arrLength).keys());
    const pickedIndexes = [];
    for (let i = 0; i < quantity; i++) { 
        let maxIndex = indexes.length - 1;
        let minIndex = i + 1;
        let swapIndex = Math.floor(Math.random() * (maxIndex - minIndex)) + minIndex;
        let tmp = indexes[i];
        indexes[i] = indexes[swapIndex];
        indexes[swapIndex] = tmp;
        pickedIndexes.push(indexes[i]);
    }

    return pickedIndexes;
}

if (oneLinerJoke.getAllJokesWithTag(process.env.JOKE_SUBJECT).length === 0) { 
    console.log("No such subject " + process.env.JOKE_SUBJECT);
} else if (process.env.JOKE_AMOUNT < 50) { 
    console.log("Jokes amount smaller than 50");
} else if (process.env.JOKE_AMOUNT > oneLinerJoke.getAllJokesWithTag(process.env.JOKE_SUBJECT).length) { 
    console.log(`${process.env.JOKE_SUBJECT} has less jokes than ${process.env.JOKE_AMOUNT}`);
} else {
    let pickedIndexes = randomIndexes(process.env.JOKE_AMOUNT, jokes.length);
    pickedIndexes.forEach((index, indexinArray) => {
        newFile.write(jokes[index] + (indexinArray === pickedIndexes.length - 1 ? '' : '\n'));
    })
}


