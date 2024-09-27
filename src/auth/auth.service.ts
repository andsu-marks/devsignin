import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { User } from 'src/users/models/users.model';
import { Request } from 'express';
import { JwtPayload } from './models/jwt-payload.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('USer')
        private readonly usersModel: Model<User>
    ) {}

    public async createAccessToken(userId: string): Promise<string> {
        return sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: process.env.EXPIRATION
        });
    };

    public async validateUser(jwtPayload: JwtPayload): Promise<User> {
        const user = await this.usersModel.findOne({ _id: jwtPayload.userId });
        if (!user) {
            throw new UnauthorizedException('User Not Found.');
        }

        return user;
    };

    private static jwtExtractor(request: Request): string {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new BadRequestException('Bad Request');
        }

        const [, token] = authHeader.split(' ');
        return token;
    };

    public returnJwtExtractor(): (request: Request) => string {
        return AuthService.jwtExtractor;
    }
}
