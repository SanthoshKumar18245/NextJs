import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './users/user.entity';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: '3.6.192.30',
      //host: '192.168.1.162', // Change to your MySQL host if different
      host: '192.168.1.16',
      port: 3306, // Default port for MySQL
      username: 'appuser', // Replace with your MySQL username
      password: 'Admin321!', // Replace with your MySQL password
      database: 'nextDB', // Replace with your database name
      entities: [users],
      synchronize: false, // For development use only; set to false for production
    }),
    TypeOrmModule.forFeature([users]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
