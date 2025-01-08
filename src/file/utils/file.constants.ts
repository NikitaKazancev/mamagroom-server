export const FILE_NAMES = {
	mainBg: 'main-bg',
} as const

export const FILE_PATHS = {
	mainSlider: 'main-slider',
	values: 'values',
	mainBg: `pages/home`,
	masters: 'masters',
	forAI: 'for-ai',
} as const

export const EXTERNAL_PATHS = {
	mainBg: `${FILE_PATHS.mainBg}/${FILE_NAMES.mainBg}`,
} as const

export type FileName = (typeof FILE_NAMES)[keyof typeof FILE_NAMES]
export type FilePath = (typeof FILE_PATHS)[keyof typeof FILE_PATHS]
export type ExternalPath = (typeof EXTERNAL_PATHS)[keyof typeof EXTERNAL_PATHS]
