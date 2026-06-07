import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()
        const authorization = req.headers.authorization
        const token = authorization?.split(' ')[1]

        if (!token) {
            throw new UnauthorizedException('Token ausente')
        }

        try {
            const tokenPayload = await this.jwtService.verifyAsync(token)
            req.user = {
                userId: tokenPayload.sub,
                name: tokenPayload.name
            }
            return true
        } catch (error) {
            throw new UnauthorizedException("Erro ao verificar token")
        }
    }
}