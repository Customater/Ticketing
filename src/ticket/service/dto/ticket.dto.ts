/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TicketStatus } from '../../domain/enumeration/ticket-status';
import { SatisfictionFeedback } from '../../domain/enumeration/satisfiction-feedback';
import { TicketPriority } from '../../domain/enumeration/ticket-priority';
import { BaseDTO } from './base.dto';

import { CustomerDTO } from './customer.dto';
import { AgentDTO } from './agent.dto';

/**
 * A TicketDTO object.
 */
export class TicketDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiProperty({ description: 'title field' })
  title: string;

  @ApiProperty({ description: 'description field' })
  description: any;

  @IsNotEmpty()
  @ApiProperty({ enum: TicketStatus, description: 'status enum field' })
  status: TicketStatus;

  @ApiProperty({ enum: SatisfictionFeedback, description: 'feedback enum field', required: false })
  feedback: SatisfictionFeedback;

  @IsNotEmpty()
  @ApiProperty({ enum: TicketPriority, description: 'priority enum field' })
  priority: TicketPriority;

  @IsNotEmpty()
  @ApiProperty({ description: 'createdAt field' })
  createdAt: any;

  @IsNotEmpty()
  @ApiProperty({ description: 'updatedAt field' })
  updatedAt: any;

  @ApiProperty({ description: 'resolvedAt field', required: false })
  resolvedAt: any;

  @ApiProperty({ type: () => CustomerDTO, description: 'customer relationship' })
  customer: CustomerDTO;

  @ApiProperty({ type: () => AgentDTO, description: 'assignedAgent relationship' })
  assignedAgent: AgentDTO;

  
}
