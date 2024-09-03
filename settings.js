document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.getElementById('settings-button');
    const settingsMenu = document.getElementById('settings-menu');
    const applySettingsButton = document.getElementById('apply-settings');
    const resetSettingsButton = document.getElementById('reset-settings');
    const textSizeSelect = document.getElementById('text-size-select');
    const backgroundSelect = document.getElementById('background-select');

    // Show settings menu
    settingsButton.addEventListener('click', () => {
        settingsMenu.style.display = settingsMenu.style.display === 'none' || settingsMenu.style.display === '' ? 'block' : 'none';
    });

    // Apply settings
    applySettingsButton.addEventListener('click', () => {
        const textSize = textSizeSelect.value;
        const background = backgroundSelect.value;

        document.body.style.fontSize = textSize;
        document.getElementById('surah-details').style.backgroundImage = `url(${background})`;

        // Save settings
        localStorage.setItem('textSize', textSize);
        localStorage.setItem('background', background);
    });

    // Reset settings
    resetSettingsButton.addEventListener('click', () => {
        localStorage.removeItem('textSize');
        localStorage.removeItem('background');
        applyDefaultSettings();
    });

    // Apply default settings or previously saved settings
    function applyDefaultSettings() {
        const defaultTextSize = '18px';
        const defaultBackground = 'textures/texture1.png';

        const savedTextSize = localStorage.getItem('textSize') || defaultTextSize;
        const savedBackground = localStorage.getItem('background') || defaultBackground;

        document.body.style.fontSize = savedTextSize;
        document.getElementById('surah-details').style.backgroundImage = `url(${savedBackground})`;

        textSizeSelect.value = savedTextSize;
        backgroundSelect.value = savedBackground;
    }

    applyDefaultSettings();
});
