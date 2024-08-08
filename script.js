const emojiContainer = document.getElementById('emojiContainer');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');

// Function to display emojis
function displayEmojis(emojis) {
    emojiContainer.innerHTML = '';
    emojis.forEach(item => {
        const emojiSpan = document.createElement('span');
        emojiSpan.className = 'emoji';
        emojiSpan.textContent = item.emoji;
        emojiSpan.title = item.description;
        emojiSpan.addEventListener('click', () => {
            navigator.clipboard.writeText(item.emoji);
            alert(`Copied ${item.emoji} to clipboard!`);
        });
        emojiContainer.appendChild(emojiSpan);
    });
}

// Initial display of all emojis
displayEmojis(emojiList);

// Filter by category
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        let filteredEmojis;

        if (filter === 'all') {
            filteredEmojis = emojiList;
        } else {
            filteredEmojis = emojiList.filter(item => {
                const category = item.category.toLowerCase();
                if (filter === 'face' && category.includes('smileys & emotion')) return true;
                if (filter === 'book' && category.includes('objects')) return true;
                if (filter === 'hand' && category.includes('people & body')) return true;
                if (filter === 'heart' && category.includes('symbols')) return true;
                if (filter === 'sport' && category.includes('activities')) return true;
                if (filter === 'flag' && category.includes('flags')) return true;
                return false;
            });
        }

        displayEmojis(filteredEmojis);
    });
});

// Search function
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredEmojis = emojiList.filter(item => 
        item.description.toLowerCase().includes(searchTerm) ||
        item.aliases.some(alias => alias.toLowerCase().includes(searchTerm)) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    displayEmojis(filteredEmojis);
});


