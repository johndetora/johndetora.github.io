document.querySelector('button')?.addEventListener('click', async () => {
	await Tone.start()
	console.log('audio is ready')
})

//Synth parameters
const synthA = new Tone.Synth({
    oscillator: {
      type: 'sawtooth'
    },
    envelope: {
      attack: 0,
      decay: 0.5,
      sustain: 0.5,
      release: 1
    }
});


// VCF
const vcf = new Tone.Filter({
  frequency: 1500
});
vcf.type = "lowpass";

// Env
const adsr = synthA.envelope;

// VCA
const gain = new Tone.Gain(0.7);


// LFO
const lfo = new Tone.LFO(3, 400, 4000).start();
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
let lfoVcfAmt = document.getElementById('lfo-vcf-gain')

// LFO to Filter logic
let lfoState = ""

lfoToFilter.addEventListener('click', function() {
  if (lfoState !== "filter") {
    lfoVcfGain.gain.value = lfoVcfAmt.value;
    lfoVcfAmt.addEventListener('input', function() {
        lfoVcfGain.gain.value = this.value;
    });
    return lfoState = "filter"
  } else {
    lfoVcfGain.gain.value = 0;
    return lfoState = "none"
  }
});


// lfoVcfAmt.addEventListener('input', function() {
//   if (lfoState === "filter") {
//     lfoVcfGain.gain.value = this.value;
//   } else {
//     lfoVcfGain.gain.value = 0;
//   }
// });
  
  

let lfoRate = document.getElementById('lfo-rate')
lfoRate.addEventListener('input', function() {
  lfo.frequency.value = this.value;
});



// lfoToFilter.addEventListener('click', () => {
//   if (lfoVcfGain.gain.value === 0) return lfoVcfGain.gain.value = 1;
//   else return lfoVcfGain.gain.value = 0;
// }),

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

document.querySelector("#sawtooth-button").addEventListener('click', function(){
  console.log("saw")
  synthA.oscillator.type = "sawtooth";
});

document.querySelector('#glide').addEventListener('click', () => {
  console.log("glide on")
  synthA.portamento = 0.25;
});



let cutoff = document.getElementById('vcf-cutoff')
cutoff.addEventListener('input', function() {
  vcf.frequency.value = this.value;
});

let q = document.getElementById('vcf-q')
q.addEventListener('input', function() {
  vcf.Q.value = this.value;
});

let envInputs = document.querySelector('#envelope-container')
envInputs.addEventListener('input', ({ target }) => {
    adsr[target.dataset.action] = target.value;
    });





// I can switch to this method of initialization if I implement presets
// function initialize(){
//   vcf.frequency.value = cutoff.value;
//   lfo.frequency.value = lfoRate.value;
//   let attackVal = document.querySelector('#attack-input')
//   adsr.attack = attackVal.value;
//   // adsr.decay = decay-input.value;
//   // adsr.sustain = sustain-input.value;
//   // adsr.release = release-input.value;

// }

// initialize();


// play note

// document.querySelector("#play").addEventListener('click', e => {
//     synthA.triggerAttackRelease("C3", "8n");
// });


