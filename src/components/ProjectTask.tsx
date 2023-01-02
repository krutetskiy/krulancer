import { Component } from "react";

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
    id?: number,
    title: string,
    assigned: string,
    estimated: number,
    priority: PriorityType,
    status: StatusType
}

export interface IProps {
    title: string,
    assigned: string,
    estimated: number,
    priority: PriorityType
}

const ProjectTask = (props: IProps) => {
    const { title, assigned, estimated, priority } = props

    const getPriorityColor = (priority: PriorityType) => {
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

    return (
        <>
            <div className="flex flex-col my-1 px-4 py-2 bg-gray-task rounded-2xl cursor-grab">
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
        </>
    )
}

export default ProjectTask;