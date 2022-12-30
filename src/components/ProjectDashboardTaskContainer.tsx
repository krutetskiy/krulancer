import { Component } from "react";
import { DraggableData, DraggableEvent } from "react-draggable";
import ProjectTask, { ProjectTaskModel, StatusType } from "./ProjectTask";

export interface IProps {
    status: StatusType,
    tasks: ProjectTaskModel[] | undefined
}

class ProjectDashboardTaskContainer extends Component<IProps, any> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            status: props.status,
            tasks: props.tasks
        };
    }

    onStartDragTask(e: DraggableEvent, data: DraggableData): void {
        const parent = data.node.parentElement;

        if (!parent)
            return;

        parent.style.borderColor = '#3B83F6';
    }

    onStopDragTask(e: DraggableEvent, data: DraggableData): void {
        const parent = data.node.parentElement;

        if (!parent)
            return;

        parent.style.borderColor = 'white';
    }

    render() {
        const { status, tasks } = this.props;

        return (
        <>
        <div id={`${status}`} className="flex flex-col px-5 py-3 border border-white bg-bg-gray-regular rounded-2xl min-h-[650px] w-[24%]">
            <h2 className="font-mono pb-4 font-medium">{status}</h2>
            {
                tasks?.map((task, i) => 
                    <ProjectTask 
                        key={i}
                        title={task.title} 
                        assigned={task.assigned} 
                        estimated={task.estimated} 
                        priority={task.priority} 
                        status={task.status} 
                        onStartDragTask={this.onStartDragTask}
                        onStopDragTask={this.onStopDragTask}/>
                )
            }
        </div> 
        </>
    )
    }
}

export default ProjectDashboardTaskContainer;