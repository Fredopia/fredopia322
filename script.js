let gameDatabase = [];

// Fetch data from external JSON file
async function loadGameData() {
  try {
    const response = await fetch('games.json');
    gameDatabase = await response.json();
    renderWebsiteData();
  } catch (error) {
    console.error('Error loading game database:', error);
  }
}

function renderWebsiteData() {
  const homeFeaturedGrid = document.getElementById('home-featured-grid');
  const gamesGrid = document.getElementById('games-grid');
  const cheatsGamesGrid = document.getElementById('cheats-games-grid');
  const relatedGamesList = document.getElementById('related-games-list');

  // Render Home Grid
  if (homeFeaturedGrid) {
    homeFeaturedGrid.innerHTML = '';
    gameDatabase.slice(0, 3).forEach(game => {
      homeFeaturedGrid.innerHTML += `
        <div class="card" data-name="${game.name.toLowerCase()}">
          <div>
            <h3>${game.name}</h3>
            <p style="color:#aaa; font-size:14px;">${game.type}</p>
          </div>
          <a class="btn accent-btn" href="games.html">View Download</a>
        </div>`;
    });
  }

  // Render Games Download Grid
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
          <a class="btn accent-btn" href="${game.downloadUrl}" target="_blank" rel="noopener noreferrer">Download Now</a>
        </div>`;
    });
  }

  // Render Cheats Main Grid
  if (cheatsGamesGrid) {
    cheatsGamesGrid.innerHTML = '';
    gameDatabase.forEach(game => {
      cheatsGamesGrid.innerHTML += `
        <div class="card" data-name="${game.name.toLowerCase()}" style="cursor:pointer;" onclick="openCheatDetails(${game.id})">
          <h3>${game.name}</h3>
          <p style="color:#00ff88; font-size:14px;">⚡ ${game.cheats ? game.cheats.length : 0} Cheats Available</p>
        </div>`;
    });
  }

  // Render Related Sidebar
  if (relatedGamesList) {
    relatedGamesList.innerHTML = '';
    gameDatabase.forEach(game => {
      relatedGamesList.innerHTML += `<li><a onclick="openCheatDetails(${game.id})">🎯 ${game.name}</a></li>`;
    });
  }
}

function openCheatDetails(gameId) {
  const selectedGame = gameDatabase.find(g => g.id === gameId);
  if (!selectedGame) return;

  const mainContent = document.getElementById('cheats-main-content');
  if (!mainContent) return;

  let cheatsHTML = `
    <a class="back-link" style="cursor:pointer;" onclick="resetCheatHeader();">← Back to All Games</a>
    <h2>${selectedGame.name} Cheats</h2>
    <div class="cheat-detail-box">
  `;

  if (selectedGame.cheats && selectedGame.cheats.length > 0) {
    selectedGame.cheats.forEach(c => {
      cheatsHTML += `
        <div class="cheat-item">
          <strong style="color:#00ff88; font-size:18px; display:block; margin-bottom:5px;">${c.code}</strong>
          <span>${c.effect}</span>
        </div>`;
    });
  } else {
    cheatsHTML += `<p>No cheats available for this game yet.</p>`;
  }

  cheatsHTML += `</div>`;
  mainContent.innerHTML = cheatsHTML;
  window.scrollTo(0, 0);
}

function resetCheatHeader() {
  const mainContent = document.getElementById('cheats-main-content');
  if (mainContent) {
    mainContent.innerHTML = `
      <h1>Game Cheats</h1>
      <p>Select a game below to find instant cheat codes.</p>
      <div class="grid" id="cheats-games-grid"></div>
    `;
    renderWebsiteData();
  }
}

// Global Search Filters
function filterCards(query) {
  const cleanQuery = query.toLowerCase().trim();
  document.querySelectorAll('.card[data-name]').forEach(card => {
    const name = card.getAttribute('data-name');
    card.style.display = name.includes(cleanQuery) ? 'flex' : 'none';
  });
}

function filterGames(query) {
  filterCards(query);
}

document.addEventListener('DOMContentLoaded', loadGameData);