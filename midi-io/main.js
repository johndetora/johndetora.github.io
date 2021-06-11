// TODO: pass/fail checking of sysex - convert messages object to array of objects, each with a name, output msg, input msg, pass/fail, and expected result
// TODO: Add to midibug along with different viewing options
// TODO: ADVANCED: add library of device inquiry responses to automatically detect the product

//TODO: easier to read with this seperate, or just add it to the object
const deviceID = [0x47, 0x7f, 0x4d];

// Store messages here
// TODO: gather this from excel sheet, use regex to cancel out first F0 and last F7

const sysexMessages = {
    velocityCurve: [0x08, 0x00, 0x00],
    // expected: F0 47 7F 4D 08 00 18 00 01 01 19 4C 10 33 19 19 4C 65 26 5C 13 32 66 32 41 6B 41 5A 7F 7F 7F F7 (32 Bytes)

    //[0xF0, 0x7E, 0x00, 0x06, 0x01, 0xF7]
    // [240, 126, 0, 6, 1, 247],
    //[126, 0, 6, 1]
    // Note this has to be decimal due to how the midijs library handles sysex messages.  When sending this message, we are using just the web midi api

    deviceInquiry: [0x7e, 0x00, 0x06, 0x01, 0xf7],
    // deviceInquiry: [0xf0, 0x7e, 0x00, 0x06, 0x01, 0xf7],
};
// Get selected sysex
const submit = document.getElementById('send-sysex');
const selectionID = document.getElementById('sysex-options');

function getSelection() {
    const msgKey = selectionID.value;
    return sysexMessages[msgKey];
}

// TODO: seperate enable to it's own function
// TODO: refactor some of these functions if needed
WebMidi.enable(function (err) {
    // If midi ports aren't found, log error
    if (err) console.log('WebMidi could not be enabled.', err);
    // Otherwise log available midi ports
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);
    const input = WebMidi.getInputByName(name);
    const output = WebMidi.getOutputByName(name);

    receiveSysex(input);
    sendSysex(output);
}, true);

// Send sysex
function sendSysex(output) {
    submit.addEventListener('click', () => {
        console.log(selectionID.value + ' message sent');
        if (selectionID.value === 'deviceInquiry') {
            output.send(0xf0, getSelection());
        } else {
            output.sendSysex(deviceID, getSelection());
        }
    });
}

function receiveSysex(input) {
    // Receive Sysex
    input.addListener('sysex', 'all', function (e) {
        //TODO: add a conditional to check if a response is expected and if successful
        const response = [...e.data];
        //TODO: make sure this actually means the message was received
        // console.log('message received');

        hexConversion(response);
    });
}

function hexConversion(arr) {
    //TODO: add 0 if single digit
    const result = arr.map(dec => dec.toString(16).toUpperCase());
    console.log('Response: ', result);
    return result;
    //     const hex = dec.toString(16);
    //     console.log('Sysex response is: ', hex);
}
//TODO: why the fuck doesn't this work so I can add a 0
// function hexConversion(arr) {
//     //TODO: add 0 if single digit
//     const result = arr.map(dec => {
//         dec.toString(16).toUpperCase();
//     });
//     console.log('hex conversion: ', result);
//     return result;
//     //     const hex = dec.toString(16);
//     //     console.log('Sysex response is: ', hex);
// }

// https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hexadecimal-in-javascript

// const midi = {
//     input: null,
//     output: null,
// };

// let input = null;
// let output = null;

// setTimeout(() => {
//     console.log(input);
// }, 1000);
// // TODO: seperate enable to it's own function
// // TODO: refactor some of these functions if needed
// WebMidi.enable(function (err) {
//     if (err) {
//         console.log('WebMidi could not be enabled.', err);
//     }
//     // Viewing available inputs and outputs
//     console.log(WebMidi.inputs);
//     console.log(WebMidi.outputs);

//     // TODO: put I/O names into function so we can change it later based on the product
//     const output = WebMidi.getOutputByName('LPK25 mk2');
//     const input = WebMidi.getInputByName('LPK25 mk2');

//     // Listen for a 'note on' message on all channels
//     input.addListener('noteon', 'all', function (e) {
//         console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ').');
//     });

//     // Send sysex
//     submit.addEventListener('click', () => {
//         console.log(selectionID.value + ' message sent');
//         if (selectionID.value === 'deviceInquiry') output.send(getSelection());
//         output.sendSysex(deviceID, getSelection());
//     });

//     // Receive Sysex
//     input.addListener('sysex', 'all', function (e) {
//         //TODO: add a conditional to check if a response is expected and if successful
//         const response = [...e.data];
//         //TODO: make sure this actually means the message was received
//         console.log('message received', response);
//         hexConversion(response);
//     });
// }, true);
