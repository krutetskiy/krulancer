import ProjectDashboardDescription from "./ProjectDashboardDescription";
import ProjectDashboardTaskContainer from "./ProjectDashboardTaskContainer";
import { DraggableData, DraggableEvent } from "react-draggable";
import { trpc } from "../utils/trpc";
import { Task, TaskStatusType } from "@prisma/client";
import { useState } from "react";

const MouseOverlap = (mouseEvent: MouseEvent, bounds: DOMRect) => {
    return (
        mouseEvent.pageY > bounds.top &&
        mouseEvent.pageY < bounds.top + bounds.height &&
        mouseEvent.pageX > bounds.left &&
        mouseEvent.pageX < bounds.left + bounds.width
    )
}

const displayStatuses = new Map<TaskStatusType, string>([
    [TaskStatusType.ToDo, "To Do"],
    [TaskStatusType.InProgress, "In Progress"],
    [TaskStatusType.Closed, "Closed"],
    [TaskStatusType.Frozen, "Frozen"]
]);

const stringStatusMap = new Map<string, TaskStatusType>([
    [TaskStatusType.ToDo, TaskStatusType.ToDo],
    [TaskStatusType.InProgress, TaskStatusType.InProgress],
    [TaskStatusType.Closed, TaskStatusType.Closed],
    [TaskStatusType.Frozen, TaskStatusType.Frozen]
]);

const ProjectDashboard = () => {
    const project = trpc.projects.getById.useQuery({
        id: 1
    }).data

    const [dragTask, setDragTask] = useState<Task>();

    trpc.tasks.updateTaskStatus.useQuery({
        taskId: dragTask?.id,
        status: dragTask?.status
    })

    const onDraggingTask = (e: DraggableEvent, data: DraggableData): void => {
        const containers = [...document.querySelector("#taskContainers")?.children!];
        const mouseEvent = window.event as MouseEvent;

        containers.forEach(container => {
            var bounds = container.getBoundingClientRect()
            if (MouseOverlap(mouseEvent, bounds))
                container?.classList.add("border-cyan-500")
            else
                container?.classList.remove("border-cyan-500")
        })
    }

    const onStopDragTask = (e: DraggableEvent, data: DraggableData): void => {
        const containers = [...document.querySelector("#taskContainers")?.children!];
        const mouseEvent = window.event as MouseEvent;

        const targetElement = containers.find(container => MouseOverlap(mouseEvent, container.getBoundingClientRect()))
        const targetStatus: TaskStatusType | undefined = stringStatusMap.get(targetElement!.id);

        if (!targetStatus) return

        const targetTask = project?.tasks?.find(task => task.id?.toString() === data.node.id)
        targetTask!.status = targetStatus;

        setDragTask(targetTask)

        containers.forEach(container => container.classList.remove("border-cyan-500"))
    }

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <h1 className="flex m-9 font-mono font-semibold text-4xl">{project?.name ?? 'Unknown'}</h1>
                <ProjectDashboardDescription
                    startedAt={project?.startedAt}
                    plannedEnd={project?.plannedEnd}
                    startedBy={project?.startedBy}
                    description={project?.description} />
                <div id="taskContainers" className="flex justify-between m-9">
                    {
                        Array.from(displayStatuses).map(([status, title]) => {
                            return <ProjectDashboardTaskContainer
                                key={status}
                                title={title}
                                status={status}
                                tasks={project?.tasks?.filter(c => c.status === status)}
                                onDraggingTask={onDraggingTask}
                                onStopDragTask={onStopDragTask} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ProjectDashboard;