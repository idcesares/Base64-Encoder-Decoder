module.exports = {
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/.next/'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
