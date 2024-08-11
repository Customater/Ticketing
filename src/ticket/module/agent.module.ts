import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentController } from '../web/rest/agent.controller';
import { AgentRepository } from '../repository/agent.repository';
import { AgentService } from '../service/agent.service';

@Module({
  imports: [TypeOrmModule.forFeature([AgentRepository])],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
