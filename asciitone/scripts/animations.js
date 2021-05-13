// ------------------------- //
//       Animations          //
// ------------------------- //

///// ASCII Playhead Animation
function playHeadUpdate(step) {
    if (step > 0 && step <= 7) {
        playHead.prepend('──────');
    } else if (step === 0) {
        playHead.innerHTML = '►';
    }
}
///
///////  Sequence Bars ////////
function bars(v) {
    const max = 12; // Max slider value for note meters
    let top = '_' + '<br>';
    let bottom = '^' + '<br>';
    let row = '|░|' + '<br>';
    let filled = '|▓|' + '<br>';
    return top + row.repeat(max - v) + filled.repeat(v) + filled + bottom;
}

///////  Spin  ////////

const ASCIIs = [
    ['&ndash;', '\\', '|', '/'], // Forward Spin
    ['&ndash;', '/', '|', '\\'], // Backward Spin
    ['', '', '', 'pause', 'pause'], // Cursor blink
];

function animate(index) {
    // Update the element id of elementID to have the index-th ASCII array entry in it. (Note: arrays start at 0)
    document.getElementById('ascii-spin').innerHTML = ASCIIs[2][index];
    let inputSlider = document.getElementById('bpm');
    let frequency = inputSlider.value;
    // Call the update function after 1 second / frequency (Hz).
    setTimeout(function () {
        if (Tone.Transport.state === 'started') {
            // Pass the update function the index that it was called with this time, plus 1.
            // % means modulus (remainder when divided by)
            // This way, it doesnt' try to look for the 1000th element which doesn't exist
            animate((index + 1) % ASCIIs[2].length);
        }
    }, 10000 / frequency);
}

function animateLFO(index) {
    document.getElementById('ascii-lfo-spin').innerHTML = ASCIIs[1][index];
    let inputSlider = document.getElementById('lfo-rate');
    let frequency = inputSlider.value;
    // Call the update function after 1 second / frequency (Hz).
    setTimeout(function () {
        if (Tone.Transport.state === 'started') {
            animateLFO((index + 1) % ASCIIs[1].length);
        }
    }, 500 / frequency);
}

// ------------------------- //
//    Slider Animations      //
// ------------------------- //

/// Initialization
export function init() {
    for (let i = 0; i < meters.length; i++) {
        meters[i].innerHTML = bars(6);
        const empty = '│-│' + '<br>';
        const arrowUp = '│-│↑' + '<br>';
        const arrowDown = '│-│↓' + '<br>';
        const arrowUpFilled = '│o│↑' + '<br>';
        const arrowDownFilled = '│o│↓' + '<br>';
        const filled = '│o│' + '<br>';
        asciiRepeater[i].innerHTML = '│-│' + '<br>' + '│-│↑' + '<br>' + '│-│↓' + '<br>' + '│o│' + '<br>';
    }
}

/////// Horizontal Slider Animation ////////
const tempoMeter = document.getElementById('ascii-bpm');
let lines = '|';
let block = '▓';

tempoMeter.innerHTML = '||||||||||||||▓══════════════════ |';
transport.addEventListener('input', function () {
    let animBars = parseInt(this.value / 15);
    let empty = '═';
    tempoMeter.innerHTML = lines.repeat(animBars - 1) + block + empty.repeat(33 - animBars) + ' |';
});

///// Horizontal Slider for Parameters /////

synthControls.addEventListener('input', ({ target }) => {
    let empty = '|';
    let emptyAlt = '-';
    console.log(target.max);
    //// The '/ n' parts make it so the lines amount equal 31 at their max. Just divide/multiply target max so it reaches 31

    /// Mod index
    if (target.max == 100) {
        let linesAmount = parseInt(target.value / 3.2); // This ends up being the total width essentially
        console.log(parseInt(32 - linesAmount));
        document.getElementById(target.dataset.ascii).innerHTML =
            lines + lines.repeat(linesAmount) + block + emptyAlt.repeat(31 - linesAmount) + empty;
    } else if (target.id === 'crossfader') {
        let linesAmount = parseInt(target.value * 18); // Change this value back to 31 if width is reverted
        document.getElementById(target.dataset.ascii).innerHTML = lines.repeat(linesAmount) + block + empty.repeat(17 - linesAmount + 1); // Fills in empty space.  +1 so that it doesn't hit 0 and throw an error
        /// Filter
    } else if (target.max == 1) {
        /// Envelopes
        let linesAmount = parseInt(target.value * 31);
        document.getElementById(target.dataset.ascii).innerHTML =
            lines + lines.repeat(linesAmount) + block + emptyAlt.repeat(31 - linesAmount) + empty;
        /// Filter
    } else if (target.max == 1500) {
        let linesAmount = parseInt(target.value / 47);
        document.getElementById(target.dataset.ascii).innerHTML =
            lines + lines.repeat(linesAmount) + block + emptyAlt.repeat(31 - linesAmount) + empty;
        // Resonance
    } else if (target.max == 10) {
        let linesAmount = parseInt(target.value * 3.1);
        document.getElementById(target.dataset.ascii).innerHTML =
            lines + lines.repeat(linesAmount) + block + emptyAlt.repeat(31 - linesAmount) + empty;
    } else if (target.id === 'lfo-rate') {
        let linesAmount = parseInt(target.value * 2.1);
        document.getElementById(target.dataset.ascii).innerHTML =
            lines + lines.repeat(linesAmount) + block + emptyAlt.repeat(31 - linesAmount) + empty;
    } else if (target.id === 'harmonicity') {
        let linesAmount = parseInt(target.value * 2.7);
        document.getElementById(target.dataset.ascii).innerHTML = lines + lines.repeat(linesAmount) + block + empty.repeat(17 - linesAmount);
        document.getElementById('ascii-harmonicity-num').innerHTML = '|' + parseFloat(target.value).toFixed(1) + '|';
    }
});

// FX Horizontal slider animations

fxControls.addEventListener('input', ({ target }) => {
    let empty = '|';
    let emptyAlt = '-';
    console.log(target.max);
    if (target.id == 'delayTime' || target.id == 'delayFeedback' || target.id == 'delayMix') {
        // Target max is 1
        /// Envelopes
        let linesAmount = parseInt(target.value * 31);
        document.getElementById(target.dataset.ascii).innerHTML =
            lines + lines.repeat(linesAmount) + block + emptyAlt.repeat(31 - linesAmount) + empty;
    }
});

/////// Circle Grow Animation
// let circle = document.getElementById('ascii-cutoff');
// function circleGrow(target) {
//     if (target.id === 'cutoff') {
//         let circleSize = parseInt(target.value / 50);
//         let circleX = parseInt(target.value / 25);
//         /// IMPORTANT This value is the top position + font.size and may need to be adjusted later
//         let circleLocation = 35;
//         let circlePosition = -circleSize + circleLocation;

//         // When the animation turns into a period
//         if (target.value <= 400) {
//             circle.style.opacity = 0;
//             document.getElementById('filterLabel').innerHTML = '> cutoff.';
//             // When the animation is growing/shrinking
//         } else {
//             document.getElementById('filterLabel').innerHTML = '> cutoff';
//             circle.style.fontSize = circleSize + '.px';
//             circle.style.opacity = 1;
//             circle.style.top = circlePosition + '.px';
//             circle.style.left = circleX + 50 + '.px'; // Comment this out to have circle stay in x position
//         }
//     }
// }
