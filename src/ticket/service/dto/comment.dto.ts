/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from './base.dto';

import { TicketDTO } from './ticket.dto';
import { AgentDTO } from './agent.dto';

/**
 * A CommentDTO object.
 */
export class CommentDTO extends BaseDTO {
  @ApiProperty({ description: 'content field' })
  content: any;

  @IsNotEmpty()
  @ApiProperty({ description: 'createdAt field' })
  createdAt: any;

  @ApiProperty({ type: () => TicketDTO, description: 'ticket relationship' })
  ticket: TicketDTO;

  @ApiProperty({ type: () => AgentDTO, description: 'author relationship' })
  author: AgentDTO;

}
