import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/macrotopic/$macrotopicId')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/map/macrotopic/$macrotopicId',
      params: { macrotopicId: params.macrotopicId },
    })
  },
})
