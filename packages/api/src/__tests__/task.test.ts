import { expect, test } from 'vitest'

import { prisma } from '@yu/prisma'

import { taskRouter } from '../router/task'
import { user1 } from './user.mock'

const router = taskRouter.createCaller({ auth: user1, prisma: prisma })

test('All tasks', async () => {
  const tasks = await router.all()

  expect(tasks.length).toBeGreaterThan(1)
})

test('Remove task', async () => {
  const taskId = 'clhqr3ktk000008l2179i1jws'

  await router.remove({ id: taskId })

  const removedTask = await router.byId(taskId)

  expect(removedTask).toBe(null)
})
