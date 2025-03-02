export const FILE_NAMES = {
	mainBg: 'main-bg',
} as const

export const FILE_PATHS = {
	mainSlider: 'main-slider',
	values: 'values',
	masters: 'masters',
	forAI: 'for-ai',
	mainPage: `pages/home`,
	vacanciesPage: 'pages/vacancies',
	mastersPage: 'pages/masters',
} as const

export type FileName = (typeof FILE_NAMES)[keyof typeof FILE_NAMES]
export type FilePath = (typeof FILE_PATHS)[keyof typeof FILE_PATHS]
