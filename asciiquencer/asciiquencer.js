// Step 2: see https://stackoverflow.com/questions/17981437/how-to-add-event-listeners-to-an-array-of-objects to pass the i value of the checkbox status into the note

document.querySelector('button')?.addEventListener('click', async () => {
    await Tone.start();
    console.log('audio is ready');
});

/////// BPM Set ///////

window.addEventListener('load', () => {
    let bpm = 240;
    Tone.Transport.bpm.value = bpm;
});

//// BPM Change
let transport = document.querySelector('#bpm');
transport.addEventListener('input', function () {
    bpm = this.value;
    Tone.Transport.bpm.value = bpm;
});
///// Test Note Array Button
function tester() {
    console.log(notes);
    console.log(notes[0].velocity);
}
//////////////// Start Stop Init ////////////////////////
let playButton = document.getElementById('play-button');
playButton.addEventListener('click', () => {
    if (Tone.Transport.state !== 'started') {
        playButton.style.backgroundColor = 'paleGreen';
        playButton.innerHTML = 'pause';
        Tone.Transport.start();
        asciiUpdate(0);
        index = 0;
    } else {
        playButton.style.backgroundColor = 'pink';
        playButton.innerHTML = 'play';
        Tone.Transport.stop();
        index = 0;
        asciiUpdate(0);
    }
});

/////////////// Elements /////////////////////////////
const stepContainer = document.querySelector('#steps');
// const checkContainer = document.querySelector('.check-container')
const playHead = document.querySelector('#playhead');
const checks = document.querySelectorAll('#check');
const steps = 8;
let meter = document.getElementById('ascii-meter');
let meters = document.querySelectorAll('#ascii-meter');
let asciiCheck = document.querySelectorAll('#ascii-checkbox');

let max = 10;
// let bpm = 240;
const synth = new Tone.Synth().toDestination();

// Range slider note values
let sliderNotes = {
    0: 'C3',
    1: 'D3',
    2: 'E3',
    3: 'F3',
    4: 'G3',
    5: 'A3',
    6: 'B3',
    7: 'C4',
    8: 'D4',
    9: 'E4',
    10: 'F4',
};

////// Notes, value time object
let notes = [
    {
        time: '0',
        note: 'G3',
        velocity: 1,
    },
    {
        time: '0:1',
        note: 'G3',
        velocity: 1,
    },
    {
        time: '0:2',
        note: 'G3',
        velocity: 1,
    },
    {
        time: '0:3',
        note: 'G3',
        velocity: 1,
    },
    {
        time: '1:0',
        note: 'G3',
        velocity: 1,
    },
    {
        time: '1:1',
        note: 'G3',
        velocity: 1,
    },
    {
        time: '1:2',
        note: 'G3',
        velocity: 1,
    },
    {
        time: '1:3',
        note: 'G3',
        velocity: 1,
    },
];

let index = 0;

///// ASCII Animation
function asciiUpdate(step) {
    // asciiCheck[7].innerHTML = '[#]';
    if (step > 0 && step <= 8) {
        playHead.prepend('─────');
        // asciiCheck[step - 1].innerHTML = '[#]';
        // asciiCheck[step].innerHTML = '[o]';
    } else {
        playHead.innerHTML = '─>';
        // asciiCheck[step].innerHTML = '[o]';
    }
}
///// Part - To Do: move the ascii animation to its own function once it's good
let part = new Tone.Part(function (time, value) {
    let step = index % steps;
    asciiUpdate(step);
    index++;
    synth.triggerAttackRelease(value.note, '16n', time, value.velocity);
}, notes);

/////// Transport and Loop

part.start('0m');
part.loopStart = '0m';
part.loopEnd = '2m';
part.loop = true;
Tone.Transport.loopStart = '0m';
Tone.Transport.loopEnd = '2m';
Tone.Transport.loop = true;
console.log(part.length);

/// Bar animation and Step Values
stepContainer.addEventListener('input', ({ target }) => {
    if (target.type == 'range') {
        meters[target.dataset.index].innerHTML = bars(target.value); // Sets bar animation value
        notes[target.dataset.index].note = sliderNotes[target.value];
    }
    if (target.type == 'checkbox' && !target.checked) {
        notes[target.dataset.index].velocity = 0;
    } else if (target.type == 'checkbox' && target.checked) {
        notes[target.dataset.index].velocity = 1;
    }
});

stepContainer.addEventListener('change', ({ target }) => {
    if (target.type == 'checkbox' && target.checked) {
        asciiCheck[target.dataset.index].innerHTML = '[#]';
        console.log('checked');
    } else if (target.type == 'checkbox' && !target.checked) {
        asciiCheck[target.dataset.index].innerHTML = '[ ]';
        console.log('not checked');
    }
});

///////// Bar animation////////////////
function bars(v) {
    let top = ' _' + '<br>';
    let bottom = ' ^' + '<br>';
    let row = '|░|' + '<br>';
    let filled = '|▓|' + '<br>';
    return top + row.repeat(max - v) + filled.repeat(v) + filled + bottom;
}

////////// Synth Controls///////////

function init() {
    for (let i = 0; i < meters.length; i++) {
        meters[i].innerHTML = bars(5);
    }
}
init();
