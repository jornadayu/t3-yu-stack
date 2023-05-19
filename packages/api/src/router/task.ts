import { z } from 'zod'

import { editTaskSchema, newTaskSchema } from '@yu/validators'

import { protectedProcedure, router } from '../trpc'

/*
 * Actions
 */
const all = protectedProcedure.query(({ ctx }) => {
  return ctx.prisma.task.findMany({ where: { user_id: ctx.auth.userId } })
})

const byId = protectedProcedure.input(z.string()).query(({ ctx, input }) => {
  return ctx.prisma.task.findFirst({ where: { id: input, user_id: ctx.auth.userId } })
})

const add = protectedProcedure.input(newTaskSchema).mutation(({ ctx, input }) => {
  return ctx.prisma.task.create({ data: { ...input, user_id: ctx.auth.userId } })
})

const edit = protectedProcedure.input(editTaskSchema).mutation(async ({ ctx, input }) => {
  const task = await ctx.prisma.task.findFirst({
    where: { id: input.id, user_id: ctx.auth.userId },
  })

  return ctx.prisma.task.update({ data: input, where: { id: task?.id } })
})

const remove = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const task = await ctx.prisma.task.findFirst({
      where: { id: input.id, user_id: ctx.auth.userId },
    })

    if (!task) {
      return null
    }

    return ctx.prisma.task.delete({
      where: {
        id: task.id,
      },
    })
  })

export const taskRouter = router({
  all,
  byId,
  add,
  remove,
  edit,
})
