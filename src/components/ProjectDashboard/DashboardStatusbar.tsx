import { Task } from "@prisma/client";
import { createRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import ProjectTask from "./Task";
import { TaskStatusType } from "@prisma/client";

export interface IProps {
    title: string,
    status: TaskStatusType,
    isActive: boolean,
    tasks: Task[] | undefined,
    onDraggingTask: (e: DraggableEvent, data: DraggableData) => void,
    onStopDragTask: (e: DraggableEvent, data: DraggableData) => void,
    onCreateTask: () => void
}

const ProjectDashboardTaskContainer = ({ status, title, isActive, tasks, onDraggingTask, onStopDragTask, onCreateTask }: IProps) => {
    const handleOnStart = (e: DraggableEvent, data: DraggableData): void => {
        const parent = data.node.parentElement;
        const node = data.node;

        if (!parent)
            return;

        node.style.zIndex = '50';
    }

    const handleOnDrag = (e: DraggableEvent, data: DraggableData): void => onDraggingTask(e, data)

    const handleOnClick = () => onCreateTask()

    const handleStopDrag = (e: DraggableEvent, data: DraggableData): void => {
        const parent = data.node.parentElement;
        const node = data.node;

        if (!parent)
            return;

        node.style.zIndex = '0';

        onStopDragTask(e, data);
    }

    return (
        <>
            <div id={`${status}`} className={`flex flex-col px-5 py-3 border ${isActive ? 'border-blue-500' : 'border-white'} bg-gray-regular-1 rounded-2xl min-h-[650px] w-[24%]`}>
                <div className="flex justify-between align-baseline">
                    <h2 className="font-mono pb-4 font-medium">{title}</h2>
                    {status === TaskStatusType.ToDo ?
                        <button onClick={handleOnClick}>
                            <svg className="h-6 w-6 text-green-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" /></svg>
                        </button>
                        : <></>
                    }
                </div>
                {
                    tasks?.map((task, i) => {
                        const nodeRef: React.RefObject<HTMLDivElement> = createRef()
                        return (
                            <Draggable
                                key={i}
                                nodeRef={nodeRef}
                                onStart={handleOnStart}
                                onDrag={handleOnDrag}
                                onStop={handleStopDrag}
                                position={{ x: 0, y: 0 }}
                                bounds="body"
                            >
                                <div id={`${task.id}`} ref={nodeRef}>
                                    <ProjectTask {...task} />
                                </div>
                            </Draggable>
                        )
                    }
                    )
                }
            </div>
        </>
    )
}

export default ProjectDashboardTaskContainer;