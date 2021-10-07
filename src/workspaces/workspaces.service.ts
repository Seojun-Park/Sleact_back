import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Channels } from '../entities/Channels';
import { Users } from '../entities/Users';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { Workspaces } from '../entities/Workspaces';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelmembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async fineById(id: number) {
    return this.workspacesRepository.findByIds([id]);
  }

  async findMyWrokspaces(myId: number) {
    return this.workspacesRepository.find({
      where: {
        WorkspaceMembers: [{ UserId: myId }],
      },
    });
  }

  async createWorkspace(name: string, url: string, myId: number) {
    const workspace = this.workspacesRepository.create({
      name,
      url,
      OwnerId: myId,
    });
    const res = await this.workspacesRepository.save(workspace);
    const workspaceMember = new WorkspaceMembers();
    workspaceMember.UserId = myId;
    workspaceMember.WorkspaceId = res.id;
    await this.workspaceMembersRepository.save(workspaceMember);
    const channel = new Channels();
    channel.name = 'general';
    channel.WorkspaceId = res.id;
    const [, channelRes] = await Promise.all([
      this.workspaceMembersRepository.save(workspaceMember),
      this.channelsRepository.save(channel),
    ]);
    const channelMember = new ChannelMembers();
    channelMember.UserId = myId;
    channelMember.ChannelId = channelRes.id;
    await this.channelmembersRepository.save(channelMember);
  }

  async getWorkspaceMembers(url: string) {
    this.usersRepository
      .createQueryBuilder('u')
      .innerJoin('u.WorkspaceMembers', 'm')
      .innerJoin('m.Workspace', 'w', 'w.url =:url', { url: url })
      .getMany();
  }
}
