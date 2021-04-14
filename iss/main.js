// Goals for this site:
// [ ] Use API to retrieve ISS location

// [ ] Use javascript modules
// [ ] Use some kind of higher order function such as forEach
// [ ] Make it responsive
// [ ] Make sure it has accessibility features
// Extra goal: put on an ascii map using this https://github.com/HenrySeed/ASCII-WorldMap-NPM#readme

// import { createGrid } from './grid.js';

// Assign api url to variable
const iss_url = 'https://api.wheretheiss.at/v1/satellites/25544';
const gridElement = document.querySelector('.grid');

async function getISS() {
    gridElement.innerHTML = '';
    // Fetch the function
    const response = await fetch(iss_url);
    const data = await response.json();
    // Object destructuring syntax
    const { latitude, longitude, velocity } = data;

    document.getElementById('lat').textContent = parseFloat(latitude).toFixed(2);
    document.getElementById('lon').textContent = parseFloat(longitude).toFixed(2);
    document.getElementById('vel').textContent = parseInt(velocity) + ' km/h';

    let grid = createGrid(latitude, longitude);
    grid.forEach((row) => {
        row.forEach((tile) => {
            gridElement.append(tile.element);
        });
    });
}

function createGrid(latitude, longitude) {
    // lat = lat / 4;
    // lon = lon / 4;
    longitude = parseInt(longitude / 2);
    console.log(longitude);
    latitude = parseInt(latitude / 2);
    const grid = [];
    for (let x = 45; x > -45; x--) {
        const row = [];
        for (let y = -90; y < 90; y++) {
            const element = document.createElement('div');
            element.id = y;
            element.dataset.x = y;
            if (longitude === y && latitude === x) {
                element.innerHTML = ' ||- ISS ||-';
                element.dataset.status = 'active';
            } else {
                element.dataset.status = 'hidden';
            }
            const tile = {
                element,
                x,
                y,
            };
            row.push(tile);
        }
        grid.push(row);
    }
    return grid;
}
getISS();
setInterval(getISS, 5000);

// lat, long
