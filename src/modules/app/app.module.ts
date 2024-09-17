import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CustomExceptionFilter } from 'src/shared/filters/exception.filters';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompanyService } from '../company/company.service';
import { CompanyModule } from '../company/company.module';
import { TaskModule } from '../tasks/task.module';
import { TaskService } from '../tasks/task.service';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, CompanyModule, TaskModule],
  controllers: [AppController],
  providers: [
    PrismaService,
    UserService,
    CompanyService,
    TaskService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
