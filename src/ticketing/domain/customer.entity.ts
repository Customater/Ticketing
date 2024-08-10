/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { User } from './user.entity';

/**
 * A Customer.
 */
@Entity('customer')
export class Customer extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @ManyToOne(type => User)
  user: User;

}
