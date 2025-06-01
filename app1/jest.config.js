module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};