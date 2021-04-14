import { phrases } from './phrases.js';

// DOM
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');

// TIMER
function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000); // divide by 1000 to convert to seconds
}

let startTime;
function startTimer() {
    timerElement.innerText = 0;
    // We are using the real time as a reference so that setInterval() is exact
    startTime = new Date();
    setInterval(() => {
        // Call the getTimerTime function and have it display in page
        timer.innerText = getTimerTime();
    }, 1000);
}

// Get random phrase from phrases[]
function getRandomPhrase() {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    return phrase;
}
// Correct/Incorrect character logic
quoteInputElement.addEventListener('input', () => {
    // assign variable to the spans created in renderNewPhrase()
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    // Variable for rendering new phrase once complete
    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        } else if (character == characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incrorect');
        } else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.add('correct');
            correct = false;
        }
    });
    // If the text is correct, create a new phrase
    if (correct) renderNewPhrase();
});

function renderNewPhrase() {
    // Get the phrase from the getRandomPhrase function
    const phrase = getRandomPhrase();
    // Clear previous quote
    quoteDisplayElement.innerText = '';
    // convert random phrase to array, then create span element for each character
    phrase.split('').forEach((character) => {
        // Create a new span element
        const characterSpan = document.createElement('span');
        // Add that character as text to the span element
        characterSpan.innerText = character;
        // Add the span to the html element
        quoteDisplayElement.appendChild(characterSpan);
    });
    // clears
    quoteInputElement.value = null;
    // Every time a new quote is rendered, reset the timer
    startTimer();
}
renderNewPhrase();
