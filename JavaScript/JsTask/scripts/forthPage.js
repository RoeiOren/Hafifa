window.onload = () => {
    document.getElementById("paliBtn").addEventListener("click", checkPali);
    document.getElementById("codIn").addEventListener("input", checkLetters);
    document.getElementById("encBtn").addEventListener("click", encStr);
    document.getElementById("decBtn").addEventListener("click", decStr);
}


const checkPali = () => {
    const input = document.getElementById("paliIn");
    const str = input.value;
    input.setAttribute("style", `background-color: ${isPali(str.toLowerCase()) ? 'green' : 'red'};`)
}

const isPali = (str) => {
    for(let i = 0; i < str.length / 2; i++) { 
        if (str.charAt(i) !== str.charAt(str.length - 1 - i)) {
            return false;
        }
    }

    return true;
}

// Check the only letters has been entered
const checkLetters = (event) => {
    var letters = /^[A-Za-z]+$/;
    if(!event.target.value.match(letters)) {

        //Delete the last char
        event.target.value = event.target.value.substring(0, event.target.value.length - 1);
    }
    
}


// Encrypt the input
const encStr = () => {
    const input = document.getElementById("codIn").value;
    const encAmount = document.getElementById("numIn").value;

    if (!encAmount) { 
        alert("Don't forget to enter a number !");
        return;
    }

    let encInput = "";
    let currChar = '';

    for(let i = 0; i < input.length; i++) { 
        currChar = input.charAt(i);

        //Convert to ascii
        currChar = currChar.charCodeAt(0);

        //Check if capital letter
        if (currChar <= 90) {
            currChar += parseInt(encAmount);

            // If the encrypt if out of range
            if (currChar > 90) { 
                currChar -= 25;
            }
        } else {
            currChar += parseInt(encAmount);

            // If the encrypt if out of range
            if (currChar > 122) { 
                currChar -= 25;
            }
        }
        encInput += String.fromCharCode(currChar);
    }
    document.getElementById("codIn").value = encInput;
}


// Decrypt the in put
const decStr = () => {
    const input = document.getElementById("codIn").value;
    const encAmount = document.getElementById("numIn").value;

    if (!encAmount) { 
        alert("Don't forget to enter a number !");
        return;
    }

    let encInput = "";
    let currChar = '';

    for(let i = 0; i < input.length; i++) { 
        currChar = input.charAt(i);

        //Convert to ascii
        currChar = currChar.charCodeAt(0);

        // Check if capital letter
        if (currChar <= 90) {
            currChar -= parseInt(encAmount);

            // If the decrypt if out of range
            if (currChar < 65) { 
                currChar += 25;
            }
        } else {
            currChar -= parseInt(encAmount);

            // If the decrypt if out of range
            if (currChar < 97) { 
                currChar += 25;
            }
        }
        encInput += String.fromCharCode(currChar);
    }
    document.getElementById("codIn").value = encInput;
}