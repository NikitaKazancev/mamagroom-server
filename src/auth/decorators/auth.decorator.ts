import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { Role } from '@prisma/client'
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard'
import { RoleGuard } from '../role/role.guard'

export const Auth = (roles: Role | Role[] = Role.fullAccess) => {
	if (!Array.isArray(roles)) {
		roles = [roles]
	}

	return applyDecorators(
		SetMetadata('roles', roles),
		UseGuards(JwtAuthGuard, RoleGuard)
	)
}
