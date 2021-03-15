// To Do:|
// Fine tune attack/decay curves to be more LPG like
// Randomizer
// Simple Modulation destination matrix
// Add parameter name WITHIN the ascii
// noise sequencer for percussion
// Bonus: select step with keyboard (or tab to it) and set value with keyboard,

// UI:
// Put play-pause button behind the playhead start to save space.  when paused, the first character in playhead will be '❚❚'

document.querySelector('button')?.addEventListener('click', async () => {
    await Tone.start();
    console.log('audio is ready');
});

/////// BPM Set ///////

window.addEventListener('load', () => {
    init();
    let bpm = transport.value;
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
    console.log(slider);
    //console.log(notes[0].velocity);
}
//////////////// Start Stop Init ////////////////////////
let playButton = document.getElementById('play-button');
playButton.addEventListener('click', () => {
    if (Tone.Transport.state !== 'started') {
        playButton.style.backgroundColor = 'rgb(142, 209, 168)';
        playButton.innerHTML = '❚❚';
        Tone.Transport.start();
        animate(0);
        playHeadUpdate(0);
        index = 0;
    } else {
        playButton.style.backgroundColor = 'rgb(227, 157, 157)';
        playButton.innerHTML = '►';
        Tone.Transport.stop();
        index = 0;
        document.getElementById('ascii-spin').innerHTML = '&ndash;';
    }
});

/////////// COLORS ///////////////
let bgColor = 'white';
let defaultColor = 'black';
let offColor = 'gray';

/////////////// Elements /////////////////////////////
const stepContainer = document.querySelector('#steps');
const playHead = document.querySelector('#playhead');
const checks = document.querySelectorAll('#check');
const steps = 8;
const meter = document.getElementById('ascii-meter');
const meters = document.querySelectorAll('#ascii-meter');
const asciiCheck = document.querySelectorAll('#ascii-checkbox');
const envelope = document.querySelector('#envelope-container');
const mod = document.querySelector('#modulation-envelope');
const oscWave = document.querySelector('#osc-wave');
const modWave = document.querySelector('#mod-wave');

let max = 10;

///////// SYNTH CONTROLS //////////////
let synth = new Tone.FMSynth({
    harmonicity: 1,
    modulationIndex: 10,
    detune: 0,
    oscillator: {
        type: 'sine',
    },
    envelope: {
        attack: 0.01,
        decay: 0,
        sustain: 1,
        release: 0.5,
        attackCurve: 'exponential',
    },
    modulation: {
        type: 'sine',
    },
    modulationEnvelope: {
        attack: 0.05,
        decay: 0,
        sustain: 1,
        release: 0.5,
        attackCurve: 'exponential',
    },
});

// synth.oscillator.frequency = 1760;
///// Pitch //////

/////// OSC WAVE ///////
oscWave.addEventListener('change', ({ target }) => {
    console.log(target.value);
    synth.oscillator.type = target.value;
});

/////// MOD WAVE ///////
modWave.addEventListener('change', ({ target }) => {
    console.log(target.value);
    synth.modulation.type = target.value;
});

///// HARMONICITY ///////
let harmonicity = document.querySelector('#harmonicity');
harmonicity.addEventListener('change', ({ target }) => {
    synth.harmonicity.value = target.value;
});

//// ENVELOPE ///////
envelope.addEventListener('input', ({ target }) => {
    synth.envelope[target.dataset.action] = target.value;
});

///// MOD ENVELOPE
mod.addEventListener('input', ({ target }) => {
    synth.modulationEnvelope[target.dataset.action] = target.value;
    if (target.dataset.action === 'modulationIndex')
        synth[target.dataset.action].value = target.value;
});

/////// FILTER ///////
const filterControls = document.querySelector('#filter-container');
let filter = new Tone.BiquadFilter({
    frequency: 1500,
    type: 'lowpass',
});

filterControls.addEventListener('input', ({ target }) => {
    filter[target.dataset.parameter].value = target.value;
});

////// ROUTING ////////
let gain = new Tone.Gain(0.7);
let modGain = new Tone.Gain(0.2);

let crossFade = new Tone.CrossFade(0);
synth.chain(gain, crossFade.a);
synth.modulationEnvelope.chain(modGain, crossFade.b);
//gain.toDestination();
crossFade.connect(filter);
filter.toDestination(0.8);

////// CROSSFADER ////////

let crossFadeInput = document.getElementById('crossfader');
crossFadeInput.addEventListener('input', () => {
    crossFade.fade.value = crossFadeInput.value;
});

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
        note: 'A3',
        velocity: 1,
        timing: '16n',
    },
    {
        time: '0:1',
        note: 'A3',
        velocity: 1,
        timing: '16n',
    },
    {
        time: '0:2',
        note: 'A3',
        velocity: 1,
        timing: '16n',
    },
    {
        time: '0:3',
        note: 'A3',
        velocity: 1,
        timing: '16n',
    },
    {
        time: '1:0',
        note: 'A3',
        velocity: 1,
        timing: '16n',
    },
    {
        time: '1:1',
        note: 'A3',
        velocity: 1,
        timing: '16n',
    },
    {
        time: '1:2',
        note: 'A3',
        velocity: 1,
        timing: '16n',
    },
    {
        time: '1:3',
        note: 'A3',
        velocity: 1,
        timing: '16n',
    },
];

