window.onload = () => {
    document.getElementById("fibBtn").addEventListener("click", showFib);
    document.getElementById("triBtn").addEventListener("click", drawTri);
}

const showFib = () => {
    let numOfElems = document.getElementById("fibIn").value;
    let fibTxt = "";
    for(let i = 0; i < numOfElems; i++) {
        fibTxt += calcFib(i) + ", ";
    }
    fibTxt = fibTxt.substring(0, fibTxt.length - 2);
    document.getElementById("seriestxt").innerHTML = `<b>${fibTxt}</b>`;
}

const calcFib = (index) => {
    if (index <= 0) { 
        return 0;
    }
    if (index === 1) { 
        return 1;
    }
    return calcFib(index - 1) + calcFib(index - 2);
}

const drawTri = () => {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    
    let x = canvas.width / 2;
    let y = 0;
    const size = document.getElementById("sizeIn").value * 100;
    const depth = document.getElementById("depthIn").value;

    // Darw the big black triangle
    context.beginPath();
    context.moveTo(x, y);

    // The left diognal
    context.lineTo(x - (size/2), y + size/2 * Math.sqrt(3));
    // The base diagonal
    context.lineTo(x + (size/2), y + size/2 * Math.sqrt(3));
    //Back to start point
    context.lineTo(x,y);
    context.closePath();

    context.fillStyle = "black";
    context.fill();

    // Removing all the small triangles
    removeTris(x, y + size/2 * Math.sqrt(3), size, depth);

}


const removeTris = (x, y, size, depth) => {

    if (depth > 0) { 
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext("2d");

        context.beginPath();
        // Start - middle of the base
        context.moveTo(x,  y);
        // The left diognal
        context.lineTo(x - (size/4), y - (size/2 * Math.sqrt(3) / 2));
        // The base
        context.lineTo(x + (size/4), y - (size/2 * Math.sqrt(3) / 2)) ;
        // Back to start point
        context.lineTo(x, y);
        context.closePath();

        context.fillStyle = "white";
        context.fill();

        removeTris(x, y - (size/2 * Math.sqrt(3) / 2), size / 2, depth - 1);
        removeTris(x - (size / 4), y, size / 2, depth - 1);
        removeTris(x + (size / 4), y, size / 2, depth - 1);
    }
}