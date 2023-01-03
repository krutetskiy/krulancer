import { TaskStatusType } from "@prisma/client";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const taskRouter = router({
    updateTaskStatus: publicProcedure
        .input(z.object(
            {
                task_id: z.number().nullish(),
                status: z.enum([TaskStatusType.ToDo, TaskStatusType.InProgress, TaskStatusType.Closed, TaskStatusType.Frozen]).nullish()
            }))
        .query(({ ctx, input }) => {
            if (!input.task_id || !input.status)
                return null

            return ctx.prisma.tasks.update({
                where: {
                    id: input.task_id
                },
                data: {
                    status: input.status
                }
            })
        })
})