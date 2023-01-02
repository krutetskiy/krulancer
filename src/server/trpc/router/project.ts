import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const projectRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.projects.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
});
