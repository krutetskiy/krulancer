import { GetServerSidePropsContext } from "next";
import { prisma } from "../../server/db/client"
import { Task } from "@prisma/client";
import AuthGuard from "../../components/AuthGuard";
import Header from "../../components/UI/Header";
import HighlightProperty from "../../components/UI/HighlightProperty";
import PriorityLabel from "../../components/UI/PriorityLabel";

export async function getServerSideProps({ req, params }: GetServerSidePropsContext) {
  const taskId = +(params!.id ?? -1)
  const task = await prisma.task.findUnique({ where: { id: taskId } })

  return {
    props: {
      task: task
    }
  }
}

const TaskPage = ({ task }: { task: Task }) => {

  return (
    <>
      <AuthGuard />
      <main className="flex min-h-screen flex-col justify-start bg-white">
        <Header />
        <h1 className="mx-9 my-4 font-mono font-semibold text-4xl">{task.title}</h1>
        <div className="flex">
          <div className="ml-9 mr-5 w-3/4">
            <div className="flex p-5 rounded-2xl bg-gray-regular-1">
              <textarea defaultValue={task.title} className="p-5 min-h-[150px] w-full rounded-2xl bg-gray-regular-2" />
            </div>
            <div className="flex flex-col justify-between mt-5 p-5 min-h-[200px] rounded-2xl bg-gray-regular-1">
              <textarea defaultValue="" className="p-5 w-full min-h-[100px] rounded-2xl bg-gray-regular-2 resize-none" placeholder="Comment..." required />
              <div className="flex justify-end">
                <button className="rounded-2xl border-2 hover:border-orange-regular-1 hover:bg-white hover:text-orange-regular-1 justify-self-end min-w-[200px] px-5 py-2 bg-orange-regular-1 text-white  text-center font-mono font-medium tracking-wider ">Publish</button>
              </div>
            </div>
          </div>
          <div className="mr-9 w-1/4">
            <div className="p-5 flex flex-col rounded-2xl bg-gray-regular-1">
              <HighlightProperty label="Priority" value={<PriorityLabel priority={task.priority} />} />
              <HighlightProperty label="Assigned" value={task.assigned} />
              <HighlightProperty label="Status" value={task.status} />
              <HighlightProperty label="Estimated" value={task.estimated} />
            </div>
            <select className="mt-4 py-5 w-full border-2 border-gray-regular-1 hover:border-blue-500 text-center bg-gray-regular-1 font-mono font-medium tracking-wider rounded-2xl">
              <option defaultValue="">Change priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button className="flex justify-center mt-4 py-5 w-full border-2 border-green-regular-1 bg-green-regular-1 hover:bg-white text-white hover:text-green-regular-1 text-center font-mono font-medium tracking-wider rounded-2xl">
              <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="9" cy="7" r="4" />  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />  <path d="M16 11l2 2l4 -4" /></svg>
              <span className="ml-2">Assign to me</span>
            </button>
            <button className="flex justify-center mt-4 py-5 w-full border-2 border-gray-regular-3 bg-gray-regular-3 hover:bg-white text-black text-center font-mono font-medium tracking-wider rounded-2xl">
              <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />    <path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" />    <path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(60 12 12)" />    <path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(120 12 12)" />    <path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(180 12 12)" />    <path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(240 12 12)" />    <path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(300 12 12)" />  </svg>
              <span className="ml-2">Freeze</span>
            </button>
            <button className="flex justify-center mt-4 py-5 w-full border-2 border-red-500 bg-red-500 hover:bg-white text-white hover:text-red-500 text-center font-mono font-medium tracking-wider rounded-2xl">
              <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
              <span className="ml-2">Close</span>
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default TaskPage;