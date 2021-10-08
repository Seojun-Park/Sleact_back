import { HttpException, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Users } from '../entities/Users';
import bcrypt from 'bcrypt';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { ChannelMembers } from '../entities/ChannelMembers';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspaces } from '../entities/Workspaces';
import { Channels } from '../entities/Channels';

@Injectable()
export class UsersService {
  constructor(
    private connection: Connection,
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
  ) {}

  async join(email: string, nickname: string, password: string) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = await queryRunner.manager
      .getRepository(Users)
      .findOne({ where: { email } });
    if (user) {
      throw new HttpException('USER_EXISTED', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      const returned = await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });
      const workspace = await this.workspacesRepository.findOne({
        where: { id: 1 },
      });
      if (!workspace) {
        const newWorkspace = new Workspaces();
        newWorkspace.name = 'sleact';
        newWorkspace.url = 'sleact';
        const savedWorkspace = await this.workspacesRepository.save(
          newWorkspace,
        );
        const newChannel = new Channels();
        newChannel.name = 'general';
        newChannel.WorkspaceId = savedWorkspace.id;
        await this.channelsRepository.save(newChannel);
      }
      await queryRunner.manager.getRepository(WorkspaceMembers).save({
        UserId: returned.id,
        WorkspaceId: 1,
      });
      await queryRunner.manager.getRepository(ChannelMembers).save({
        UserId: returned.id,
        ChannelId: 1,
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw Error(error);
    } finally {
      await queryRunner.release();
    }
  }
}
