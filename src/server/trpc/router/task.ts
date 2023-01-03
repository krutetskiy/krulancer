import { TaskStatusType } from "@prisma/client";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const taskRouter = router({
    updateTaskStatus: publicProcedure
        .input(z.object(
            {
                taskId: z.number().nullish(),
                status: z.enum([TaskStatusType.ToDo, TaskStatusType.InProgress, TaskStatusType.Closed, TaskStatusType.Frozen]).nullish()
            }))
        .query(({ ctx, input }) => {
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
        })
})