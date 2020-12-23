window.onload = () => {

    document.getElementById("addBtn").addEventListener('click', addCard);
    const delBtns = document.querySelectorAll(".delBtn");
    delBtns.forEach(btn => {
        console.log(btn);
        btn.style.display = "none";
    })


    // Initialize the array
    if(!localStorage.getItem("cardsArr")){
        localStorage.setItem("cardsArr", JSON.stringify([]));
    } else {
        // Create the saved cards
        const cardsArr = JSON.parse(localStorage.getItem("cardsArr"));
        localStorage.setItem("cardsArr", JSON.stringify([]));
        cardsArr.map(cardProps => {
            createCard(cardProps.name, cardProps.prof, cardProps.email);
        })
    }

}

const DEF_VALID_EMAIL = "valid@email.com"

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Create a card
const createCard = (name, prof, email) => {
    var card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = 
    `
      <button class="delBtn">X</button>
      <h4><b>Name: ${name}</b></h4>
      <p>Proffesion: ${prof}</p>
      <p>Email: ${email}</p>
      `
    
    document.getElementById("cardDiv").appendChild(card);

    // The new button (most recent)
    const newButton = document.querySelectorAll(".delBtn")[document.querySelectorAll(".delBtn").length - 1];
    newButton.addEventListener('click', delCard);

    // Add to the localStorage Array
    const cardsArr = JSON.parse(localStorage.getItem("cardsArr"));
    const cardProps = {
        name: name, 
        prof: prof,
        email: email
    }
    cardsArr.push(cardProps);
    localStorage.setItem("cardsArr", JSON.stringify(cardsArr));

}

// Check if the fields are valid
const validFields = (name, prof, email) => {
    if (!name || !prof || !email) { 
        alert("Missing one or more fields");
        return false;
    }

    if(name.length < 2) { 
        alert("Name too short");
        return false;
    }

    return true;
}


// Adding card after the add button pressed
const addCard = () => {
    let name = document.getElementById("nameIn").value;
    let prof = document.getElementById("profIn").value;
    let email = document.getElementById("emailIn").value;

    if (!validFields(name, prof, email)) { 
        return;
    }

    if (!validateEmail(email)) {
        email = DEF_VALID_EMAIL;
    }

    prof = prof.replace("פקיד", "");

    createCard(name, prof, email);
}

const showDelBtn = (event) => {
    const card = event.target;
    const btn = card.childNodes[1];
    btn.setAttribute("style", "visibility: visible");
}

const removeDelBtn = (event) => {
    const card = event.target;
    const btn = card.childNodes[1];
    btn.setAttribute("style", "visibility: hidden");
}

const delCard = (event) => {
    // Get the card
    const cardToDel = event.path[1];

    // Get only the card properties (about the human)
    const cardProps = [];
    cardToDel.childNodes.forEach(tag => {
        if (tag.innerText && tag.innerText.includes(":")) {
            cardProps.push(tag.innerText);
        }
    })

    // Removing the title of the field
    for(let i = 0; i < cardProps.length; i++) { 
        const index = cardProps[i].indexOf(" ");
        cardProps[i] = cardProps[i].substring(index + 1);
    }

    const name = cardProps[0];
    const prof = cardProps[1];
    const email = cardProps[2];

    const cardsArr = JSON.parse(localStorage.getItem("cardsArr"));

    // Find the card in the localStorage array
    const found = cardsArr.find(elem => elem.name === name && elem.prof === prof && elem.email === email);
    const index = cardsArr.indexOf(found);
    cardsArr.splice(index, 1);

    localStorage.setItem("cardsArr", JSON.stringify(cardsArr));

    cardToDel.remove();

}