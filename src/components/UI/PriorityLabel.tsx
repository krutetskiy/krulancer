import { TaskPriorityType } from "@prisma/client";

const priorityColorMap = new Map<string, string>([
  [TaskPriorityType.Low, "bg-[#67CB65]"],
  [TaskPriorityType.Medium, "bg-[#FF9533]"],
  [TaskPriorityType.High, "bg-[#E74444]"],
])

const PriorityLabel = ({ priority }: { priority: TaskPriorityType }) => {
  return (
    <>
      <div className={`px-2 ${priorityColorMap.get(priority)} text-white rounded-2xl`}>{priority}</div>
    </>
  )
}

export default PriorityLabel;