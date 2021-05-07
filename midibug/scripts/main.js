import { noteTranslator } from './note-chart.js';
import { drawVelocityBar } from './velocity-bar.js';

const statusEl = document.querySelector('.connection-status');
const currentNoteCard = document.querySelector('.status');
navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDIFailure() {
    statusEl.innerHTML = 'status: midi device not found';
    currentNoteCard.innerHTML = 'connection unsuccessful could not access your MIDI devices.';
    console.log('Could not access your MIDI devices.');
}
function onMIDISuccess(midiAccess) {
    statusEl.innerHTML = 'status: connected';
    currentNoteCard.innerHTML = 'connection successful midi input ready';
    // const midi = midiAccess;
    console.log(midiAccess.inputs.values());
    for (let input of midiAccess.inputs.values()) input.onmidimessage = getMIDIMessage;
}

function getMIDIMessage(midiMessage) {
    console.log(midiMessage.data);
    currentNoteCard.innerHTML = '';
    let status = midiMessage.data[0]; // Note on/ Note off
    let note = midiMessage.data[1];
    let velocity = midiMessage.data[2];
    currentNoteOn(status, note, velocity);
    drawVelocityBar(velocity);
    // If note is pressed
    if (status == 144 || status == 153) {
        getVelocityAvg(velocity);
        getReps();
    }
    printLog(status, note, velocity);
}

// Current Note
function currentNoteOn(status, note, velocity) {
    const noteEl = document.querySelector('.note');
    const velocityEl = document.querySelector('.velocity');
    if (status == 217) {
        noteEl.innereHTML = `aftertouch: ${note}`;
        console.log('current aftertouch');
    }
    if (velocity) {
        noteEl.innerHTML = `note: ${note}, (${noteTranslator(note)})  `;
        velocityEl.innerHTML = `velocity: ${velocity}`;
    }
}

// Session
let results = [];
function getVelocityAvg(velocity) {
    const avgVelElem = document.querySelector('.avg-velocity');
    results.push(velocity);
    const avgVel = parseInt(results.reduce((accumulator, velocity) => accumulator + velocity, 0) / results.length);
    avgVelElem.innerHTML = `avg velocity: ${avgVel}`;
}
function getReps() {
    const repsElem = document.querySelector('.repetitions');
    repsElem.innerHTML = `repetitions: ${results.length}`;
}

function printLog(status, note, velocity) {
    const logEl = document.querySelector('.log');
    const lineBreak = '\n';

    if (status == 217) {
        status = 'aftertouch ';
        logEl.append(`${status}  ${note + lineBreak}`);
    }

    if (status == 144 || status == 128) {
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
    }
    logEl.scrollTop = logEl.scrollHeight;
}
