document.addEventListener('DOMContentLoaded', function() {
    const surahListElement = document.getElementById('surah-list');
    const surahUrl = 'https://raw.githubusercontent.com/itzfew/Quran-Online/main/source/surah.json';

    fetch(surahUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(surah => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                
                // Convert surah.index to integer to remove leading zeros
                const surahNumber = parseInt(surah.index, 10);
                
                link.href = `surah.html?number=${surahNumber}`;
                link.textContent = `${surah.title} (${surah.titleAr})`;
                
                listItem.appendChild(link);
                surahListElement.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching Surah data:', error));
});
