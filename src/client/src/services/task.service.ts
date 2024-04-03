import axios from "axios";
import {Task} from "../models/task/task.model";
import {CreateTask} from "../models/task/create-task.model";

class TaskService {
    private URL = '/api/tasks';

    getAllByStatus(status: number) : Promise<axios.AxiosResponse<Task[]>> {
        return axios.get(`${this.URL}/status/${status}`);
    }

    getById(id: number) : Promise<axios.AxiosResponse<Task>> {
        return axios.get(`${this.URL}/${id}`);
    }

    create(data: CreateTask): Promise<axios.AxiosResponse<Task>> {
        return axios.post(this.URL, data);
    }

    update(data: Task): Promise<axios.AxiosResponse<Task>> {
        return axios.put(`${this.URL}/${data.id}`, data);
    }

    delete(id: number) {
        return axios.delete(`${this.URL}/${id}`);
    }
}

export default new TaskService();