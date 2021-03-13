// Date and Time
let d;
d = new Date();
document.getElementById('date').innerHTML = d.toDateString();
let time = document.getElementById('time');
function clock(time) {
    time.innerHTML = new Date().toLocaleTimeString();
}
setInterval(() => {
    clock(time);
}, 1000);

function search(e) {
    if (e.keyCode == 13) {
        var val = document.getElementById('search-field').value;
        window.location = 'https://www.google.com/search?q=';
        val + '&kp=1&kl=de-de&kh=1&kg=p&k5=1&kae=d&k1=-1';
        return false;
    }
}
