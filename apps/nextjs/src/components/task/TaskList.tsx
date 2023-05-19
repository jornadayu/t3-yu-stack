import { type NextComponentType } from 'next'

import { useAuth } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { toast } from 'react-toastify'

import { newTaskSchema } from '@yu/validators'

import TaskCard from './TaskCard'
import { api } from '~/utils/api'
import { useZodForm } from '~/utils/forms'

const TaskList: NextComponentType = () => {
  const utils = api.useContext()

  const { data: tasks } = api.task.all.useQuery()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useZodForm({
    schema: newTaskSchema,
    defaultValues: {
      description: '',
    },
  })

  const addTask = api.task.add.useMutation({
    onSuccess() {
      toast.success('Task added successfully')
      reset()
      void utils.task.all.invalidate()
    },
    onError(error) {
      if (error.data?.code === 'UNAUTHORIZED') {
        toast.error('Not authenticated')
      } else {
        const errorMessage = error.data?.zodError?.fieldErrors.content
        if (errorMessage && errorMessage[0]) {
          toast.error(errorMessage[0])
        } else {
          toast.error('Failed to create the task! Please try again later.')
        }
      }
    },
  })

  const { isSignedIn } = useAuth()
  const { data: secretMessage } = api.auth.getSecretMessage.useQuery(undefined, {
    enabled: !!isSignedIn,
  })

  return (
    <>
      <h2 className="mb-3 text-xl font-bold tracking-tight">{secretMessage}</h2>

      <div className="flex w-full flex-col">
        <div className="flex w-full flex-row gap-2">
          <input
            {...register('description')}
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="new task"
          />

          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSubmit((values) => addTask.mutate(values))}
            type="button"
            className="mr-2 inline-flex items-center rounded-lg border border-blue-700 p-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            <Plus />
            <span className="sr-only">Add task</span>
          </button>
        </div>
        {!!errors.description?.message && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">{errors.description?.message}</span>
          </p>
        )}
      </div>

      <div className="mt-3 flex w-full flex-col gap-1">
        {tasks?.map((task) => (
          <TaskCard task={task} key={`task-${task.id}`} />
        ))}
      </div>
    </>
  )
}

export default TaskList
