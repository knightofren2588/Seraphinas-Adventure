// Seraphina Character Tracker - Enhanced with Magical Features
// 🌟 Achievement System, Dynamic Backgrounds, Character Quotes & More!

class SeraphinaTracker {
    constructor() {
        this.entries = [];
        this.achievements = [];
        this.currentQuote = '';
        this.currentMood = 'mysterious';
        this.particles = [];
        
        // 🏆 Achievement definitions
        this.achievementDefinitions = [
            { id: 'level_5', name: 'First Steps', description: 'Reach Level 5', icon: '⭐', level: 5 },
            { id: 'level_10', name: 'Rising Power', description: 'Reach Level 10', icon: '🌟', level: 10 },
            { id: 'level_20', name: 'Shadow Adept', description: 'Reach Level 20', icon: '🔮', level: 20 },
            { id: 'level_30', name: 'Mystic Scholar', description: 'Reach Level 30', icon: '📚', level: 30 },
            { id: 'level_40', name: 'Shadow Priest', description: 'Reach Level 40', icon: '⚫', level: 40 },
            { id: 'level_50', name: 'Master of Shadows', description: 'Reach Level 50', icon: '👑', level: 50 },
            { id: 'level_60', name: 'Legendary Being', description: 'Reach Level 60', icon: '💫', level: 60 },
            
            { id: 'first_story', name: 'Storyteller', description: 'Add your first story entry', icon: '📖', type: 'story' },
            { id: 'first_milestone', name: 'Milestone Master', description: 'Record your first milestone', icon: '🎯', type: 'milestone' },
            { id: 'first_achievement', name: 'Achievement Hunter', description: 'Log your first achievement', icon: '🏆', type: 'achievement' },
            { id: 'first_death', name: 'Fallen Hero', description: 'Experience your first death', icon: '💀', type: 'death' },
            { id: 'first_dungeon', name: 'Dungeon Delver', description: 'Complete your first dungeon', icon: '🏰', type: 'dungeon' },
            
            { id: 'explorer', name: 'Explorer', description: 'Visit 5 different zones', icon: '🗺️', zones: 5 },
            { id: 'photographer', name: 'Memory Keeper', description: 'Upload 10 screenshots', icon: '📸', screenshots: 10 },
            { id: 'chronicler', name: 'Grand Chronicler', description: 'Create 25 entries', icon: '📝', entries: 25 }
        ];
        
        // 💬 Character quotes for different moods/situations
        this.quotes = {
            mysterious: [
                "The shadows whisper secrets that even the Light cannot illuminate...",
                "Between shadow and radiance lies the path to true understanding.",
                "Power flows through those who embrace both darkness and light.",
                "The void calls to me, yet I shall not be consumed by it."
            ],
            excited: [
                "Another step forward on my journey of discovery!",
                "The arcane energies surge through me with newfound strength!",
                "Each experience brings me closer to mastering my dual nature.",
                "By the Sunwell, I grow stronger with each passing day!"
            ],
            accomplished: [
                "Through perseverance, even the impossible becomes achievable.",
                "My dedication to the path between light and shadow bears fruit.",
                "Another milestone reached through careful study and practice.",
                "The balance I seek becomes ever clearer."
            ],
            nostalgic: [
                "I remember when I first felt the shadow's embrace...",
                "The memories of my early days in Silvermoon seem distant now.",
                "How far I've come from those first tentative steps.",
                "Each memory shapes the priest I am becoming."
            ]
        }
        
        // 🎨 Zone-based themes
        this.zoneThemes = {
            'eversong woods': 'eversong-woods',
            'eversong': 'eversong-woods',
            'silvermoon': 'silvermoon-city',
            'silvermoon city': 'silvermoon-city',
            'ghostlands': 'ghostlands',
            'undercity': 'undercity',
            'tirisfal': 'undercity',
            'tirisfal glades': 'undercity'
        };
        
        this.init();
    }
    
