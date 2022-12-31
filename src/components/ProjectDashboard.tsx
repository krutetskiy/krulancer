import ProjectDashboardDescription from "./ProjectDashboardDescription";
import ProjectDashboardTaskContainer from "./ProjectDashboardTaskContainer";
import { PriorityType, ProjectTaskModel, StatusType } from "./ProjectTask";
import { DraggableData, DraggableEvent } from "react-draggable";
import { useState } from "react";

const MouseOverlap = (mouseEvent: MouseEvent, bounds: DOMRect) => {
    return (
        mouseEvent.pageY > bounds.top && 
        mouseEvent.pageY < bounds.top + bounds.height && 
        mouseEvent.pageX > bounds.left && 
        mouseEvent.pageX < bounds.left + bounds.width
    )
}

const ContainerIdToStatus = (id: string) : StatusType | undefined => {
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

const ProjectDashboard = () => {
    const onDraggingTask = (e: DraggableEvent, data: DraggableData) : void => {
        const containers =  [...document.querySelector("#taskContainers")?.children!];
        const mouseEvent = window.event as MouseEvent;

        containers.forEach(container => {
            var bounds = container.getBoundingClientRect()
            if (MouseOverlap(mouseEvent, bounds))
                container?.classList.add("border-cyan-500")
            else 
                container?.classList.remove("border-cyan-500")
        })        
    }

    const onStopDragTask = (e: DraggableEvent, data: DraggableData) : void => {
        const containers = [...document.querySelector("#taskContainers")?.children!];
        const mouseEvent = window.event as MouseEvent;
        console.log(data.node)

        const target = containers.find(container => MouseOverlap(mouseEvent, container.getBoundingClientRect()))
        const status = ContainerIdToStatus(target?.id!);
        console.log(status)
        containers.forEach(container => container.classList.remove("border-cyan-500"))
    }

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

    return (
    <>
        <div className="flex flex-col min-h-screen">
          <h1 className="flex m-9 font-mono font-semibold text-4xl">Last mile dev</h1>
          <ProjectDashboardDescription />
          <div id="taskContainers" className="flex justify-between m-9">
            <ProjectDashboardTaskContainer
                status={StatusType.ToDo} 
                tasks={tasks.filter(c => c.status === StatusType.ToDo)} 
                onDraggingTask={onDraggingTask}
                onStopDragTask={onStopDragTask}/>
            <ProjectDashboardTaskContainer 
                status={StatusType.InProgress} 
                tasks={tasks.filter(c => c.status === StatusType.InProgress)}
                onDraggingTask={onDraggingTask}
                onStopDragTask={onStopDragTask}/>
            <ProjectDashboardTaskContainer 
                status={StatusType.Closed} 
                tasks={tasks.filter(c => c.status === StatusType.Closed)} 
                onDraggingTask={onDraggingTask}
                onStopDragTask={onStopDragTask}/>
            <ProjectDashboardTaskContainer 
                status={StatusType.Frozen} 
                tasks={tasks.filter(c => c.status === StatusType.Frozen)} 
                onDraggingTask={onDraggingTask}
                onStopDragTask={onStopDragTask}/>
          </div>
        </div>
    </>
    )
}

export default ProjectDashboard;