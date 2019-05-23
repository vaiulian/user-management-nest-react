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
        const exception = new HttpException({
            status: HttpStatus.NOT_FOUND,
            message: 'Username was not found...',
          }, HttpStatus.NOT_FOUND);

        return this.throwErrorOrReturn(userData, exception);
    }

    async addUser(user: User): Promise<User> {
        const entity = Object.assign(new User(), user);
        let userData: User;
        try {
            userData = await this.userRepository.save(entity);
        } catch (e) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: e.message,
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

    throwErrorOrReturn = (data: any, exception: HttpException = null) => {
        const toThrow = exception || new NotFoundException();
        if (!data) {
            throw toThrow;
        }
        return data;
    }
}
