import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {SeedingMiddleware} from "./seeding.middleware";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Status} from "../status/status.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Status])]
})
export class SeedingModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SeedingMiddleware)
            .forRoutes('*')
    }
}