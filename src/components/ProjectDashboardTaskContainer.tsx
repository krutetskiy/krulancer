import ProjectTask, { ProjectTaskModel, StatusType } from "./ProjectTask";

export interface IProps {
    status: StatusType,
    tasks: ProjectTaskModel[] | undefined
} 

const ProjectDashboardTaskContainer = ({ status, tasks } : IProps) => {
    return (
        <>
        <div id={`${status}`} className="flex flex-col px-5 py-3 bg-bg-gray-regular rounded-2xl min-h-[650px] w-[24%]">
            <h2 className="font-mono pb-4 font-medium">{status}</h2>
            {
                tasks?.map((task, i) => 
                    <ProjectTask 
                        key={i}
                        title={task.title} 
                        assigned={task.assigned} 
                        estimated={task.estimated} 
                        priority={task.priority} 
                        status={task.status} />
                )
            }
        </div> 
        </>
    )
}

export default ProjectDashboardTaskContainer;