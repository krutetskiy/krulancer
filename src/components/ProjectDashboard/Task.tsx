import { TaskPriorityType } from "@prisma/client";

export interface IProps {
    title: string,
    assigned: string,
    estimated: number,
    priority: TaskPriorityType
}

const priorityColorMap = new Map<string, string>([
    [TaskPriorityType.Low, "bg-[#67CB65]"],
    [TaskPriorityType.Medium, "bg-[#FF9533]"],
    [TaskPriorityType.High, "bg-[#E74444]"],
])

const ProjectTask = ({ title, assigned, estimated, priority }: IProps) => {
    return (
        <>
            <div className="flex flex-col my-1 px-4 py-2 bg-gray-task rounded-2xl cursor-grab">
                <div className="flex items-baseline mb-3">
                    <h3 className="mr-2 font-mono font-medium">{title}</h3>
                    <div className={`px-2 ${priorityColorMap.get(priority)} text-white rounded-2xl`}>{priority}</div>
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