// Database Array of Game Objects
const gameDatabase = [
    { id: 1, name: "Cyber Rush 2026", type: "Action / Sci-Fi", size: "45 GB", cheats: [ { code: "NOLIMITS", effect: "Infinite Boost / Nitro" }, { code: "GODMODE", effect: "Invincibility to damage" }, { code: "CASH999", effect: "Adds $999,999 to inventory" } ] },
    { id: 2, name: "Shadow Ninja: Vengeance", type: "Stealth / RPG", size: "12 GB", cheats: [ { code: "GHOST", effect: "Full invisibility to enemies" }, { code: "ONESHOT", effect: "Kill any enemy with one strike" }, { code: "ALLITEMS", effect: "Unlock all weapons instantly" } ] },
    { id: 3, name: "Speed Horizon Tracker", type: "Racing / Simulation", size: "28 GB", cheats: [ { code: "AUTOSTEER", effect: "Perfect cornering assist" }, { code: "UNLOCKCARS", effect: "Instantly unlock every supercar" } ] },
    { id: 4, name: "Realm of Fantasy VII", type: "Open World / MMORPG", size: "62 GB", cheats: [ { code: "MAXLEVEL", effect: "Instantly levels character to 100" }, { code: "INFMANA", effect: "Mana gauge never depletes" }, { code: "FLYMODE", effect: "Allows flying over standard terrain barriers" } ] },
    { 
        id: 5, 
        name: "Grand Theft Auto: Vice City", 
        type: "Action / Open World", 
        size: "1.5 GB", 
        cheats: [      
            { code: "ASPIRINE", effect: "Restores full health to Tommy Vercetti" }, 
            { code: "PRECIOUSPROTECTION", effect: "Provides maximum body armor" }, 
            { code: "THUGSTOOLS", effect: "Unlocks Light Weapon Set (Tier 1)" }, 
            { code: "PROFESSIONALTOOLS", effect: "Unlocks Medium Weapon Set (Tier 2)" }, 
            { code: "NUTTERTOOLS", effect: "Unlocks Heavy Weapon Set (Tier 3)" }, 
            { code: "PANZER", effect: "Spawns a Rhino Military Tank" }, 
            { code: "LEAVEMEALONE", effect: "Completely removes your Wanted Level" }, 
            { code: "YOUWONTTAKEMEALIVE", effect: "Increases your Wanted Level by 2 stars" }, 
            { code: "SEAWAYS", effect: "Allows land vehicles to drive over water" }, 
            { code: "COMEFLYWITHME", effect: "Enables land vehicles to fly in the air" }, 
            { code: "BIGBANG", effect: "Explodes all nearby vehicles instantly" }, 
            { code: "ICANTTAKEITANYMORE", effect: "Forces Tommy Vercetti to commit suicide" }, 
            { code: "GETTHEREFAST", effect: "Spawns a Sabre Turbo sports car" }, 
            { code: "ROCKANDROLLCAR", effect: "Spawns the Love Fist stretch limousine" }, 
            { code: "RUBBISHCAR", effect: "Spawns a Trashmaster garbage truck" }, 
            { code: "BETTERTHANWALKING", effect: "Spawns a Caddie golf cart" }, 
            { code: "THELASTRIDE", effect: "Spawns a Romero's Hearse funeral car" }, 
            { code: "TRAVELINSTYLE", effect: "Spawns a Bloodring Banger stock car" }, 
            { code: "GETTHEREVERYFASTINDEED", effect: "Spawns a Hotring Racer stock car" }, 
            { code: "GRIPISEVERYTHING", effect: "Grants perfect car handling and braking" }, 
            { code: "WHEELSAREALLINEED", effect: "Makes car bodies invisible, leaving only wheels" }, 
            { code: "FANNYMAGNET", effect: "Causes female pedestrians to follow Tommy" }, 
            { code: "OURGODGIVENRIGHTTOBEARARMS", effect: "Gives weapons to all pedestrians" }, 
            { code: "NOBODYLIKESME", effect: "Makes pedestrians aggressive and attack you" }, 
            { code: "FIGHTFIGHTFIGHT", effect: "Triggers a full pedestrian riot in the city" }, 
            { code: "ONSPEED", effect: "Speeds up the overall gameplay velocity" }, 
            { code: "BOOOOOORING", effect: "Slows down the overall gameplay velocity" }, 
            { code: "LIFEISPASSINGMEBY", effect: "Speeds up the in-game clock time" }, 
            { code: "ALOVELYDAY", effect: "Changes the current weather to sunny" }, 
            { code: "APLEASANTDAY", effect: "Changes the current weather to cloudy" }, 
            { code: "ABITDRIEG", effect: "Changes the current weather to dense clouds" }, 
            { code: "CANTSEEATHING", effect: "Changes the current weather to thick fog" }, 
            { code: "CATSANDDOGS", effect: "Changes the current weather to stormy rain" }, 
            { code: "LOOKLIKELANCE", effect: "Changes Tommy's skin to Lance Vance" }, 
            { code: "MYSONISALAWYER", effect: "Changes Tommy's skin to Ken Rosenberg" }, 
            { code: "ILOOKLIKEHILARY", effect: "Changes Tommy's skin to Hilary King" }, 
            { code: "ROCKANDROLLMAN", effect: "Changes Tommy's skin to Love Fist's Jezz Torent" }, 
            { code: "WELOVEOURDICK", "effect": "Changes Tommy's skin to Love Fist's Dick" }, 
            { code: "ONEARMEDBANDIT", effect: "Changes Tommy's skin to Phil Cassidy" }, 
            { code: "CHEATSHAVEBEENCRACKED", effect: "Changes Tommy's skin to Ricardo Diaz" }, 
            { code: "IDONTHAVETHEMONEYSONNY", effect: "Changes Tommy's skin to Sonny Forelli" },      
            { code: "FOXYLITTLETHING", effect: "Changes Tommy's skin to Mercedes Cortez" } 
        ] 
    },
    { id: 6, name: "Survival Instinct", type: "Horror / Sandbox", size: "18 GB", cheats: [ { code: "HEALME", effect: "Instantly restores full health bars" }, { code: "NOHUNGER", effect: "Freezes food and hydration levels" } ] }
];

