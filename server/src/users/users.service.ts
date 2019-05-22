import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

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
        const entity = Object.assign(new User(), user);
        return await this.userRepository.save(entity);
    }

    async updateUser(user: User): Promise<UpdateResult> {
        return await this.userRepository.update(user.id, user);
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}
