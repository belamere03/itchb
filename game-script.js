// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Particle animation for hero section
    createParticles();

    // Character card 3D hover effects
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('clicked')) {
                this.style.transform = 'translateY(-10px) scale(1.05) rotateY(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('clicked')) {
                this.style.transform = 'translateY(0) scale(1) rotateY(0)';
            }
        });

        // Add click effect
        card.addEventListener('click', function() {
            // Remove clicked class from all cards
            document.querySelectorAll('.character-card').forEach(c => {
                c.classList.remove('clicked');
                c.style.transform = 'translateY(0) scale(1) rotateY(0)';
            });
            
            // Add clicked class to current card
            this.classList.add('clicked');
            this.style.transform = 'translateY(-5px) scale(1.02) rotateY(2deg)';
            
            // Remove after animation
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 2000);
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const lines = heroTitle.querySelectorAll('.title-line');
        lines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.8s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }

    // Add glitch effect to random elements
    setInterval(() => {
        const glitchElements = document.querySelectorAll('.section-title');
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        
        if (randomElement && Math.random() < 0.15) {
            randomElement.classList.add('glitch');
            randomElement.setAttribute('data-text', randomElement.textContent);
            
            setTimeout(() => {
                randomElement.classList.remove('glitch');
            }, 500);
        }
    }, 3000);

    // Enhanced loading screen with v0.7.0 branding
    window.addEventListener('load', function() {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">SSB Infinity v0.7.0</div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
                <div class="loading-text">Loading 22 fighters and infinite combos...</div>
                <div class="loading-features">
                    <div class="loading-feature">⚡ Turbowarp Enhanced</div>
                    <div class="loading-feature">🤖 Bot AI Ready</div>
                    <div class="loading-feature">🎮 Custom Controls</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(loadingScreen);
        
        // Animate loading bar
        setTimeout(() => {
            const progress = loadingScreen.querySelector('.loading-progress');
            progress.style.width = '100%';
        }, 500);
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 3000);
    });

    // FAQ cards interaction
    document.querySelectorAll('.faq-card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });

    // Settings info animation
    const settingsItems = document.querySelectorAll('.setting-item');
    settingsItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Create floating particles with enhanced effects
function createParticles() {
    const particleContainer = document.querySelector('.particle-container');
    if (!particleContainer) return;
    
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff6600'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 3 + 1;
        const duration = 5 + Math.random() * 15;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${randomColor};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${duration}s infinite linear, pulse ${2 + Math.random() * 3}s infinite ease-in-out;
            opacity: ${0.3 + Math.random() * 0.7};
            box-shadow: 0 0 ${size * 2}px ${randomColor};
        `;
        particleContainer.appendChild(particle);
    }
}

// Character moves data - Complete movesets for all 22 fighters
const characterMoves = {
    mario: {
        name: "Mario",
        description: "The all-rounder plumber with balanced attacks",
        moves: [
            "🔥 Fireball - Projectile attack",
            "🍄 Super Jump Punch - Anti-air attack",
            "💨 Cape - Reflects projectiles",
            "💧 F.L.U.D.D. - Water spray pushback",
            "⭐ Super Star - Final Smash invincibility"
        ],
        combos: [
            "Up-tilt → Up-air → Up-air",
            "Down-throw → Forward-air",
            "Fireball → Forward-smash"
        ]
    },
    sonic: {
        name: "Sonic",
        description: "The speedster with rapid combos and mobility",
        moves: [
            "💨 Sonic Boom - Speed dash attack",
            "🌪️ Spin Dash - Rolling attack",
            "⚡ Homing Attack - Targeted aerial strike",
            "🏃 Boost - Speed increase buff",
            "💫 Super Sonic - Final Smash transformation"
        ],
        combos: [
            "Homing Attack → Forward-air → Back-air",
            "Spin Dash → Up-smash",
            "Down-air → Down-air → Special"
        ]
    },
    sans: {
        name: "Sans",
        description: "Low HP, high chaos with unique mechanics",
        moves: [
            "💀 Gaster Blaster - Laser beam",
            "🦴 Bone Attack - Ground spikes",
            "💙 Blue Soul - Gravity manipulation",
            "😴 Sleep - Dodge with nap",
            "⚰️ Dunked On - Final Smash judgment"
        ],
        combos: [
            "Bone → Bone → Gaster Blaster",
            "Blue Soul → Bone combo",
            "Sleep dodge → Counter attack"
        ]
    },
    steve: {
        name: "Steve",
        description: "Crafty moves from the blocky world",
        moves: [
            "⛏️ Mine - Gather resources",
            "🔨 Build - Create block platforms",
            "🏹 Bow - Ranged arrow attack",
            "🗡️ Diamond Sword - Powerful melee",
            "💎 Diamond Armor - Final Smash defense"
        ],
        combos: [
            "Mine → Build → Down-air",
            "Arrow → Forward-smash",
            "Block trap → Diamond Sword"
        ]
    },
    shaggy: {
        name: "Shaggy",
        description: "Ultra Instinct? You bet.",
        moves: [
            "🌟 Ultra Instinct - Auto-dodge mode",
            "👊 Shaggy Punch - Devastating blow",
            "🥪 Scooby Snack - Health restore",
            "😱 Zoinks! - Fear-based attack",
            "🌌 100% Power - Final Smash transformation"
        ],
        combos: [
            "Ultra Instinct → Punch combo",
            "Zoinks! → Forward-air spam",
            "Snack → Power mode activation"
        ]
    },
    cuphead: {
        name: "Cuphead",
        description: "Run and gun cartoon style fighter",
        moves: [
            "☕ Finger Gun - Rapid fire",
            "🎯 Charge Shot - Powered projectile",
            "💨 Dash - Quick movement",
            "🛡️ Parry - Counter pink attacks",
            "👹 Devil's Contract - Final Smash"
        ],
        combos: [
            "Finger Gun → Dash → Charge Shot",
            "Parry → Counter combo",
            "Air dash → Down-air"
        ]
    },
    kirby: {
        name: "Kirby",
        description: "The pink puffball of power",
        moves: [
            "💨 Inhale - Copy enemy abilities",
            "🔨 Hammer - Powerful ground slam",
            "⭐ Star Spit - Projectile attack",
            "🌪️ Final Cutter - Sword wave",
            "🍳 Cook - Final Smash cooking pot"
        ],
        combos: [
            "Inhale → Star Spit",
            "Hammer → Down-air",
            "Final Cutter → Forward-smash"
        ]
    },
    naruto: {
        name: "Naruto",
        description: "Ninja techniques and jutsu master",
        moves: [
            "🍃 Shadow Clone - Create duplicates",
            "🌀 Rasengan - Spinning energy attack",
            "🦊 Nine-Tails Chakra - Power boost",
            "🏃 Ninja Run - Enhanced mobility",
            "🌟 Sage Mode - Final Smash transformation"
        ],
        combos: [
            "Shadow Clone → Rasengan",
            "Ninja Run → Forward-air",
            "Nine-Tails → Combo extension"
        ]
    },
    goku: {
        name: "Goku",
        description: "Saiyan warrior with devastating power",
        moves: [
            "🌊 Kamehameha - Energy beam",
            "👊 Dragon Fist - Rushing punch",
            "⚡ Instant Transmission - Teleport",
            "💪 Super Saiyan - Power transformation",
            "🐲 Spirit Bomb - Final Smash ultimate"
        ],
        combos: [
            "Dragon Fist → Kamehameha",
            "Instant Transmission → Combo starter",
            "Super Saiyan → Enhanced attacks"
        ]
    },
    pikachu: {
        name: "Pikachu",
        description: "Electric mouse with shocking attacks",
        moves: [
            "⚡ Thunderbolt - Electric projectile",
            "💥 Thunder - Lightning from above",
            "🏃 Quick Attack - Swift movement",
            "⭐ Thunder Wave - Paralysis attack",
            "🌩️ Volt Tackle - Final Smash rush"
        ],
        combos: [
            "Thunder Wave → Thunder",
            "Quick Attack → Back-air",
            "Thunderbolt → Forward-smash"
        ]
    },
    link: {
        name: "Link",
        description: "Hero of Hyrule with legendary weapons",
        moves: [
            "🏹 Bow - Precise arrow shots",
            "💣 Bomb - Explosive projectile",
            "🗡️ Master Sword - Sacred blade",
            "🛡️ Hylian Shield - Defensive stance",
            "⚡ Triforce Slash - Final Smash combo"
        ],
        combos: [
            "Bomb → Forward-air",
            "Bow → Master Sword combo",
            "Shield → Counter attack"
        ]
    },
    megaman: {
        name: "Megaman",
        description: "Robot master with copied abilities",
        moves: [
            "🔫 Mega Buster - Charged shots",
            "🔥 Fire Storm - Flame projectiles",
            "⚡ Thunder Beam - Electric attack",
            "🧊 Ice Slasher - Freezing projectile",
            "💥 Rush Coil - Final Smash support"
        ],
        combos: [
            "Mega Buster → Fire Storm",
            "Ice Slasher → Thunder Beam",
            "Rush Coil → Aerial combo"
        ]
    },
    "scratch-cat": {
        name: "Scratch Cat",
        description: "Programming mascot with coding powers",
        moves: [
            "💻 Code Block - Programming attack",
            "🎨 Sprite Change - Transform ability",
            "🔄 Loop - Repeating actions",
            "📢 Broadcast - Communication wave",
            "🎮 Game Over - Final Smash debug"
        ],
        combos: [
            "Code Block → Loop combo",
            "Sprite Change → Broadcast",
            "Loop → Infinite combo potential"
        ]
    },
    impostor: {
        name: "Impostor",
        description: "Sus crewmate with deceptive abilities",
        moves: [
            "🔪 Sabotage - Disable enemy abilities",
            "👤 Shapeshift - Mimic appearance",
            "🚨 Emergency - Area damage",
            "🕳️ Vent - Quick escape/attack",
            "📱 Sus Vote - Final Smash ejection"
        ],
        combos: [
            "Sabotage → Shapeshift",
            "Vent → Emergency attack",
            "Shapeshift → Backstab combo"
        ]
    },
    ness: {
        name: "Ness",
        description: "PSI powered psychic fighter",
        moves: [
            "🔮 PK Thunder - Electric projectile",
            "🔥 PK Fire - Flame pillar",
            "💫 PSI Magnet - Absorb energy",
            "🌟 PK Flash - Delayed explosion",
            "🌍 PK Rockin - Final Smash wave"
        ],
        combos: [
            "PK Fire → Forward-air",
            "PK Thunder → Recovery combo",
            "PSI Magnet → PK Flash"
        ]
    },
    "hat-kid": {
        name: "Hat Kid",
        description: "Time-bending adventurer with magical hats",
        moves: [
            "🎩 Hat Throw - Boomerang attack",
            "⏰ Time Stop - Freeze enemies",
            "👻 Dweller Mask - Phase through",
            "🏃 Sprint Hat - Enhanced speed",
            "🌟 Time Rift - Final Smash chaos"
        ],
        combos: [
            "Time Stop → Hat Throw",
            "Sprint Hat → Aerial combo",
            "Dweller Mask → Phase attack"
        ]
    },
    sora: {
        name: "Sora",
        description: "Keyblade master from Kingdom Hearts",
        moves: [
            "🔑 Keyblade Combo - Multi-hit attack",
            "✨ Magic Spells - Elemental attacks",
            "🌟 Drive Form - Transformation",
            "💫 Flowmotion - Enhanced mobility",
            "👑 Ultimate Form - Final Smash power"
        ],
        combos: [
            "Keyblade → Magic combo",
            "Flowmotion → Aerial strikes",
            "Drive Form → Enhanced attacks"
        ]
    },
    reimu: {
        name: "Reimu",
        description: "Shrine maiden with spiritual powers",
        moves: [
            "🎴 Ofuda - Paper talisman projectiles",
            "🌙 Yin-Yang Orb - Floating attack",
            "⭐ Spirit Sign - Bullet pattern",
            "🛡️ Fantasy Seal - Protective barrier",
            "🌸 Fantasy Heaven - Final Smash spellcard"
        ],
        combos: [
            "Ofuda → Yin-Yang combo",
            "Spirit Sign → Fantasy Seal",
            "Bullet pattern → Aerial follow-up"
        ]
    }
};

// Show character moves modal
function showCharacterMoves(character) {
    const modal = document.getElementById('movesModal');
    const modalName = document.getElementById('modalCharacterName');
    const modalMoves = document.getElementById('characterMoves');
    
    if (characterMoves[character]) {
        const data = characterMoves[character];
        modalName.textContent = data.name + " - Move List";
        
        modalMoves.innerHTML = `
            <div class="character-info">
                <p class="character-desc">${data.description}</p>
            </div>
            <div class="moves-section">
                <h3>🎮 Special Moves</h3>
                <ul class="moves-list">
                    ${data.moves.map(move => `<li>${move}</li>`).join('')}
                </ul>
            </div>
            <div class="combos-section">
                <h3>⚔️ Combo Ideas</h3>
                <ul class="combos-list">
                    ${data.combos.map(combo => `<li>${combo}</li>`).join('')}
                </ul>
            </div>
            <div class="bot-info">
                <p>🤖 <strong>Bot Battle:</strong> Click the black part of ${data.name}'s character box in-game to fight against CPU!</p>
            </div>
        `;
    } else {
        modalName.textContent = "Character Moves";
        modalMoves.innerHTML = `
            <div class="character-info">
                <p>🎮 Complete move lists available in-game!</p>
                <p>Click the ❓ help icon in the main menu to see detailed moves for all 22 fighters.</p>
                <p>🤖 Click the black part of any character box to challenge a bot opponent!</p>
            </div>
        `;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Show all fighters info
function showAllFighters() {
    const modal = document.getElementById('movesModal');
    const modalName = document.getElementById('modalCharacterName');
    const modalMoves = document.getElementById('characterMoves');
    
    modalName.textContent = "All 22 Fighters";
    modalMoves.innerHTML = `
        <div class="all-fighters-info">
            <h3>🎮 Complete Roster</h3>
            <p>Super Smash Bros Infinity v0.7.0 features 22 unique fighters from across gaming and pop culture!</p>
            
            <div class="fighters-list">
                <h4>🔥 Featured Fighters Include:</h4>
                <ul>
                    <li>🍄 Mario - The iconic plumber</li>
                    <li>💨 Sonic - The blue blur</li>
                    <li>💀 Sans - The skeleton with a bad time</li>
                    <li>⛏️ Steve - From the world of blocks</li>
                    <li>🌟 Shaggy - Ultra Instinct activated</li>
                    <li>☕ Cuphead - Run and gun hero</li>
                    <li>🌸 Kirby - The pink puffball</li>
                    <li>🍃 Naruto - Ninja of the Hidden Leaf</li>
                    <li>🐉 Goku - Saiyan warrior</li>
                    <li>⚡ Pikachu - Electric mouse</li>
                    <li>🗡️ Link - Hero of Hyrule</li>
                    <li>🤖 Megaman - The blue bomber</li>
                    <li>And 10+ more amazing fighters!</li>
                </ul>
            </div>
            
            <div class="unlock-info">
                <h4>🔓 Secret Fighters</h4>
                <p>Some fighters are unlocked through gameplay! Discover hidden characters as you play.</p>
            </div>
            
            <div class="moves-reminder">
                <p>💡 <strong>Pro Tip:</strong> Use the ❓ help icon in-game to see complete move lists, frame data, and advanced techniques for every fighter!</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('movesModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('movesModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Keyboard controls for modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Enhanced scroll-triggered animations
function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .character-card, .faq-card, .community-link');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.classList.add('animate-ready');
        animationObserver.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Add floating animation to hero badges
document.addEventListener('DOMContentLoaded', function() {
    const badges = document.querySelectorAll('.hero-badges > div');
    badges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.5}s`;
        badge.classList.add('float-animation');
    });
});

// Enhanced particle system with combat effects
function addCombatParticles() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create explosion effect
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'combat-particle';
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: ${this.classList.contains('btn-primary') ? '#00ffff' : '#ff00ff'};
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    animation: explode 0.6s ease-out forwards;
                    transform-origin: center;
                `;
                
                const angle = (i / 8) * Math.PI * 2;
                const velocity = 50;
                particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
                particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');
                
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 600);
            }
        });
    });
}

// Initialize combat effects
document.addEventListener('DOMContentLoaded', addCombatParticles);