// Replaces old switchPage system completely with multi-file safely checks
function renderWebsiteData() {
    const homeFeaturedGrid = document.getElementById('home-featured-grid');
    const gamesGrid = document.getElementById('games-grid');
    const cheatsGamesGrid = document.getElementById('cheats-games-grid');
    const relatedGamesList = document.getElementById('related-games-list');

    // ONLY render Home Grid if elements exist in current file
    if (homeFeaturedGrid) {
        homeFeaturedGrid.innerHTML = '';
        gameDatabase.slice(0, 3).forEach(game => {
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

    // ONLY render Games Download Grid if element exists in current file
    if (gamesGrid) {
        gamesGrid.innerHTML = '';
        gameDatabase.forEach(game => {
            gamesGrid.innerHTML += `
                <div class="card" data-name="${game.name.toLowerCase()}">
                    <div>
                        <h3>${game.name}</h3>
                        <p style="color:#aaa; margin-bottom:5px;">Category: ${game.type}</p>
                        <p style="color:#aaa; font-size:14px;">File Size: ${game.size}</p>
                    </div>
                    <button class="btn accent-btn" onclick="alert('Starting secure download for ${game.name}...')">Download Now</button>
                </div>`;
        });
    }

    // ONLY render Cheats Main Grid if elements exist in current file
    if (cheatsGamesGrid) {
        cheatsGamesGrid.innerHTML = '';
        gameDatabase.forEach(game => {
            cheatsGamesGrid.innerHTML += `
                <div class="card" data-name="${game.name.toLowerCase()}" style="cursor:pointer;" onclick="openCheatDetails(${game.id})">
                    <h3>${game.name}</h3>
                    <p style="color:#00ff88; font-size:14px;">⚡ ${game.cheats.length} Cheats Available</p>
                </div>`;
        });
    }

    // ONLY render Related Sidebar Links if elements exist in current file
    if (relatedGamesList) {
        relatedGamesList.innerHTML = '';
        gameDatabase.forEach(game => {
            relatedGamesList.innerHTML += `<li><a onclick="openCheatDetails(${game.id})">🎯 ${game.name}</a></li>`;
        });
    }
}

// Open and display individual details inside cheats viewport
function openCheatDetails(gameId) {
    const selectedGame = gameDatabase.find(g => g.id === gameId);
    if (!selectedGame) return;

    // Changes layout structure to render code cheat keys out
    const mainContent = document.getElementById('cheats-main-content');
    if (!mainContent) return;

    let cheatsHTML = `
        <a class="back-link" style="cursor:pointer;" onclick="renderWebsiteData(); resetCheatHeader();">← Back to All Games</a>
        <h2>${selectedGame.name} Cheats</h2>
        <div class="cheat-detail-box">
    `;

    selectedGame.cheats.forEach(c => {
        cheatsHTML += `
            <div class="cheat-item">
                <strong style="color:#00ff88; font-size:18px; display:block; margin-bottom:5px;">${c.code}</strong>
                <span>${c.effect}</span>
            </div>
        `;
    });

    cheatsHTML += `</div>`;
    mainContent.innerHTML = cheatsHTML;
    window.scrollTo(0,0);
}

// Small helper UI handler to clean headers on back-clicks
function resetCheatHeader() {
    const mainContent = document.getElementById('cheats-main-content');
    if(mainContent) {
        mainContent.innerHTML = `
            <h1>Game Cheats</h1>
            <p>Select a game below to find instant cheat codes.</p>
            <div class="grid" id="cheats-games-grid"></div>
        `;
        renderWebsiteData();
    }
}

// Section Filters & Search Code
function filterGames(query) {
    const cleanQuery = query.toLowerCase();
    document.querySelectorAll('#games-grid .card').forEach(card => {
        const name = card.getAttribute('data-name');
        card.style.display = name.includes(cleanQuery) ? 'flex' : 'none';
    });
}

function filterCheatsPage(query) {
    const cleanQuery = query.toLowerCase();
    const cards = document.querySelectorAll('#cheats-games-grid .card');
    if(cards.length > 0) {
        cards.forEach(card => {
            const name = card.getAttribute('data-name');
            card.style.display = name.includes(cleanQuery) ? 'block' : 'none';
        });
    }
}

