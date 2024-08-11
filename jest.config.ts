import type { Config } from '@jest/types'
const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	rootDir: 'src',
	testRegex: '.*\\.test\\.ts$',
	moduleNameMapper: {
		'^@src/(.*)$': '<rootDir>/$1',
	},
	collectCoverageFrom: ['./**/*.(t|j)s'],
	coverageReporters: ['text', 'lcov'],
	coveragePathIgnorePatterns: [
		'/node_modules/', // Exclude node modules
	],
}
export default config
