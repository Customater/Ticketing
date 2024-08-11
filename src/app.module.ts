import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  TicketModule,
  AgentModule,
  AuthModule,
  CommentModule,
  CustomerModule,
  UserModule,
} from './ticket/module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
    TicketModule,
    AgentModule,
    AuthModule,
    CommentModule,
    CustomerModule,
    UserModule,
    ConfigurationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
