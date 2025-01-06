import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./user.entity").users[]>;
    create(body: {
        name: string;
        age: number;
    }): Promise<import("./user.entity").users>;
}
