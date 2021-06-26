// This function is used to select different color themes
export function themeSelector() {
    const themeSelectBtn = document.querySelector('#theme-select');
    const themeEl = document.getElementById('theme');
    const allThemes = ['light', 'dark', 'metro', 'dune', 'nord', 'nord2', 'dmg', 'solarized', '9009'];
    let themeIndex = 1;
    themeSelectBtn.addEventListener('click', () => {
        let theme = allThemes[themeIndex % allThemes.length];
        themeEl.setAttribute('href', `themes/${theme}.css`);
        themeSelectBtn.innerText = `[ ${theme} ]`;
        //  return (skin = 'dark');
        themeIndex++;
    });
}
