import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../web/rest/user.controller';
import { ManagementController } from '../web/rest/management.controller';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController, ManagementController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