    // 🖼️ Image Compression Function
    compressImage(base64String, maxWidth, maxHeight, callback) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            // Calculate new dimensions while maintaining aspect ratio
            let { width, height } = img;
            
            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
            }
            
            // Set canvas size
            canvas.width = width;
            canvas.height = height;
            
            // Draw and compress image
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convert to compressed base64 (JPEG with 85% quality)
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
            
            callback(compressedBase64);
        };
        
        img.onerror = () => {
            console.error('Error loading image for compression');
            callback(base64String); // Return original if compression fails
        };
        
        img.src = base64String;
    }
    
    init() {
        console.log('🌙 Enhanced Seraphina tracker loading...');
        this.loadData();
        this.checkAchievements();
        this.updateDisplay();
        this.createParticles();
        this.updateCharacterQuote();
        this.updateDynamicBackground();
        this.setupEventListeners();
        this.setupPortraitInteraction();
        console.log('✨ Enhanced Seraphina tracker ready!');
    }
    
    // 🎭 Character Quote System
    updateCharacterQuote() {
        const quoteElement = document.querySelector('.character-quote');
        if (!quoteElement) return;
        
        const mood = this.determineMood();
        const quotes = this.quotes[mood] || this.quotes.mysterious;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteElement.textContent = `"${randomQuote}"`;
            quoteElement.style.opacity = '1';
        }, 500);
        
        this.currentQuote = randomQuote;
        this.currentMood = mood;
    }
    
    // 🎭 Determine character mood based on recent entries
    determineMood() {
        if (this.entries.length === 0) return 'mysterious';
        
        const recentEntries = this.entries.slice(-3);
        const hasLevelUp = recentEntries.some(entry => entry.type === 'milestone');
        const hasAchievement = recentEntries.some(entry => entry.type === 'achievement');
        const hasStory = recentEntries.some(entry => entry.type === 'story');
        
        if (hasAchievement || hasLevelUp) return 'accomplished';
        if (hasStory && recentEntries.length === 1) return 'nostalgic';
        if (recentEntries.length >= 2) return 'excited';
        
        return 'mysterious';
    }
    
    // 🌟 Particle System
    createParticles() {
        const container = document.querySelector('.particle-container');
        if (!container) {
            // Create particle container if it doesn't exist
            const particleContainer = document.createElement('div');
            particleContainer.className = 'particle-container';
            document.body.appendChild(particleContainer);
        }
        
        this.generateParticles();
        setInterval(() => this.generateParticles(), 3000); // New particles every 3 seconds
    }
    
    generateParticles() {
        const container = document.querySelector('.particle-container');
        if (!container) return;
        
        // Remove old particles
        const oldParticles = container.querySelectorAll('.particle');
        oldParticles.forEach(particle => {
            if (Math.random() < 0.3) { // 30% chance to remove old particles
                particle.remove();
            }
        });
        
        // Create new particles
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            const types = ['', 'shadow', 'light'];
            const type = types[Math.floor(Math.random() * types.length)];
            
            particle.className = `particle ${type}`;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 8 + 4) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            
            container.appendChild(particle);
        }
    }
    
    // 🌍 Dynamic Background System
    updateDynamicBackground() {
        if (this.entries.length === 0) return;
        
        // Get the most recent zone
        const recentEntry = this.entries[this.entries.length - 1];
        const zone = recentEntry.zone ? recentEntry.zone.toLowerCase() : '';
        
        // Remove all zone classes
        Object.values(this.zoneThemes).forEach(themeClass => {
            document.body.classList.remove(themeClass);
        });
        
        // Apply new zone theme
        for (const [zoneName, themeClass] of Object.entries(this.zoneThemes)) {
            if (zone.includes(zoneName)) {
                document.body.classList.add(themeClass);
                console.log(`🌍 Zone theme applied: ${themeClass}`);
                break;
            }
        }
    }
    
    // 🖼️ Interactive Portrait Setup
    setupPortraitInteraction() {
        const portrait = document.querySelector('.character-portrait');
        if (!portrait) return;
        
        // Load saved portrait
        const savedPortrait = localStorage.getItem('seraphinaPortrait');
        if (savedPortrait) {
            portrait.innerHTML = `<img src="${savedPortrait}" alt="Seraphina Portrait">`;
        }
        
        portrait.addEventListener('click', () => {
            this.showPortraitUpload();
        });
        
        portrait.addEventListener('mouseenter', () => {
            this.createPortraitSparkles(portrait);
        });
    }
    
    showPortraitUpload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }
            
            // Check file size (limit: 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                alert(`File too large! Please choose an image smaller than 5MB.\nYour file: ${(file.size / 1024 / 1024).toFixed(1)}MB`);
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                // Compress image before storing
                this.compressImage(event.target.result, 300, 300, (compressedImage) => {
                    const portrait = document.querySelector('.character-portrait');
                    portrait.innerHTML = `<img src="${compressedImage}" alt="Seraphina Portrait">`;
                    localStorage.setItem('seraphinaPortrait', compressedImage);
                    this.createPortraitSparkles(portrait);
                    console.log('🖼️ Portrait updated and compressed successfully');
                });
            };
            reader.readAsDataURL(file);
        });
        
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    }
    
    createPortraitSparkles(portrait) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = '#ffd700';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.left = (Math.random() * 120) + 'px';
            sparkle.style.top = (Math.random() * 120) + 'px';
            sparkle.style.animation = 'sparkle 1s ease-out forwards';
            
            portrait.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
    }
    
    // 🏆 Achievement System
    checkAchievements() {
        const newAchievements = [];
        
        this.achievementDefinitions.forEach(def => {
            if (this.achievements.includes(def.id)) return;
            
            let unlocked = false;
            
            // Level-based achievements
            if (def.level) {
                const maxLevel = this.getMaxLevel();
                if (maxLevel >= def.level) unlocked = true;
            }
            
            // Type-based achievements
            if (def.type) {
                const hasType = this.entries.some(entry => 
                    entry.type && entry.type.toLowerCase() === def.type.toLowerCase()
                );
                if (hasType) unlocked = true;
            }
            
            // Count-based achievements
            if (def.zones) {
                const uniqueZones = new Set(this.entries.map(e => e.zone?.toLowerCase()).filter(Boolean));
                if (uniqueZones.size >= def.zones) unlocked = true;
            }
            
            if (def.screenshots) {
                const entriesWithScreenshots = this.entries.filter(e => e.screenshot).length;
                if (entriesWithScreenshots >= def.screenshots) unlocked = true;
            }
            
            if (def.entries) {
                if (this.entries.length >= def.entries) unlocked = true;
            }
            
            if (unlocked) {
                this.achievements.push(def.id);
                newAchievements.push(def);
            }
        });
        
        // Show achievement notifications
        newAchievements.forEach(achievement => {
            this.showAchievementNotification(achievement);
        });
        
        if (newAchievements.length > 0) {
            this.saveData();
        }
    }
    
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #d4af37, #ffd700);
            color: #000;
            padding: 15px 20px;
            border-radius: 10px;
            font-family: 'Cinzel', serif;
            font-weight: bold;
            z-index: 10000;
            animation: achievementSlideIn 0.5s ease-out;
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.5);
        `;
        
        notification.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 5px;">${achievement.icon}</div>
            <div style="font-size: 16px; margin-bottom: 3px;">Achievement Unlocked!</div>
            <div style="font-size: 14px;">${achievement.name}</div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'achievementSlideOut 0.5s ease-in forwards';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
    
    getMaxLevel() {
        if (this.entries.length === 0) return 1;
        return Math.max(...this.entries.map(entry => parseInt(entry.level) || 1));
    }
    
    // 📊 Enhanced Display Updates
    updateDisplay() {
        this.updateStats();
        this.updateProgressCards();
        this.updateAchievementBadges();
    }
    
    updateStats() {
        const currentLevelEl = document.getElementById('current-level');
        const totalEntriesEl = document.getElementById('total-entries');
        const zonesExploredEl = document.getElementById('zones-explored');
        const achievementsUnlockedEl = document.getElementById('achievements-unlocked');
        
        if (currentLevelEl) currentLevelEl.textContent = this.getMaxLevel();
        if (totalEntriesEl) totalEntriesEl.textContent = this.entries.length;
        
        if (zonesExploredEl) {
            const uniqueZones = new Set(this.entries.map(e => e.zone?.toLowerCase()).filter(Boolean));
            zonesExploredEl.textContent = uniqueZones.size;
        }
        
        if (achievementsUnlockedEl) {
            achievementsUnlockedEl.textContent = this.achievements.length;
        }
    }
    
    updateAchievementBadges() {
        const container = document.querySelector('.achievements-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.achievementDefinitions.forEach(def => {
            const badge = document.createElement('div');
            const isUnlocked = this.achievements.includes(def.id);
            
            badge.className = `achievement-badge ${isUnlocked ? 'unlocked' : 'locked'}`;
            badge.innerHTML = `
                ${def.icon}
                <div class="achievement-tooltip">${def.name}<br>${def.description}</div>
            `;
            
            container.appendChild(badge);
        });
    }
    
    updateProgressCards() {
        const container = document.getElementById('progress-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Sort entries by date (newest first)
        const sortedEntries = [...this.entries].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedEntries.forEach(entry => {
            const card = this.createProgressCard(entry);
            container.appendChild(card);
        });
    }
    
    createProgressCard(entry) {
        const card = document.createElement('div');
        const mood = this.getMoodForEntry(entry);
        
        card.className = `progress-card ${entry.type ? entry.type.toLowerCase() + '-type' : ''}`;
        
        card.innerHTML = `
            <div class="mood-indicator mood-${mood}">
                ${this.getMoodEmoji(mood)}
            </div>
            
            <div class="progress-header">
                <h3>Level ${entry.level} - ${entry.title}</h3>
                <div class="progress-date">${new Date(entry.date).toLocaleDateString()}</div>
            </div>
            
            <div class="progress-meta">
                <div class="progress-zone">
                    <strong>Zone</strong>
                    ${entry.zone}
                </div>
                <div class="progress-type">
                    <strong>Type</strong>
                    ${entry.type}
                </div>
            </div>
            
            ${entry.screenshot ? `<img src="${entry.screenshot}" alt="Progress Screenshot" class="progress-screenshot" onclick="tracker.viewFullScreenshot('${entry.screenshot}')">` : ''}
            
            <div class="progress-description">
                ${this.formatText(entry.description)}
            </div>
            
            ${entry.notes ? `
                <div class="progress-notes">
                    <strong>Personal Notes:</strong>
                    ${this.formatText(entry.notes)}
                </div>
            ` : ''}
            
            ${entry.gear ? `
                <div class="progress-gear">
                    <strong>Gear:</strong> ${entry.gear}
                </div>
            ` : ''}
            
            ${entry.professions ? `
                <div class="progress-professions">
                    <strong>Professions:</strong> ${entry.professions}
                </div>
            ` : ''}
            
            <div class="progress-actions">
                <button class="btn btn-edit" onclick="tracker.editEntry(${this.entries.indexOf(entry)})">Edit</button>
                <button class="btn btn-secondary btn-delete" onclick="tracker.deleteEntry(${this.entries.indexOf(entry)})">Delete</button>
            </div>
        `;
        
        return card;
    }
    
    // 📝 Format text with better line breaks and spacing
    formatText(text) {
        if (!text) return '';
        
        return text
            .replace(/\. /g, '.<br><br>') // Add breaks after sentences
            .replace(/\! /g, '!<br><br>') // Add breaks after exclamations
            .replace(/\? /g, '?<br><br>') // Add breaks after questions
            .replace(/<br><br><br>/g, '<br><br>'); // Prevent triple breaks
    }
    
    // 🖼️ View full screenshot function
    viewFullScreenshot(imageSrc) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.8);
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    getMoodForEntry(entry) {
        if (entry.type === 'achievement' || entry.type === 'milestone') return 'accomplished';
        if (entry.type === 'story') return 'nostalgic';
        if (entry.type === 'death' || entry.type === 'challenge') return 'mysterious';
        return 'excited';
    }
    
    getMoodEmoji(mood) {
        const emojis = {
            excited: '😊',
            accomplished: '💪',
            mysterious: '🔮',
            nostalgic: '💭'
        };
        return emojis[mood] || '🌟';
    }
    
    // 📝 Entry Management (Enhanced)
    addEntry(entryData) {
        const entry = {
            id: Date.now(),
            date: entryData.date || new Date().toISOString().split('T')[0],
            level: parseInt(entryData.level) || 1,
            zone: entryData.zone || '',
            type: entryData.type || 'story',
            title: entryData.title || '',
            description: entryData.description || '',
            notes: entryData.notes || '',
            gear: entryData.gear || '',
            professions: entryData.professions || '',
            screenshot: entryData.screenshot || ''
        };
        
        this.entries.push(entry);
        this.saveData();
        this.checkAchievements();
        this.updateDisplay();
        this.updateCharacterQuote();
        this.updateDynamicBackground();
        
        console.log('✨ New entry added:', entry.title);
    }
    
    // 💾 Data Management
    loadData() {
        try {
            const savedEntries = localStorage.getItem('seraphinaEntries');
            const savedAchievements = localStorage.getItem('seraphinaAchievements');
            
            if (savedEntries) {
                this.entries = JSON.parse(savedEntries);
            }
            
            if (savedAchievements) {
                this.achievements = JSON.parse(savedAchievements);
            }
            
            console.log(`📚 Loaded ${this.entries.length} entries and ${this.achievements.length} achievements`);
        } catch (error) {
            console.error('❌ Error loading data:', error);
            this.entries = [];
            this.achievements = [];
        }
    }
    
    saveData() {
        try {
            localStorage.setItem('seraphinaEntries', JSON.stringify(this.entries));
            localStorage.setItem('seraphinaAchievements', JSON.stringify(this.achievements));
            console.log('💾 Data saved successfully');
        } catch (error) {
            console.error('❌ Error saving data:', error);
        }
    }
    
    // 🎮 Event Listeners
    setupEventListeners() {
        // Add entry button
        const addBtn = document.querySelector('.add-entry-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.showAddEntryModal());
        }
        
        // Modal form submission
        const modal = document.getElementById('entryModal');
        const form = document.getElementById('entryForm');
        const closeBtn = document.querySelector('.close');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission();
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (modal) modal.style.display = 'none';
            });
        }
        
        // Click outside modal to close
        if (modal) {
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
        
        // Screenshot upload
        const screenshotInput = document.getElementById('screenshot');
        if (screenshotInput) {
            screenshotInput.addEventListener('change', this.handleScreenshotUpload.bind(this));
        }
    }
    
    showAddEntryModal() {
        const modal = document.getElementById('entryModal');
        const form = document.getElementById('entryForm');
        
        if (modal && form) {
            form.reset();
            form.removeAttribute('data-edit-index');
            document.getElementById('modalTitle').textContent = 'Add Progress Entry';
            
            // Reset screenshot upload styling and feedback
            const screenshotInput = document.getElementById('screenshot');
            if (screenshotInput) {
                screenshotInput.style.borderColor = 'rgba(138, 43, 226, 0.5)';
                screenshotInput.style.background = 'rgba(138, 43, 226, 0.1)';
                const feedback = screenshotInput.parentNode.querySelector('.file-feedback');
                if (feedback) feedback.remove();
            }
            
            this.currentScreenshot = '';
            modal.style.display = 'block';
        }
    }
    
    handleFormSubmission() {
        const form = document.getElementById('entryForm');
        const formData = new FormData(form);
        const editIndex = form.getAttribute('data-edit-index');
        
        const entryData = {
            date: formData.get('date'),
            level: formData.get('level'),
            zone: formData.get('zone'),
            type: formData.get('type'),
            title: formData.get('title'),
            description: formData.get('description'),
            notes: formData.get('notes'),
            gear: formData.get('gear'),
            professions: formData.get('professions'),
            screenshot: this.currentScreenshot || ''
        };
        
        if (editIndex !== null) {
            this.entries[parseInt(editIndex)] = { ...this.entries[parseInt(editIndex)], ...entryData };
            console.log('📝 Entry updated');
        } else {
            this.addEntry(entryData);
        }
        
        this.saveData();
        this.updateDisplay();
        document.getElementById('entryModal').style.display = 'none';
        this.currentScreenshot = '';
    }
    
    handleScreenshotUpload(event) {
        const file = event.target.files[0];
        const input = event.target;
        
        if (!file) {
            this.currentScreenshot = '';
            input.style.borderColor = 'rgba(138, 43, 226, 0.5)';
            return;
        }
        
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file (JPG, PNG, GIF, etc.)');
            input.value = '';
            this.currentScreenshot = '';
            input.style.borderColor = '#ff4444';
            return;
        }
        
        // Check file size (limit: 8MB for screenshots since they might be larger)
        const maxSize = 8 * 1024 * 1024; // 8MB in bytes
        if (file.size > maxSize) {
            alert(`Screenshot too large! Please choose an image smaller than 8MB.\n\nYour file: ${(file.size / 1024 / 1024).toFixed(1)}MB\n\nTip: Try taking screenshots at lower resolution or compress the image first.`);
            input.value = '';
            this.currentScreenshot = '';
            input.style.borderColor = '#ff4444';
            return;
        }
        
        // Visual feedback - show loading
        input.style.borderColor = '#ffd700';
        input.style.background = 'rgba(255, 215, 0, 0.1)';
        
        // Show loading feedback
        const feedback = input.parentNode.querySelector('.file-feedback') || document.createElement('small');
        feedback.className = 'file-feedback';
        feedback.style.color = '#ffd700';
        feedback.style.display = 'block';
        feedback.style.marginTop = '5px';
        feedback.textContent = `⏳ Processing ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)...`;
        
        if (!input.parentNode.querySelector('.file-feedback')) {
            input.parentNode.appendChild(feedback);
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            // Compress image to reasonable size for web storage
            this.compressImage(e.target.result, 800, 600, (compressedImage) => {
                this.currentScreenshot = compressedImage;
                
                // Visual feedback - show success
                input.style.borderColor = '#00ff00';
                input.style.background = 'rgba(0, 255, 0, 0.1)';
                
                // Calculate compression savings
                const originalSize = (file.size / 1024 / 1024).toFixed(1);
                const compressedSize = ((compressedImage.length * 0.75) / 1024 / 1024).toFixed(1); // Rough estimate
                
                feedback.style.color = '#00ff00';
                feedback.textContent = `✅ Screenshot ready: ${file.name} (${originalSize}MB → ${compressedSize}MB)`;
                
                console.log('📸 Screenshot uploaded and compressed successfully:', file.name);
            });
        };
        
        reader.onerror = () => {
            alert('Error reading the file. Please try again.');
            input.style.borderColor = '#ff4444';
            input.style.background = 'rgba(255, 68, 68, 0.1)';
            
            const feedback = input.parentNode.querySelector('.file-feedback');
            if (feedback) {
                feedback.style.color = '#ff4444';
                feedback.textContent = '❌ Error processing file. Please try again.';
            }
        };
        
        reader.readAsDataURL(file);
    }
    
    editEntry(index) {
        const entry = this.entries[index];
        if (!entry) return;
        
        const modal = document.getElementById('entryModal');
        const form = document.getElementById('entryForm');
        
        if (modal && form) {
            // Populate form with existing data
            Object.keys(entry).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input && key !== 'screenshot') {
                    input.value = entry[key] || '';
                }
            });
            
            form.setAttribute('data-edit-index', index);
            document.getElementById('modalTitle').textContent = 'Edit Progress Entry';
            this.currentScreenshot = entry.screenshot || '';
            modal.style.display = 'block';
        }
    }
    
    deleteEntry(index) {
        if (confirm('Are you sure you want to delete this entry?')) {
            this.entries.splice(index, 1);
            this.saveData();
            this.updateDisplay();
            this.updateCharacterQuote();
            this.updateDynamicBackground();
            console.log('🗑️ Entry deleted');
        }
    }
}

// Add CSS for sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
    
    @keyframes achievementSlideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes achievementSlideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the enhanced tracker
let tracker;
document.addEventListener('DOMContentLoaded', () => {
    tracker = new SeraphinaTracker();
});

console.log('🌙 Enhanced Seraphina tracker script loaded successfully!');