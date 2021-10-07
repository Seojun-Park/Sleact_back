import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'nickname', 'password'],
    });
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
}
