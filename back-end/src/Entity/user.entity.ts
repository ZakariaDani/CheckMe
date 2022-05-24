import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    email: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    role: ROLE;
    @Column()
    salt: string;
}

export enum ROLE {
    CONSUMER = "CONSUMER",
    MANIFACTURER = "MANIFACTURER"
}