module.exports = {
  verbose: true,
  moduleFileExtensions: [
    'js',
  ],
  moduleDirectories: [
    'node_modules'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  testMatch: [
    // '<rootDir>/tests/unit/services/connectors/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
    '<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  testURL: 'http://localhost/',
  collectCoverage: true,
  collectCoverageFrom: [
    "services/**/*.{js,ts}",
    "utils/**/*.{js,ts}",
    "index.{js,ts}",
    "!providers/**/*.{js,ts}",
    "!services/**/index.{js,ts}",
    "!providers/*.{js,ts}",
  ],
  // mapCoverage: true,
  coverageReporters: ['text', 'cobertura'],
  coverageDirectory: 'tests/reports/'
  // setupFiles: ['<rootDir>/tests/setupFile.js']
}
