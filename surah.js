document.addEventListener('DOMContentLoaded', function() {
    // Existing code...

    function saveHistory(surahIndex) {
        let history = JSON.parse(localStorage.getItem('quran-history')) || [];
        if (!history.includes(surahIndex)) {
            history.push(surahIndex);
            localStorage.setItem('quran-history', JSON.stringify(history));
        }
    }

    function saveBookmark(surahIndex) {
        let bookmarks = JSON.parse(localStorage.getItem('quran-bookmarks')) || [];
        if (!bookmarks.includes(surahIndex)) {
            bookmarks.push(surahIndex);
            localStorage.setItem('quran-bookmarks', JSON.stringify(bookmarks));
        }
    }

    // Save history on page load
    saveHistory(surahIndex);

    // Functionality to handle bookmarks (you may want to add a bookmark button or similar UI component)
});

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const surahIndex = params.get('surah') || '1'; // Default to Surah 1 if not specified

    fetch(`https://raw.githubusercontent.com/itzfew/Quran-Online/main/source/surah.json`)
        .then(response => response.json())
        .then(data => {
            const surah = data.find(surah => surah.index === surahIndex);
            if (surah) {
                displaySurahDetails(surah);
            }
        });

    function displaySurahDetails(surah) {
        const surahDetails = document.getElementById('surah-details');
        surahDetails.innerHTML = `
            <h2>${surah.title} (${surah.titleAr})</h2>
            <p><strong>Place:</strong> ${surah.place}</p>
            <p><strong>Type:</strong> ${surah.type}</p>
            <p><strong>Number of Verses:</strong> ${surah.count}</p>
            <p><strong>Pages:</strong> ${surah.pages}</p>
            ${surah.juz.map(juz => `
                <div>
                    <h3>Juz ${juz.index}</h3>
                    <p><strong>Verses:</strong> ${juz.verse.start} - ${juz.verse.end}</p>
                </div>
            `).join('')}
            ${surah.verses.map(verse => `
                <div class="verse">
                    <div class="verse-number">${verse.number}</div>
                    <div class="verse-text">${verse.text}</div>
                    <div class="translation">${verse.translation_en}</div>
                </div>
            `).join('')}
        `;
    }
});
