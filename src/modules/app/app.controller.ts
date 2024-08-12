import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { Public } from 'src/shared/decorators/public.decorator';
import { Created, Ok } from 'src/shared/responses/success.types';
import { UserBodyDTO } from '../user/dto/user-body-dto';
import { JsonResponse } from 'src/shared/responses/json-response.contract';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @Public()
  @Post('/login')
  public async login(@Request() req): Promise<any> {
    const user = await this.authService.login(req.body);
    return new Ok(user);
  }

  @Public()
  @Post('/register')
  public async create(
    @Body() body: UserBodyDTO,
  ): Promise<any> {
    const users = await this.usersService.create(body);
    return new Created(users);
  }

  @Public()
  @Get()
  getHello(): string {
    return 'É os guri';
  }
}
