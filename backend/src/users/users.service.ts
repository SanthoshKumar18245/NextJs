import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(users) private readonly userRepository: Repository<users>,
  ) {}

  async findAll(): Promise<users[]> {
    return this.userRepository.find();
  }

  async create(name: string, age: number): Promise<users> {
    const user = this.userRepository.create({ name, age });
    return this.userRepository.save(user);
  }
}
