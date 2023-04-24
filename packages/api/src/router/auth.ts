import { protectedProcedure, publicProcedure, router } from '../trpc';

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'now you can create and delete tasks!';
  }),
});
