// ------------------------- //
//     Play Sequence         //
// ------------------------- //

let index = 0; // Never change this

let part = new Tone.Part(function (time, value) {
    let step = index % steps;
    console.log(value.repeat);
    // repeatButton.addEventListener('click', () => {
    //     return (repStep = true);
    // Regular play
    if (value.repeat == 0) {
        playHeadUpdate(step);
        synth.triggerAttackRelease(value.note, value.timing, time, value.velocity);
        index++;
    }
    // Repeat Logic
    if (value.repeat == 1) {
        playHeadUpdate(step);
        // Can try setting the decay to a low value before this, and then setting it back after the notes play
        synth.triggerAttackRelease(value.note, '32n', time, value.velocity);
        synth.triggerAttackRelease(value.note, '32n', time + 0.1, value.velocity);
        index++;
    }
    if (value.repeat == 2) {
        playHeadUpdate(step);
        synth.triggerAttackRelease(value.note, '48n', time, value.velocity);
        synth.triggerAttackRelease(value.note, '48n', time + 0.075, value.velocity);
        synth.triggerAttackRelease(value.note, '48n', time + 0.15, value.velocity);
        index++;
    }
    if (value.repeat == 3) {
        playHeadUpdate(step);
        synth.triggerAttackRelease(value.note, '64n', time, value.velocity);
        synth.triggerAttackRelease(value.note, '64n', time + 0.05, value.velocity);
        synth.triggerAttackRelease(value.note, '64n', time + 0.1, value.velocity);
        synth.triggerAttackRelease(value.note, '64n', time + 0.15, value.velocity);
        index++;
    }
}, notes);

/////// Transport and Loop ////////////

part.start('0m');
// repeatNoise.start('0m');
part.loopStart = '0m';
part.loopEnd = '2m';
part.loop = true;
Tone.Transport.loopStart = '0m';
Tone.Transport.loopEnd = '2m';
Tone.Transport.loop = true;
