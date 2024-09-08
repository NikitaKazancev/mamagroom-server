import type { Config } from '@jest/types'
const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testRegex: '.*\\.test\\.ts$',
	roots: ['<rootDir>', 'src'],
	moduleDirectories: ['node_modules', 'src'],
	modulePaths: ['<rootDir>', 'src'],
	moduleNameMapper: {
		'^@src/(.*)$': '<rootDir>/$1',
	},
	collectCoverageFrom: ['./**/*.(t|j)s'],
	coverageDirectory: '../coverage',
	coveragePathIgnorePatterns: ['/node_modules/'],
}
export default config
