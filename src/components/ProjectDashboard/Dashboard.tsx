import ProjectDashboardDescription from "./DashboardDescription";
import ProjectDashboardTaskContainer from "./DashboardStatusbar";
import { DraggableData, DraggableEvent } from "react-draggable";
import { trpc } from "../../utils/trpc";
import { Task, TaskStatusType } from "@prisma/client";
import { useState } from "react";
import CreateTaskForm from "../Task/CreateTaskForm";

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

const statusTypeNames = new Map<string, TaskStatusType>([
    [TaskStatusType.ToDo, TaskStatusType.ToDo],
    [TaskStatusType.InProgress, TaskStatusType.InProgress],
    [TaskStatusType.Closed, TaskStatusType.Closed],
    [TaskStatusType.Frozen, TaskStatusType.Frozen]
]);

const ProjectDashboard = () => {
    const project = trpc.projects.getById.useQuery({
        id: 1
    })

    const [activeStatusbar, setActiveStatusbar] = useState<string>()
    const [showForm, setShowCreateTaskForm] = useState<boolean>(false)

    const mutateChangeTaskStatus = trpc.tasks.updateTaskStatus.useMutation()

    const onDraggingTask = (e: DraggableEvent, data: DraggableData): void => {
        const containers = [...document.querySelector("#taskContainers")?.children!] as HTMLElement[];
        const mouseEvent = window.event as MouseEvent;

        containers.forEach(container => {
            var bounds = container.getBoundingClientRect()
            if (MouseOverlap(mouseEvent, bounds))
                setActiveStatusbar(() => container.id)
        })
    }

    const onStopDragTask = (e: DraggableEvent, data: DraggableData): void => {
        const containers = [...document.querySelector("#taskContainers")?.children!] as HTMLElement[];
        const mouseEvent = window.event as MouseEvent;

        const targetElement = containers.find(container => MouseOverlap(mouseEvent, container.getBoundingClientRect()))

        if (!targetElement) {
            setActiveStatusbar(undefined)
            return
        }

        const targetStatus: TaskStatusType | undefined = statusTypeNames.get(targetElement!.id);

        if (!targetStatus) return

        const targetTask = project.data?.tasks?.find(task => task.id?.toString() === data.node.id)

        if (targetTask!.status !== targetStatus) {
            mutateChangeTaskStatus.mutate(
                {
                    taskId: targetTask?.id,
                    status: targetStatus
                },
                {
                    onSuccess: (data: Task | null) => project.refetch()
                })
        }

        setActiveStatusbar(() => undefined)
    }

    const handleOpenCreateForm = (): void => setShowCreateTaskForm(true)

    const handleCloseCreateForm = (): void => setShowCreateTaskForm(false)

    return (
        <>
            {
                showForm ? <CreateTaskForm onCloseForm={handleCloseCreateForm} /> : <></>
            }
            <div className="flex flex-col min-h-screen">
                <h1 className="flex m-9 font-mono font-semibold text-4xl">{project.data?.name}</h1>
                <ProjectDashboardDescription
                    startedAt={project.data?.startedAt}
                    plannedEnd={project.data?.plannedEnd}
                    startedBy={project.data?.startedBy}
                    description={project.data?.description} />
                <div id="taskContainers" className="flex justify-between m-9">
                    {
                        Array.from(displayStatuses).map(([status, title]) => {
                            return <ProjectDashboardTaskContainer
                                key={status}
                                title={title}
                                status={status}
                                isActive={status.toString() === activeStatusbar}
                                tasks={project.data?.tasks?.filter(c => c.status === status)}
                                onDraggingTask={onDraggingTask}
                                onStopDragTask={onStopDragTask}
                                onCreateTask={handleOpenCreateForm} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ProjectDashboard;