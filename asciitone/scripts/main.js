import { skinSwapper } from './skin-select.js';
import { synthParamController } from './synth-controls.js';

skinSwapper();
synthParamController();

let OSName = 'Unknown OS';
if (navigator.appVersion.indexOf('Win') != -1) OSName = 'Windows';
if (navigator.appVersion.indexOf('Mac') != -1) OSName = 'MacOS';
else OSName = 'Linux (probably)';
console.log('Your OS: ' + OSName);
const overlay = document.querySelector('.overlay');
if (navigator.appVersion.indexOf('Win') != -1) {
    overlay.style.left = '-80px';
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
let playButton = document.getElementById('play-button');
playButton.addEventListener('click', () => {
    if (Tone.Transport.state !== 'started') {
        playButton.innerHTML = '[pause]';
        playButton.style.display = 'hidden';
        Tone.Transport.start();
        animateLFO(0);
        playHeadUpdate(0);
        index = 0;
    } else {
        playButton.innerHTML = '[play]';
        playHead.innerHTML = '';
        Tone.Transport.stop();
        index = 0;
        document.getElementById('ascii-spin').innerHTML = '';
    }
});
// Initialization of bpm and ascii meters
window.addEventListener('load', () => {
    init();
    let bpm = transport.value;
    Tone.Transport.bpm.value = bpm;
});

// BPM Change input
let transport = document.querySelector('#bpm');
transport.addEventListener('input', function () {
    let bpm = this.value;
    Tone.Transport.bpm.value = bpm;
    console.log(bpm);
});

// ------------------------- //
//         Variables         //
// ------------------------- //

const synthControls = document.querySelector('#synth-container');
const fxControls = document.querySelector('#fx-container');
const stepContainer = document.querySelector('#steps');
const playHead = document.querySelector('#playhead');
const meters = document.querySelectorAll('#ascii-meter');
const asciiRepeater = document.querySelectorAll('#ascii-repeater');

const steps = 8; // Total step length

// ------------------------- //
//    Synth Parameters       //
// ------------------------- //

// TO DO:
// Put these and routing in their own module, then import all into param controls

export const synth = new Tone.FMSynth({
    harmonicity: 1,
    modulationIndex: 10,
    portamento: 0,
    detune: 0,
    oscillator: {
        type: 'sine',
    },

    envelope: {
        attack: 0.01,
        decay: 0,
        sustain: 1,
        release: 0.2,
        attackCurve: 'exponential',
    },
    modulation: {
        type: 'sine',
    },
    modulationEnvelope: {
        attack: 0.01,
        decay: 0,
        sustain: 1,
        release: 0.2,
        attackCurve: 'exponential',
    },
});
const noiseSynth = new Tone.NoiseSynth();

/// Delay object
export const delay = new Tone.FeedbackDelay({
    delayTime: 0.2,
    feedback: 0.1,
    wet: 0,
});

// Filter Object
export const filter = new Tone.BiquadFilter({
    frequency: 1500,
    type: 'lowpass',
});

// ------------------------- //
//         Routing           //
// ------------------------- //
noiseSynth.toDestination(0.7);
let gain = new Tone.Gain(0.7);
let modGain = new Tone.Gain(0.2);
let crossFade = new Tone.CrossFade(0);
synth.chain(gain, crossFade.a);
synth.modulationEnvelope.chain(modGain, crossFade.b);
//gain.toDestination();
crossFade.connect(filter);
filter.connect(delay);
delay.toDestination(0.8);

// LFO Routing
const lfo = new Tone.LFO(1, 0.1, 1500).start();
const toFilt = new Tone.Gain(0);
const toModIndex = new Tone.Gain(0);
lfo.connect(toFilt);
toFilt.connect(filter.frequency);
// Connect LFO to mod index
// lfo.connect(toFreqRatio);
toModIndex.connect(synth.modulationIndex);

// ------------------------- //
//        Note Data          //
// ------------------------- //

/// SCALES /////
const chromaticScale = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4'];
const majorScale = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4'];
const minorScale = ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'A4', 'B4', 'C4', 'D4', 'E4', 'F4'];
const pentScale = ['C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5'];
const scales = [majorScale, minorScale, pentScale, chromaticScale];
let currentScale = majorScale;

