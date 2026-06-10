import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/topic/$topicId')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/map/topic/$topicId',
      params: { topicId: params.topicId },
    })
  },
})
