// Goals for this site:
// [ ] Use API to retrieve ISS location

// [ ] Use javascript modules
// [ ] Use some kind of higher order function such as forEach
// [ ] Make it responsive
// [ ] Make sure it has accessibility features
// Extra goal: put on an ascii map using this https://github.com/HenrySeed/ASCII-WorldMap-NPM#readme

import { createGrid } from './grid.js';

// Assign api url to variable
const iss_url = 'https://api.wheretheiss.at/v1/satellites/25544';
const gridElement = document.querySelector('.grid');

async function getISS() {
    let grid = createGrid(0, 0);
    // Fetch the function
    const response = await fetch(iss_url);
    const data = await response.json();
    // Object destructuring syntax
    const { latitude, longitude, velocity } = data;

    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;
    document.getElementById('vel').textContent = velocity;

    grid = createGrid(latitude, longitude);
    grid.forEach((row) => {
        row.forEach((tile) => {
            gridElement.append(tile.element);
        });
    });

    //
}
getISS();

// lat, long
