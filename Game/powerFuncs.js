var sizeRatio;
var speedRatio;
var gravityRatio;


const getSmaller = () => {
    sizeRatio = 0.65;
}

const getBigger = () => {
    sizeRatio = 1.25;
}

const getFaster = () => {
    speedRatio = 1.25;
}

const getSlower = () => {
    speedRatio = 0.6;
}

const strongerGravity = () => {
    gravityRatio = 1.25;
}

const weakerGravity = () => {
    gravityRatio = 0.75;
}

const powersArr = [getSmaller, getBigger, getFaster, getSlower, strongerGravity, weakerGravity];

const resetAllProp = () => {
    sizeRatio = 1;
    speedRatio = 1;
    gravityRatio = 1;
} 