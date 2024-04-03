import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {Status} from "./entities/status.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateStatusDto} from "./dto/create-status.dto";

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private statusRepository: Repository<Status>
    ) {}

    getAll(): Promise<Status[]> {
        return this.statusRepository.find();
    }

    async create(statusDto:CreateStatusDto) {
        const status = {
            name: statusDto.name
        }

        return this.statusRepository.save(status);
    }
}