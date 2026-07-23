import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { Request } from 'express';
import "dotenv/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req?.cookies?.auth_token ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET!
        })
    }

    async validate(payload: { sub: number, name: string }) {
        return { id: payload.sub, name: payload.name };
    }
}