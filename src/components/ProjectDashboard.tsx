import ProjectDashboardDescription from "./ProjectDashboardDescription";
import ProjectDashboardTaskContainer from "./ProjectDashboardTaskContainer";
import { DraggableData, DraggableEvent } from "react-draggable";
import { trpc } from "../utils/trpc";
import { TaskStatusType } from "@prisma/client";

const MouseOverlap = (mouseEvent: MouseEvent, bounds: DOMRect) => {
    return (
        mouseEvent.pageY > bounds.top &&
        mouseEvent.pageY < bounds.top + bounds.height &&
        mouseEvent.pageX > bounds.left &&
        mouseEvent.pageX < bounds.left + bounds.width
    )
}

const сontainerIdToStatus = (id: string): TaskStatusType | undefined => {
    switch (id) {
        case "To Do":
            return TaskStatusType.ToDo;
        case "In Progress":
            return TaskStatusType.InProgress;
        case "Closed":
            return TaskStatusType.Closed;
        case "Frozen":
            return TaskStatusType.Frozen;
    }
}

const displayStatuses = new Map<TaskStatusType, string>([
    [TaskStatusType.ToDo, "To Do"],
    [TaskStatusType.InProgress, "In Progress"],
    [TaskStatusType.Closed, "Closed"],
    [TaskStatusType.Frozen, "Frozen"]
]);

const ProjectDashboard = () => {
    const project = trpc.projects.getById.useQuery({
        id: 1
    }).data;

    const tasks = trpc.projects.getTasks.useQuery({
        project_id: 1
    }).data;

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

        const target = containers.find(container => MouseOverlap(mouseEvent, container.getBoundingClientRect()))
        const status = сontainerIdToStatus(target?.id!);

        if (!status) return

        const updatedTasks = tasks!.map(task => {
            // if (task.id?.toString() === data.node.id)
            //     task.status = status

            return task;
        })

        // setTasks(updatedTasks)

        containers.forEach(container => container.classList.remove("border-cyan-500"))
    }

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <h1 className="flex m-9 font-mono font-semibold text-4xl">{project?.name ?? 'Unknown'}</h1>
                <ProjectDashboardDescription
                    startedAt={project?.started_at}
                    plannedEnd={project?.planned_end}
                    startedBy={project?.started_by}
                    description={project?.description} />
                <div id="taskContainers" className="flex justify-between m-9">
                    {
                        Array.from(displayStatuses).map(([status, title]) => {
                            return <ProjectDashboardTaskContainer
                                key={status}
                                title={title}
                                status={status}
                                tasks={tasks?.filter(c => c.status === status)}
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