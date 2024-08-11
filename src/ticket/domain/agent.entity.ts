/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { User } from './user.entity';

/**
 * A Agent.
 */
@Entity('agent')
export class Agent extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'department', nullable: true })
  department: string;

  @ManyToOne(type => User)
  user: User;

}
