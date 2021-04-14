const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');

quoteInputElement.addEventListener('input', () => {
    // assign variable to the spans created in renderNewQuote()
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    // Variable for rendering new quote once complete
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
    // This makes it so you only get a new quote if everything is correct.
    // if (correct) renderNewQuote();
    if (correct) renderNewPhrase();
});

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then((response) => response.json())
        .then((data) => data.content);
}

// This part is really happening first
async function renderNewQuote() {
    // Get the quote from the getRandomQuote function
    const quote = await getRandomQuote();
    // Clear previous quote
    quoteDisplayElement.innerText = '';
    // convert random quote to array, then for each character (from previous forEach)...
    quote.split('').forEach((character) => {
        // Create a new span element
        const characterSpan = document.createElement('span');
        // Add that character as text to the element
        characterSpan.innerText = character;
        // Add it to the html element
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteInputElement.value = null; // clears
    // So every time a new quote is rendered, reset the timer
    startTimer();
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000); // divide by 1000 to convert to seconds
}
// This part is really happening first
async function renderNewPhrase() {
    // Get the quote from the getRandomQuote function
    const phrase = await getRandomPhrase();
    // Clear previous quote
    quoteDisplayElement.innerText = '';
    // convert random quote to array, then for each character (from previous forEach)...
    phrase.split('').forEach((character) => {
        // Create a new span element
        const characterSpan = document.createElement('span');
        // Add that character as text to the element
        characterSpan.innerText = character;
        // Add it to the html element
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteInputElement.value = null; // clears
    // So every time a new quote is rendered, reset the timer
    startTimer();
}

// Timer

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

renderNewQuote();
