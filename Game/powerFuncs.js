var sizeRatio;
var speedRatio;
var gravityRatio;


const activateSmaller = () => {
    sizeRatio = 0.65;
}

const activateBigger = () => {
    sizeRatio = 1.25;
}

const activateFaster = () => {
    speedRatio = 1.25;
}

const activateSlower = () => {
    speedRatio = 0.6;
}

const activateStrongerGravity = () => {
    gravityRatio = 1.25;
}

const activateWeakerGravity = () => {
    gravityRatio = 0.75;
}

const powersArr = [activateSmaller, activateBigger, activateFaster, activateSlower, activateStrongerGravity, activateWeakerGravity];

const resetAllProp = () => {
    sizeRatio = 1;
    speedRatio = 1;
    gravityRatio = 1;
} 