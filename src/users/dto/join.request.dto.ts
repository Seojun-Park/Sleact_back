import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'address@example.com',
    description: 'Email',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: 'Jin',
    description: 'Nickname',
    required: true,
  })
  public nickname: string;

  @ApiProperty({
    description: 'password',
    required: true,
  })
  public password: string;
}
