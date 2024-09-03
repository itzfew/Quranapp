document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const surahNumber = queryParams.get('number');
    const surahUrl = `https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${surahNumber}.json`;

    fetch(surahUrl)
        .then(response => response.json())
        .then(data => {
            const surahDetailsElement = document.getElementById('surah-details');
            const surahTitle = document.createElement('h2');
            surahTitle.textContent = `${data.name} (${data.name_translations.en})`;
            
            const surahInfo = document.createElement('p');
            surahInfo.textContent = `Surah Number: ${data.number_of_surah} | Place: ${data.place} | Type: ${data.type}`;
            
            const versesDiv = document.createElement('div');
            versesDiv.classList.add('surah-details');

            data.verses.forEach(verse => {
                const verseElement = document.createElement('p');
                verseElement.innerHTML = `<span class="verse-number">${verse.number}</span> ${verse.text} <br> <em>${verse.translation_en}</em>`;
                versesDiv.appendChild(verseElement);
            });

            const audioList = document.createElement('div');
            audioList.classList.add('audio-list');
            data.recitations.forEach(recitation => {
                const audioLink = document.createElement('a');
                audioLink.href = recitation.audio_url;
                audioLink.textContent = `Listen: ${recitation.name}`;
                audioLink.target = '_blank';
                audioList.appendChild(audioLink);
            });

            const tafsirDropdown = document.createElement('div');
            tafsirDropdown.classList.add('tafsir-dropdown');
            if (data.tafsir) {
                Object.keys(data.tafsir).forEach(lang => {
                    const langDiv = document.createElement('div');
                    langDiv.classList.add('tafsir-content');
                    const langName = document.createElement('h3');
                    langName.textContent = `Tafsir (${lang})`;
                    const langContent = document.createElement('p');
                    langContent.textContent = data.tafsir[lang].kemenag.text["1"];
                    langDiv.appendChild(langName);
                    langDiv.appendChild(langContent);
                    tafsirDropdown.appendChild(langDiv);
                });
            }

            surahDetailsElement.appendChild(surahTitle);
            surahDetailsElement.appendChild(surahInfo);
            surahDetailsElement.appendChild(versesDiv);
            surahDetailsElement.appendChild(audioList);
            surahDetailsElement.appendChild(tafsirDropdown);
        })
        .catch(error => console.error('Error fetching Surah details:', error));
});
