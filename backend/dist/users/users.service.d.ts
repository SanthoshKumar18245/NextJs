import { Repository } from 'typeorm';
import { users } from './user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<users>);
    findAll(): Promise<users[]>;
    create(name: string, age: number): Promise<users>;
}
