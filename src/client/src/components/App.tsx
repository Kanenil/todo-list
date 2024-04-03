import React, {useEffect, useState} from "react";
import StatusService from "../services/status.service";
import {Status} from "../models/status/status.model";
import BlockStatus from "./BlockStatus";
import {PlusIcon} from "@heroicons/react/24/solid";
import Modal from "./Modal";
import CreateEditTask from "./CreateEditTask";

const App = () => {
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);

    const fetchData = () => {
        setStatuses([]);
        StatusService
            .getAll()
            .then(({data}) => setStatuses(data))
    }

    useEffect(() => {
        fetchData();
    }, [])

    const onClose = () => {
        fetchData();
    }

    const onEdit = (id: number) => {
        setId(id);
        setIsOpen(true);
    }

    return (
        <div className="flex justify-center bg-gray-200 min-h-screen">
            <div className="flex flex-col gap-5 mt-10 mb-20">
                <button onClick={() => setIsOpen(true)} className="ml-auto bg-blue-600 flex flex-row items-center py-4 px-8 rounded-lg hover:bg-blue-900 text-gray-100 font-bold">
                    <span>New task</span>
                    <PlusIcon className="ml-3 w-6 h-6"/>
                </button>
                <div className="flex flex-row gap-5 h-full">
                    {
                        statuses.map(status => (
                            <BlockStatus refetch={fetchData} onEdit={onEdit} key={`status-${status.id}`} status={status}/>
                        ))
                    }
                </div>
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onClose}>
                <CreateEditTask id={id} onRemove={fetchData} onSave={fetchData} onClose={() => setIsOpen(false)}/>
            </Modal>
        </div>
    )
}

export default App
