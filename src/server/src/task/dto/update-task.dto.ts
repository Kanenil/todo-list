import {IsInt, IsNotEmpty} from "class-validator";
import {Status} from "../../status/entities/status.entity";

export class UpdateTaskDto {
    @IsInt()
    id: number;

    @IsNotEmpty({message: "Description is required field."})
    description: string;

    status: Status;
}