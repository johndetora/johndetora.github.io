import { themeSelector } from './theme-select.js';
import { synth, delay, filter, crossFade, lfo, toFilt, reverb, gain, modGain, toModIndex } from './synth-objects.js';
import { synthParamController } from './synth-controls.js';

themeSelector(); // Controls selected skin
reverb.generate(); // This generates the reverb's impulse response via Tone.js

//TODO: Refactor this to its own function.  Add web browser check
let OSName = 'Unknown OS';
if (navigator.appVersion.indexOf('Win') != -1) OSName = 'Windows';
if (navigator.appVersion.indexOf('Mac') != -1) OSName = 'MacOS';
else OSName = 'Linux (probably)';
console.log('Your OS: ' + OSName);
const overlay = document.querySelector('.overlay');
if (navigator.appVersion.indexOf('Win') != -1) {
    overlay.style.left = '-103px';
}

// ------------------------- //
//    Transport / Init       //
// ------------------------- //
//Audio play confirmation - needed because of autoplay policy
document.querySelector('button')?.addEventListener('click', async () => {
    await Tone.start();
});

//////////////// Start Stop Init ////////////////////////
//  Starts transport and initializes certain animations like playhead and spin //
//TODO: add space key to play/pause
let playButton = document.getElementById('play-button');
playButton.addEventListener('click', async () => {
    await Tone.start();
    const asciiPlay = '[play]';
    const asciiPause = '[pause]';
    if (Tone.Transport.state !== 'started') {
        playButton.innerText = asciiPause;
        Tone.Transport.start();
        animateLFO(0);
        playHeadUpdate(0);
        index = 0;
    } else {
        playButton.innerText = asciiPlay;
        playHead.innerText = '';
        Tone.Transport.stop();
        index = 0;
    }
});
// Initialization of bpm and ascii meters
window.addEventListener('load', () => {
    initVerticalControls();
    initHorizontalControls();
    let bpm = transport.value;
    Tone.Transport.bpm.value = bpm;
});

// BPM Change input
let transport = document.querySelector('#bpm');
transport.addEventListener('input', function () {
    let bpm = this.value;
    Tone.Transport.bpm.value = bpm;
});

// ------------------------- //
//         Variables         //
// ------------------------- //

//TODO: See which ones can go into their own functions
const synthControls = document.querySelector('#synth-container');
const fxControls = document.querySelector('#fx-container');
const stepContainer = document.querySelector('#steps');
const playHead = document.querySelector('#playhead');
const noteMeters = document.querySelectorAll('#ascii-meter');
const asciiRepeater = document.querySelectorAll('#ascii-repeater');
let steps = 8; // Total step length

// ------------------------- //
//         Routing           //
// ------------------------- //

synth.chain(gain, crossFade.a);
synth.modulationEnvelope.chain(modGain, crossFade.b);
crossFade.connect(filter);
filter.connect(delay);
delay.connect(reverb);
reverb.toDestination(0.8);
lfo.connect(toFilt);
toFilt.connect(filter.frequency);
// Connect LFO to mod index
// lfo.connect(toFreqRatio);/notes
toModIndex.connect(synth.modulationIndex);

// ------------------------- //
//        Note Data          //
// ------------------------- //

/// SCALES /////
const chromaticScale = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4'];
const majorScale = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4'];
const minorScale = ['C3', 'D3', 'D#3', 'F3', 'G3', 'G#3', 'A#3', 'C4', 'D4', 'D#4', 'F4', 'G4', 'G#4'];
const pentScale = ['C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5'];
const scales = [majorScale, minorScale, pentScale, chromaticScale, randomNoteScale(chromaticScale)];
let currentScale = majorScale;

//TODO: figure out a way to make scale selection, seq mode, and note entry functions work together
function randomNoteScale(scale) {
    const array = [];
    for (let i = 0; i < scale.length; i++) {
        const random = Math.floor(Math.random() * scale.length);
        array.push(chromaticScale[random]);
    }
    return array;
}

/// Scale set logic

const scaleSelect = document.getElementById('scale-select');
scaleSelect.addEventListener('click', scaleSet);
let scaleIndex = 0; // Should be global
function scaleSet() {
    let currentNotes = document.querySelectorAll('.meter');
    scaleIndex++;
    if (scaleIndex === scales.length) scaleIndex = 0; // counter resets to 0
    currentScale = scales[scaleIndex];
    // Loop through the current note object and set the notes to the current slider values
    for (let i = 0; i < currentNotes.length; i++) {
        // Note at meter index = major scale note at index of 1-8
        notes[i].note = currentScale[currentNotes[i].value];
        // // Set opposite side note for reverse mode
        notes[15 - i].note = notes[i].note;
    }
    // DOM
    //TODO: change to innertext
    if (currentScale === scales[0]) scaleSelect.innerText = '[scale: major]';
    if (currentScale === scales[1]) scaleSelect.innerText = '[scale: minor]';
    if (currentScale === scales[2]) scaleSelect.innerText = '[scale: pent]';
    if (currentScale === scales[3]) scaleSelect.innerText = '[scale: chrom]';
    if (currentScale === scales[4]) scaleSelect.innerText = '[scale: random]';
}

