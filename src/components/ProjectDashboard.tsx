import ProjectDashboardDescription from "./ProjectDashboardDescription";
import { Component, ReactNode, useState, useRef, useEffect } from "react";
import ProjectDashboardTaskContainer from "./ProjectDashboardTaskContainer";
import { PriorityType, ProjectTaskModel, StatusType } from "./ProjectTask";
import { DraggableData, DraggableEvent } from "react-draggable";

const ProjectDashboard = () => {
    const nodeRef = useRef(null)

    const onDraggingTask = (e: DraggableEvent, data: DraggableData) : void => {
        const taskContainers = document.querySelector("#taskContainers")?.children;
        const mouseEvent = window.event as MouseEvent;

        for (let i = 0; i < taskContainers!.length; i++) {
            const containerElement = taskContainers![i]
            const container = containerElement?.getBoundingClientRect()!

            if (mouseEvent.pageY > container.top && 
                mouseEvent.pageY < container.top + container.height && 
                mouseEvent.pageX > container.left && 
                mouseEvent.pageX < container.left + container.width)
            {
                containerElement?.classList.add("border-cyan-500")
            }
            else {
                containerElement?.classList.remove("border-cyan-500")
            }
        }
    }

    function onStopDragTask(e: DraggableEvent, data: DraggableData) : void {
        const taskContainers = document.querySelector("#taskContainers")?.children;
    
    }

    const tasks: ProjectTaskModel[] = [
            {
                title: "FMS",
                priority: PriorityType.High,
                estimated: 40,
                assigned: "Krutetskiy",
                status: StatusType.ToDo
            },
            {
                title: "FMS",
                priority: PriorityType.High,
                estimated: 40,
                assigned: "Krutetskiy",
                status: StatusType.Closed
            },
            {
                title: "WMS",
                priority: PriorityType.Medium,
                estimated: 13,
                assigned: "Krutetskiy",
                status: StatusType.InProgress
            },
            {
                title: "OMS",
                priority: PriorityType.Low,
                estimated: 7,
                assigned: "Krutetskiy",
                status: StatusType.Frozen
            },
            {
                title: "WHC",
                priority: PriorityType.Low,
                estimated: 8,
                assigned: "Krutetskiy",
                status: StatusType.Frozen
            },
    ]

    return (
    <>
        <div className="flex flex-col min-h-screen">
          <h1 className="flex m-9 font-mono font-semibold text-4xl">Last mile dev</h1>
          <ProjectDashboardDescription />
          <div id="taskContainers" ref={nodeRef} className="flex justify-between m-9">
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