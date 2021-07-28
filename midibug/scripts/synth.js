// Synth
const enableBtn = document.querySelector('.synth__check');
let enableState;

enableBtn?.addEventListener('click', async () => {
    !enableState ? (enableState = true) : (enableState = false);
    console.log(enableState);
    await Tone.start();
    console.log('audio is ready');
});

enableBtn.addEventListener('click', function () {
    // .state: the playback state of the source, either "started", "stopped", or "paused"
    if (Tone.Transport.state !== 'started') {
        enableBtn.textContent = '[enabled]';
        enableBtn.style.color = 'var(--green)';
        Tone.Transport.start();
    } else {
        enableBtn.textContent = '[disabled]';
        enableBtn.style.color = 'var(--red)';
        Tone.Transport.stop();
    }
});

//Synth parameters
const synth = new Tone.Synth({
    oscillator: {
        type: 'sawtooth',
    },
});

let gain = new Tone.Gain(0.5);
// Routing
synth.connect(gain);
gain.toDestination();

function synthPlay(note, velocity) {
    const now = Tone.now();
    velocity ? synth.triggerAttack(note, now, velocity / 12) : synth.triggerRelease(now + '32n');
}
