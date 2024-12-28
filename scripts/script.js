// script.js
import { DEVICES, GAMES, DEFAULT_CONFIG, getGameConfig, getDeviceConfig, getGamesList } from './config.js';

class GamePreview {
    constructor() {
        this.currentGame = null;
        this.currentDevice = DEFAULT_CONFIG.defaultDevice;
        this.isPortrait = true;
        this.isSoundOn = true;
        this.mobileRedirectElement = document.getElementById('mobile-redirect');
        this.initElements();
        this.initEventListeners();
        this.checkMobile();
        this.initFromURL();
    }

    initElements() {
        // Get DOM elements
        this.gameSelector = document.getElementById('game-selector');
        this.deviceSelector = document.getElementById('device-selector');
        this.orientationToggle = document.getElementById('orientation-toggle');
        this.soundToggle = document.getElementById('sound-toggle');
        this.refreshButton = document.getElementById('refresh-button');
        this.deviceFrame = document.getElementById('device-frame');
        this.gameFrame = document.getElementById('game-frame');
        this.shareUrl = document.getElementById('share-url');
        this.copyUrlButton = document.getElementById('copy-url');
        this.qrcodeElement = document.getElementById('qrcode');

        // Initialize game selector
        this.populateGameSelector();
    }

    initEventListeners() {
        // Manual redirect handler
        document.getElementById('manual-redirect').addEventListener('click', (e) => {
            e.preventDefault();
            const gameId = this.getGameIdFromURL();
            if (gameId) {
                const game = getGameConfig(gameId);
                if (game) {
                    window.location.href = game.url;
                }
            }
        });

        // Game selection
        this.gameSelector.addEventListener('change', () => this.handleGameChange());

        // Device selection
        this.deviceSelector.addEventListener('change', () => this.handleDeviceChange());

        // Orientation toggle
        this.orientationToggle.addEventListener('click', () => this.toggleOrientation());

        // Sound toggle
        this.soundToggle.addEventListener('click', () => this.toggleSound());

        // Refresh button
        this.refreshButton.addEventListener('click', () => this.refreshGame());

        // Copy URL button
        this.copyUrlButton.addEventListener('click', () => this.copyShareUrl());
    }

    checkMobile() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            const gameId = this.getGameIdFromURL();
            if (gameId) {
                const game = getGameConfig(gameId);
                if (game) {
                    this.mobileRedirectElement.classList.remove('hidden');
                    window.location.href = game.url;
                    return;
                }
            }
        }
        // Hide redirect screen on desktop or if no valid game
        this.mobileRedirectElement.classList.add('hidden');
    }

    initFromURL() {
        const params = new URLSearchParams(window.location.search);
        const gameId = params.get('game');
        const deviceId = params.get('device');
        
        // Set default game if none selected
        if (!gameId) {
            const firstGame = Object.keys(GAMES)[0];
            this.gameSelector.value = firstGame;
        } else if (GAMES[gameId]) {
            this.gameSelector.value = gameId;
        }
        
        if (deviceId && DEVICES[deviceId]) {
            this.deviceSelector.value = deviceId;
        }
        
        // Always initialize game
        this.handleGameChange();
        this.handleDeviceChange();
    }

    populateGameSelector() {
        const games = getGamesList();
        this.gameSelector.innerHTML = '<option value="">Select Game</option>';
        games.forEach(game => {
            const option = document.createElement('option');
            option.value = game.id;
            option.textContent = game.name;
            this.gameSelector.appendChild(option);
        });
    }

    handleGameChange() {
        const gameId = this.gameSelector.value;
        const game = getGameConfig(gameId);
        
        if (!game) {
            this.mobileRedirectElement.classList.add('hidden');
            return;
        }

        this.currentGame = game;
        this.updateGameFrame();
        this.updateShareUrl();
        this.updateQRCode();
    }

    handleDeviceChange() {
        this.currentDevice = this.deviceSelector.value;
        this.updateDeviceFrame();
        this.updateShareUrl();
        this.refreshGame(); // Auto refresh on device change
    }

    toggleOrientation() {
        this.isPortrait = !this.isPortrait;
        this.updateDeviceFrame();
        this.orientationToggle.innerHTML = `<span class="icon">${this.isPortrait ? '📱' : '📱↔️'}</span>`;
    }

    toggleSound() {
        this.isSoundOn = !this.isSoundOn;
        this.soundToggle.innerHTML = `<span class="icon">${this.isSoundOn ? '🔊' : '🔇'}</span>`;
        
        if (this.gameFrame.contentWindow) {
            // Send message to game iframe about sound state
            this.gameFrame.contentWindow.postMessage(
                { type: 'sound', enabled: this.isSoundOn },
                '*'
            );
        }
    }

    updateDeviceFrame() {
        const device = getDeviceConfig(this.currentDevice);
        
        // Reset any existing classes and styles
        this.deviceFrame.className = 'device-frame';
        this.deviceFrame.style.transform = '';
        
        // Add device-specific class
        this.deviceFrame.classList.add(this.currentDevice);
        
        // Set base dimensions (always in portrait)
        this.deviceFrame.style.width = `${device.width}px`;
        this.deviceFrame.style.height = `${device.height}px`;
        
        // Handle orientation
        if (!this.isPortrait) {
            this.deviceFrame.classList.add('landscape');
        }
        
        // Set iframe dimensions
        this.gameFrame.style.width = '100%';
        this.gameFrame.style.height = '100%';
        
        // Force a reflow for iPad
        if (this.currentDevice === 'ipad') {
            this.deviceFrame.offsetHeight;
        }
    }

    updateGameFrame() {
        if (!this.currentGame) return;
        
        // Hide mobile redirect when updating game frame
        this.mobileRedirectElement.classList.add('hidden');
        
        // Add loading state
        this.deviceFrame.classList.add('loading');
        
        // Update iframe
        this.gameFrame.src = this.currentGame.url;
        
        // Remove loading state once loaded
        this.gameFrame.onload = () => {
            this.deviceFrame.classList.remove('loading');
        };
    }

    refreshGame() {
        if (this.gameFrame.src) {
            this.gameFrame.src = this.gameFrame.src;
        }
    }

    updateShareUrl() {
        const url = new URL(window.location.href);
        url.searchParams.set('game', this.gameSelector.value);
        url.searchParams.set('device', this.deviceSelector.value);
        this.shareUrl.value = url.toString();
    }

    updateQRCode() {
        // Clear existing QR code
        this.qrcodeElement.innerHTML = '';
        
        // Generate new QR code
        if (this.currentGame) {
            new QRCode(this.qrcodeElement, {
                text: this.currentGame.url,
                width: DEFAULT_CONFIG.qrCodeSize,
                height: DEFAULT_CONFIG.qrCodeSize
            });
        }
    }

    async copyShareUrl() {
        try {
            await navigator.clipboard.writeText(this.shareUrl.value);
            this.copyUrlButton.textContent = 'Copied!';
            setTimeout(() => {
                this.copyUrlButton.textContent = 'Copy';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    getGameIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('game');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gamePreview = new GamePreview();
});