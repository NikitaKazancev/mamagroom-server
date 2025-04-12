import 'fastify'

declare module 'fastify' {
	interface FastifyRequest {
		user?: any // или можешь указать `User`
	}
}
