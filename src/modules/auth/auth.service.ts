import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Users } from '../user/user.entity';
import { BadRequestError, UnauthorizedError } from 'src/shared/responses/error.types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }): Promise<any> {
    if(!email || !password) 
      throw new BadRequestError('Please enter e-mail and password');
    const user: Users = await this.userService.getUserByEmail(email);

    if (user && user.password === password) {
      return user;
    }
    throw new UnauthorizedError('Wrong password');
  }

  async login(req: any) {
    const { name, id } = await this.validateUser(req);
    const payload = { name, id };

    return {
      name,
      id: id,
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_KEY,
      }),
    };
  }
}