/// Scale set logic
const scaleSelect = document.getElementById('scale-select');
scaleSelect.addEventListener('click', scaleSet);
let scaleIndex = 0;
function scaleSet() {
    let currentNotes = document.querySelectorAll('.meter');
    // Round Robin selection
    scaleIndex++;
    if (scaleIndex === scales.length) scaleIndex = 0; // counter resets to 0
    currentScale = scales[scaleIndex];
    // Loop through the current note object and set the values to the current slider values
    for (let i = 0; i < notes.length; i++) {
        notes[i].note = currentScale[currentNotes[i].value];
    }
    // DOM

    if (currentScale === scales[0]) scaleSelect.innerHTML = '[scale: major]';
    if (currentScale === scales[1]) scaleSelect.innerHTML = '[scale: minor]';
    if (currentScale === scales[2]) scaleSelect.innerHTML = '[scale: pentatonic]';
    if (currentScale === scales[3]) scaleSelect.innerHTML = '[scale: chromatic]';
    return currentScale;
}

// let sliderNotes = {
//     0: 'C3',
//     1: 'D3',
//     2: 'E3',
//     3: 'F3',
//     4: 'G3',
//     5: 'A3',
//     6: 'B3',
//     7: 'C4',
//     8: 'D4',
//     9: 'E4',
//     10: 'F4',
//     11: 'G4',
//     12: 'A4',
// };

////// Notes, value time object each object is a step

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
];

// Scale Select button

// TEST Buttons
function tester() {
    // notes.splice(0, 1, repeatNote[0], repeatNote[1]);
    console.log(notes);
    console.log(bpm);
}

// For testing purposes.  Hidden
let repeatButton = document.getElementById('repeatTest');

// ------------------------- //
//     Play Sequence         //
// ------------------------- //

let repStep; // Can delete this soon
let index = 0; // Never change this

let part = new Tone.Part(function (time, value) {
    let step = index % steps;
    console.log(value.repeat);
    // repeatButton.addEventListener('click', () => {
    //     return (repStep = true);
    // Regular play
    if (value.repeat == 0) {
        playHeadUpdate(step);
        synth.triggerAttackRelease(value.note, value.timing, time, value.velocity);
        index++;
    }
    // Repeat Logic
    if (value.repeat == 1) {
        playHeadUpdate(step);
        // Can try setting the decay to a low value before this, and then setting it back after the notes play
        synth.triggerAttackRelease(value.note, '32n', time, value.velocity);
        synth.triggerAttackRelease(value.note, '32n', time + 0.1, value.velocity);
        index++;
    }
    if (value.repeat == 2) {
        playHeadUpdate(step);
        synth.triggerAttackRelease(value.note, '48n', time, value.velocity);
        synth.triggerAttackRelease(value.note, '48n', time + 0.075, value.velocity);
        synth.triggerAttackRelease(value.note, '48n', time + 0.15, value.velocity);
        index++;
    }
    if (value.repeat == 3) {
        playHeadUpdate(step);
        synth.triggerAttackRelease(value.note, '64n', time, value.velocity);
        synth.triggerAttackRelease(value.note, '64n', time + 0.05, value.velocity);
        synth.triggerAttackRelease(value.note, '64n', time + 0.1, value.velocity);
        synth.triggerAttackRelease(value.note, '64n', time + 0.15, value.velocity);
        index++;
    }
}, notes);

