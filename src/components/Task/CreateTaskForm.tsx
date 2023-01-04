import { TaskPriorityType, Task } from "@prisma/client";
import { FormEvent, useState } from "react";
import { trpc } from "../../utils/trpc";

interface IProps {
    onCloseForm(): void;
}

const priorityTypeMap = new Map<string, TaskPriorityType>([
    [TaskPriorityType.Low, TaskPriorityType.Low],
    [TaskPriorityType.Medium, TaskPriorityType.Medium],
    [TaskPriorityType.High, TaskPriorityType.High],
])

const CreateTaskForm = ({ onCloseForm }: IProps) => {
    const [title, setTitle] = useState<string>("")
    const [assigned, setAssigned] = useState<string>("")
    const [estimated, setEstimated] = useState<number>(0)
    const [priority, setPriority] = useState<TaskPriorityType>()

    const mutation = trpc.tasks.createTask.useMutation()

    const handleClose = () => onCloseForm()

    const handleSave = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        mutation.mutate({
            title: title,
            assigned: assigned,
            estimated: estimated,
            priority: priority!,
            projectId: 1
        })

        setTitle("")
        setAssigned("")
        setEstimated(0)
        setPriority(undefined)
    }

    const handleTitleInput = (event: FormEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const handleAssignedInput = (event: FormEvent<HTMLInputElement>) => setAssigned(event.currentTarget.value)
    const handleEstimatedInput = (event: FormEvent<HTMLInputElement>) => setEstimated(+event.currentTarget.value)
    const handlePriorityInput = (event: FormEvent<HTMLSelectElement>) => setPriority(priorityTypeMap.get(event.currentTarget.value))

    return (
        <>
            <div className="absolute z-20 flex flex-col justify-center w-full h-full bg-slate-500 bg-opacity-60">
                <form onSubmit={handleSave} className="flex flex-col self-center rounded-2xl p-4 top-1/4 h-1/2 w-2/5 bg-gray-regular-2">
                    <div className="flex justify-between">
                        <h2 className="ml-1 font-mono font-medium text-2xl text-start">Create task</h2>
                        <button onClick={handleClose}>
                            <svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                        </button>
                    </div>
                    <div className="flex justify-between pr-10 pt-3">
                        <h3 className="py-2 px-5 mr-2 w-1/5 text-center font-mono font-medium tracking-wider bg-gray-regular-1 rounded-2xl">Title</h3>
                        <input value={title} onChange={handleTitleInput} className="rounded-2xl px-4 w-full border hover:border-blue-500 bg-gray-regular-1" type="text" />
                    </div>
                    <div className="flex justify-between pr-10 pt-3">
                        <h3 className="py-2 px-5 mr-2 w-2/5 text-center font-mono font-medium tracking-wider bg-gray-regular-1 rounded-2xl">Assigned</h3>
                        <input value={assigned} onChange={handleAssignedInput} className="rounded-2xl px-4 w-full border hover:border-blue-500 bg-gray-regular-1" type="text" />
                    </div>
                    <div className="flex justify-between pr-10 pt-3">
                        <h3 className="py-2 px-5 mr-2 w-5/9 text-center font-mono font-medium tracking-wider bg-gray-regular-1 rounded-2xl">Estimated</h3>
                        <input value={estimated} onChange={handleEstimatedInput} className="rounded-2xl px-4 w-full border hover:border-blue-500 bg-gray-regular-1" type="number" />
                    </div>
                    <div className="flex justify-between pr-10 pt-3">
                        <select onChange={handlePriorityInput} className="py-2 px-5 w-2/5 bg-gray-regular-1 border font-mono font-medium tracking-wider border-gray-300 rounded-2xl block">
                            <option defaultValue="">Select a priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <button className="py-2 px-5 mt-5 w-2/3 self-center bg-gray-regular-1 border hover:border-blue-500 font-mono font-medium tracking-wider rounded-2xl" type="submit">Save</button>
                </form>
            </div>
        </>
    )
}

export default CreateTaskForm;