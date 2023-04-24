import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from '../trpc';

const all = publicProcedure.query(({ ctx }) => {
  return ctx.prisma.task.findMany();
});

const byId = publicProcedure.input(z.string()).query(({ ctx, input }) => {
  return ctx.prisma.task.findFirst({ where: { id: input } });
});

const add = protectedProcedure
  .input(z.object({ description: z.string() }))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.task.create({ data: input });
  });

const remove = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.task.delete({
      where: {
        id: input.id,
      },
    });
  });

export const taskRouter = router({
  all,
  byId,
  add,
  remove,
});
