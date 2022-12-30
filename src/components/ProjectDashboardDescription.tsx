const ProjectDashboardDescription = () => {
    return (
        <>
        <div className="flex justify-between mx-9">
            <div className="flex flex-col bg-bg-gray-regular px-5 py-3 font-medium min-h-[100px] w-1/6 rounded-2xl">
              <div className="flex justify-between">
                <div className="flex font-mono">Date start:</div>
                <div className="flex font-mono">30/12/2022</div>
              </div>
              <div className="flex justify-between">
                <div className="flex font-mono">Date end:</div>
                <div className="flex font-mono">30/12/2022</div>
              </div>
              <div className="flex justify-between">
                <div className="flex font-mono">Started by Semyn</div>
              </div>
            </div>
            <div className="flex bg-bg-gray-regular px-5 py-3 min-h-[100px] w-3/5 rounded-2xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum perferendis eum reprehenderit natus dolores molestiae consequuntur hic consectetur culpa, debitis quas ducimus placeat incidunt aliquid sunt dolore magnam, a provident.
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