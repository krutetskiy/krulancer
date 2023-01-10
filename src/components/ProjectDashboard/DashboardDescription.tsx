import { Task, TaskStatusType } from "@prisma/client"
import HighlightProperty from "../UI/HighlightProperty"

interface IProps {
  startedAt: Date | undefined,
  plannedEnd: Date | undefined,
  startedBy: string | null | undefined,
  description: string | null | undefined,
  tasks: Task[] | undefined
}

const ProjectDashboardDescription = ({ startedAt, plannedEnd, startedBy, description, tasks }: IProps) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col bg-gray-regular-1 px-5 py-3 font-medium min-h-[100px] w-1/6 rounded-2xl">
          <HighlightProperty label="Started at" value={startedAt?.toString().slice(0, 10)} />
          <HighlightProperty label="Planned end" value={plannedEnd?.toString().slice(0, 10)} />
          <div className="flex justify-between">
            <div className="flex font-mono">Started by {startedBy}</div>
          </div>
        </div>
        <div className="flex bg-gray-regular-1 px-5 py-3 min-h-[100px] w-3/5 rounded-2xl">
          {description}
        </div>
        <div className="flex flex-col bg-gray-regular-1 px-5 py-3 min-h-[100px] w-1/6 rounded-2xl">
          <div className="flex justify-between">
            <div className="flex font-mono">All tasks:</div>
            <div className="flex font-mono">{tasks?.length}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex font-mono">In progress:</div>
            <div className="flex font-mono">{tasks?.filter(c => c.status === TaskStatusType.InProgress).length}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex font-mono">Closed:</div>
            <div className="flex font-mono">{tasks?.filter(c => c.status === TaskStatusType.Closed).length}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectDashboardDescription;