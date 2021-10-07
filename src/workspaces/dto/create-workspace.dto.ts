import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Sleact',
    description: 'Workspace name',
  })
  public workspace: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'sleact',
    description: 'url address',
  })
  public url: string;
}
