import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/subtopic/$subtopicId')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/map/subtopic/$subtopicId',
      params: { subtopicId: params.subtopicId },
    })
  },
})
