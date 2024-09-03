document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const surahNumber = queryParams.get('number');
    const surahUrl = `https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${surahNumber}.json`;

    fetch(surahUrl)
        .then(response => response.json())
        .then(data => {
            const surahDetailsElement = document.getElementById('surah-details');

            const surahTitle = document.createElement('h2');
            surahTitle.classList.add('surah-title');
            surahTitle.textContent = `${data.name} (${data.name_translations.en})`;
            surahDetailsElement.appendChild(surahTitle);

            data.verses.forEach(verse => {
                const verseElement = document.createElement('div');
                verseElement.classList.add('verse');

                const verseNumber = document.createElement('span');
                verseNumber.classList.add('verse-number');
                verseNumber.textContent = verse.number;
                verseElement.appendChild(verseNumber);

                const verseText = document.createElement('div');
                verseText.classList.add('verse-text');
                verseText.textContent = verse.text;
                verseElement.appendChild(verseText);

                const translation = document.createElement('div');
                translation.classList.add('translation');
                translation.textContent = verse.translation_en;
                verseElement.appendChild(translation);

                surahDetailsElement.appendChild(verseElement);
            });
        })
        .catch(error => console.error('Error fetching Surah details:', error));
});
