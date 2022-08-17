const api_url = 'https://api.quotable.io/random?minLength=80&maxLength=100';
const quoteSection = document.getElementById('quoteDisplay');
const userInput = document.getElementById('quoteInput');

let quoteDisplay = "";
let time = 60;
let timer = "";
let mistakes = 0;

const renderquote = async() => {
    const response = await fetch(api_url); //fetch from url

    const data = await response.json(); //stores response

    quote = data.content; //access response
    let arr = quote.split("").map(value => {
        return "<span class='quote-chars'>"+ value +"</span>" // wrap the elements in span tag
    }) // arrays of characters

    quoteSection.innerHTML += arr.join("");
    // console.log(arr);
} //displays next random quotes
console.log (quoteSection.innerHTML)

userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars"); //fetches every single element from the quotesection of renderquote

    quoteChars = Array.from(quoteChars); // creates an array for quoteChars
    
    let userInputChars = userInput.value.split(""); //splits every single letters

    quoteChars.forEach((char, index) => {
        if (char.innerText == userInputChars[index]) {
            char.classList.add("correct");
        } // if typed correctly

        else if (userInputChars[index] == null) {
            if (char.classList.contains("correct")) {
                char.classList.remove("correct");
            }
            else {
                char.classList.remove("incorrect")
            }
        } // not yet typed

        else {
            if (!char.classList.contains("incorrect")) {
                mistakes += 1;
                char.classList.add("incorrect")
            }
            document.getElementById("mistakes").innerText = mistakes;
        } // typed with mistakes

        let check = quoteChars.every((element) => {
            return element.classList.contains("correct");
        }); // by default collects all the correct values

        if (check) {
            displayResult();
        }

    }); // compares

}); // compares whether displayed and inputted quotes are correct or not


const displayResult = () => {
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop").style.display = "none"
    userInput.disabled = true;

    let timeTaken = 1;
    if (time != 1) {
        timeTaken = (60 - time) / 100
    }

    document.getElementById('speed').innerText = (userInput.value.length / 5/ timeTaken).toFixed(2) + "wpm"

    document.getElementById('accuracy').innerText = Math.round (((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%"
}


const start = () => {
    mistakes = 0;
    timer ="";
    userInput.disabled = false;
    timeReduce();
    document.getElementById('start').style.display = "none";
    document.getElementById('stop').style.display = "block";
} // start test function


function timeReduce() {
    time = 60;
    timer = setInterval(updateTimer, 1000)
} //reduce the timer 

function updateTimer() {
    if (time == 0) {
        displayResult();
    } // if time comes 0 displays the result

    else {
        document.getElementById('timer').innerHTML = --time + "s";
    }
}


window.onload = () => {
    userInput.value = "";
    document.getElementById('start').style.display = "block";
    document.getElementById('stop').style.display = "none";
    userInput.disabled = true;
    renderquote();
} // defaults when the page apperars for the first time
