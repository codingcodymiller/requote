module.exports = {
  // The root of your source code
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/client'],
  testEnvironment: 'jsdom',
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './reports',
        fileName: 'jest-junit.xml'
      }
    ]
  ]
};
