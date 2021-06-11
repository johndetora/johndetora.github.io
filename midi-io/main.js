// TODO: pass/fail checking of sysex - convert messages object to array of objects, each with a name, output msg, input msg, pass/fail, and expected result
// TODO: Add to midibug along with different viewing options
// TODO: ADVANCED: add library of device inquiry responses to automatically detect the product

// Enable webMidiJs
WebMidi.enable(function (err) {
    // If midi ports aren't found, log error
    if (err) console.log('WebMidi could not be enabled.', err);
    // Otherwise log available midi ports
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);
    const input = WebMidi.getInputByName('LPK25 mk2');
    const output = WebMidi.getOutputByName('LPK25 mk2');
    receiveSysex(input);
    sendSysex(output);
}, true);

// Store messages here
// TODO: gather this from excel sheet, use regex to cancel out first F0 and last F7
const sysexMessages = {
    velocityCurve: [0x08, 0x00, 0x00],
    // expected: F0 47 7F 4D 08 00 18 00 01 01 19 4C 10 33 19 19 4C 65 26 5C 13 32 66 32 41 6B 41 5A 7F 7F 7F F7 (32 Bytes)
    deviceInquiry: [0x7e, 0x00, 0x06, 0x01, 0xf7],
};

//TODO: add this to object or nah?
const deviceID = [0x47, 0x7f, 0x4d];
// Get selected sysex
const submit = document.getElementById('send-sysex');
const selectionID = document.getElementById('sysex-options');

function getSelection() {
    const msgKey = selectionID.value;
    return sysexMessages[msgKey];
}

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
