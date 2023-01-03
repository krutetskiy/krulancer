import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const projectRouter = router({
    getById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.project.findFirst({
                where: {
                    id: input.id,
                },
                include: {
                    tasks: true,
                }
            });
        }),
    getTasks: publicProcedure
        .input(z.object({ projectId: z.number() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.task.findMany({
                where: {
                    projectId: input.projectId,
                }
            })
        })
});
