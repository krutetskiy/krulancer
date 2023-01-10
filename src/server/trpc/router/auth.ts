import z from "zod"
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { hash } from "argon2";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  })
});
