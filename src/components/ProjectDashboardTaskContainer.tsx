import { Component, createRef, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import ProjectTask, { ProjectTaskModel, StatusType } from "./ProjectTask";

export interface IProps {
    status: StatusType,
    tasks: ProjectTaskModel[] | undefined,
    onDraggingTask: (e: DraggableEvent, data: DraggableData) => void,
    onStopDragTask: (e: DraggableEvent, data: DraggableData) => void
}

class ProjectDashboardTaskContainer extends Component<IProps, any> {
    private nodeRef: React.RefObject<HTMLInputElement>;
    
    constructor(props: IProps) {
        super(props);

        this.nodeRef = createRef();

        this.state = {
            status: props.status,
            tasks: props.tasks,
        };

        this.onDraggingTask = this.props.onDraggingTask.bind(this);
        this.onStopDragTask = this.props.onStopDragTask.bind(this);
    }

    onStartDragTask(e: DraggableEvent, data: DraggableData): void {
        const parent = data.node.parentElement;
        const node = data.node;
        
        if (!parent)
            return;

        node.style.zIndex = '50';
    }

    onDraggingTask(e: DraggableEvent, data: DraggableData): void {
        this.onDraggingTask(e, data);
    }

    onStopDragTask(e: DraggableEvent, data: DraggableData): void {
        const parent = data.node.parentElement;
        const node = data.node;

        if (!parent)
            return;

        node.style.zIndex = '0';

        this.onStopDragTask(e, data);
    }

    render() {
        const { status, tasks } = this.props;

        return (
        <>
        <div id={`${status}`} className="flex flex-col px-5 py-3 border border-white bg-bg-gray-regular rounded-2xl min-h-[650px] w-[24%]">
            <h2 className="font-mono pb-4 font-medium">{status}</h2>
            {
                tasks?.map((task, i) => {
                    return (
                        <Draggable
                            key={i}
                            nodeRef={this.nodeRef}
                            onStart={this.onStartDragTask}
                            onDrag={this.onDraggingTask}
                            onStop={this.onStopDragTask}
                            position={{x: 0, y: 0}}
                        >
                            <div ref={this.nodeRef}>
                                <ProjectTask 
                                    title={task.title} 
                                    assigned={task.assigned} 
                                    estimated={task.estimated} 
                                    priority={task.priority} 
                                    status={task.status}/>
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
}

export default ProjectDashboardTaskContainer;