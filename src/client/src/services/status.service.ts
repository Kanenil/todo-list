import axios from "axios";
import {Status} from "../models/status/status.model";
import {CreateStatus} from "../models/status/create-status.model";

class StatusService {
    private URL: string = '/api/statuses';

    getAll() : Promise<axios.AxiosResponse<Status[]>> {
        return axios.get(this.URL);
    }

    create(data: CreateStatus): Promise<axios.AxiosResponse<Status>> {
        return axios.post(this.URL, data);
    }
}

export default new StatusService();