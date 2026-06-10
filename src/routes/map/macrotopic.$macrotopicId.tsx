import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { KnowledgeMapGraph } from '#/components/Map/KnowledgeMapGraph'
import { knowledgeMapRepository } from '#/features/map-data'
import { toMacrotopicGraphViewModel } from '#/features/map-data/viewModels'
import type { MapGraphViewModel } from '#/features/map-data/viewModels/types'

export const Route = createFileRoute('/map/macrotopic/$macrotopicId')({
  component: MacrotopicPage,
})

function MacrotopicPage() {
  const navigate = useNavigate()
  const { macrotopicId } = Route.useParams()
  const decodedId = decodeURIComponent(macrotopicId)

  const [viewModel, setViewModel] = useState<MapGraphViewModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const abort = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await knowledgeMapRepository.getTopicsByMacrotopic(decodedId, abort.signal)
        setViewModel(toMacrotopicGraphViewModel(data))
      } catch (e: unknown) {
        if (e instanceof Error && e.name === 'AbortError') return
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    })()
    return () => abort.abort()
  }, [decodedId])

  if (!viewModel) {
    return (
      <KnowledgeMapGraph
        viewModel={{
          level: 'macrotopic',
          centerNode: {
            id: decodedId,
            label: 'Macrotopic',
            group: 'Macrotopic',
          },
          nodes: [],
          breadcrumbSegments: [{ label: 'Map of knowledge', link: { kind: 'map' } }],
          backTo: '/map',
        }}
        loading={loading}
        error={error}
        onNodeClick={() => {}}
      />
    )
  }

  return (
    <KnowledgeMapGraph
      viewModel={viewModel}
      loading={loading}
      error={error}
      onNodeClick={(topicId) =>
        navigate({ to: '/map/topic/$topicId', params: { topicId } })
      }
    />
  )
}
