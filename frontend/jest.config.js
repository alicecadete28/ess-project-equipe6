export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { useESM: true }]
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  testMatch: ['**/tests/**/*.step.ts'], // Adiciona o padrão para arquivos .steps.ts
  setupFilesAfterEnv: ['./jest.setup.js'],
};