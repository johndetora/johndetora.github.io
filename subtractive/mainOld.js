// See https://pdm.lsupathways.org/3_audio/2_synthsandmusic/1_lesson_1/ 
// https://www.devbridge.com/articles/tonejs-coding-music-production-guide/ 
// for good lessons


document.querySelector('button')?.addEventListener('click', async () => {
	await Tone.start()
	console.log('audio is ready')
})
   
//Synth parameters
const synthA = new Tone.Synth({
    oscillator: {
        type: 'sawtooth'
    }

});


// VCF
const vcf = new Tone.Filter();
vcf.type = "lowpass";

// Env
const adsr = synthA.envelope;

// VCA
const gain = new Tone.Gain(0.7);


// LFO
const lfo = new Tone.LFO("4n", 400, 4000).start(); 
const lfoVcfGain = new Tone.Gain(0);
const lfoVcaGain = new Tone.Gain(0);  
const lfoVcoGain = new Tone.Gain(0);      
lfo.connect(lfoVcfGain)
lfo.connect(lfoVcaGain)
lfo.connect(lfoVcoGain)
lfoVcfGain.connect(vcf.frequency)
// lfoVcaGain.connect(gain.gain)

var lfoToFilter = document.getElementById('to-filter');
var lfoToGain = document.getElementById('to-gain');

// LFO to Filter logic
lfoToFilter.addEventListener('click', () => {
  if (lfoVcfGain.gain.value === 0) return lfoVcfGain.gain.value = 1;
  else return lfoVcfGain.gain.value = 0;
}),

// LFO to VCA logic. have to figure this out
// lfoToGain.addEventListener('click', () => {
//   if (lfoVcaGain.gain.value === 0) return lfoVcaGain.gain.value = 1;
//   else return lfoVcaGain.gain.value = 0;
// }),


// var lfoDestination = document.querySelectorAll('div.lfo-boxes > input');
// function lfoSelector(){
//   for (var i=0; i<lfoDestination.length; i++){
//     console.log(lfoDestination[i])
//       lfoDestination[i].addEventListener('change', function(){
//         if 
//         lfo.connect(vcf.frequency); 
//       });
//   }
// }
// lfoSelector();



// Routing
synthA.connect(vcf);
vcf.connect(gain);
gain.toDestination();

//time
const now = Tone.now()

//notes

var notes = ['D4', 'F4', 'A4', 'C4']

//play a note every quarter-note
const loopA = new Tone.Loop(time => {
	synthA.triggerAttackRelease("C3", "8n", time);
}, "4n").start(0);


// Controls

// Play
document.getElementById("play-button").addEventListener("click", function() {
// .state: the playback state of the source, either "started", "stopped", or "paused"
    if (Tone.Transport.state !== 'started') { 
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
  });

  //Oscillator section
document.querySelector("#triangle-button").addEventListener('click', function(){
  console.log("Triangle4")
  synthA.oscillator.type = "triangle4";
});

document.querySelector('#glide').addEventListener('click', () => {
  console.log("glide on")
  synthA.portamento = 0.25;
});

// TO DO: make a function that automatically does all of this?
// something likeArray.from(inputs).forEach(input => input.addEventListener

var cutoff = document.getElementById('vcf-cutoff')
cutoff.addEventListener('input', function() {
  vcf.frequency.value = this.value;
});

var attackP = document.getElementById('attack')
attackP.addEventListener('input', function() {
  adsr.attack = this.value;
});

var decayP = document.getElementById('decay')
decayP.addEventListener('input', function() {
  adsr.decay = this.value;
});

var sustainP = document.getElementById('sustain')
sustainP.addEventListener('input', function() {
  adsr.sustain = this.value;
});

var releaseP = document.getElementById('release')
releaseP.addEventListener('input', function() {
  adsr.release = this.value;
});

var lfoRate = document.getElementById('lfo-rate')
lfoRate.addEventListener('input', function() {
  lfo.frequency.value = this.value;
});

// initializes settings on page load
function initialize(){
  vcf.frequency.value = cutoff.value;
  lfo.frequency.value = lfoRate.value;
  adsr.attack = attackP.value;
  adsr.decay = decayP.value;
  adsr.sustain = sustainP.value;
  adsr.release = releaseP.value;

}

initialize(); 

// play note

// document.querySelector("#play").addEventListener('click', e => {
//     synthA.triggerAttackRelease("C3", "8n");
// });


