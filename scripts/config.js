// config.js

// Device configurations
const DEVICES = {
    "iphone-se": {
        name: "iPhone SE",
        width: 375,
        height: 667,
        scale: 1,
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
    },
    "iphone-14": {
        name: "iPhone 14",
        width: 390,
        height: 844,
        scale: 1,
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
    },
    "ipad": {
        name: "iPad",
        width: 810,
        height: 1080,
        scale: 1,
        userAgent: "Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
    }
};

// Game configurations
const GAMES = {
    "seek-find-winter-bear-english": {
        name: "Seek & Find Winterland Bear - English",
        url: "https://rococo-treacle-66e062.netlify.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "nova-classic-english": {
        name: "Nova Classic English",
        url: "https://felicity-nova.vercel.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "nova-beach-russian": {
        name: "Nova Beach Russian",
        url: "https://felicity-nova-ru.vercel.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "nova-rain-english":{
        name: "Nova Rain English",
        url: "https://felicity-nova-git-rain-rajats-projects-ef6d1780.vercel.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    // Add more games here
};

// Default settings
const DEFAULT_CONFIG = {
    defaultDevice: "iphone-se",
    defaultOrientation: "portrait",
    defaultGame: "seek-find-winter-bear-english",
    iframePadding: 20,
    qrCodeSize: 128,
    mobileBreakpoint: 768
};

// Helper functions
const getGameConfig = (gameId) => {
    return GAMES[gameId] || null;
};

const getDeviceConfig = (deviceId) => {
    return DEVICES[deviceId] || DEVICES[DEFAULT_CONFIG.defaultDevice];
};

const getGamesList = () => {
    return Object.entries(GAMES).map(([id, game]) => ({
        id,
        name: game.name
    }));
};

// Export configurations
export {
    DEVICES,
    GAMES,
    DEFAULT_CONFIG,
    getGameConfig,
    getDeviceConfig,
    getGamesList
};
