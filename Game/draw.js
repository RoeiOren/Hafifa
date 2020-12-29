const drawTopSpikes = () => {
    let x;
    for (let i = 0; i < 8; i++) {
        x = 96 * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 96, 0);
        ctx.lineTo((x + (96 * (i + 1))) / 2, 50);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
    }
}

const drawBottomSpikes = () => {
    let x;
    for (let i = 0; i < 8; i++) { 
        x = 96 * i;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height);
        ctx.lineTo(x + 96, canvas.height);
        ctx.lineTo((x + (96 * (i + 1))) / 2, canvas.height -50);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
    }
}

const drawWelcome = () => {
    ctx.font = "750% 'Hanalei Fill', cursive"; 
    ctx.textAlign = "center";
    ctx.fillStyle = "blue";
    ctx.fillText("WELCOME", canvas.width/2, canvas.height/4);

    ctx.font = "300% 'Hanalei Fill', cursive";
    ctx.fillStyle = "white";
    ctx.strokeText("High Score: " + localStorage.getItem("highScore"), canvas.width/2, canvas.height/2);

    ctx.font = "250% 'Hanalei Fill', cursive"; 
    ctx.textAlign = "center";
    ctx.fillStyle = "blue";
    ctx.fillText("Press any key to start", canvas.width/2, canvas.height * 0.75);

    ctx.font = "150% 'Hanalei Fill', cursive";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(!openedIns ? "Instructions" : "Close", canvas.width * 0.175, canvas.height * 0.85);
}

const drawStopMenu = () => {
    ctx.fillStyle = "gray";
    ctx.globalAlpha = 0.25;
    ctx.fillRect(canvas.width / 4, canvas.height * 0.2, canvas.width / 2, canvas.height * 0.175);
    ctx.fillRect(canvas.width / 4, canvas.height * 0.55, canvas.width / 2, canvas.height * 0.175);
    ctx.globalAlpha = 1;

    ctx.fillStyle = "red";
    ctx.font = "300% 'Hanalei Fill', cursive";
    ctx.textAlign = "center";
    ctx.fillText("Resume", canvas.width/2, canvas.height*0.3);
    ctx.fillText("Restart", canvas.width/2, canvas.height*0.65);

}

const drawScore = () => {
    ctx.font = "1250% 'Hanalei Fill', cursive";  
    ctx.textAlign = "center";
    ctx.strokeText(score, canvas.width/2, canvas.height/2);
}

const drawRightSpikes = () => {
    for (let i = 0; i < rightSpikes.length; i++) {
        ctx.beginPath();
        ctx.moveTo(rightSpikes[i].x, rightSpikes[i].y);
        ctx.lineTo(canvas.width, rightSpikes[i].y + 45);
        ctx.lineTo(canvas.width, rightSpikes[i].y - 45);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
    }
}

const drawLeftSpikes = () =>{
    for (let i = 0; i < leftSpikes.length; i++) { 
        ctx.beginPath();
        ctx.moveTo(leftSpikes[i].x, leftSpikes[i].y);
        ctx.lineTo(0, leftSpikes[i].y + 45);
        ctx.lineTo(0, leftSpikes[i].y - 45);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
    }
}

const drawInstructions = () => {
    ctx.fillStyle = "lightskyblue";

    ctx.fillRect(canvas.width / 8, canvas.height * 0.3, canvas.width * 0.75, canvas.height * 0.4);
    const msg = "INSTRUCTION \nThe goal of this game is to survive \nYou get point by touching the walls" + 
                "\nPress space to fly up \nYou will fail by touching the spikes \nThe blue rects activate a special power";
    ctx.fillStyle = "black";
    ctx.font = "175% 'Hanalei Fill', cursive";
    ctx.textAlign = "center";
    //ctx.fillText(msg, canvas.width * 0.25, canvas.height * 0.4);
    var x = canvas.width * 0.5;
    var startY = canvas.height * 0.35;
    var lineHeight = 60;
    var lines = msg.split('\n');

    for (var line = 0; line < lines.length; line++) {
        ctx.fillText(lines[line], x, startY + (line * lineHeight));
    }
}