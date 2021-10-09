import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Users } from '../entities/Users';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { UsersService } from './users.service';

class MockUserRepository {
  #data = [{ id: 1, email: 'jinchul112@gmail.com' }];
  fineOne({ where: { email } }) {
    const data = this.#data.find((v) => v.email === email);
    if (data) {
      return data;
    }
    return null;
  }
}
class MockChannelMemberRepository {}
class MockWorkspaceMemberRepository {}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(ChannelMembers),
          useClass: MockChannelMemberRepository,
        },
        {
          provide: getRepositoryToken(WorkspaceMembers),
          useClass: MockWorkspaceMemberRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be find user by email -> findByEmail', () => {
    expect(service.findByEmail('jinchul112@gmail.com')).resolves.toStrictEqual({
      email: 'jinchul112@gmail.com',
      id: 1,
    });
  });

  it('return null or undefined if user not found', () => {
    expect(service.findByEmail('jinchul113@gmail.com')).resolves.toStrictEqual(
      null,
    );
  });
});
