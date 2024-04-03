import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {StatusService} from "./status.service";
import {Status} from "./entities/status.entity";
import {CreateStatusDto} from "./dto/create-status.dto";

@Controller('statuses')
export class StatusController {
    constructor(
        private statusService: StatusService
    ) {}

    @Get()
    public async getAll(): Promise<Status[]> {
        return this.statusService.getAll()
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async create(@Body() status: CreateStatusDto) {
        await this.statusService.create(status);
    }
}