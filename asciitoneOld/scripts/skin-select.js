// This function is used to select different color themes
export function skinSwapper() {
    const skinSwapBtn = document.querySelector('#skinSwap');
    const skinSelector = document.getElementById('skin');
    let skin = 'default';
    skinSwapBtn.addEventListener('click', function () {
        if (skin === 'default') {
            skinSelector.setAttribute('href', 'skins/dark.css');
            skinSwapBtn.innerHTML = '[ light mode ]';
            return (skin = 'dark');
        } else if (skin === 'dark') {
            skinSelector.setAttribute('href', 'skins/light.css');
            skinSwapBtn.innerHTML = '[ dark mode ]';
            return (skin = 'default');
        }
    });
}