// Helper
// window.addEventListener('click', helper);

function helper() {
    console.log(currentScale);
    console.log(notes);
}

let notes = [
    {
        // Step 1
        time: '0:0:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },

    {
        // Step 2
        time: '0:1:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 3
        time: '0:2:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },

    {
        // Step 4
        time: '0:3:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 5
        time: '1:0:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 6
        time: '1:1:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 7
        time: '1:2:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 8
        time: '1:3:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    // // Added
    {
        // Step 9
        time: '2:0:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },

    {
        // Step 10
        time: '2:1:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 11
        time: '2:2:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },

    {
        // Step 12
        time: '2:3:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 13
        time: '3:0:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 14
        time: '3:1:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 15
        time: '3:2:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 16
        time: '3:3:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
];

// ------------------------- //
//     Play Sequence         //
// ------------------------- //

let index = 0; // Never change this.  It is the global reference for each step

let part = new Tone.Part((time, value) => {
    let step = index % steps;
    if (value.repeat === 0) {
        synth.triggerAttackRelease(value.note, value.timing, time, value.velocity);
    }
    if (value.repeat === 1) {
        // Can try setting the decay to a low value before this, and then setting it back after the notes play
        synth.triggerAttackRelease(value.note, '32n', time, value.velocity);
        synth.triggerAttackRelease(value.note, '32n', time + 0.1, value.velocity);
    }
    if (value.repeat === 2) {
        synth.triggerAttackRelease(value.note, '48n', time, value.velocity);
        synth.triggerAttackRelease(value.note, '48n', time + 0.075, value.velocity);
        synth.triggerAttackRelease(value.note, '48n', time + 0.15, value.velocity);
    }
    if (value.repeat === 3) {
        synth.triggerAttackRelease(value.note, '64n', time, value.velocity);
        synth.triggerAttackRelease(value.note, '64n', time + 0.05, value.velocity);
        synth.triggerAttackRelease(value.note, '64n', time + 0.1, value.velocity);
        synth.triggerAttackRelease(value.note, '64n', time + 0.15, value.velocity);
    }
    playHeadUpdate(step);
    index++;
}, notes);

/////// Transport and Loop ////////////
part.start('0m');
part.loopStart = '0m';
part.loopEnd = '2m';
part.loop = true;

Tone.Transport.loopStart = '0m';
Tone.Transport.loopEnd = '4m';
Tone.Transport.loop = true;

// ------------------------- //
//   Sequencer User Input    //
// ------------------------- //

// Notes and Repeats
stepContainer.addEventListener('input', ({ target }) => {
    // Note Sliders
    if (target.className === 'meter') {
        let reverse = 15 - target.dataset.index;
        // className == Meter so that the repeater slider isn't targeted
        noteMeters[target.dataset.index].innerHTML = drawNoteMeters(target.value); // Sets bar animation value
        notes[target.dataset.index].note = currentScale[target.value];
        notes[reverse].note = currentScale[target.value];
    }
    if (target.className === 'repeater-range') {
        notes[target.dataset.index].repeat = parseInt(target.value);
        repeatAnim(target);
    }
});

// Repeater ascii-animation. There's probably a better way to do this but it works.
function repeatAnim(target) {
    let repeats = parseInt(target.value);
    const empty = '│-│' + '<br>';
    let arrowUp = '│-│↑' + '<br>';
    let arrowDown = '│-│↓' + '<br>';
    let arrowUpFilled = '│o│↑' + '<br>';
    let arrowDownFilled = '│o│↓' + '<br>';
    const filled = '│o│' + '<br>';
    // Don't render the arrows on the last step
    if (parseInt(target.dataset.index) === 7) {
        console.log(target);
        arrowUp = empty;
        arrowDown = empty;
        arrowUpFilled = filled;
        arrowDownFilled = filled;
    }
    if (repeats === 0) asciiRepeater[target.dataset.index].innerHTML = empty + arrowUp + arrowDown + filled;
    if (repeats === 1) asciiRepeater[target.dataset.index].innerHTML = empty + arrowUp + arrowDownFilled + empty;
    if (repeats === 2) asciiRepeater[target.dataset.index].innerHTML = empty + arrowUpFilled + arrowDown + empty;
    if (repeats === 3) asciiRepeater[target.dataset.index].innerHTML = filled + arrowUp + arrowDown + empty;
}

// Snooze Checks
stepContainer.addEventListener('change', ({ target }) => {
    const asciiCheck = document.querySelectorAll('#ascii-checkbox');
    if (target.type == 'checkbox' && target.checked) {
        // Turns step 'on'
        notes[target.dataset.index].velocity = 1;
        // UI Update
        asciiCheck[target.dataset.index].style.color = 'var(--checksOn)';
        asciiRepeater[target.dataset.index].style.color = 'var(--repeaterOn)';
        noteMeters[target.dataset.index].style.color = 'var(--metersOn)';
    } else if (target.type == 'checkbox' && !target.checked) {
        // Turns step 'off'
        notes[target.dataset.index].velocity = 0;
        // UI Update
        noteMeters[target.dataset.index].style.color = 'var(--off)';
        asciiRepeater[target.dataset.index].style.color = 'var(--off)';
        asciiCheck[target.dataset.index].style.color = 'var(--off)';
    }
});

// Sequence mode
//TODO: refactor and add add array of modes like in scale select
function setSeqMode() {
    const ASCII_FORWARD = '[ --> ]';
    const ASCII_PENDULUM = '[ <--> ]';
    const modeBtn = document.getElementById('seq-mode');
    let pendulum = false;
    modeBtn.addEventListener('click', e => {
        pendulum = !pendulum;
        if (pendulum === true) {
            modeBtn.innerText = ASCII_PENDULUM;
            part.loopEnd = '4m';
            steps = 16;
        } else {
            modeBtn.innerText = ASCII_FORWARD;
            part.loopEnd = '2m';
            steps = 8;
        }
    });
}
setSeqMode();
// ------------------------- //
//       Animations          //
// ------------------------- //

///// ASCII Playhead Animation
function playHeadUpdate(step) {
    let headFwd = '>';
    let headBack = '<';
    let tail = '──────';
    let space = '&nbsp'.repeat(6);
    // Draw Forward
    if (step === 0) playHead.innerHTML = headFwd;
    if (step > 0 && step <= 7) playHead.innerHTML = tail.repeat(step) + headFwd;
    // Draw Backward
    if (step === 8) playHead.innerHTML = space.repeat(15 - step) + headBack;
    if (step === 15) playHead.innerHTML = headBack + tail.repeat(step - 8);
    if (step > 8 && step < 15) {
        playHead.innerHTML = '';
        playHead.innerHTML = space.repeat(15 - step) + headBack + tail.repeat(step - 8);
    }
}
///////  UpdateMeters  ////////
function drawNoteMeters(inputVal) {
    const BARS_MAX = 12; // Max slider value for note meters
    let top = '_' + '<br>';
    let bottom = '^' + '<br>';
    let row = '|░|' + '<br>';
    let filled = '|▓|' + '<br>';
    return top + row.repeat(BARS_MAX - inputVal) + filled.repeat(inputVal) + filled + bottom;
}

///////  Spin  ////////
function animateLFO(index) {
    const ASCII_SPIN = ['&ndash;', '/', '|', '\\']; // Backward Spin
    document.getElementById('ascii-lfo-spin').innerHTML = ASCII_SPIN[index];
    let inputSlider = document.getElementById('lfo-rate');
    let frequency = inputSlider.value;
    // Call the update function after 1 second / frequency (Hz).
    setTimeout(function () {
        if (Tone.Transport.state === 'started') {
            animateLFO((index + 1) % ASCII_SPIN.length);
        }
    }, 500 / frequency);
}

// ------------------------- //
//    Slider Animations      //
// ------------------------- //
/////// Horizontal Slider Animation ////////
//TODO: add special classes so that we can target the controls and initialize the renders on load
const tempoMeter = document.getElementById('ascii-bpm');
transport.addEventListener('input', ({ target }) => {
    console.log(target.value);
    let block = '▓';
    let pipe = '|';
    let equals = '═';
    let linesAmount = parseInt(target.value / 20);
    tempoMeter.innerHTML = pipe.repeat(linesAmount - 1) + block + equals.repeat(25 - linesAmount) + ` ${pipe}`; // ' |'
});

// Synth/FX control slider animations
function drawHorizontalControls(e) {
    let target = e.target;
    let block = '▓';
    let pipe = '|';
    let dash = '-';
    let factor = 31;
    let linesAmount = parseInt((factor / target.max) * target.value);
    if (target.id === 'crossfader') {
        let linesAmount = parseInt((18 / target.max) * target.value);
        document.getElementById(target.dataset.ascii).innerText = pipe.repeat(linesAmount) + block + pipe.repeat(18 - linesAmount) + pipe;
    } else if (target.id === 'harmonicity') {
        let linesAmount = parseInt((18 / target.max) * target.value);
        document.getElementById(target.dataset.ascii).innerText = pipe.repeat(linesAmount) + block + pipe.repeat(18 - linesAmount) + pipe;
        document.getElementById('ascii-harmonicity-num').innerHTML = pipe + parseFloat(target.value).toFixed(1) + pipe;
    } else if (target.id !== 'glide') {
        document.getElementById(target.dataset.ascii).innerText = pipe + pipe.repeat(linesAmount) + block + dash.repeat(31 - linesAmount) + pipe;
    }
}
//TODO: this does work.  Just gotta see if it's worth adding a class to every control that would use it.
function initHorizontalControls() {
    const controls = document.querySelectorAll('.hControl');
    const controlsAscii = document.querySelectorAll('.ascii-params');
    let block = '▓';
    let pipe = '|';
    let dash = '-';
    let factor = 31;
    for (let i = 0; i < controls.length; i++) {
        let linesAmount = parseInt((factor / controls[i].max) * controls[i].value);
        console.log(controls[i]);
        // console.log(controlsAscii[i].innerText);
        controlsAscii[i].innerText = pipe + pipe.repeat(linesAmount) + block + dash.repeat(31 - linesAmount) + pipe;
    }
}

synthControls.addEventListener('input', e => drawHorizontalControls(e));
fxControls.addEventListener('input', e => drawHorizontalControls(e));

/// Initialize note and flutter controls ui
function initVerticalControls() {
    for (let i = 0; i < noteMeters.length; i++) {
        noteMeters[i].innerHTML = drawNoteMeters(6);
        asciiRepeater[i].innerHTML = '│-│' + '<br>' + '│-│↑' + '<br>' + '│-│↓' + '<br>' + '│o│' + '<br>';
        if (i === 7) {
            // Don't render arrows on last step
            asciiRepeater[i].innerHTML = '│-│' + '<br>' + '│-│' + '<br>' + '│-│' + '<br>' + '│o│' + '<br>';
        }
    }
}
//////////////// SWAP PARAMETERS ///////////////

const fxSwap = document.getElementById('fx-swap');
let paramState = 'synth';
fxSwap.addEventListener('click', function () {
    const synthOverlay = document.getElementById('ascii-synth-overlay');
    const fxOverlay = document.getElementById('ascii-fx-overlay');
    const asciiFx = '| fx |';
    const asciiSynth = '| synth |';
    if (paramState === 'fx') {
        console.log('fx state');
        synthControls.style.display = 'grid';
        fxControls.style.display = 'none';
        fxSwap.innerHTML = asciiFx;
        synthOverlay.style.display = 'block';
        fxOverlay.style.display = 'none';
        return (paramState = 'synth');
    } else {
        fxControls.style.display = 'grid';
        synthControls.style.display = 'none';
        fxSwap.innerHTML = asciiSynth;
        console.log('synth state');
        synthOverlay.style.display = 'none';
        fxOverlay.style.display = 'block';
        return (paramState = 'fx');
    }
});

///////////// MOBILE TABS //////////////
// const synthControls = document.querySelector('#synth-container');
// const fxControls = document.querySelector('#fx-container');
let tabState = 'seq';
function mobileSwap() {
    // const stepContainer = document.querySelector('#steps');
    // const fxSwap = document.getElementById('fx-swap');
    const fxSwapTab = document.getElementById('fx-swap-tab');
    const synthSwap = document.getElementById('synth-swap');
    const seqSwap = document.getElementById('seq-swap');
    const tabContainer = document.querySelector('#tabs-container-mobile');
    const swapLabels = document.querySelectorAll('#param-swap-text');
    tabContainer.addEventListener('click', ({ target }) => {
        tabState = target.dataset.state;
        // make highlighted text bold
        swapLabels.forEach(element => {
            element.style.fontWeight = 'normal';
            target.style.fontWeight = 'bold';
        });
        if (tabState === 'seq') {
            stepContainer.style.display = 'grid';
            synthControls.style.display = 'none';
            fxControls.style.display = 'none';
        } else if (tabState === 'synth') {
            stepContainer.style.display = 'none';
            synthControls.style.display = 'grid';
            fxControls.style.display = 'none';
            synthSwap.style.fontWeight = 'bold';
        } else if (tabState === 'fx') {
            stepContainer.style.display = 'none';
            synthControls.style.display = 'none';
            fxControls.style.display = 'grid';
            fxSwapTab.style.fontWeight = 'bold';
        }
    });
}

mobileSwap();
synthParamController();
