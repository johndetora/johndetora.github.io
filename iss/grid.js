export function createGrid(latitude, longitude) {
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
