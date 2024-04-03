import {BadRequestException, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Task} from "./entities/task.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {Status} from "../status/entities/status.entity";
import {CreateTaskDto} from "./dto/create-task.dto";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(Status)
        private statusRepository: Repository<Status>,
    ) {
    }

    getAll(): Promise<Task[]> {
        return this.taskRepository.find({
            relations: {
                status: true
            }
        });
    }

    findOne(id: number): Promise<Task> {
        return this.taskRepository.findOne({
            where: {
                id,
            },
        });
    }

    async create(taskDto: CreateTaskDto) {
        const statuses = await this.statusRepository.find();
        const task = {
            status: {...(statuses.find(s => s.name === 'pending') ?? statuses[0])},
            description: taskDto.description
        }

        return await this.taskRepository.save(task);
    }

    async update(id: number, taskDto: UpdateTaskDto) {
        const task = await this.taskRepository.findOne({
            where: {
                id: taskDto.id
            }
        })

        if(!task)
            return new BadRequestException('Task not found!');

        const status = await this.statusRepository.findOne({
            where: {
                id: taskDto.status.id
            }
        });

        if(!status)
            return new BadRequestException('Status not found!');

        return await this.taskRepository.update(id, taskDto);
    }

    async delete(id: number) {
        await this.taskRepository.delete(id);
    }
}