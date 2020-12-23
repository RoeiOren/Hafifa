const cardsArr = [];

window.onload = () => {
    createCardsArray();
    document.getElementById("findBtn").addEventListener("click", findFunc);
    document.getElementById("greaterBtn").addEventListener("click", allGreaterFunc);
    document.getElementById("someBtn").addEventListener("click", someGreaterFunc)
    document.getElementById("manipulArrBtn").addEventListener("click", manipulateArrFunc);
}

const createCardsArray = () => {
    
    usersArray.forEach(user => {
        // Create a card with the fields
        createCard(user);
    })
}

const createCard = (user) => {
    var card = document.createElement("div");
        card.setAttribute("style", "display: none;")
        card.classList.add("card");
        var grades = "<p>Grades: ";
        user.grades.forEach(grade => {
            grades += grade + " "
        })
        grades += "</p>";
        card.innerHTML = 
        `
        <h4><b>Name: ${user.name}</b></h4>
        <p>Age: ${user.age}</p>
        ${grades}
        <p>${user.admin ? "Admin" : "Not admin"}</p>
        <p>Address: ${user.address.city}, ${user.address.houseNumber}</p>
        `
        document.getElementById("cardsDiv").appendChild(card);

        // Add to the array
        cardsArr.push(card);
}

const hideAllCards = () => {
    cardsArr.map(card => {
        card.setAttribute("style", "display: none;")
    })
}

const findFunc = () => {
    const option = document.getElementById("options").value;
    const value = document.getElementById("valIn").value; 

    if (!value) {
        alert("Please insert a value");
        return;
    }

    hideAllCards();

    switch(option) {
        case 'age':
            olderThan(value.toLowerCase());
            break;
        case 'name':
            containsName(value.toLowerCase());
            break;
        case 'admin':
            showByAdmin(value.toLowerCase());
            break;
        case 'grades':
            avgBiggerThan(value.toLowerCase());
            break;
        default:
            showByAddress(value);
            break;
    }
}


const olderThan = (age) => {
    usersArray.map((user, index) => {
        if(user.age > age) {
            cardsArr[index].setAttribute("style", "display: inline-block;");
        }
    })
    
}

const containsName = (name) => {
    usersArray.map((user, index) => {
        if (user.name.includes(name)) { 
            cardsArr[index].setAttribute("style", "display: inline-block;");
        }
    })

}

const showByAdmin = (isAdmin) => {
    const admin = isAdmin === 'true' ? true : false;
    usersArray.map((user, index) => {
        if(user.admin === admin) { 
            cardsArr[index].setAttribute("style", "display: inline-block;");
        }
    })
}

const calcAvg = (grades) => {
    const sum = grades.reduce((accumulator, currentValue) => accumulator + currentValue);
    return sum / 4;
}

const avgBiggerThan = (grade) => {
    usersArray.map((user, index) => {
        if (calcAvg(user.grades) > grade) {
            cardsArr[index].setAttribute("style", "display: inline-block;");
        }
    })
}

const showByAddress = (addressStr) => {
    if (!addressStr.includes('.')) { 
        alert("Address form isn't valid");
        return;
    }

    const arr = addressStr.split('.');

    const field = arr[0];
    const value = arr[1].toLowerCase();

    if (field === 'city') { 
        usersArray.map((user, index) => {
            if (user.address.city === value) {
                cardsArr[index].setAttribute("style", "display: inline-block;");
            }
        })
    } else {
        usersArray.map((user, index) => {
            console.log(user.address.houseNumber);
            if (user.address.houseNumber == value) {
                console.log("in");
                cardsArr[index].setAttribute("style", "display: inline-block;");
            }
        })
    }
}

const isAllGradesGreater = (grades, grade) => {
    let isValid = true;
    grades.forEach(gr => {
        if (gr <= grade) { 
            isValid = false;
        }
    })
    return isValid;
}

const allGreaterFunc = () => {
    hideAllCards();

    const grade = document.getElementById("valIn").value; 

    if (!grade) {
        alert("Please insert a value");
        return;
    }

    usersArray.map((user, index) => {
        if (isAllGradesGreater(user.grades, grade)) { 
            cardsArr[index].setAttribute("style", "display: inline-block;");
        }
    })
}

const someGradesGreater = (grades, grade) => {
    let isValid = false;
    grades.forEach(gr => {
        if (gr > grade) { 
            isValid = true;
        }
    })
    return isValid;
}

const someGreaterFunc = () => {
    hideAllCards();

    const grade = document.getElementById("valIn").value; 

    if (!grade) {
        alert("Please insert a value");
        return;
    }

    usersArray.map((user, index) => {
        if (someGradesGreater(user.grades, grade)) { 
            cardsArr[index].setAttribute("style", "display: inline-block;");
        }
    })
}


const manipulateArrFunc = () => {

    console.log(usersArray);

    hideAllCards();

    const value = document.getElementById("valIn").value;

    if (!value) {
        alert("Please insert a value");
        return;
    }

    // Array on the users' indexes than changes
    const indexesToChange = [];
    usersArray.map((user, index) => {
        if (calcAvg(user.grades) < value && user.address.houseNumber > value) { 
            indexesToChange.push(index);
        }
    })

    // Removing all the changed cards
    for(let i = indexesToChange.length - 1; i >= 0; i--) { 
        cardsArr.splice(indexesToChange[i], 1);
    }

    // Changing the users' data
    indexesToChange.forEach(index => {
        usersArray[index].age += parseInt(value);
        createCard(usersArray[index]);
    })

    // Showing the correct cards
    for(let i = cardsArr.length - indexesToChange.length; i < cardsArr.length; i++) { 
        cardsArr[i].setAttribute("style", "display: inline-block;");
    }

    // Array of the changed users
    const changedUsers = [];
    indexesToChange.forEach(index => {
        changedUsers.push(usersArray[index])
    });

    // Removing the changed users from the users' array
    for(let i = changedUsers.length - 1; i >= 0; i--) { 
        usersArray.splice(indexesToChange[i], 1);
    }

    // Adding the removed users to the end of the array
    changedUsers.forEach(user =>{
        usersArray.push(user);
    })

}