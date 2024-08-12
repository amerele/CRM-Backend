import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { SessionSerializer } from './session.serializer';
import { JwtStrategy } from './authenticated.guard';

@Module({
  imports: [UserModule, PassportModule.register({ session: true }), JwtModule.register({
    secret: process.env.JWT_KEY,
    signOptions: { expiresIn: '24h' },
  })],
  providers: [AuthService, SessionSerializer, {
    provide: APP_GUARD,
    useClass: JwtStrategy,
  },],
  exports: [AuthService]
})
export class AuthModule {}
