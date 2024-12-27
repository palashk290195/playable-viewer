# Game Preview Interface

A simple, lightweight tool for previewing HTML5 games in different device frames. Perfect for testing and sharing mobile game builds.

## Features

- 📱 Multiple device previews (iPhone SE, iPhone 14, iPad)
- 🔄 Portrait/Landscape orientation toggle
- 🎮 Multiple game support via configuration
- 🔊 Sound toggle control
- 📋 Shareable URLs for specific games/devices
- 📱 QR code generation for direct mobile access
- 📲 Automatic mobile redirection to game

## Quick Start

1. Clone this repository:
```bash
git clone https://github.com/yourusername/game-preview
cd game-preview
```

2. Configure your games in `scripts/config.js`:
```javascript
const GAMES = {
    "game-id": {
        name: "Game Display Name",
        url: "https://your-game-url.netlify.app",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    }
}
```

3. Deploy to GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Select main/master branch
   - Save and get your URL

## Project Structure

```
game-preview/
├── index.html          # Main interface
├── styles.css          # Styling
├── scripts/
│   ├── config.js      # Game and device configurations
│   └── script.js      # Core functionality
└── README.md          # Documentation
```

## Configuration

### Adding New Games

Edit `scripts/config.js` and add your game to the `GAMES` object:

```javascript
"your-game-id": {
    name: "Your Game Name",
    url: "https://your-game-url.netlify.app",
    defaultDevice: "iphone-se",
    defaultOrientation: "portrait"
}
```

### Available Devices

- iPhone SE (375x667)
- iPhone 14 (390x844)
- iPad (810x1080)

## Usage

### Desktop View
1. Select your game from the dropdown
2. Choose device type
3. Toggle orientation if needed
4. Use sound toggle for audio control
5. Share URL or scan QR code for mobile testing

### Mobile Access
When accessed from a mobile device, automatically redirects to the game URL.

### URL Parameters
- `?game=game-id`: Load specific game
- `?device=device-id`: Set device frame

Example: `https://yourusername.github.io/game-preview/?game=bingo-skill&device=iphone-se`

## Deployment

### GitHub Pages Deployment Steps

1. Create a new repository on GitHub
2. Initialize and push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/game-preview.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Choose main/master branch
   - Save changes

Your preview interface will be available at: `https://yourusername.github.io/game-preview/`

## Local Development

For local testing, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

Then visit `http://localhost:8000` in your browser.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

MIT License - feel free to use this project for any purpose.
