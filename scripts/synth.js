var context = new (window.AudioContext || window.webkitAudioContext)(); 
// Oscillators
var oscA = context.createOscillator();                                
oscA.type = 'saw';
var oscAfreq = 440;


var oscB = context.createOscillator();                                
oscB.type = 'square';
var oscBfreq = 440;

//Filter
var vcf = context.createBiquadFilter();
vcf.frequency.value = 500;
vcf.type = 'low-pass';

//Gain node
var gain = context.createGain();
gain.gain.value = 0.05;

// Step 4: Connections
oscA.connect(vcf);
oscB.connect(vcf);
vcf.connect(gain);
gain.connect(context.destination);

// Slider B 
document.getElementById('oscAfreq').addEventListener('input', function() {
    oscA.frequency.value = this.value;

});

// Oscillator B
document.getElementById('oscBfreq').addEventListener('input', function() {
    oscB.frequency.value = this.value;

});
// Cutoff
document.getElementById('cutoff').addEventListener('input', function() {
    vcf.frequency.value = this.value;

});

// VCF Q
document.getItembyID('q').addEventListener('input', function() {
    vcf.q.value = this.value;
});



// Step 6: Play


function playSound() {
    var now = context.currentTime; // creates time context
    oscA.start(now);                      
    oscB.start(now);

 }

 function pauseSound() {
    var now = context.currentTime;       
    oscA.stop(now);                 
    oscB.stop(now);

 }




