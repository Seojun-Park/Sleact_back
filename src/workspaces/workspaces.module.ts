import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Channels } from '../entities/Channels';
import { Users } from '../entities/Users';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { Workspaces } from '../entities/Workspaces';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Workspaces,
      Channels,
      WorkspaceMembers,
      ChannelMembers,
    ]),
  ],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
