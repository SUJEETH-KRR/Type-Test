const api_url = 'https://api.quotable.io/random';
const quoteDisplay = document.getElementById('quoteDisplay')
const quoteinput = document.getElementById('quoteInput')
const time = document.getElementById('timer')
const btn = document.getElementById('next')
const accuracy = document.getElementById('accuracy')

quoteinput.onkeydown = function (event) {

    if (event.which == 8 || event.which == 46) {

        event.preventDefault();   // turn off browser transition to the previous page 
    }
}; //function to disable backspace and delete options

let correct = true

var arrayquote
var arrayvalue

quoteinput.addEventListener('input', () => {
    arrayquote = quoteDisplay.querySelectorAll('span')

    arrayvalue = quoteinput.value.split('')

    correct = true

    arrayquote.forEach((characterspan, index) => {
        const character = arrayvalue[index]

        if (character == null) {
            characterspan.classList.remove('correct')
            characterspan.classList.remove('incorrect')
            correct = false
        } //not yet typed
        else if (character === characterspan.innerText) {
            characterspan.classList.add('correct')
            characterspan.classList.remove('incorrect')
            stopTimer()
            acc()
        } //typed correctly
        else {
            characterspan.classList.add('incorrect')
            characterspan.classList.remove('correct')
            correct = false
        } //wrong type
    })
    // if (correct) renderquote()
});

function next() {
    // if (correct) renderquote()
    renderquote() // next quote
    stopTimer() // start the timer from 0
} //function to provide next text

// async function randomQuote() {
//     const response = await fetch(api_url);
//     const data = await response.json();
//     return data.content;
// }

async function randomQuote() {
    const response = await fetch(api_url);
    const data = await response.json();
    return data.content;
} //function to generate random text from api

async function renderquote() {
    const quote = await randomQuote()

    console.log("Next Quote is displayed")

    quoteDisplay.innerText = ''

    quote.split('').forEach(character => {
        const characterspan = document.createElement('span')

        characterspan.classList.add('correct')

        characterspan.innerText = character
        quoteDisplay.appendChild(characterspan)
        clearacc()
        time.innerHTML = 0
    });

    quoteinput.value = null;
    // startTimer();
} //function to provide next quote after previous text is typed successfully

let startTime;
var timz;
function startTimer() {
    time.innerText = 0;
    startTime = new Date()
    timz = setInterval(() => {
        time.innerText = getTimerTime()
    }, 1000)
} //function to start timer

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
} //functiom to accurate the timer

// function checking() {
//     // const item = "keerthi";
//     let inp = quoteinput.value;
//     let disp = quoteDisplay.value;

//     if (inp === disp) {
//         stopTimer();
//     }
// } //function for stoping timer when displayed text matches typed text

function stopTimer() {
    let inp = quoteinput.value;
    let disp = quoteDisplay.value;

    if (inp === disp) {
        stopTimer();
    }
    console.log("Completed");
    clearInterval(timz);
} //function to stop timer

function acc() {
    let p = arrayquote.length;
    let q = arrayvalue.length;
    let a = Math.floor((q / p) * 100)
    accuracy.innerHTML = a
}
// let r = arrayquote.length;
// console.log(r)
function clearacc() {
    accuracy.replaceChildren()
}

renderquote()


//url stored in api_url => fetching url => then extract data.content => async function to await for next random quote => at last again await for next quote
