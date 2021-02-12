if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
} else {
    console.log('WebMIDI is not supported in this browser.');
}

/*

let midiOutput = null;

navigator.requestMIDIAccess()
.then(function(midiAccess) {
	const outputs = Array.from(midiAccess.outputs.values());
	console.log(outputs);
});