// TO DO: 
// Better trigger action: https://dev.to/shimphillip/building-a-piano-with-tone-js-5c2f
// add function for waveform selector
// create better clicking for keys (stuck notes are happening)
// add function for keys
// make button state function for all buttons
// LFO Needs work - it offsets the frequency value with the way it's setup
//- https://tonejs.github.io/docs/r13/LFO 
// LFO max could be the max output? I can also set the amplitude,


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

let lfoToFilter = document.getElementById('to-filter');
let lfoToGain = document.getElementById('to-gain');
let lfoVcfAmt = document.getElementById('lfo-vcf-gain')

// LFO to Filter logic
let lfoState = ""

lfoToFilter.addEventListener('click', function() {
  if (lfoState !== "filter") {
    lfoToFilter.style.backgroundColor = "beige";
    lfoVcfGain.gain.value = lfoVcfAmt.value;
    lfoVcfAmt.addEventListener('input', function() {
        lfoVcfGain.gain.value = this.value;
    });
    return lfoState = "filter"
  } else {
    lfoToFilter.style.backgroundColor = "gray";
    lfoVcfGain.gain.value = 0;
    return lfoState = "none";
  }
});

let lfoRate = document.getElementById('lfo-rate')
lfoRate.addEventListener('input', function() {
  lfo.frequency.value = this.value;
});


// LFO to VCA logic. have to figure this out
// lfoToGain.addEventListener('click', () => {
//   if (lfoVcaGain.gain.value === 0) return lfoVcaGain.gain.value = 1;
//   else return lfoVcaGain.gain.value = 0;
// }),


// Routing
synthA.connect(vcf);
vcf.connect(gain);
gain.toDestination();

//time
const now = Tone.now()

//notes

const notes = ['D4', 'F4', 'A4', 'C4']

//play a note every quarter-note
const pattern = new Tone.Pattern((time, note) => {
	synthA.triggerAttackRelease(note, '4n', time);
}, ["C2", "D4", "E5", "A6"], "upDown").start(0);


function trigger(){
  synthA.triggerAttackRelease(note);
}
// Controls

// Play
let playButton = document.getElementById("play-button");
playButton.addEventListener("click", function() {
// .state: the playback state of the source, either "started", "stopped", or "paused"
    if (Tone.Transport.state !== 'started') {
      playButton.style.backgroundColor = "paleGreen";
      Tone.Transport.start();
    } else {
      playButton.style.backgroundColor = "pink";
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


const glideButton = document.querySelector('#glide')
let glideState = false;
glideButton.addEventListener('click', () => {
  if (!glideState){
    console.log("glide on")
    glideButton.style.backgroundColor = "white";
    synthA.portamento = 0.25;
    glideState = true;
  } else {
    glideButton.style.backgroundColor = "gray";
    synthA.portamento = 0;
    glideState = false;
  }
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



// Buttons -> will have to add data-set
// allButtons.addEventListener('click', ({target}) => {
// 
//   allButtons[target] 
//  
// });


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

////////////////////////////////
//////////////////Keyboard

const keys = document.querySelectorAll(".key")
keys.forEach((key) => {
  key.addEventListener('mousedown', () => {
      synthA.triggerAttack(key.id);
  });
});

keys.forEach((key) => {
  key.addEventListener('mouseup', () => {
      synthA.triggerRelease();
  });
});


const keyboardControls = {
  a: {pressed: false, note: 'C3'},
  s: {pressed: false, note: 'D3'},
  d: {pressed: false, note: 'E3'},
  f: {pressed: false, note: 'F3'},
  g: {pressed: false, note: 'G3'},
  h: {pressed: false, note: 'A3'},
  j: {pressed: false, note: 'B3'},
  k: {pressed: false, note: 'C4'}
}

window.addEventListener("keydown", (event) => {
  let letterKey = event.key.toLowerCase()
  if (keyboardControls[letterKey] && !keyboardControls[letterKey].pressed) {
    keyboardControls[letterKey].pressed = true;
    synthA.triggerAttack(keyboardControls[letterKey].note);
  }
});

window.addEventListener("keyup", (event) => {
  let letterKey = event.key.toLowerCase()
  if (keyboardControls[letterKey]) {
      keyboardControls[letterKey].pressed = false;
      synthA.triggerRelease();
  }
})

