document.addEventListener('DOMContentLoaded', function() {
    const settingsButton = document.getElementById('settings-button');
    const settingsMenu = document.getElementById('settings-menu');
    const applyButton = document.getElementById('apply-settings');
    const resetButton = document.getElementById('reset-settings');

    settingsButton.addEventListener('click', function() {
        settingsMenu.style.display = settingsMenu.style.display === 'block' ? 'none' : 'block';
    });

    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('quran-settings')) || {};
        if (settings.textSize) {
            document.querySelector('.verse-text').style.fontSize = settings.textSize;
            document.getElementById('text-size-select').value = settings.textSize;
        }
        if (settings.background) {
            document.getElementById('surah-details').style.backgroundImage = `url('${settings.background}')`;
            document.getElementById('background-select').value = settings.background;
        }
    }

    loadSettings();

    applyButton.addEventListener('click', function() {
        const textSize = document.getElementById('text-size-select').value;
        const background = document.getElementById('background-select').value;

        document.querySelector('.verse-text').style.fontSize = textSize;
        document.getElementById('surah-details').style.backgroundImage = `url('${background}')`;

        const settings = {
            textSize: textSize,
            background: background
        };

        localStorage.setItem('quran-settings', JSON.stringify(settings));
    });

    resetButton.addEventListener('click', function() {
        localStorage.removeItem('quran-settings');
        loadSettings();
    });
});
