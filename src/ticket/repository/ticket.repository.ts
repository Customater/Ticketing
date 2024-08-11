import { EntityRepository, Repository } from 'typeorm';
import { Ticket } from '../domain/ticket.entity';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {}
