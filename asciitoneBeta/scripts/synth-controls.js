// All of the event listeners for the synth controls
import { synth, delay, filter, crossFade, lfo, toFilt, reverb } from './synth-objects.js';

export function synthParamController() {
    //////// OSC Select Boxes ////////////
    const oscWaveSwitch = document.querySelector('#ascii-osc-wave');
    const asciiOscWave = document.querySelector('#ascii-osc-wave-options');
    let waveSelectState = 0;
    oscWaveSwitch.addEventListener('click', function () {
        if (waveSelectState == 0) {
            asciiOscWave.style.display = 'flex';
            oscWaveSwitch.style.display = 'none';
            return (waveSelectState = 1);
        }
    });
    asciiOscWave.addEventListener('click', ({ target }) => {
        synth.oscillator.type = target.dataset.parameter;
        asciiOscWave.style.display = 'none';
        oscWaveSwitch.style.display = 'inline';
        oscWaveSwitch.innerHTML = '[' + target.dataset.parameter + ']';
        return (waveSelectState = 0);
    });
    //// Glide /////
    glide.addEventListener('change', function () {
        const glide = document.getElementById('glide');
        const asciiGlide = document.getElementById('ascii-glide');
        if (glide.checked) {
            synth.portamento = 0.05;
            asciiGlide.innerHTML = '[@]';
        } else {
            synth.portamento = 0;
            asciiGlide.innerHTML = '[ ]';
        }
    });

    /////// MOD WAVE ///////
    const modWaveSwitch = document.querySelector('#ascii-mod-wave');
    const asciiModWave = document.querySelector('#ascii-mod-wave-options');
    let modSelectState = 0;
    modWaveSwitch.addEventListener('click', function () {
        if (modSelectState == 0) {
            asciiModWave.style.display = 'flex';
            modWaveSwitch.style.display = 'none';
            return (modSelectState = 1);
        }
    });
    asciiModWave.addEventListener('click', ({ target }) => {
        synth.modulation.type = target.dataset.parameter;
        asciiModWave.style.display = 'none';
        modWaveSwitch.style.display = 'inline';
        modWaveSwitch.innerHTML = '[' + target.dataset.parameter + ']';
        return (modSelectState = 0);
    });

    ///// HARMONICITY ///////
    let harmonicityInput = document.querySelector('#harmonicity');
    harmonicityInput.addEventListener('input', ({ target }) => {
        synth.harmonicity.value = target.value;
    });

    //// ENVELOPE ///////
    const envelope = document.querySelector('#envelope-container');
    envelope.addEventListener('input', ({ target }) => {
        synth.envelope[target.dataset.action] = target.value;
    });

    ///// MOD ENVELOPE
    const modEnvelope = document.querySelector('#modulation-envelope');
    modEnvelope.addEventListener('input', ({ target }) => {
        synth.modulationEnvelope[target.dataset.action] = target.value;
        if (target.dataset.action === 'modulationIndex') synth[target.dataset.action].value = target.value;
    });

    ////// CROSSFADER ////////
    const crossFadeInput = document.getElementById('crossfader');
    crossFadeInput.addEventListener('input', () => {
        crossFade.fade.value = crossFadeInput.value;
    });

    /////// FILTER ///////
    const filterControls = document.querySelector('#filter-container');
    filterControls.addEventListener('input', ({ target }) => {
        filter[target.dataset.parameter].value = target.value;
        // circleGrow(target);
    });

    //// LFO
    const lfoRate = document.getElementById('lfo-rate');
    const lfoAmt = document.querySelector('#lfo-amount');
    lfoRate.addEventListener('input', function () {
        lfo.frequency.value = this.value;
    });
    lfoAmt.addEventListener('input', function () {
        toFilt.gain.value = this.value;
        // toFreqRatio.gain.value = this.value;
    });

    //////// Delay /////////////
    const delayControl = document.querySelector('#delay-container');
    delayControl.addEventListener('input', ({ target }) => {
        delay[target.dataset.parameter].value = target.value;
    });

    const reverbControl = document.querySelector('#reverb-container');
    reverbControl.addEventListener('input', ({ target }) => {
        if (target.id === 'reverbMix') {
            reverb[target.dataset.parameter].value = target.value;
        } else {
            reverb[target.dataset.parameter] = target.value;
        }
    });
}
