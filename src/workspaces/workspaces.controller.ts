import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator';
import { Users } from '../entities/Users';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private workspaceService: WorkspacesService) {}

  @Get()
  getMyWorkspaces(@User() user: Users) {
    return this.workspaceService.findMyWrokspaces(user.id);
  }

  @Post()
  createWorkspace(@User() user: Users, @Body() body: CreateWorkspaceDto) {
    return this.workspaceService.createWorkspace(
      body.workspace,
      body.url,
      user.id,
    );
  }

  @Get(':url/members')
  getAllMembersFromWorkspace() {}

  @Post(':url/members')
  inviteMembersToWorkspace() {}

  @Delete(':url/members/:id')
  kickMemberFromWorkspace() {}

  @Get(':url/members/:id')
  getMemberInfoInWorkspace() {}

  @Get(':url/users/:id')
  DEPRECATED_getMemberInfoInWorkspace() {
    this.getMemberInfoInWorkspace();
  }
}
