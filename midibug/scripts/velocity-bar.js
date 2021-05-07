export function drawVelocityBar(velocity) {
    const canvas = document.getElementById('velocity-bar');
    const ctx = canvas.getContext('2d');

    if (velocity) {
        // So that it doesn't clear
        if (velocity === 127) {
            // Red
            ctx.fillStyle = 'rgb(231, 95, 85)';
        } else if (velocity > 105 && velocity != 127) {
            // Orange Red
            ctx.fillStyle = 'rgb(243, 128, 83)';
        } else if (velocity > 80 && velocity <= 105) {
            // Orange
            ctx.fillStyle = 'rgb(243, 174, 83)';
        } else if (velocity > 40 && velocity <= 80) {
            // Yellow
            ctx.fillStyle = 'rgb(250, 240, 102)';
            // green
        } else if (velocity <= 40) {
            ctx.fillStyle = 'rgb(123, 194, 101)';
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, velocity, canvas.height);
    }
}