/////// Transport and Loop ////////////
part.start('0m');
// repeatNoise.start('0m');
part.loopStart = '0m';
part.loopEnd = '2m';
part.loop = true;
Tone.Transport.loopStart = '0m';
Tone.Transport.loopEnd = '2m';
Tone.Transport.loop = true;

// ------------------------- //
//   Sequencer User Input    //
// ------------------------- //

// Notes and Repeats
stepContainer.addEventListener('input', ({ target }) => {
    // Note Sliders
    if (target.className == 'meter') {
        // className == Meter so that the repeater slider isn't targeted
        meters[target.dataset.index].innerHTML = bars(target.value); // Sets bar animation value
        notes[target.dataset.index].note = currentScale[target.value];
    }
    if (target.className == 'repeater-range') {
        notes[target.dataset.index].repeat = target.value;
        repeatAnim(target);
    }
});

// Repeater ascii-animation
// There's probably a better way to do this but it works.
function repeatAnim(target) {
    const empty = '│-│' + '<br>';
    const arrowUp = '│-│↑' + '<br>';
    const arrowDown = '│-│↓' + '<br>';
    const arrowUpFilled = '│o│↑' + '<br>';
    const arrowDownFilled = '│o│↓' + '<br>';
    const filled = '│o│' + '<br>';
    // console.log(asciiRepeater[target.dataset.index][asciiRepCount[0]]);

    if (target.value == 0) {
        asciiRepeater[target.dataset.index].innerHTML = empty + arrowUp + arrowDown + filled;
    }
    if (target.value == 1) {
        asciiRepeater[target.dataset.index].innerHTML = empty + arrowUp + arrowDownFilled + empty;
    }
    if (target.value == 2) {
        asciiRepeater[target.dataset.index].innerHTML = empty + arrowUpFilled + arrowDown + empty;
    }
    if (target.value == 3) {
        asciiRepeater[target.dataset.index].innerHTML = filled + arrowUp + arrowDown + empty;
    }
}

// Snooze Checks
stepContainer.addEventListener('change', ({ target }) => {
    const asciiCheck = document.querySelectorAll('#ascii-checkbox');
    if (target.type == 'checkbox' && target.checked) {
        // Turns step 'on'
        notes[target.dataset.index].velocity = 1;
        // UI Update
        asciiCheck[target.dataset.index].style.color = 'var(--on)';
        asciiRepeater[target.dataset.index].style.color = 'var(--repeaterOn)';

        meters[target.dataset.index].style.color = 'var(--on)';
    } else if (target.type == 'checkbox' && !target.checked) {
        // Turns step 'off'
        notes[target.dataset.index].velocity = 0;
        // UI Update

        meters[target.dataset.index].style.color = 'var(--off)';
        asciiRepeater[target.dataset.index].style.color = 'var(--off)';
        asciiCheck[target.dataset.index].style.color = 'var(--off)';
    }
});

// ------------------------- //
//       Animations          //
// ------------------------- //

///// ASCII Playhead Animation
function playHeadUpdate(step) {
    if (step > 0 && step <= 7) {
        playHead.prepend('──────');
    } else if (step === 0) {
        playHead.innerHTML = '►';
    }
}
///
///////  Bar  ////////
function bars(v) {
    const max = 12; // Max slider value for note meters
    let top = '_' + '<br>';
    let bottom = '^' + '<br>';
    let row = '|░|' + '<br>';
    let filled = '|▓|' + '<br>';
    return top + row.repeat(max - v) + filled.repeat(v) + filled + bottom;
}

///////  Spin  ////////

const ASCIIs = [
    ['&ndash;', '\\', '|', '/'], // Forward Spin
    ['&ndash;', '/', '|', '\\'], // Backward Spin
    ['', '', '', 'pause', 'pause'], // Cursor blink
];

