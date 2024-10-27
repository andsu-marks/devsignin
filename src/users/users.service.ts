import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/users.model';
import { AuthService } from 'src/auth/auth.service';
import { SignupDTO } from './dto/sifnup.dto';
import { SigninDTO } from './dto/siginin.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('USer')
        private readonly usersModel: Model<User>,
        private readonly authService: AuthService
    ) {}

    public async signup(signupDTO: SignupDTO): Promise<User> {
        const user = new this.usersModel(signupDTO);
        return user.save();
    };

    public async signin(signinDTO: SigninDTO): Promise<{ name: string; jwtToken: string; email:string }> {
        
    }
}
