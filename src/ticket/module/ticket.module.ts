import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from '../web/rest/ticket.controller';
import { TicketRepository } from '../repository/ticket.repository';
import { TicketService } from '../service/ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([TicketRepository])],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
