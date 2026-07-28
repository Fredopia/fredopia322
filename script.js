document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initPage();
    
    // Add active class to current page nav link
    highlightCurrentPage();
    
    // Initialize cheat system
    initCheats();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize game cards if on games page
    if (document.querySelector('.game-card')) {
        initGameCards();
    }
    
    // Add back to top button
    initBackToTop();
    
    // Initialize responsive menu for mobile
    initMobileMenu();
});

function initPage() {
    // Add loading animation
    document.body.classList.add('loading');
    
    // Remove loading class after page loads
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
}

function initCheats() {
    // Hide all cheat texts initially
    const allCheats = document.querySelectorAll('.cheat-text');
    allCheats.forEach(section => section.style.display = 'none');
    
    // Show the first cheat by default if on cheats page
    const firstCheat = document.querySelector('.cheat-text');
    if (firstCheat) {
        firstCheat.style.display = 'block';
        const firstBtn = document.querySelector(`.cheat-btn[onclick*="${firstCheat.id}"]`);
        if (firstBtn) firstBtn.classList.add('active');
    }
}

function showText(id) {
    // Hide all cheat text sections and remove active class
    const allCheats = document.querySelectorAll('.cheat-text');
    allCheats.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
    
    const allBtns = document.querySelectorAll('.cheat-btn');
    allBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show the selected cheat section and add active class
    const selected = document.getElementById(id);
    if (selected) {
        selected.style.display = 'block';
        selected.classList.add('active');
        const activeBtn = document.querySelector(`.cheat-btn[onclick*="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
        // Smooth scroll to the content for mobile
        if (window.innerWidth <= 768) {
            selected.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Game database for real search functionality
const gamesDatabase = [
    {
        id: 1,
        name: "GTA Vice City",
        category: "Action",
        description: "Classic open-world game set in 80s Miami",
        page: "games.html",
        cheats: true,
        rating: 4.5
    },
    {
        id: 2,
        name: "Minecraft",
        category: "Sandbox",
        description: "Build and explore in a blocky world",
        page: "games.html",
        cheats: true,
        rating: 5.0
    },
    {
        id: 3,
        name: "Counter Strike 1.6",
        category: "FPS",
        description: "Classic tactical shooter game",
        page: "games.html",
        cheats: true,
        rating: 4.7
    },
    {
        id: 4,
        name: "Need for Speed Most Wanted",
        category: "Racing",
        description: "Street racing with police chases",
        page: "games.html",
        cheats: true,
        rating: 4.8
    },
    {
        id: 5,
        name: "PUBG Mobile",
        category: "Battle Royale",
        description: "Last-man-standing battle royale",
        page: "games.html",
        cheats: false,
        rating: 4.6
    },
    {
        id: 6,
        name: "Fortnite",
        category: "Battle Royale",
        description: "Build and battle in this popular game",
        page: "games.html",
        cheats: false,
        rating: 4.5
    },
    {
        id: 7,
        name: "Cyberpunk 2077",
        category: "RPG",
        description: "Futuristic open-world RPG",
        page: "games.html",
        cheats: true,
        rating: 4.7
    },
    {
        id: 8,
        name: "Elden Ring",
        category: "RPG",
        description: "Open-world action RPG",
        page: "games.html",
        cheats: true,
        rating: 5.0
    }
];

// Cheats database
const cheatsDatabase = [
    {
        game: "GTA Vice City",
        category: "Weapons",
        cheat: "THUGSTOOLS",
        description: "Get basic weapons"
    },
    {
        game: "GTA Vice City",
        category: "Weapons",
        cheat: "PROFESSIONALTOOLS",
        description: "Get professional weapons"
    },
    {
        game: "GTA Vice City",
        category: "Health",
        cheat: "ASPIRINE",
        description: "Full health"
    },
    {
        game: "GTA Vice City",
        category: "Vehicles",
        cheat: "PANZER",
        description: "Spawn Rhino tank"
    },
    {
        game: "Minecraft",
        category: "Items",
        cheat: "/give @p diamond 64",
        description: "Get 64 diamonds"
    },
    {
        game: "Minecraft",
        category: "Game Mode",
        cheat: "/gamemode creative",
        description: "Switch to Creative mode"
    },
    {
        game: "Counter Strike 1.6",
        category: "Basic",
        cheat: "sv_cheats 1",
        description: "Enable cheats"
    },
    {
        game: "Counter Strike 1.6",
        category: "Weapons",
        cheat: "impulse 101",
        description: "Get all weapons"
    }
];

function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (!searchInput || !searchButton) return;
    
    // Create search results container
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchResults.style.display = 'none';
    
    // Insert after search container
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.appendChild(searchResults);
    }
    
    // Search function
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        // Search in games
        const gameResults = gamesDatabase.filter(game => 
            game.name.toLowerCase().includes(searchTerm) ||
            game.category.toLowerCase().includes(searchTerm) ||
            game.description.toLowerCase().includes(searchTerm)
        );
        
        // Search in cheats
        const cheatResults = cheatsDatabase.filter(cheat =>
            cheat.game.toLowerCase().includes(searchTerm) ||
            cheat.category.toLowerCase().includes(searchTerm) ||
            cheat.cheat.toLowerCase().includes(searchTerm) ||
            cheat.description.toLowerCase().includes(searchTerm)
        );
        
        // Display results
        displaySearchResults(gameResults, cheatResults);
    }
    
    function displaySearchResults(gameResults, cheatResults) {
        searchResults.innerHTML = '';
        
        if (gameResults.length === 0 && cheatResults.length === 0) {
            searchResults.innerHTML = `
                <div class="search-result-item" style="text-align: center; padding: 20px;">
                    <h4>No Results Found</h4>
                    <p>Try different keywords</p>
                </div>
            `;
            searchResults.style.display = 'block';
            return;
        }
        
        // Add game results
        if (gameResults.length > 0) {
            const gameHeader = document.createElement('div');
            gameHeader.className = 'search-result-item';
            gameHeader.innerHTML = `<h4 style="color: var(--primary);">🎮 Games (${gameResults.length})</h4>`;
            searchResults.appendChild(gameHeader);
            
            gameResults.forEach(game => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `
                    <h4>${game.name}</h4>
                    <p>${game.description}</p>
                    <small style="color: var(--secondary);">⭐ ${game.rating}/5 • ${game.category}</small>
                `;
                item.addEventListener('click', () => {
                    window.location.href = game.page;
                    showToast(`Opening ${game.name}...`, 'info');
                });
                searchResults.appendChild(item);
            });
        }
        
        // Add cheat results
        if (cheatResults.length > 0) {
            const cheatHeader = document.createElement('div');
            cheatHeader.className = 'search-result-item';
            cheatHeader.innerHTML = `<h4 style="color: var(--secondary);">🕹️ Cheats (${cheatResults.length})</h4>`;
            searchResults.appendChild(cheatHeader);
            
            cheatResults.forEach(cheat => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `
                    <h4>${cheat.game}</h4>
                    <p><strong>${cheat.cheat}</strong> - ${cheat.description}</p>
                    <small style="color: var(--info);">${cheat.category}</small>
                `;
                item.addEventListener('click', () => {
                    if (window.location.href.includes('cheats.html')) {
                        // If already on cheats page, try to show the specific cheat
                        const cheatBtn = document.querySelector(`.cheat-btn[onclick*="${cheat.game.toLowerCase().replace(/\s+/g, '-')}"]`);
                        if (cheatBtn) {
                            cheatBtn.click();
                        }
                    } else {
                        window.location.href = 'cheats.html';
                    }
                    showToast(`Showing cheats for ${cheat.game}...`, 'info');
                });
                searchResults.appendChild(item);
            });
        }
        
        searchResults.style.display = 'block';
    }
    
    // Event listeners
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            searchResults.style.display = 'none';
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        // Toggle game details on clicking toggle button only
        const toggleBtn = card.querySelector('.toggle-game-details');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const details = card.querySelector('.game-details');
                if (details) {
                    const isHidden = details.style.display === 'none' || details.style.display === '';
                    details.style.display = isHidden ? 'block' : 'none';
                    toggleBtn.textContent = isHidden ? 'Hide Details' : 'Show Details';
                    
                    // Add animation
                    if (isHidden) {
                        details.classList.add('fade-in');
                    }
                }
            });
        }
    });
    
    // Add animation and toast on download button click
    const downloadButtons = document.querySelectorAll('.game-card .download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const gameName = this.closest('.game-card').querySelector('.game-title').textContent;
            const originalText = this.innerHTML;
            
            this.innerHTML = '<span class="spinner"></span> Downloading...';
            this.disabled = true;
            
            // Simulate download progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 20;
                if (progress >= 100) {
                    clearInterval(interval);
                    this.innerHTML = '<i class="fas fa-check"></i> Download Complete!';
                    this.classList.add('downloaded');
                    showToast(`${gameName} downloaded successfully!`, 'success');
                    
                    // Reset after 3 seconds
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.disabled = false;
                        this.classList.remove('downloaded');
                    }, 3000);
                }
            }, 300);
        });
    });
}

function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
}

function initMobileMenu() {
    // Add mobile menu toggle for small screens
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('nav');
        if (nav) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '☰';
            menuToggle.style.cssText = `
                display: none;
                background: var(--primary);
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 5px;
                font-size: 1.5rem;
                cursor: pointer;
                position: absolute;
                right: 15px;
                top: 15px;
                z-index: 1001;
            `;
            
            document.querySelector('header').appendChild(menuToggle);
            
            // Toggle menu on small screens
            menuToggle.addEventListener('click', function() {
                nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
            });
            
            // Show/hide menu based on screen size
            function handleResize() {
                if (window.innerWidth <= 768) {
                    menuToggle.style.display = 'block';
                    nav.style.display = 'none';
                    nav.style.flexDirection = 'column';
                    nav.style.position = 'absolute';
                    nav.style.top = '100%';
                    nav.style.left = '0';
                    nav.style.right = '0';
                    nav.style.background = 'rgba(26, 26, 46, 0.98)';
                    nav.style.padding = '20px';
                    nav.style.borderRadius = '0 0 15px 15px';
                    nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                } else {
                    menuToggle.style.display = 'none';
                    nav.style.display = 'flex';
                    nav.style.position = 'static';
                    nav.style.background = 'transparent';
                    nav.style.padding = '0';
                    nav.style.borderRadius = '0';
                    nav.style.boxShadow = 'none';
                }
            }
            
            handleResize();
            window.addEventListener('resize', handleResize);
        }
    }
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(26, 26, 46, 0.95);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.9rem;
                white-space: nowrap;
                z-index: 1000;
                border: 1px solid var(--secondary);
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
            }
        });
    });
}

// Initialize lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Add these to DOMContentLoaded
initTooltips();
initLazyLoading();