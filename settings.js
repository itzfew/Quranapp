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
            document.body.style.fontSize = settings.textSize;
            document.getElementById('text-size-select').value = settings.textSize;
        }
    }

    loadSettings();

    applyButton.addEventListener('click', function() {
        const textSize = document.getElementById('text-size-select').value;

        document.body.style.fontSize = textSize;

        const settings = {
            textSize: textSize
        };

        localStorage.setItem('quran-settings', JSON.stringify(settings));
    });

    resetButton.addEventListener('click', function() {
        localStorage.removeItem('quran-settings');
        loadSettings();
    });
});
