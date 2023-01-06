import z from "zod"
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { hash } from "argon2";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  signUp: publicProcedure.input(z.object({
    login: z.string().email(),
    password: z.string().min(6).max(20)
  })).mutation(async ({ ctx, input }) => {
    const { login, password } = input

    const exist = await ctx.prisma.user.findFirst({ where: { email: login } })

    if (exist)
      throw new TRPCError({ code: "CONFLICT", message: "User already exist!" })

    const passwordHash = await hash(password);
    const user = await ctx.prisma.user.create({ data: { email: login, password: passwordHash } });

    return {
      status: 201,
      message: "Account created successfully",
      result: user.email,
    };
  })
});
