document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const surahNumber = parseInt(queryParams.get('number'));
    const surahUrl = `https://raw.githubusercontent.com/itzfew/Quranapp/main/surah/${surahNumber}.json`;

    fetch(surahUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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
                    <div class="verse-content">
                        <span class="verse-number">${verse.number}</span>
                        <div class="verse-text arabic-text">${verse.text}</div>
                        <div class="translation">${verse.translation_en}</div>
                        <button class="share-btn" data-number="${verse.number}" data-text="${verse.text}" data-translation="${verse.translation_en}" data-surah="${data.name}">
                            <i class="fas fa-share-alt"></i> Share
                        </button>
                        <button class="copy-btn" data-text="${verse.text}" data-translation="${verse.translation_en}">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                `;
                versesDiv.appendChild(verseElement);
            });

            surahDetailsElement.appendChild(surahTitle);
            surahDetailsElement.appendChild(surahInfo);
            surahDetailsElement.appendChild(versesDiv);
        
            // Navigation buttons
            const prevButton = document.getElementById('prev-surah');
            const nextButton = document.getElementById('next-surah');

            if (surahNumber > 1) {
                prevButton.disabled = false;
                prevButton.addEventListener('click', () => {
                    window.location.href = `surah.html?number=${surahNumber - 1}`;
                });
            }

            if (surahNumber < 114) {
                nextButton.disabled = false;
                nextButton.addEventListener('click', () => {
                    window.location.href = `surah.html?number=${surahNumber + 1}`;
                });
            }

            // Add event listeners for share buttons
            document.querySelectorAll('.share-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const number = this.getAttribute('data-number');
                    const text = this.getAttribute('data-text');
                    const translation = this.getAttribute('data-translation');
                    const surah = this.getAttribute('data-surah');

                    const shareText = `${surah} - Verse ${number}\n\nArabic: ${text}\n\nTranslation: ${translation}\n\nShare this verse: ${window.location.href}`;
                    
                    if (navigator.share) {
                        navigator.share({
                            title: `Share Verse ${number}`,
                            text: shareText,
                            url: window.location.href
                        })
                        .then(() => console.log('Successful share'))
                        .catch(() => copyToClipboard(shareText));
                    } else {
                        copyToClipboard(shareText);
                    }
                });
            });

            // Add event listeners for copy buttons
            document.querySelectorAll('.copy-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const text = this.getAttribute('data-text');
                    const translation = this.getAttribute('data-translation');
                    const copyText = `Arabic: ${text}\nTranslation: ${translation}`;
                    copyToClipboard(copyText);
                });
            });
        })
        .catch(error => console.error('Error fetching Surah details:', error));

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('Copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                prompt('Copy to clipboard:', text);
            });
    }
});
