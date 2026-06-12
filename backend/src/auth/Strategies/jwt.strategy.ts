import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import "dotenv/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'teste'
        })
    }

    async validate(payload: { sub: string, name: string }) {
        console.log('chegou no jwt strategy')
        return { id: payload.sub, name: payload.name };
    }
}