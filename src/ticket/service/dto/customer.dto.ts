/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from './base.dto';

import { UserDTO } from './user.dto';

/**
 * A CustomerDTO object.
 */
export class CustomerDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiProperty({ description: 'name field' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'email field' })
  email: string;

  @ApiProperty({ description: 'phone field', required: false })
  phone: string;

  @ApiProperty({ type: () => UserDTO, description: 'user relationship' })
  user: UserDTO;

  
}
