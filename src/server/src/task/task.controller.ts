import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe} from "@nestjs/common";
import {TaskService} from "./task.service";
import {Task} from "./entities/task.entity";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {CreateTaskDto} from "./dto/create-task.dto";

@Controller('tasks')
export class TaskController {
    constructor(
        private taskService: TaskService
    ) {}

    @Get('status/:statusId')
    public async getAll(@Param('statusId') statusId: number): Promise<Task[]> {
        return this.taskService.getAllByStatus(statusId);
    }

    @Get(':id')
    public async getById(@Param('id') id: number): Promise<Task> {
        return this.taskService.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async create(@Body() task: CreateTaskDto) {
        return await this.taskService.create(task);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    public async update(@Param() id: number, @Body() task: UpdateTaskDto) {
        return await this.taskService.update(id, task);
    }

    @Delete(':id')
    public async delete(@Param() id: number) {
        return await this.taskService.delete(id);
    }
}