import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { Logger } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    private readonly logger = new Logger(UsersController.name);

    @Get()
    index(): Promise<User[]> {
      return this.usersService.findAll();
    }

    @Post('')
    async add(@Body() userData: User): Promise<any> {
      return this.usersService.addUser(userData);
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<any> {
        this.logger.log('Get user with id ' + id);
        return this.usersService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() userData: User): Promise<any> {
        userData.id = id;
        this.logger.log('Updating user with id ' + userData.id);
        return this.usersService.updateUser(userData);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
      this.logger.log('Deleting user with id ' + id);
      return this.usersService.deleteUser(id);
    }
}
