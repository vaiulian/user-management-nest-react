import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne({id});
    }

    async addUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async updateUser(user: User): Promise<UpdateResult> {
        return await this.userRepository.update(user.id, user);
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}
