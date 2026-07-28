document.addEventListener("DOMContentLoaded", () => {
    // Global storage to hold data fetched from cheats.json
    let gameDatabase = [];

    // Fetch the data database file from your repository root directory
    fetch('cheats.json')
        .then(response => response.json())
        .then(data => {
            gameDatabase = data.games;
            
            // Execute render engine loop configurations
            renderWebsiteData(gameDatabase);
            setupSearchEngine(gameDatabase);
            
            // If the user clicks a card directly, automatically view it
            if (document.getElementById('game-selector')) {
                loadCheatsEngine(gameDatabase);
            }
        })
        .catch(error => console.error("Error fetching database array config:", error));
});

function renderWebsiteData(database) {
    const homeFeaturedGrid = document.getElementById('home-featured-grid');
    const gamesGrid = document.getElementById('games-grid');
    const cheatsGamesGrid = document.getElementById('cheats-games-grid');
    const relatedGamesList = document.getElementById('related-games-list');

    // Home Grid layout
    if (homeFeaturedGrid) {
        homeFeaturedGrid.innerHTML = '';
        database.slice(0, 3).forEach(game => {
            homeFeaturedGrid.innerHTML += `
                <div class="card">
                    <div>
                        <h3>${game.name}</h3>
                        <p style="color:#aaa; font-size:14px;">${game.type}</p>
                    </div>
                    <a class="btn accent-btn" href="games.html">View Download</a>
                </div>`;
        });
    }

    // Games Download Grid (Real Links Setup, No alert pops)
    if (gamesGrid) {
        gamesGrid.innerHTML = '';
        database.forEach(game => {
            gamesGrid.innerHTML += `
                <div class="card game-search-card" data-name="${game.name.toLowerCase()}">
                    <div>
                        <h3>${game.name}</h3>
                        <p style="color:#aaa; margin-bottom:5px;">Category: ${game.type}</p>
                        <p style="color:#aaa; font-size:14px;">File Size: ${game.size}</p>
                    </div>
                    <a href="${game.downloadLink}" class="btn accent-btn" target="_blank" download>Download Now</a>
                </div>`;
        });
    }

    // Cheats Grid view layout selection setup
    if (cheatsGamesGrid) {
        cheatsGamesGrid.innerHTML = '';
        database.forEach(game => {
            cheatsGamesGrid.innerHTML += `
                <div class="card cheat-search-card" data-name="${game.name.toLowerCase()}" style="cursor:pointer;" onclick="selectDropdownGame(${game.id})">
                    <h3>${game.name}</h3>
                    <p style="color:#00ff88; font-size:14px;">⚡ ${game.cheats.length} Cheats Available</p>
                </div>`;
        });
    }

    // Related Sidebar Links layout
    if (relatedGamesList) {
        relatedGamesList.innerHTML = '';
        database.forEach(game => {
            relatedGamesList.innerHTML += `<li><a onclick="selectDropdownGame(${game.id})">🎯 ${game.name}</a></li>`;
        });
    }
}

// Live Search Input Filter Execution Module
function setupSearchEngine(database) {
    const searchBar = document.getElementById('search-bar');
    if (!searchBar) return;

    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        // Filter Games Cards on games.html page
        const gameCards = document.querySelectorAll('.game-search-card');
        gameCards.forEach(card => {
            const name = card.getAttribute('data-name');
            card.style.display = name.includes(query) ? 'flex' : 'none';
        });

        // Filter Cheats Selection Boxes on cheat.html page
        const cheatCards = document.querySelectorAll('.cheat-search-card');
        cheatCards.forEach(card => {
            const name = card.getAttribute('data-name');
            card.style.display = name.includes(query) ? 'block' : 'none';
        });
    });
}

// Global scope tracker variables to parse JSON fields without mutations
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

function selectDropdownGame(gameId) {
    const selector = document.getElementById("game-selector");
    if (selector) {
        selector.value = gameId;
        displayGameCheats(gameId);
        // Soft scroll tracking view focus behavior targeting cheats block view container
        document.getElementById('cheats-container').scrollIntoView({ behavior: 'smooth' });
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
