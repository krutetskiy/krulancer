import { Task } from "@prisma/client";
import PriorityLabel from "../UI/PriorityLabel";
import Link from "next/link";

const ProjectTask = ({ id, title, assigned, estimated, priority }: Task) => {
    return (
        <>
            <div className="flex flex-col my-1 px-4 py-2 bg-gray-regular-2 rounded-2xl cursor-grab">
                <div className="flex justify-between items-baseline mb-3">
                    <PriorityLabel priority={priority} />
                    <Link href={`/task/${id}`} >
                        <svg className="h-6 w-6 text-blue-500 justify-self-center" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />  <line x1="10" y1="14" x2="20" y2="4" />  <polyline points="15 4 20 4 20 9" /></svg>
                    </Link>
                </div>
                <div className="flex justify-between items-baseline mb-3">
                    <h3 className="mr-2 font-mono font-medium">{title}</h3>
                </div>
                <div className="flex justify-between">
                    <div className="flex font-mono font-medium text-gray-light-1">Assigned:</div>
                    <div className="flex font-mono">{assigned}</div>
                </div>
                <div className="flex justify-between">
                    <div className="flex font-mono font-medium text-gray-light-1">Estimated SP:</div>
                    <div className="flex font-mono">{estimated}</div>
                </div>
            </div>
        </>
    )
}

export default ProjectTask;