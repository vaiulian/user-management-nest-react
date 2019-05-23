import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ClassSerializerInterceptor } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { Logger, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    private readonly logger = new Logger(UsersController.name);

    @ApiResponse({ status: 200, description: 'The records have been successfully retrieved.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @Get()
    index(): Promise<User|User[]> {
      this.logger.log('Getting all users');
      return this.usersService.findAll();
    }

    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @Post('')
    async add(@Body() userData: User): Promise<any> {
      this.logger.log('Adding new user: ' + JSON.stringify(userData));
      return this.usersService.addUser(userData);
    }

    @ApiResponse({ status: 200, description: 'The record has been successfully retrieved.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @Get(':id')
    async get(@Param('id') id: number): Promise<any> {
        this.logger.log('Getting user with id ' + id);
        return this.usersService.findOne(id);
    }

    @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @Put(':id')
    async update(@Param('id') id: number, @Body() userData: User): Promise<any> {
        userData.id = id;
        this.logger.log('Updating user with id ' + userData.id);
        return this.usersService.updateUser(userData);
    }

    @ApiResponse({ status: 200, description: 'The record has been successfully deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
      this.logger.log('Deleting user with id ' + id);
      return this.usersService.deleteUser(id);
    }
}
