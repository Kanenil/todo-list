import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./entities/task.entity";
import {TaskController} from "./task.controller";
import {TaskService} from "./task.service";
import {Status} from "../status/entities/status.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Task, Status])],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}