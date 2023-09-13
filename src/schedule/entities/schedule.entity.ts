import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyId: number;

    @Column()
    date: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column()
    contentId: number;

    @Column()
    isActive: boolean;

    @CreateDateColumn()
    dateCreated: Date;

    @UpdateDateColumn()
    dateUpdated: Date;
}
