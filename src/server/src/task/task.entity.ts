import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Status} from "../status/status.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @ManyToOne(() => Status, status => status.tasks)
    status: Status;
}