import {useEffect, useState} from "react";
import {CreateTask} from "../models/task/create-task.model";
import {XMarkIcon} from "@heroicons/react/24/solid";
import Textarea from "./Textarea";
import {Status} from "../models/status/status.model";
import StatusService from "../services/status.service";
import TaskService from "../services/task.service";

interface CreateEditTaskPropTypes {
    id: number | null,
    onClose: () => void,
    onRemove: () => void,
    onSave: () => void
}

const CreateEditTask = ({id, onClose, onRemove, onSave}: CreateEditTaskPropTypes) => {
    const [values, setValues] = useState<CreateTask>({
        description: "",
        status: new Status(id ?? 0, '')
    });
    const [errors, setErrors] = useState<any>({
        description: false,
    });
    const [touched, setTouched] = useState<boolean>();

    const onChangeInput = (e) => {
        const {value, name} = e.target;

        setValues({
            ...values,
            [name]: value
        })

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: !value
            })
        }
    }

    useEffect(() => {
        if (id) {
            TaskService
                .getById(id)
                .then(({data}) => setValues(data))
        }
    }, [id])

    const onSaveHandler = () => {
        const hasErrors = Object.values(errors).some(error => error);

        if (hasErrors)
            return setTouched(true)

        if (id) {
            TaskService
                .update({
                    description: values.description,
                    status: values.status,
                    id
                })
                .then(() => {
                    onSave();
                    onClose();
                })
                .catch(err => console.log(err))
        } else {
            StatusService
                .getAll()
                .then(({data}) => {
                    const status = data.find(v => v.name === 'pending') ?? data[0];

                    TaskService
                        .create({
                            description: values.description,
                            status
                        })
                        .then(() => {
                            onSave();
                            onClose()
                        })
                        .catch(err => console.log(err))
                })
        }
    }

    const onRemoveHandler = () => {
        TaskService
            .delete(+id)
            .then(() => {
                onRemove();
                onClose();
            });
    }

    return (
        <div className="flex flex-col gap-2.5 py-5 px-8 w-[750px]"
             style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <div className="flex flex-row pt-2.5 pb-5 border-b-2 border-[#24459A80]">
                <h1 className="font-jost font-semibold text-[#2D2A33] text-2xl">
                    {id ? "Edit task" : "Add task"}
                </h1>

                <button onClick={onClose} className="ml-auto">
                    <XMarkIcon className="fill-[#7D7D7D] h-8 w-8"/>
                </button>
            </div>

            <div className="flex flex-col gap-2.5">
                <h3 className="text-[#2D2A33]">Required fields are marked with *</h3>

                <Textarea
                    value={values.description}
                    error={errors.description}
                    onChange={onChangeInput}
                    touched={touched}
                    name="description"
                    title="Description *"
                    className="pb-[10px] pr-[20px] gap-[5px]"
                    errorChildren={
                        <h3 className="mt-2 text-[#9E0F20] text-xs">This field is required</h3>
                    }
                />
            </div>

            <div className="flex justify-end pt-2.5 pb-1 gap-5 border-t-[0.5px] border-[#24459A80]">
                {id && (
                    <button onClick={onRemoveHandler} className="mr-auto text-[#24459A] font-medium hover:underline">
                        Remove task
                    </button>
                )}

                <button
                    className="py-2.5 px-5 rounded-full bg-[#24459A] hover:border-[#2D2A33] border-[1.5px] hover:border-[1.5px] text-white transition duration-300 ease-in-out"
                    onClick={onSaveHandler}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
export default CreateEditTask;