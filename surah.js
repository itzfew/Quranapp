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

            const surahInfo = document.createElement('p');
            surahInfo.classList.add('surah-info');
            surahInfo.textContent = `Surah Number: ${data.number_of_surah} | Place: ${data.place} | Type: ${data.type}`;

            const versesDiv = document.createElement('div');
            versesDiv.classList.add('surah-details');

            data.verses.forEach(verse => {
                const verseElement = document.createElement('div');
                verseElement.classList.add('verse');
                verseElement.innerHTML = `
                    <span class="verse-number">${verse.number}</span>
                    <div class="verse-text">${verse.text}</div>
                    <div class="translation">${verse.translation_en}</div>
                `;
                versesDiv.appendChild(verseElement);
            });

            surahDetailsElement.appendChild(surahTitle);
            surahDetailsElement.appendChild(surahInfo);
            surahDetailsElement.appendChild(versesDiv);
        
        })
        .catch(error => console.error('Error fetching Surah details:', error));
});
