 document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const surahIndex = urlParams.get('index');

    if (surahIndex) {
        fetch(`https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${surahIndex}.json`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('surah-title').innerText = data.name_translations.en;
                const surahDetailsDiv = document.getElementById('surah-details');
                surahDetailsDiv.innerHTML = data.verses.map(verse => `
                    <div class="verse">
                        <div class="number">${verse.number}</div>
                        <div class="text">${verse.text}</div>
                    </div>
                `).join('');
            });
    }
});
