import ProjectDashboardDescription from "./ProjectDashboardDescription";
import ProjectDashboardTaskContainer from "./ProjectDashboardTaskContainer";
import { PriorityType, ProjectTaskModel, StatusType } from "./ProjectTask";

const ProjectDashboard = () => {
    const tasks: ProjectTaskModel[] = [
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
    ]

    return (
        <>
        <div className="flex flex-col min-h-screen">
          <h1 className="flex m-9 font-mono font-semibold text-4xl">Last mile dev</h1>
          <ProjectDashboardDescription />
          <div className="flex justify-between m-9">
            <ProjectDashboardTaskContainer status={StatusType.ToDo} tasks={tasks.filter(c => c.status === StatusType.ToDo)}/>
            <ProjectDashboardTaskContainer status={StatusType.InProgress} tasks={tasks.filter(c => c.status === StatusType.InProgress)}/>
            <ProjectDashboardTaskContainer status={StatusType.Closed} tasks={tasks.filter(c => c.status === StatusType.Closed)}/>
            <ProjectDashboardTaskContainer status={StatusType.Frozen} tasks={tasks.filter(c => c.status === StatusType.Frozen)}/>
          </div>
        </div>
        </>
    )
}

export default ProjectDashboard;