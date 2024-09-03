document.addEventListener('DOMContentLoaded', function() {
    const surahListElement = document.getElementById('surah-list');
    const surahUrl = 'https://raw.githubusercontent.com/itzfew/Quran-Online/main/source/surah.json';

    fetch(surahUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(surah => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `surah.html?number=${surah.index.padStart(3, '0')}`;
                link.textContent = `${surah.title} (${surah.titleAr})`;
                listItem.appendChild(link);
                surahListElement.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching Surah data:', error));
});
