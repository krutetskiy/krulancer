import { Project, User } from "@prisma/client";
import Link from "next/link";

interface IProps {
  projects: (Project & { startedBy: User })[]
}

const ProjectsWidget = ({ projects }: IProps) => {
  return (
    <>
      <div className="flex flex-col rounded-2xl bg-gray-regular-1 p-6">
        <h2 className="font-mono font-semibold text-xl mb-3">Projects</h2>
        <div className="flex flex-col justify-between">
          {
            Array.from(projects).map((project, index) => {
              return <ProjectItem key={index} {...project} />
            })
          }
        </div>
      </div>
    </>
  )
}

const ProjectItem = (project: (Project & { startedBy: User })) => {
  return (
    <>
      <Link href={`/project/${project.id}`} className="flex my-1 rounded-2xl bg-gray-regular-2 transform transition duration-300 hover:scale-[1.03] p-3 w-full">
        <div className="w-1/4 font-mono font-semibold">{project.name}</div>
        <div className="flex w-1/4 font-mono">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
          </svg>
          <span className="ml-1">{project.startedAt.toString().slice(0, 10)}</span>
        </div>
        <div className="flex w-1/4 font-mono">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
          </svg>
          <span className="ml-1">{project.plannedEnd.toString().slice(0, 10)}</span>
        </div>
        <div className="flex w-1/4 font-mono">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
          <span className="ml-1">{project.startedBy.name}</span>
        </div>
      </Link>
    </>
  )
}

export default ProjectsWidget;