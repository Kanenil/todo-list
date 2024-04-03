import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {Status} from "./status.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private statusRepository: Repository<Status>
    ) {}

    getAll(): Promise<Status[]> {
        return this.statusRepository.find();
    }
}