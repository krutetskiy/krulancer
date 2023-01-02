import { router } from "../trpc";
import { authRouter } from "./auth";
import { projectRouter } from "./project";

export const appRouter = router({
  projects: projectRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
