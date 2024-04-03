import {Task} from "../task/task.model";

export class Status {
    id: number;
    name: string;
    tasks: Task[];

    constructor(id: number, name: string) {
        this.name = name;
        this.id = id;
    }
}