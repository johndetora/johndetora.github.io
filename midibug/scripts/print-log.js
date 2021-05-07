import { noteTranslator } from './note-chart.js';

function velocityColor(velocity) {
    const lineBreak = '\n';
    const velElem = document.querySelector('.log__velocity');
    const velocityColored = document.createElement('text');
    velocityColored.textContent = velocity;
    if (velocity !== 0) {
        if (velocity < 30) {
            velocityColored.style.color = 'green';
            velElem.appendChild(velocityColored);
        } else if (velocity < 100 && velocity > 30) {
            velocityColored.style.color = 'orange';
            velElem.appendChild(velocityColored);
        } else if (velocity <= 127 && velocity > 100) {
            velocityColored.style.color = 'red';
            velElem.appendChild(velocityColored);
        }
    } else {
        velocityColored.style.color = 'var(--denim)';
        velElem.appendChild(velocityColored);
    }

    velElem.append(lineBreak);
}
// function velocityColor(velocity) {
//     const lineBreak = '\n';
//     const velElem = document.querySelector('.log__velocity');
//     const velocityColored = document.createElement('text');
//     velocityColored.textContent = velocity;
//     if (velocity !== 0) {
//         if (velocity < 22) {
//             velocityColored.style.color = 'violet';
//             velElem.appendChild(velocityColored);
//         } else if (velocity < 44 && velocity >= 22) {
//             velocityColored.style.color = 'blue';
//             velElem.appendChild(velocityColored);
//         } else if (velocity < 66 && velocity >= 44) {
//             velocityColored.style.color = 'green';
//             velElem.appendChild(velocityColored);
//         } else if (velocity < 88 && velocity >= 66) {
//             velocityColored.style.color = 'var(--mustard)';
//             velElem.appendChild(velocityColored);
//         } else if (velocity < 100 && velocity >= 88) {
//             velocityColored.style.color = 'orange';
//             velElem.appendChild(velocityColored);
//         } else if (velocity <= 127 && velocity >= 100) {
//             velocityColored.style.color = 'red';
//             velElem.appendChild(velocityColored);
//         }
//     } else {
//         velocityColored.style.color = 'var(--denim)';
//         velElem.appendChild(velocityColored);
//     }

//     velElem.append(lineBreak);
// }
export function printLog(status, note, velocity) {
    const logEl = document.querySelector('.log');
    const statusEl = document.querySelector('.log__status');
    const noteEl = document.querySelector('.log__note');
    const noteNameEl = document.querySelector('.log__note--name');
    const velElem = document.querySelector('.log__velocity');
    const lineBreak = '\n';

    // Velocity Handling

    // Aftertouch Handling
    if (status == 217) {
        velocityColor(note);
        status = 'aftertouch ';
        statusEl.append(status + lineBreak);
        noteEl.append(lineBreak);
        noteNameEl.append(lineBreak);
    }

    // Note Handling
    if (status == 144 || status == 128 || status == 185) {
        velocityColor(velocity);
        if (status == 144) {
            status = 'note on ';
            const noteOn = document.createElement('text');
            noteOn.textContent = status;
            noteOn.style.color = 'var(--green)';
            statusEl.appendChild(noteOn);
            statusEl.append(lineBreak);
        } else if (status == 128) {
            status = 'note off';
            statusEl.append(status + lineBreak);
        }
        // statusEl.append(status + lineBreak);

        noteEl.append(note + lineBreak);
        noteNameEl.append(`(${noteTranslator(note)})${lineBreak}`);
    }

    // Makes div auto scroll
    logEl.scrollTop = logEl.scrollHeight;
}
