// Note chart: ‹https://www.toontrack.com/app/sp-resources/forum-image-uploads/giulius-spiridioncrazylady-com-br/2018/02/midi-int-midi-note-no-chart.jpg

const noteChart = [
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], // Octave -1
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], // Octave 0
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], // Octave 1
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], // Octave 2
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], // etc
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'], //.................... Octave 9
];

export function noteTranslator(note) {
    let key = 0;
    let octave = -1; // MIDI Spec octave sarts at -1
    for (let i = 0; i < noteChart.length; i++) {
        for (let j = 0; j < noteChart[i].length; j++) {
            if (note === key) {
                return noteChart[i][j] + octave;
            }
            key++;
        }
        octave++;
    }
}

// Example :
// noteTranslator(65) returns F4
