//TODO
//Function to find relative minor
// scale formula function

let noteNames = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
let chordSymbols = ['M', 'm'];
let sharps = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
let majorFormula = [0, 2, 4, 5, 7, 9, 11, 12];
let currentNote = [noteNames[0]];
// let majorFormula = [0, 2, 2, 1, 2, 2, 2, 1];

let noteData = [{ root: 'A', minor: ';' }];

function generateMajorScale(note) {
    let root = noteNames.indexOf(note);
    let majorScale = [];
    let start = noteNames.slice(root); //.join(','));
    let end = noteNames.slice(0, root); //.join(','));
    let buffer = start.concat(end);
    // console.log(result);
    for (let i = 0; i < majorFormula.length - 1; i++) {
        majorScale.push(buffer[majorFormula[i]]);
    }
    majorScale = majorScale.join(' ');
    console.log('Major Scale', majorScale);
    return majorScale;
}

function randomNote() {
    let int = Math.floor(Math.random() * noteNames.length);
    let note = noteNames[int];
    currentNote = note;
    return note;
}

function randomChord() {
    let int = Math.floor(Math.random() * chordSymbols.length);
    let chord = chordSymbols[int];
    return chord;
}
function noteSharpFlat(note) {}

let noteContainer = document.querySelector('.noteName');

// DISPLAY

function noteDisplay(text, note, interval) {
    noteContainer.innerText = text + note;
    console.log(note);
}

let thirdButton = document.querySelector('.third');
thirdButton.addEventListener('click', () => noteDisplay(`What is the ${randomChord()}3 of `, randomNote()));
//noteContainer.innerText = generateMajorScale('D'); //
