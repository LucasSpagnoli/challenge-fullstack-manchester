// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { DatabaseService } from 'src/database/database.service';

// type AuthInput = { email: string; password: string }
// type SignInData = { userId: number; name: string }

// @Injectable()
// export class AuthService {
//     constructor(
//         private readonly databaseService: DatabaseService,
//         // private jwtService: JwtService
//     ) { }

//     async ValidateUser(input: AuthInput) {
//         const user = await this.databaseService.user.findUnique({ where: { email: input.email } })

//         if (user) {
//             return {
//                 userId: user.id,
//                 username: user.name
//             }
//         }

//         return null
//     }

//     async signIn(user: SignInData) {
//         const tokenPayload = {
//             sub: user.userId,
//             name: user.name
//         }

//         // const accessToken = await this.jwtService.signAsync(tokenPayload)

//         return { username: user.name, userId: user.userId }
//     }

//     async authenticate(input: AuthInput) {
//         const user = this.ValidateUser(input)
//         if (!user) {
//             throw new UnauthorizedException()
//         }

//         return null
//     }
// }
