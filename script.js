document.addEventListener("DOMContentLoaded", () => {
    // Enable live search functionality for games listed on games.html
    setupSearchEngine();

    // Fetch central cheats.json only for cheats database handling
    fetch('cheats.json')
        .then(response => response.json())
        .then(data => {
            if (document.getElementById('game-selector')) {
                loadCheatsEngine(data.games);
            }
        })
        .catch(error => console.error("Error fetching cheats database:", error));
});

// Live Search Input Filter Engine for HTML Games & Cheat Cards
function setupSearchEngine() {
    const searchBar = document.getElementById('search-bar');
    if (!searchBar) return;

    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        // Direct filtering for games on games.html
        const gameCards = document.querySelectorAll('.game-search-card');
        gameCards.forEach(card => {
            const name = card.getAttribute('data-name') || '';
            card.style.display = name.includes(query) ? 'flex' : 'none';
        });

        // Filtering for cheats elements on cheats.html
        const cheatCards = document.querySelectorAll('.cheat-search-card');
        cheatCards.forEach(card => {
            const name = card.getAttribute('data-name') || '';
            card.style.display = name.includes(query) ? 'block' : 'none';
        });
    });
}

// Global cache for cheat codes dropdown
let localJSONCache = null;

function loadCheatsEngine(database) {
    localJSONCache = database;
    const gameSelector = document.getElementById("game-selector");
    
    if (gameSelector) {
        gameSelector.innerHTML = '<option value="">-- Choose a Game --</option>';
        database.forEach(game => {
            const opt = document.createElement("option");
            opt.value = game.id;
            opt.textContent = game.name;
            gameSelector.appendChild(opt);
        });

        gameSelector.addEventListener("change", (e) => {
            displayGameCheats(e.target.value);
        });
    }
}

function displayGameCheats(gameId) {
    const cheatsContainer = document.getElementById("cheats-container");
    if (!cheatsContainer || !localJSONCache) return;
    
    cheatsContainer.innerHTML = "";
    if (!gameId) return;

    const targetGame = localJSONCache.find(g => g.id == gameId);
    if (targetGame && targetGame.cheats) {
        targetGame.cheats.forEach(cheat => {
            const card = document.createElement("div");
            card.className = "cheat-card";
            card.innerHTML = `
                <div class="cheat-name">${cheat.effect}</div>
                <div class="cheat-code">${cheat.code}</div>
            `;
            cheatsContainer.appendChild(card);
        });
    }
}