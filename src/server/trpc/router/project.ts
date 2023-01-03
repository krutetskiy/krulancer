import { TaskStatusType } from "@prisma/client";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const projectRouter = router({
    getById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.projects.findFirst({
                where: {
                    id: input.id,
                },
                include: {
                    tasks: true,
                }
            });
        }),
    getTasks: publicProcedure
        .input(z.object({ project_id: z.number() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.tasks.findMany({
                where: {
                    project_id: input.project_id,
                }
            })
        })
});
