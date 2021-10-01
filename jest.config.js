module.exports = {
  displayName: 'tests',
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  moduleNameMapper: {
    '@tests/(.*)': '<rootDir>/tests/$1',
    '@main/(.*)': '<rootDir>/src/main/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@data/(.*)': '<rootDir>/src/data/$1',
    '@presentation/(.*)': '<rootDir>/src/presentation/$1'
  },
  setupFilesAfterEnv: [
    '<rootDir>/tests/jest-setup.ts'
  ],
  preset: 'ts-jest',
}
