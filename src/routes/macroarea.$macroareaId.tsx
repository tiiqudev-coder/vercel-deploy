import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/macroarea/$macroareaId')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/map/macroarea/$macroAreaId',
      params: { macroAreaId: params.macroareaId },
    })
  },
})
