module.exports = {
  // The root of your source code
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/client'],
  testEnvironment: 'jsdom',
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.[t|j]sx?$': 'ts-jest'
  },
  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['./client/jest.setup.js'],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // substitute mock files for any css files imported in components
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/client/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/client/__mocks__/styleMock.js'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './reports',
        outputName: 'jest-junit.xml'
      }
    ]
  ]
};
