import { router } from "../trpc";
import { authRouter } from "./auth";
import { projectRouter } from "./project";
import { taskRouter } from "./task";

export const appRouter = router({
  projects: projectRouter,
  tasks: taskRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
