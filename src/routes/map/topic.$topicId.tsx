import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { KnowledgeMapGraph } from '#/components/Map/KnowledgeMapGraph'
import { knowledgeMapRepository } from '#/features/map-data'
import { toTopicGraphViewModel } from '#/features/map-data/viewModels'
import type { MapGraphViewModel } from '#/features/map-data/viewModels/types'

export const Route = createFileRoute('/map/topic/$topicId')({
  component: TopicPage,
})

function TopicPage() {
  const navigate = useNavigate()
  const { topicId } = Route.useParams()
  const decodedId = decodeURIComponent(topicId)

  const [viewModel, setViewModel] = useState<MapGraphViewModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const abort = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await knowledgeMapRepository.getSubtopicsByTopic(decodedId, abort.signal)
        setViewModel(toTopicGraphViewModel(data))
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
          level: 'topic',
          centerNode: {
            id: decodedId,
            label: 'Topic',
            group: 'Topic',
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
      onNodeClick={(subtopicId) =>
        navigate({ to: '/map/subtopic/$subtopicId', params: { subtopicId } })
      }
    />
  )
}
