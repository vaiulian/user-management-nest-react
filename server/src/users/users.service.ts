import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import * as passwordManager from '../utility/passwordManager';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        const userData: User[] = await this.userRepository.find();
        return this.throwErrorOrReturn(userData);
    }

    async findOne(id: number): Promise<User> {
        const userData: User = await this.userRepository.findOne({id});
        return this.throwErrorOrReturn(userData);
    }

    async findByUserName(userName: string): Promise<User> {
        const userData: User = await this.userRepository.findOne({
            where: { userName },
        });
        return this.throwErrorOrReturn(userData);
    }

    async addUser(user: User): Promise<User> {
        const entity = Object.assign(new User(), user);
        let userData: User;
        try {
            userData = await this.userRepository.save(entity);
        } catch (e) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: e.message,
              }, HttpStatus.FORBIDDEN);
        }
        return this.throwErrorOrReturn(userData);
    }

    async updateUser(user: User): Promise<UpdateResult> {
        const entity: User = Object.assign(new User(), user);
        if (entity.password && entity.password !== '') {
            entity.password = passwordManager.generateHash(entity.password);
        }

        return await this.userRepository.update(entity.id, entity);
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    throwErrorOrReturn = (data: any) => {
        if (!data) {
            throw new NotFoundException();
        }
        return data;
    }
}
