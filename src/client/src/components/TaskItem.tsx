import React from "react";
import {Task} from "../models/task/task.model";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid";

interface TaskItemPropTypes {
    task: Task,
    onRemove: (task: Task) => void,
    onEdit: (id:number)=>void
}

const TaskItem = ({ task, onRemove, onEdit }: TaskItemPropTypes) => {
    const onDragStart = (e) => {
        e.dataTransfer.setData('text/plain', task.id);
    }

    return (
        <div draggable={true} onDragStart={onDragStart} className="flex flex-row items-center hover:bg-gray-500 rounded px-4 py-4">
            <h3 className="text-base truncate text-gray-100 font-light">
                {task.description}
            </h3>

            <div className="flex flex-row gap-4 ml-auto mr-2">
                <button onClick={() => onEdit(task.id)} className="text-blue-600 hover:text-blue-500">
                    <PencilIcon className="w-5 h-5"/>
                </button>

                <button onClick={() => onRemove(task)} className="text-red-600 hover:text-red-500">
                    <TrashIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>

    )
}
export default TaskItem;