import { TaskPriorityType, TaskStatusType } from "@prisma/client";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const taskRouter = router({
  updateTaskStatus: publicProcedure
    .input(z.object(
      {
        taskId: z.number().nullish(),
        status: z.enum([TaskStatusType.ToDo, TaskStatusType.InProgress, TaskStatusType.Closed, TaskStatusType.Frozen]).nullish()
      }))
    .mutation(({ ctx, input }) => {
      if (!input.taskId || !input.status)
        return null

      return ctx.prisma.task.update({
        where: {
          id: input.taskId
        },
        data: {
          status: input.status
        }
      })
    }),
  createTask: publicProcedure
    .input(z.object(
      {
        title: z.string().min(1).max(100),
        describtion: z.string().min(1).max(500),
        assigned: z.string().min(1).max(20),
        estimated: z.number().min(0).max(100),
        priority: z.enum([TaskPriorityType.Low, TaskPriorityType.Medium, TaskPriorityType.High]),
        projectId: z.number().min(0)
      }
    ))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          title: input.title,
          assigned: input.assigned,
          estimated: input.estimated,
          priority: input.priority,
          status: TaskStatusType.ToDo,
          projectId: input.projectId,
          description: input.describtion
        }
      })
    })
})