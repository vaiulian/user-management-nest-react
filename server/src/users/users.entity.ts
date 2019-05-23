import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as passwordManager from '../utility/passwordManager';
import { Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty()
    @Unique(['userName'])
    @Column()
    userName: string;

    @ApiModelProperty()
    @Column()
    firstName: string;

    @ApiModelProperty()
    @Column()
    lastName: string;

    @ApiModelProperty()
    @BeforeInsert()
    hashPassword() {
        this.password = passwordManager.generateHash(this.password);
    }
    @Exclude()
    @Column()
    password: string;
}
