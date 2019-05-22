import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as passwordManager from '../utility/passwordManager';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Unique(['userName'])
    @Column()
    userName: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @BeforeInsert()
    hashPassword() {
        this.password = passwordManager.generateHash(this.password);
    }
    @Exclude()
    @Column()
    password: string;
}
