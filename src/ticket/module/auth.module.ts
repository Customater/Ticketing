import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../service/auth.service';
import { AuthModule } from './module/auth.module';
import { ormConfig } from './orm.config';
import { config } from './config';
import { TicketModule } from './module/ticket.module';
import { CustomerModule } from './module/customer.module';
import { AgentModule } from './module/agent.module';
import { CommentModule } from './module/comment.module';
import { JwtStrategy } from '../security/passport.jwt.strategy';
import { UserJWTController } from '../web/rest/user.jwt.controller';
import { config } from '../config';
import { AuthorityRepository } from '../repository/authority.repository';

import { PublicUserController } from '../web/rest/public.user.controller';
import { AccountController } from '../web/rest/account.controller';

@Module({
  imports: [
     TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    ServeStaticModule.forRoot({
      rootPath: config.getClientPath(),
    }),
    AuthModule,
    TicketModule,
    CustomerModule,
    AgentModule,
    CommentModule,
    PassportModule,
    ConfigurationService,
    ,
  ],
  controllers: [UserJWTController, PublicUserController, AccountController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
