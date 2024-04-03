import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';
import {Repository} from 'typeorm';
import {Status} from "../status/status.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class SeedingMiddleware implements NestMiddleware {
    private isSeedingComplete: Promise<boolean>;

    constructor(
        @InjectRepository(Status)
        private repository: Repository<Status>
    ) {
    }

    async use(req: Request, res: Response, next: Function) {
        if (await this.isSeedingComplete) {
            return next();
        }

        this.isSeedingComplete = (async () => {
            const data = await this.repository.find();

            if (data.length === 0) {
                const statuses = ['pending', 'in progress', 'canceled']
                for (const status of statuses) {
                    await this.repository.save({
                        name: status
                    });
                }
            }

            return true;
        })();

        await this.isSeedingComplete;

        next();
    }
}