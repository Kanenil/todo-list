import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {Task} from "./task.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)  private taskRepository: Repository<Task>
    ) {}

    findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }
}