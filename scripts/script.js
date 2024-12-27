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
        this.loadInitialGame();
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
        this.gameSelector.addEventListener('change', () => this.handleGameChange());
        this.deviceSelector.addEventListener('change', () => this.handleDeviceChange());
        this.orientationToggle.addEventListener('click', () => this.toggleOrientation());
        this.soundToggle.addEventListener('click', () => this.toggleSound());
        this.refreshButton.addEventListener('click', () => this.refreshGame());
        this.copyUrlButton.addEventListener('click', () => this.copyShareUrl());
    }

    loadInitialGame() {
        const params = new URLSearchParams(window.location.search);
        const gameId = params.get('game');
        const deviceId = params.get('device');

        if (gameId && GAMES[gameId]) {
            this.gameSelector.value = gameId;
        } else {
            const firstGame = Object.keys(GAMES)[0];
            this.gameSelector.value = firstGame;
        }

        if (deviceId && DEVICES[deviceId]) {
            this.deviceSelector.value = deviceId;
        }

        this.handleGameChange();
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
        this.refreshGame();  // Auto refresh when device changes
    }

    toggleOrientation() {
        this.isPortrait = !this.isPortrait;
        this.updateDeviceFrame();
        this.refreshGame();  // Auto refresh when orientation changes
        this.orientationToggle.innerHTML = `<span class="icon">${this.isPortrait ? '📱' : '📱↔️'}</span>`;
    }

    toggleSound() {
        this.isSoundOn = !this.isSoundOn;
        this.soundToggle.innerHTML = `<span class="icon">${this.isSoundOn ? '🔊' : '🔇'}</span>`;
        if (this.gameFrame.contentWindow) {
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
        this.deviceFrame.className = `device-frame ${this.isPortrait ? 'portrait' : 'landscape'}`;
        this.deviceFrame.setAttribute('data-device', this.currentDevice);

        this.gameFrame.style.width = '100%';
        this.gameFrame.style.height = '100%';
    }

    updateGameFrame() {
        if (!this.currentGame) return;
        this.deviceFrame.classList.add('loading');
        this.gameFrame.src = this.currentGame.url;
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
        this.qrcodeElement.innerHTML = '';
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gamePreview = new GamePreview();
});