let index = 0;

///// ASCII Animation
function playHeadUpdate(step) {
    // asciiCheck[7].innerHTML = '[#]';
    if (step > 0 && step <= 8) {
        playHead.prepend('─────');
        // asciiCheck[step - 1].innerHTML = '[#]';
        // asciiCheck[step].innerHTML = '[o]';
    } else {
        playHead.innerHTML = '►';
        // asciiCheck[step].innerHTML = '[o]';
    }
}
///// Part - To Do: move the ascii animation to its own function once it's good
let part = new Tone.Part(function (time, value) {
    let step = index % steps;
    playHeadUpdate(step);
    index++;
    synth.triggerAttackRelease(value.note, value.timing, time, value.velocity);
}, notes);

/////// Transport and Loop ////////////

part.start('0m');
part.loopStart = '0m';
part.loopEnd = '2m';
part.loop = true;
Tone.Transport.loopStart = '0m';
Tone.Transport.loopEnd = '2m';
Tone.Transport.loop = true;

/// Bar animation and Step Values
stepContainer.addEventListener('input', ({ target }) => {
    if (target.type === 'range') {
        meters[target.dataset.index].innerHTML = bars(target.value); // Sets bar animation value
        notes[target.dataset.index].note = sliderNotes[target.value];
    }
    if (target.type == 'checkbox' && !target.checked) {
        notes[target.dataset.index].velocity = 0;
        //       notes[target.dataset.index - 1].timing = '16n';        Not sure if this is desired behavior but it works
    } else if (target.type == 'checkbox' && target.checked) {
        notes[target.dataset.index].velocity = 1;
        //      notes[target.dataset.index - 1].timing = '16n';
    }
});

stepContainer.addEventListener('change', ({ target }) => {
    if (target.type == 'checkbox' && target.checked) {
        asciiCheck[target.dataset.index].innerHTML = '[#]';
        asciiCheck[target.dataset.index].style.color = defaultColor;
        meters[target.dataset.index].style.color = defaultColor;
        console.log('checked');
    } else if (target.type == 'checkbox' && !target.checked) {
        asciiCheck[target.dataset.index].innerHTML = '[ ]';
        asciiCheck[target.dataset.index].style.color = offColor;
        meters[target.dataset.index].style.color = offColor;
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

///// SPIN ANIMATION////////////////

const ASCIIs = [
    ['&ndash;', '\\', '|', '/'], // Forward Spin
    ['&ndash;', '/', '|', '\\'], // Backward Spin
];

function animate(index) {
    // Update the element id of elementID to have the index-th ASCII array entry in it. (Note: arrays start at 0)
    document.getElementById('ascii-spin').innerHTML = ASCIIs[0][index];
    let inputSlider = document.getElementById('bpm');
    let frequency = inputSlider.value;
    // Call the update function after 1 second / frequency (Hz).
    setTimeout(function () {
        if (Tone.Transport.state === 'started') {
            // Pass the update function the index that it was called with this time, plus 1.
            // % means modulus (remainder when divided by)
            // This way, it doesnt' try to look for the 1000th element which doesn't exist
            animate((index + 1) % ASCIIs[0].length);
        }
    }, 10000 / frequency);
}

/////// Horizontal Slider Animation ////////
let tempoMeter = document.getElementById('ascii-bpm');
tempoMeter.innerHTML = '||||||||||||||▓';
transport.addEventListener('input', function () {
    let animBars = this.value / 15;
    let lines = '|';
    tempoMeter.innerHTML = lines + lines.repeat(animBars) + '▓';
});

function init() {
    for (let i = 0; i < meters.length; i++) {
        meters[i].innerHTML = bars(5);
    }
}
