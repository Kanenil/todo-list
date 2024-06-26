import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {StatusModule} from "./status/status.module";
import {TaskModule} from "./task/task.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SeedingModule} from "./seeding/seeding.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get<string>('POSTGRES_DATABASE'),
                synchronize: true,
                entities: [
                    __dirname + '/**/*.entity.{js,ts}'
                ]
            }),
            inject: [ConfigService]
        }),
        StatusModule,
        TaskModule,
        SeedingModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
