/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Ticket } from './ticket.entity';
import { Agent } from './agent.entity';

/**
 * A Comment.
 */
@Entity('comment')
export class Comment extends BaseEntity {
  @Column({ type: 'blob', name: 'content' })
  content: any;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: any;

  @ManyToOne(type => Ticket)
  ticket: Ticket;

  @ManyToOne(type => Agent)
  author: Agent;

}
