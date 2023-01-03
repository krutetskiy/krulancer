interface IProps {
  startedAt: Date | undefined,
  plannedEnd: Date | undefined,
  startedBy: string | null | undefined,
  description: string | null | undefined
}

const ProjectDashboardDescription = ({ startedAt, plannedEnd, startedBy, description }: IProps) => {
  return (
    <>
      <div className="flex justify-between mx-9">
        <div className="flex flex-col bg-bg-gray-regular px-5 py-3 font-medium min-h-[100px] w-1/6 rounded-2xl">
          <div className="flex justify-between">
            <div className="flex font-mono">Started at:</div>
            <div className="flex font-mono">{startedAt?.toLocaleDateString()}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex font-mono">Planned end:</div>
            <div className="flex font-mono">{plannedEnd?.toLocaleDateString()}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex font-mono">Started by {startedBy}</div>
          </div>
        </div>
        <div className="flex bg-bg-gray-regular px-5 py-3 min-h-[100px] w-3/5 rounded-2xl">
          {description}
        </div>
        <div className="flex flex-col bg-bg-gray-regular px-5 py-3 min-h-[100px] w-1/6 rounded-2xl">
          <div className="flex justify-between">
            <div className="flex font-mono">All tasks:</div>
            <div className="flex font-mono">12</div>
          </div>
          <div className="flex justify-between">
            <div className="flex font-mono">In progress:</div>
            <div className="flex font-mono">2</div>
          </div>
          <div className="flex justify-between">
            <div className="flex font-mono">Frozen:</div>
            <div className="flex font-mono">5</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectDashboardDescription;