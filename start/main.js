const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const time = new Date();
const currentDay = time.getDay();
timeEl.innerHTML = time.toLocaleTimeString();
dateEl.innerHTML = time.toDateString();

const day = document.querySelectorAll('.day');
document.getElementById(`${currentDay}`).style.backgroundColor = `var(--coral)`;

// today.style.backgroundColor = `$(var(--coral))`;

// today.style.backgroundColor = `$(var(--coral))`;
