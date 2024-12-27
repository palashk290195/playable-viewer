// script.js
import { DEVICES, GAMES, DEFAULT_CONFIG, getGameConfig, getDeviceConfig, getGamesList } from './config.js';

class GamePreview {
    constructor() {
        this.currentGame = null;
        this.currentDevice = DEFAULT_CONFIG.defaultDevice;
        this.isPortrait = true;
        this.isSoundOn = true;
        this.initElements();
        this.initEventListeners();
        this.checkMobile();
        this.initFromURL();
        
        // If no game is selected after URL init, use default
        if (!this.currentGame) {
            this.gameSelector.value = DEFAULT_CONFIG.defaultGame;
            this.handleGameChange();
        }
    }

    initFromURL() {
        const params = new URLSearchParams(window.location.search);
        const gameId = params.get('game') || DEFAULT_CONFIG.defaultGame;
        const deviceId = params.get('device') || DEFAULT_CONFIG.defaultDevice;
        
        if (gameId && GAMES[gameId]) {
            this.gameSelector.value = gameId;
            this.handleGameChange();
        }
        
        if (deviceId && DEVICES[deviceId]) {
            this.deviceSelector.value = deviceId;
            this.handleDeviceChange();
        }
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
                    window.location.href = game.url;
                    return;
                }
            }
        }
    }

    initFromURL() {
        const params = new URLSearchParams(window.location.search);
        const gameId = params.get('game');
        const deviceId = params.get('device');
        
        if (gameId && GAMES[gameId]) {
            this.gameSelector.value = gameId;
            this.handleGameChange();
        }
        
        if (deviceId && DEVICES[deviceId]) {
            this.deviceSelector.value = deviceId;
            this.handleDeviceChange();
        }
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
        
        if (!game) return;

        this.currentGame = game;
        this.updateGameFrame();
        this.updateShareUrl();
        this.updateQRCode();
    }

    handleDeviceChange() {
        this.currentDevice = this.deviceSelector.value;
        this.updateDeviceFrame();
        this.updateShareUrl();
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
        const width = this.isPortrait ? device.width : device.height;
        const height = this.isPortrait ? device.height : device.width;

        this.deviceFrame.style.width = `${width}px`;
        this.deviceFrame.style.height = `${height}px`;
        this.gameFrame.style.width = '100%';
        this.gameFrame.style.height = '100%';

        this.deviceFrame.className = `device-frame ${this.isPortrait ? 'portrait' : 'landscape'}`;
    }

    updateGameFrame() {
        if (!this.currentGame) return;
        
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
                this.copyUrlButton.textContent = 'Copy URL';
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
