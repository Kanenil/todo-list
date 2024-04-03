import {Status} from "../models/status/status.model";
import TaskItem from "./TaskItem";
import {Task} from "../models/task/task.model";
import TaskService from "../services/task.service";
import {useEffect, useState} from "react";

interface BlockStatusPropTypes {
    status: Status,
    onEdit: (id: number) => void,
    refetch: () => void
}

const BlockStatus = ({status, onEdit, refetch}: BlockStatusPropTypes) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        TaskService
            .getAllByStatus(status.id)
            .then(({data}) => setTasks(data))
    }, [])

    const onRemove = (task: Task) => {
        TaskService.delete(task.id)
            .then(() => {
                setTasks({...tasks.filter(v => v.id !== task.id)});
            })
    }

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onDrop = (e) => {
        const id = e.dataTransfer.getData('text');
        TaskService
            .getById(id)
            .then(({data})=>{
                TaskService.update({
                    description: data.description,
                    status: new Status(status.id, status.name),
                    id: +id
                }).then(refetch)
            })
    }

    return (
        <div onDragOver={onDragOver} onDrop={onDrop} className="flex flex-col gap-5 w-[25rem] bg-gray-800 rounded-lg px-10 py-10">
            <h1 className="text-2xl text-center text-nowrap capitalize font-semibold text-gray-100">{status.name}</h1>
            {
                tasks.length > 0 && tasks.map(task => (
                    <TaskItem onEdit={onEdit} onRemove={onRemove} key={`taskItem-${task.id}`} task={task}/>
                ))
            }
        </div>
    )
}
export default BlockStatus;