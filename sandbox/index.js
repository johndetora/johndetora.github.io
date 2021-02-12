/*This is how to play an audio file with Web Audio API

1. Request audio file from server
2. Loads it into buffer
3. Triggers file


*/
var audioFileUrl = 'beat.mp3';

// this is always used for Web Audio API 
var context = new (window.AudioContext || window.webkitAudioContext)(); 


var xhr = new XMLHttpRequest(); // Step 1. look this up, it's important
xhr.open('GET', audioFileUrl); // retrieves file?
xhr.responseType = 'arraybuffer'; //Audio file is treated as an array
xhr.onload = function() { // Step 2
	context.decodeAudioData(xhr.response, function(audio) {
		var buffer = context.createBufferSource();
		buffer.connect(context.destination);  // Output
		buffer.buffer = audio;
		buffer.start(0); // Step 3 Triggers it
	});
};
xhr.send(); // not sure what this does
