import ProjectDashboardDescription from "./ProjectDashboardDescription";
import ProjectDashboardTaskContainer from "./ProjectDashboardTaskContainer";
import { PriorityType, ProjectTaskModel, StatusType } from "./ProjectTask";
import { DraggableData, DraggableEvent } from "react-draggable";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const MouseOverlap = (mouseEvent: MouseEvent, bounds: DOMRect) => {
    return (
        mouseEvent.pageY > bounds.top &&
        mouseEvent.pageY < bounds.top + bounds.height &&
        mouseEvent.pageX > bounds.left &&
        mouseEvent.pageX < bounds.left + bounds.width
    )
}

const ContainerIdToStatus = (id: string): StatusType | undefined => {
    switch (id) {
        case "To Do":
            return StatusType.ToDo;
        case "In Progress":
            return StatusType.InProgress;
        case "Closed":
            return StatusType.Closed;
        case "Frozen":
            return StatusType.Frozen;
    }
}

const displayStatuses = [
    StatusType.ToDo,
    StatusType.InProgress,
    StatusType.Closed,
    StatusType.Frozen
]

const ProjectDashboard = () => {
    const data: ProjectTaskModel[] = [
        {
            id: 1,
            title: "FMS",
            priority: PriorityType.High,
            estimated: 40,
            assigned: "Krutetskiy",
            status: StatusType.ToDo
        },
        {
            id: 2,
            title: "FMS",
            priority: PriorityType.High,
            estimated: 40,
            assigned: "Krutetskiy",
            status: StatusType.Closed
        },
        {
            id: 3,
            title: "WMS",
            priority: PriorityType.Medium,
            estimated: 13,
            assigned: "Krutetskiy",
            status: StatusType.InProgress
        },
        {
            id: 4,
            title: "OMS",
            priority: PriorityType.Low,
            estimated: 7,
            assigned: "Krutetskiy",
            status: StatusType.Frozen
        },
        {
            id: 5,
            title: "WHC",
            priority: PriorityType.Low,
            estimated: 8,
            assigned: "Krutetskiy",
            status: StatusType.InProgress
        },
    ]

    const [tasks, setTasks] = useState(data)

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
        const status = ContainerIdToStatus(target?.id!);

        if (!status) return

        const updatedTasks = tasks.map(task => {
            if (task.id?.toString() === data.node.id)
                task.status = status

            return task;
        })

        setTasks(updatedTasks)

        containers.forEach(container => container.classList.remove("border-cyan-500"))
    }

    const project = trpc.projects.getById.useQuery({
        id: 1
    }).data;

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <h1 className="flex m-9 font-mono font-semibold text-4xl">{project?.name ?? 'Unknown'}</h1>
                <ProjectDashboardDescription
                    startedAt={project?.started_at}
                    plannedEnd={project?.planned_end}
                    starteBy={'Semyn'} />
                <div id="taskContainers" className="flex justify-between m-9">
                    {
                        displayStatuses.map(status =>
                            <ProjectDashboardTaskContainer
                                key={status}
                                status={status}
                                tasks={tasks.filter(c => c.status === status)}
                                onDraggingTask={onDraggingTask}
                                onStopDragTask={onStopDragTask} />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ProjectDashboard;