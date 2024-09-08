export interface GoogleProfile {
	email: string
	firstName: string
	lastName: string
	accessToken: string
}

export interface GithubProfile {
	email: string
	username: string
	accessToken: string
}

export type SocialProfile = GoogleProfile | GithubProfile
