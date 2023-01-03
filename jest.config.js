const esModules = [].join('|');

export default {
    roots: [
        "src/"
    ],
    testEnvironment: "jsdom",
    extensionsToTreatAsEsm: [
        ".jsx"
    ],
    transform: {
        "\\.js$": "babel-jest",
        "\\.mjs$": "babel-jest",
        "\\.jsx$": "babel-jest"
    },
    moduleFileExtensions: [
        "js",
        "jsx"
    ],
    moduleDirectories: [
        "node_modules"
    ],
    transformIgnorePatterns: [
        `/node_modules/(?!${esModules})`
    ],
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/jest/css.mock.js",
        "\\.(gif)$": "<rootDir>/jest/gif.mock.js",
        "\\.(png)$": "<rootDir>/jest/png.mock.js",
    },
    setupFiles: [
        '<rootDir>/jest/jest.setup.js'
    ],
    globalSetup: '<rootDir>/jest/jest.global.js'
}