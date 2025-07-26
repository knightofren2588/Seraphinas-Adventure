# 🌙 Seraphina Dawnwhisper - Enhanced Shadow Priest Chronicle

A magical, interactive character progression tracker for World of Warcraft with stunning visual effects, achievement system, and dynamic features!

## ✨ New Magical Features

### 🎮 **1. Animated Hover Effects**
- **Card Glow & Lift**: Progress cards glow with magical energy and lift when hovered
- **Screenshot Zoom**: Screenshots elegantly zoom when you hover over them
- **Pulsing Borders**: Different milestone types have unique pulsing border animations
  - 🟡 **Story entries**: Golden pulse effect
  - 🔴 **Milestone entries**: Deep pink pulse
  - 🟢 **Achievement entries**: Green pulse

### 🏆 **2. Complete Achievement System**
- **Level Achievements**: Unlock badges at levels 5, 10, 20, 30, 40, 50, 60
- **First Time Achievements**: 
  - 📖 First Story, 🎯 First Milestone, 🏆 First Achievement
  - 💀 First Death, 🏰 First Dungeon
- **Progress Achievements**:
  - 🗺️ Explorer (visit 5 zones)
  - 📸 Memory Keeper (upload 10 screenshots)
  - 📝 Grand Chronicler (create 25 entries)
- **Animated Notifications**: Beautiful popup notifications when you unlock achievements
- **Visual Badges**: Gorgeous achievement badges with tooltips

### 🌟 **3. Dynamic Background System**
- **Zone-Based Themes**: Background automatically changes based on your current zone
  - 🌲 **Eversong Woods**: Forest green theme
  - 🏛️ **Silvermoon City**: Royal red theme
  - 💀 **Ghostlands/Undercity**: Dark, mysterious themes
- **Magical Particles**: Floating orbs of light and shadow that dance across the screen
  - Purple shadow orbs
  - Golden light particles
  - Animated floating effects

### 🎭 **4. Character Voice & Personality**
- **Dynamic Quotes**: Seraphina's quotes change based on her mood and recent activities
- **Mood System**: Character mood changes based on recent entries
  - 😊 **Excited**: Multiple recent entries
  - 💪 **Accomplished**: Recent achievements or milestones
  - 🔮 **Mysterious**: Default contemplative state
  - 💭 **Nostalgic**: Single story entries
- **Interactive Portrait**: Click the portrait to get new quotes and magical sparkle effects
- **Mood Indicators**: Small emoji indicators on each entry showing the mood

## 📁 File Structure

```
seraphina-character-tracker/
├── index.html          # Main HTML with enhanced features
├── styles.css          # Enhanced CSS with magical animations
├── script.js           # Enhanced JavaScript with achievement system
├── character-data.js   # Character data (optional)
└── README.md          # This documentation
```

## 🚀 Quick Start

1. **Download all files** and place them in the same folder
2. **Open `index.html`** in your web browser
3. **Start adding entries** - achievements unlock automatically!
4. **Click the portrait** for new character quotes
5. **Watch the magic happen** as backgrounds change with your zones

## 🎯 How to Use New Features

### Adding Your First Entry
1. Click "➕ Add Progress Entry"
2. Fill out the form (date auto-fills to today)
3. Upload a screenshot for the best experience
4. Watch as achievements unlock automatically!

### Achievement System
- Achievements unlock automatically based on your progress
- Hover over achievement badges to see descriptions
- Level achievements unlock as you add higher-level entries
- First-time achievements unlock when you use new entry types

### Dynamic Backgrounds
- Background changes automatically based on the zone in your most recent entry
- Type zones like "Eversong Woods", "Silvermoon City", "Ghostlands" to see theme changes
- Particles continuously generate magical floating effects

### Character Quotes & Mood
- Quotes update automatically when you add entries
- Click Seraphina's portrait to manually get a new quote
- Mood indicators appear on each entry showing the character's state

## 🎨 Visual Features

### Hover Effects
- **Progress Cards**: Glow, lift, and show magical border animations
- **Screenshots**: Smooth zoom effect with shadow
- **Buttons**: Lift and glow with magical energy
- **Achievement Badges**: Rotate and scale with golden glow

### Animations
- **Achievement Unlocks**: Celebration animation with scale and rotation
- **Particle Effects**: Continuous floating magical orbs
- **Quote Updates**: Smooth fade transitions
- **Portrait Interaction**: Sparkle effects on click/hover

### Responsive Design
- **Desktop**: 2-3 cards per row with full effects
- **Tablet**: 2 cards per row, optimized spacing
- **Mobile**: Single column, touch-friendly

## 🔧 Customization Options

### Adding New Achievements
Edit the `achievementDefinitions` array in `script.js`:
```javascript
{ 
    id: 'custom_achievement', 
    name: 'Achievement Name', 
    description: 'Description', 
    icon: '🎯', 
    level: 25  // or other criteria
}
```

### Adding New Character Quotes
Add quotes to the `quotes` object in `script.js`:
```javascript
mysterious: [
    "Your custom mysterious quote here...",
    "Another contemplative thought..."
]
```

### Adding New Zone Themes
Add zone mappings to the `zoneThemes` object:
```javascript
'your zone name': 'css-class-name'
```

## 💾 Data Storage

- **Local Storage**: All data saves automatically to your browser
- **Achievements**: Persist between sessions
- **Entries**: Never lose your progress
- **Screenshots**: Stored as base64 in browser

## 🎮 Tips for Best Experience

1. **Use Descriptive Zone Names**: Full names like "Eversong Woods" trigger background themes
2. **Upload Screenshots**: They make entries much more engaging and count toward achievements
3. **Try Different Entry Types**: Each type has unique styling and contributes to achievements
4. **Interact with the Portrait**: Click for new quotes and sparkle effects
5. **Watch for Achievements**: They unlock automatically and show celebration notifications

## 🌟 Advanced Features

### Achievement Tracking
- Level-based achievements check your highest level across all entries
- Type-based achievements unlock when you first use each entry type
- Count-based achievements track zones, screenshots, and total entries

### Dynamic Content
- Background themes change based on your most recent zone
- Character mood adapts to your recent activities
- Quotes reflect current character state and recent entries

### Visual Polish
- Smooth animations throughout the interface
- Magical particle effects that never stop
- Hover effects that make everything feel alive
- Achievement celebrations that feel rewarding

---

**🌙 May the shadows guide your journey, Seraphina Dawnwhisper! ⚫✨**