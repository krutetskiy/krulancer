import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const projectRouter = router({
  getUserProjects: publicProcedure
    .input(z.object({ userSession: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findMany({
        where: {
          user: {
            sessions: {
              some: {
                sessionToken: input.userSession
              }
            }
          }
        }
      })
    }),
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
