/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Customer } from './customer.entity';
import { Agent } from './agent.entity';
import { TicketStatus } from './enumeration/ticket-status';
import { SatisfictionFeedback } from './enumeration/satisfiction-feedback';
import { TicketPriority } from './enumeration/ticket-priority';

/**
 * A Ticket.
 */
@Entity('ticket')
export class Ticket extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ type: 'blob', name: 'description' })
  description: any;

  @Column({ type: 'simple-enum', name: 'status', enum: TicketStatus })
  status: TicketStatus;

  @Column({ type: 'simple-enum', name: 'feedback', enum: SatisfictionFeedback })
  feedback: SatisfictionFeedback;

  @Column({ type: 'simple-enum', name: 'priority', enum: TicketPriority })
  priority: TicketPriority;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: any;

  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: any;

  @Column({ type: 'timestamp', name: 'resolved_at', nullable: true })
  resolvedAt: any;

  @ManyToOne(type => Customer)
  customer: Customer;

  @ManyToOne(type => Agent)
  assignedAgent: Agent;

}
