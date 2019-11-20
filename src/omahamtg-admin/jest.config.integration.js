module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  testRegex: '(/__tests__/.*(integrations))\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  testURL: 'https://www.example.com',
  verbose: true
};
