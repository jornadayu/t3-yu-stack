import { useState } from 'react'

import { type NextComponentType } from 'next'

import { Check, Pencil, Save } from 'lucide-react'
import { toast } from 'react-toastify'

import { editTaskSchema } from '@yu/validators'

import { api, type RouterOutputs } from '~/utils/api'
import { useZodForm } from '~/utils/forms'

interface Props {
  task: RouterOutputs['task']['byId']
}

const TaskCard: NextComponentType<Record<string, never>, Props, Props> = ({ task }) => {
  const utils = api.useContext()

  const [editing, setEditing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm({
    schema: editTaskSchema,
    defaultValues: {
      id: task?.id,
      description: task?.description,
    },
  })

  const removeTask = api.task.remove.useMutation({
    onSuccess() {
      toast.success('Task completed successfully')
      void utils.task.all.invalidate()
    },
    onError(error) {
      if (error.data?.code === 'UNAUTHORIZED') {
        toast.error('Not authenticated')
      } else {
        console.log(error)
      }
    },
  })

  const editTask = api.task.edit.useMutation({
    onSuccess() {
      toast.success('Task updated successfully')
      void utils.task.all.invalidate()
      setEditing(false)
    },
    onError(error) {
      setEditing(false)
      if (error.data?.code === 'UNAUTHORIZED') {
        toast.error('Not authenticated')
      } else {
        console.log(error)
      }
    },
  })

  return (
    <li className="justify-betwee flex flex-row flex-wrap items-center justify-between rounded-md">
      {!editing && (
        <>
          <strong className="break-all">{task?.description}</strong>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => setEditing(true)}
              className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
            >
              <Pencil />
            </button>
            <button
              onClick={() => !!task?.id && removeTask.mutate({ id: task?.id })}
              className="rounded border border-green-500 bg-transparent px-4 py-2 font-semibold text-green-700 hover:border-transparent hover:bg-green-500 hover:text-white"
            >
              <Check />
            </button>
          </div>
        </>
      )}

      {editing && (
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row gap-2">
            <input
              {...register('description')}
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="new task"
            />
            <div className="flex flex-row gap-2">
              <button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleSubmit((values) => editTask.mutate(values))}
                className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
              >
                <Save />
              </button>
            </div>
          </div>
          {!!errors.description?.message && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">{errors.description?.message}</span>
            </p>
          )}
        </div>
      )}
    </li>
  )
}

export default TaskCard
