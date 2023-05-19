import { z } from 'zod'

export const newTaskSchema = z.object({
  description: z.string().min(5, { message: 'Description must be at least 5 characters long' }),
})

export const editTaskSchema = z.object({
  description: z.string().min(5, { message: 'Description must be at least 5 characters long' }),
  id: z.string().cuid({ message: 'Invalid ID' }),
})
