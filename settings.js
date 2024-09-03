document.addEventListener('DOMContentLoaded', function() {
    const settingsButton = document.getElementById('settings-button');
    const settingsMenu = document.getElementById('settings-menu');
    const applyButton = document.getElementById('apply-settings');
    const resetButton = document.getElementById('reset-settings');

    // Show or hide settings menu
    settingsButton.addEventListener('click', function() {
        settingsMenu.style.display = settingsMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Load settings from localStorage
    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('quran-settings')) || {};
        if (settings.transitions !== undefined) {
            document.getElementById('transitions-checkbox').checked = settings.transitions;
            document.body.style.transition = settings.transitions ? 'all 0.3s ease' : 'none';
        }
        if (settings.textSize) {
            document.body.style.fontSize = settings.textSize;
            document.getElementById('text-size-select').value = settings.textSize;
        }
        if (settings.font) {
            document.body.style.fontFamily = settings.font;
            document.getElementById('font-select').value = settings.font;
        }
        if (settings.bgTexture) {
            document.body.classList.remove('bg-texture1', 'bg-texture2');
            document.body.classList.add(settings.bgTexture);
            document.getElementById('bg-texture-select').value = settings.bgTexture;
        }
    }

    loadSettings();

    // Apply settings and save to localStorage
    applyButton.addEventListener('click', function() {
        const transitions = document.getElementById('transitions-checkbox').checked;
        const textSize = document.getElementById('text-size-select').value;
        const font = document.getElementById('font-select').value;
        const bgTexture = document.getElementById('bg-texture-select').value;

        document.body.style.fontSize = textSize;
        document.body.style.fontFamily = font;
        document.body.classList.remove('bg-texture1', 'bg-texture2');
        if (bgTexture !== 'none') {
            document.body.classList.add(bgTexture);
        }

        const settings = {
            transitions: transitions,
            textSize: textSize,
            font: font,
            bgTexture: bgTexture
        };

        localStorage.setItem('quran-settings', JSON.stringify(settings));

        if (transitions) {
            document.body.style.transition = 'all 0.3s ease';
        } else {
            document.body.style.transition = 'none';
        }
    });

    // Reset settings
    resetButton.addEventListener('click', function() {
        localStorage.removeItem('quran-settings');
        loadSettings();
    });
});
