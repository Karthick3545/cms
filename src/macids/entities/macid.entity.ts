import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Macid {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    macId: string;

    @Column()
    orientation:string;

    @Column()
    location:string;

    @Column()
    companyId: number;

    @Column()
    userId: number;

    @Column()
    isActive: boolean;

    @CreateDateColumn()
    dateCreated: Date;

    @UpdateDateColumn()
    dateUpdated: Date;
}
