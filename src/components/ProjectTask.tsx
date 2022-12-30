import { Component, useRef, useState } from "react";
import Draggable, { DraggableData } from "react-draggable";

export enum PriorityType {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}

export enum StatusType {
    ToDo = "To Do",
    InProgress = "In Progress",
    Closed = "Closed",
    Frozen = "Frozen"
}

export interface ProjectTaskModel {
    title: string,
    assigned: string,
    estimated: number,
    priority: PriorityType,
    status: StatusType
}

export interface IProps extends ProjectTaskModel { }

function getPriorityColor(priority: PriorityType) {
    switch (priority) {
        case PriorityType.Low: {
            return '#67CB65'
        }
        case PriorityType.Medium: {
            return '#FF9533'
        }
        case PriorityType.High: {
            return '#E74444'
        }
    }
}

export interface IProjectTask {
    onDragTask: () => void
}

const ProjectTask = ({ title, assigned, estimated, priority } : IProps) => {
    const nodeRef = useRef(null)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const handleStop = (event: any, info: DraggableData) => {
        setX(info.deltaX)
        setY(info.deltaY)
    }

    const handleStart = (event: any, info: DraggableData) => {
        const parentNode = info.node.parentNode;
        console.log(parentNode)
    }

    return (
        <>
        <Draggable
            nodeRef={nodeRef}
            onStart={handleStart}
            onStop={handleStop}
            position={{x: x, y: y}}
            >
            <div ref={nodeRef} className="flex flex-col my-1 px-4 py-2 bg-gray-task rounded-2xl cursor-grab">
              <div className="flex items-baseline mb-3">
                    <h3 className="mr-2 font-mono font-medium">{title}</h3>
                    <div className={`px-2 bg-[${getPriorityColor(priority)}] text-white rounded-2xl`}>{priority}</div>
                </div>
                    <div className="flex justify-between">
                        <div className="flex font-mono font-mono font-medium text-gray-light">Assigned:</div>
                        <div className="flex font-mono">{assigned}</div>
                    </div>
                <div className="flex justify-between">
                    <div className="flex font-mono font-mono font-medium text-gray-light">Estimated SP:</div>
                    <div className="flex font-mono">{estimated}</div>
                </div>
            </div>
        </Draggable>
        </>
    )
}

export default ProjectTask;