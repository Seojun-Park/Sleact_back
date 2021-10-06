import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async join(email: string, nickname: string, password: string) {
    if (!email) throw new HttpException('no email', 400);
    if (!nickname) throw new HttpException('no email', 400);
    if (!password) throw new HttpException('no email', 400);
    const user = this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new Error('USER_EXISTED');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
