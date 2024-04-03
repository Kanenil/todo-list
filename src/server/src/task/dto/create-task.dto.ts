import {IsNotEmpty} from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty({message: "Description is required field."})
    description: string;
}