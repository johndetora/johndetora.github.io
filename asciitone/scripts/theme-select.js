// This function is used to select different color themes
export function themeSelector() {
    const themeSelectBtn = document.querySelector('#theme-select');
    const allThemes = ['light', 'dark', 'metro', 'dune', 'nord', 'nord2', 'dmg', 'solarized', '9009'];
    let themeIndex = 1;

    if (localStorage.length > 1) {
        window.addEventListener('load', () => {
            let theme = localStorage.getItem('theme');
            themeIndex = localStorage.getItem('themeIndex');
            setTheme(theme);
        });
    }
    themeSelectBtn.addEventListener('click', () => {
        let theme = allThemes[themeIndex % allThemes.length];
        setTheme(theme);
        themeIndex++;
        saveTheme(theme, themeIndex);
    });
}
function saveTheme(theme, index) {
    localStorage.setItem('theme', theme);
    localStorage.setItem('themeIndex', index);
}

function setTheme(theme) {
    const themeSelectBtn = document.querySelector('#theme-select');
    const themeEl = document.getElementById('theme');
    themeEl.setAttribute('href', `themes/${theme}.css`);
    themeSelectBtn.innerText = `[ ${theme} ]`;
}

// OLD ONE IN CASE THIS DOESN'T LOAD FAST ENOUGH
// export function themeSelector() {
//     const themeSelectBtn = document.querySelector('#theme-select');
//     const themeEl = document.getElementById('theme');
//     const allThemes = ['light', 'dark', 'metro', 'dune', 'nord', 'nord2', 'dmg', 'solarized', '9009'];
//     let themeIndex = 1;
//     themeSelectBtn.addEventListener('click', () => {
//         let theme = allThemes[themeIndex % allThemes.length];
//         themeEl.setAttribute('href', `themes/${theme}.css`);
//         themeSelectBtn.innerText = `[ ${theme} ]`;
//         //  return (skin = 'dark');
//         themeIndex++;
//     });
// }
