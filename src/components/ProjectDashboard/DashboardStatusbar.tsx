import { Task } from "@prisma/client";
import { createRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import ProjectTask from "./Task";
import { TaskStatusType } from "@prisma/client";

export interface IProps {
    title: string,
    status: TaskStatusType,
    tasks: Task[] | undefined,
    onDraggingTask: (e: DraggableEvent, data: DraggableData) => void,
    onStopDragTask: (e: DraggableEvent, data: DraggableData) => void
}

const ProjectDashboardTaskContainer = (props: IProps) => {
    const { status, title, tasks, onDraggingTask, onStopDragTask } = props;

    const handleOnStart = (e: DraggableEvent, data: DraggableData): void => {
        const parent = data.node.parentElement;
        const node = data.node;

        if (!parent)
            return;

        node.style.zIndex = '50';
    }

    const handleOnDrag = (e: DraggableEvent, data: DraggableData): void => {
        onDraggingTask(e, data);
    }

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
            <div id={`${status}`} className="flex flex-col px-5 py-3 border border-white bg-bg-gray-regular rounded-2xl min-h-[650px] w-[24%]">
                <h2 className="font-mono pb-4 font-medium">{title}</h2>
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
                                    <ProjectTask
                                        title={task.title}
                                        assigned={task.assigned}
                                        estimated={task.estimated}
                                        priority={task.priority} />
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