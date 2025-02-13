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
    "seek-find-rugby-english": {
        name: "Seek & Find Rugby - English",
        url: "https://rococo-treacle-66e062.netlify.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "seek-find-frog-english": {
        name: "Seek & Find Frog - English",
        url: "https://fancy-longma-34dbd6.netlify.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "seek-find-duck-english": {
        name: "Seek & Find Duck - English",
        url: "https://dynamic-haupia-78c159.netlify.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "seek-find-christmas-bear-japanese": {
        name: "Seek & Find Winterland Bear - English",
        url: "https://admirable-chimera-21c88a.netlify.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "nova-classic-english": {
        name: "Nova Beach English",
        url: "https://felicity-nova-k5aw7xpfk-rajats-projects-ef6d1780.vercel.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "nova-rain-english":{
        name: "Nova Rain English",
        url: "https://felicity-nova-gtfsc9zro-rajats-projects-ef6d1780.vercel.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "nova-rain-glamp-english":{
        name: "Nova Rain Glamp English",
        url: "https://felicity-nova-mfd6y6tdd-rajats-projects-ef6d1780.vercel.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "nova-rain-new-animation":{
        name: "Nova New Animation Meadows",
        url: "https://felicity-nova-lbxz9el6e-rajats-projects-ef6d1780.vercel.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "seek-and-find-waldo-english":{
        name: "SnF Waldo English",
        url: "https://save-waldo-seek-find.netlify.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "nova-undo":{
        name: "Nova Undo Feature",
        url: "https://nova-new-undo.vercel.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "nova-theme-change-video": {
        name: "Nova Theme Change Video",
        url: "https://felicity-nova-git-video-theme-rajats-projects-ef6d1780.vercel.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "nova-classic-undo": {
        name: "Nova Classic Undo",
        url: "https://felicity-nova-git-6feb-rajats-projects-ef6d1780.vercel.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "nova-autocomplete": {
        name: "Nova Classic Autocomplete",
        url: "https://nimble-zabaione-bcbf0b.netlify.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"
    },
    "nova-playable-5-video-to-interactive": {
        name: "Nova Playable 5 Video to Interactive",
        url: "https://nova-playable-5-video-to-interactive.netlify.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"   
    },
    "nova-playable-6-beach": {
        name: "Nova Playable 6 beach",
        url: "https://nova-playable-6.netlify.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"   
    },
    "nova-playable-4": {
        name: "Nova Playable 4",
        url: "https://felicity-nova-git-playable4-rajats-projects-ef6d1780.vercel.app/",
        defaultDevice: "iphone-se",
        defaultOrientation: "portrait"   
    } 
    
    
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
