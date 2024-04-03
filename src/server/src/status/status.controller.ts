import {Controller, Get} from "@nestjs/common";
import {StatusService} from "./status.service";
import {Status} from "./status.entity";

@Controller('status')
export class StatusController {
    constructor(
        private statusService: StatusService
    ) {}

    @Get()
    public async getAll(): Promise<Status[]> {
        return this.statusService.getAll()
    }
}