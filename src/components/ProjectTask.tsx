import { Component, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

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

export interface IProjectTask extends IProps {
    onDragTask: (e: DraggableEvent, data: DraggableData) => void
}

class ProjectTask extends Component<IProjectTask, any>  {
    constructor(props: IProjectTask) {
        super(props);

        this.state = {
            task: {
                title: props.title,
                assigned: props.assigned,
                estimated: props.estimated,
                priority: props.priority,
                status: props.status
            }
        }

        this.onDragTask = this.onDragTask.bind(this)
    }

    onDragTask(e: DraggableEvent, data: DraggableData): void {
        const task = this.state.task;
        if (task) {
            this.props.onDragTask(e, data);
        }
    }

    onDragStart(e: DraggableEvent, data: DraggableData): void {
        data.node.style.zIndex = '50';
    }

    onDragStop(e: DraggableEvent, data: DraggableData): void {
        data.node.style.zIndex = '0';
    }

    getPriorityColor(priority: PriorityType) {
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

    render() {
        const { task, nodeRef } = this.state;

        return (
            <>
            <Draggable
            nodeRef={nodeRef}
            onStart={this.onDragStart}
            onDrag={this.onDragTask}
            onStop={this.onDragStop}
            position={{x: 0, y: 0}}
            >
            <div ref={nodeRef} className="flex flex-col my-1 px-4 py-2 bg-gray-task rounded-2xl cursor-grab">
              <div className="flex items-baseline mb-3">
                    <h3 className="mr-2 font-mono font-medium">{task.title}</h3>
                    <div className={`px-2 bg-[${this.getPriorityColor(task.priority)}] text-white rounded-2xl`}>{task.priority}</div>
                </div>
                    <div className="flex justify-between">
                        <div className="flex font-mono font-mono font-medium text-gray-light">Assigned:</div>
                        <div className="flex font-mono">{task.assigned}</div>
                    </div>
                <div className="flex justify-between">
                    <div className="flex font-mono font-mono font-medium text-gray-light">Estimated SP:</div>
                    <div className="flex font-mono">{task.estimated}</div>
                </div>
            </div>
        </Draggable>
            </>
        )
    }
}

export default ProjectTask;