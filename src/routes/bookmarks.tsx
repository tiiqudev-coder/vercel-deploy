import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bookmarks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='flex w-full h-full items-center justify-center'>Hello "/bookmarks"!</div>
}
