document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const surahNumber = queryParams.get('number');
    const surahUrl = `https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${surahNumber}.json`;

    fetch(surahUrl)
        .then(response => response.json())
        .then(data => {
            const surahDetailsElement = document.getElementById('surah-details');
            const surahTitle = document.createElement('h2');
            surahTitle.textContent = data.name;

            const surahContent = document.createElement('div');
            data.verses.forEach(verse => {
                const verseElement = document.createElement('p');
                verseElement.innerHTML = `<strong>Verse ${verse.number}:</strong> ${verse.text} <br> <em>${verse.translation_en}</em>`;
                surahContent.appendChild(verseElement);
            });

            surahDetailsElement.appendChild(surahTitle);
            surahDetailsElement.appendChild(surahContent);
        })
        .catch(error => console.error('Error fetching Surah details:', error));
});
