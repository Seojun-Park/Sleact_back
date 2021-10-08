import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto {
  @ApiProperty({
    example: 'chat room',
    description: 'channel title',
  })
  public name: string;
}