function animate(index) {
    // Update the element id of elementID to have the index-th ASCII array entry in it. (Note: arrays start at 0)
    document.getElementById('ascii-spin').innerHTML = ASCIIs[2][index];
    let inputSlider = document.getElementById('bpm');
    let frequency = inputSlider.value;
    // Call the update function after 1 second / frequency (Hz).
    setTimeout(function () {
        if (Tone.Transport.state === 'started') {
            // Pass the update function the index that it was called with this time, plus 1.
            // % means modulus (remainder when divided by)
            // This way, it doesnt' try to look for the 1000th element which doesn't exist
            animate((index + 1) % ASCIIs[2].length);
        }
    }, 10000 / frequency);
}

function animateLFO(index) {
    document.getElementById('ascii-lfo-spin').innerHTML = ASCIIs[1][index];
    let inputSlider = document.getElementById('lfo-rate');
    let frequency = inputSlider.value;
    // Call the update function after 1 second / frequency (Hz).
    setTimeout(function () {
        if (Tone.Transport.state === 'started') {
            animateLFO((index + 1) % ASCIIs[1].length);
        }
    }, 500 / frequency);
}

// ------------------------- //
//    Slider Animations      //
// ------------------------- //
/////// Horizontal Slider Animation ////////
const tempoMeter = document.getElementById('ascii-bpm');
let lines = '|';
let block = '▓';

tempoMeter.innerHTML = '||||||||||||||▓══════════════════ |';
transport.addEventListener('input', function () {
    let animBars = parseInt(this.value / 15);
    let empty = '═';
    tempoMeter.innerHTML = lines.repeat(animBars - 1) + block + empty.repeat(33 - animBars) + ' |';
});
/// Initialization
function init() {
    for (let i = 0; i < meters.length; i++) {
        meters[i].innerHTML = bars(6);
        const empty = '│-│' + '<br>';
        const arrowUp = '│-│↑' + '<br>';
        const arrowDown = '│-│↓' + '<br>';
        const arrowUpFilled = '│o│↑' + '<br>';
        const arrowDownFilled = '│o│↓' + '<br>';
        const filled = '│o│' + '<br>';
        asciiRepeater[i].innerHTML = '│-│' + '<br>' + '│-│↑' + '<br>' + '│-│↓' + '<br>' + '│o│' + '<br>';
    }
}

///// Horizontal Slider for Parameters /////

// synthControls.addEventListener('input', ({ target }) => {
//     let empty = '|';
//     let emptyAlt = '-';

//     console.log(target.offsetWidth);
//     // document.getElementById(target.dataset.ascii).getBoundingClientRect().width
//     let linesAmount = parseInt(target.value * 31);
//     document.getElementById(target.dataset.ascii).innerHTML = lines + lines.repeat(linesAmount) + block + emptyAlt.repeat(31 - linesAmount) + empty;
//     console.log(document.getElementById(target.dataset.ascii).getBoundingClientRect().width);

