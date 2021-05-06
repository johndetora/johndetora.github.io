import { noteTranslator } from './note-chart.js';

const canvas = document.getElementById('velocity-bar');
const ctx = canvas.getContext('2d');

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}
function onMIDISuccess(midiAccess) {
    const midi = midiAccess;
    // console.log(midi);
    for (let input of midiAccess.inputs.values()) input.onmidimessage = getMIDIMessage;
}
const noteData = [];
function getMIDIMessage(midiMessage) {
    let status = midiMessage.data[0]; // Note on/ Note off
    let note = midiMessage.data[1];
    let velocity = midiMessage.data[2];
    noteData.push(status, note, velocity);
    if (status == 144) {
        currentNoteOn(note, velocity);
        drawVelocityBar(velocity);
    }
    if (status == 128) {
        // clearVelocityBar(velocity);
    }
    console.log(status, note, velocity);
    printLog(status, note, velocity);

    return { status, note, velocity };
}
function currentNoteOn(note, velocity) {
    const statusEl = document.querySelector('.status');
    const noteEl = document.querySelector('.note');
    const velocityEl = document.querySelector('.velocity');
    noteEl.innerHTML = `note: ${note}, (${noteTranslator(note)})  `;
    velocityEl.innerHTML = `velocity: ${velocity}`;
}
function printLog(status, note, velocity) {
    const logEl = document.querySelector('.log');
    const lineBreak = '\n';
    if (status == 144) {
        status = 'note on ';
    } else if (status == 128) status = 'note off';
    // Spacing for text area so that columns are even
    if (note > 99) {
        logEl.append(`${status}  ${note} (${noteTranslator(note)}) ${velocity + lineBreak}`);
    } else if (note > 9) {
        logEl.append(`${status}  ${note} (${noteTranslator(note)})  ${velocity + lineBreak}`);
    } else {
        logEl.append(`${status}  ${note} (${noteTranslator(note)})   ${velocity + lineBreak}`);
    }
    logEl.scrollTop = logEl.scrollHeight;
}

function drawVelocityBar(velocity) {
    if (velocity === 127) {
        // Red
        ctx.fillStyle = 'rgb(231, 95, 85)';
    } else if (velocity > 105 && velocity != 127) {
        // Orange Red
        ctx.fillStyle = 'rgb(243, 128, 83)';
    } else if (velocity > 80 && velocity <= 105) {
        // Orange
        ctx.fillStyle = 'rgb(243, 174, 83)';
    } else if (velocity > 40 && velocity <= 80) {
        // Yellow
        ctx.fillStyle = 'rgb(250, 240, 102)';
        // green
    } else if (velocity <= 40) {
        ctx.fillStyle = 'rgb(123, 194, 101)';
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, velocity, canvas.height);
}

function clearVelocityBar(velocity) {
    ctx.clearRect(0, 80, canvas.width, canvas.height * 3);
}

console.log(noteTranslator(65));
