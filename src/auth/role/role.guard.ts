import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role, User } from '@prisma/client'
import { Request } from 'express'
import { unauthorized } from 'src/utils/errors'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const rolesToCheck = this.reflector.get<Role[]>(
			'roles',
			context.getHandler()
		)
		if (!rolesToCheck) {
			return true
		}

		const request = context.switchToHttp().getRequest<Request>()
		const userRoles = new Set((request.user as User).roles)

		if (userRoles.has(Role.fullAccess)) {
			return true
		}

		if (rolesToCheck.every(role => userRoles.has(role))) {
			return true
		}

		unauthorized('user has no access', RoleGuard.name)
	}
}
