import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Users } from '../user/user.entity';
import { Error } from 'src/shared/responses/error.types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }): Promise<any> {
    const user: Users = await this.userService.getUserByEmail(email);

    if (user && user.password === password) {
      return user;
    }
    throw Error(401, 'Wrong password');
  }

  async login(req: any) {
    const { username, password, _id } = await this.validateUser(req);
    const payload = { username, password };

    return {
      username,
      id: _id,
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_KEY,
      }),
    };
  }
}
