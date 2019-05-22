import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';
import * as passwordManager from '../utility/passwordManager';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

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
    @Column()
    password: string;
}