//     /// Envelopes
// });
synthControls.addEventListener('input', ({ target }) => {
    let empty = '|';
    let emptyAlt = '-';
    // console.log(target.max);
    //// The '/ n' parts make it so the lines amount equal 31 at their max. Just divide/multiply target max so it reaches 31

    /// Mod index
    if (target.max == 100) {
        let linesAmount = parseInt(target.value / 3.2); // This ends up being the total width essentially
        console.log(parseInt(32 - linesAmount));
        document.getElementById(target.dataset.ascii).innerHTML =
            lines + lines.repeat(linesAmount) + block + emptyAlt.repeat(31 - linesAmount) + empty;
    } else if (target.id === 'crossfader') {
        let linesAmount = parseInt(target.value * 18); // Change this value back to 31 if width is reverted
        document.getElementById(target.dataset.ascii).innerHTML = lines.repeat(linesAmount) + block + empty.repeat(17 - linesAmount + 1); // Fills in empty space.  +1 so that it doesn't hit 0 and throw an error
        /// Filter
    } else if (target.max == 1) {
        console.log(target.offsetWidth);
        /// Envelopes
        let linesAmount = parseInt(target.value * 31);
        document.getElementById(target.dataset.ascii).innerHTML =
            lines + lines.repeat(linesAmount) + block + emptyAlt.repeat(31 - linesAmount) + empty;
        /// Filter
    } else if (target.max == 1500) {
        let linesAmount = parseInt(target.value / 47);
        document.getElementById(target.dataset.ascii).innerHTML =
            lines + lines.repeat(linesAmount) + block + emptyAlt.repeat(31 - linesAmount) + empty;
        // Resonance
    } else if (target.max == 10) {
        let linesAmount = parseInt(target.value * 3.1);
        document.getElementById(target.dataset.ascii).innerHTML =
            lines + lines.repeat(linesAmount) + block + emptyAlt.repeat(31 - linesAmount) + empty;
    } else if (target.id === 'lfo-rate') {
        let linesAmount = parseInt(target.value * 2.1);
        document.getElementById(target.dataset.ascii).innerHTML =
            lines + lines.repeat(linesAmount) + block + emptyAlt.repeat(31 - linesAmount) + empty;
    } else if (target.id === 'harmonicity') {
        let linesAmount = parseInt(target.value * 2.7);
        document.getElementById(target.dataset.ascii).innerHTML = lines + lines.repeat(linesAmount) + block + empty.repeat(17 - linesAmount);
        document.getElementById('ascii-harmonicity-num').innerHTML = '|' + parseFloat(target.value).toFixed(1) + '|';
    }
});

// FX Horizontal slider animations

fxControls.addEventListener('input', ({ target }) => {
    let empty = '|';
    let emptyAlt = '-';
    console.log(target.max);
    if (target.id == 'delayTime' || target.id == 'delayFeedback' || target.id == 'delayMix') {
        // Target max is 1
        /// Envelopes
        let linesAmount = parseInt(target.value * 31);
        document.getElementById(target.dataset.ascii).innerHTML =
            lines + lines.repeat(linesAmount) + block + emptyAlt.repeat(31 - linesAmount) + empty;
    }
});

/////// Circle Grow Animation
// let circle = document.getElementById('ascii-cutoff');
// function circleGrow(target) {
//     if (target.id === 'cutoff') {
//         let circleSize = parseInt(target.value / 50);
//         let circleX = parseInt(target.value / 25);
//         /// IMPORTANT This value is the top position + font.size and may need to be adjusted later
//         let circleLocation = 35;
//         let circlePosition = -circleSize + circleLocation;

//         // When the animation turns into a period
//         if (target.value <= 400) {
//             circle.style.opacity = 0;
//             document.getElementById('filterLabel').innerHTML = '> cutoff.';
//             // When the animation is growing/shrinking
//         } else {
//             document.getElementById('filterLabel').innerHTML = '> cutoff';
//             circle.style.fontSize = circleSize + '.px';
//             circle.style.opacity = 1;
//             circle.style.top = circlePosition + '.px';
//             circle.style.left = circleX + 50 + '.px'; // Comment this out to have circle stay in x position
//         }
//     }
// }

//////////////// SWAP PARAMETERS ///////////////

const fxSwap = document.getElementById('fx-swap');
let paramState = 'synth';
fxSwap.addEventListener('click', function () {
    const synthOverlay = document.getElementById('ascii-synth-overlay');
    const fxOverlay = document.getElementById('ascii-fx-overlay');
    if (paramState === 'fx') {
        console.log('fx state');
        synthControls.style.display = 'grid';
        fxControls.style.display = 'none';
        fxSwap.innerHTML = '[ fx ]';
        synthOverlay.style.display = 'block';
        fxOverlay.style.display = 'none';
        return (paramState = 'synth');
    } else {
        fxControls.style.display = 'grid';
        synthControls.style.display = 'none';
        fxSwap.innerHTML = '[ synth ]';
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
        swapLabels.forEach((element) => {
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
