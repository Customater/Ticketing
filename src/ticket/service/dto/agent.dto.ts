/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from './base.dto';

import { UserDTO } from './user.dto';

/**
 * A AgentDTO object.
 */
export class AgentDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiProperty({ description: 'name field' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'email field' })
  email: string;

  @ApiProperty({ description: 'department field', required: false })
  department: string;

  @ApiProperty({ type: () => UserDTO, description: 'user relationship' })
  user: UserDTO;

}
