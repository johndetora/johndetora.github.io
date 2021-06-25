// This function is used to select different color themes
export function skinSwapper() {
    const skinSwapBtn = document.querySelector('#skinSwap');
    const skinSelector = document.getElementById('skin');
    const skinWindow = document.getElementById('skin-window');
    const closeTheme = document.querySelector('.themeClose');
    const allThemes = document.querySelectorAll('.theme');
    styleCurrentTheme(skinSelector.dataset.current);
    // Theme button toggle
    let choosingSkin;
    skinSwapBtn.addEventListener('click', () => {
        choosingSkin = !choosingSkin;
        closeWindow(choosingSkin);
        // Initialize current theme styles
    });
    // Select theme
    skinWindow.addEventListener('click', ({ target }) => {
        choosingSkin = !choosingSkin;
        if (target.className !== 'theme') {
            closeWindow(choosingSkin); //(skinWindow.style.display = 'none');
        } else {
            setSkin(target.dataset.theme);
            choosingSkin = !choosingSkin;
        }
    });
    // Close theme window if clicking away
    window.addEventListener('click', ({ target }) => {
        if (choosingSkin) {
            if (target.className !== 'theme' && target.id !== 'skinSwap') {
                closeWindow(!choosingSkin);
                return (choosingSkin = false);
            }
        }
    });

    function closeWindow(state) {
        state == true ? (skinWindow.style.display = 'flex') : (skinWindow.style.display = 'none');
    }

    function setSkin(skin) {
        const skinSelector = document.getElementById('skin');
        // current = skin;
        // Set the skin
        skinSelector.setAttribute('href', `skins/${skin}.css`);
        styleCurrentTheme(skin);
    }

    // Style the current theme
    function styleCurrentTheme(skin) {
        allThemes.forEach(theme => {
            theme.innerText = theme.dataset.theme;
            if (theme.dataset.theme == skin) theme.innerText += ' *';
        });
    }
}
