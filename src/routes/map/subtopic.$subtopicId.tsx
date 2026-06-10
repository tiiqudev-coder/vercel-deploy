import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { KnowledgeMapGraph } from '#/components/Map/KnowledgeMapGraph'
import { GraphControls } from '#/components/Map/overlays/GraphControls'
import { GraphSidebar } from '#/components/Map/overlays/Sidebar'
import { QnaDetailPanel } from '#/components/Map/overlays/QnaDetailPanel'
import { knowledgeMapRepository } from '#/features/map-data'
import { toSubtopicQnaGraphViewModel } from '#/features/map-data/viewModels'
import type { MapGraphViewModel } from '#/features/map-data/viewModels/types'
import type { QnaNode } from '#/lib/types/graph.types'
import { useTheme } from '#/lib/ThemeContext'

export const Route = createFileRoute('/map/subtopic/$subtopicId')({
  component: SubtopicPage,
})

function SubtopicPage() {
  const { subtopicId } = Route.useParams()
  const decodedId = decodeURIComponent(subtopicId)
  const { theme, toggleTheme } = useTheme()
  const [viewModel, setViewModel] = useState<MapGraphViewModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedQna, setSelectedQna] = useState<QnaNode | null>(null)
  const [showListView, setShowListView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const abort = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await knowledgeMapRepository.getSubtopicQnas(decodedId, abort.signal)
        setViewModel(toSubtopicQnaGraphViewModel(data))
      } catch (e: unknown) {
        if (e instanceof Error && e.name === 'AbortError') return
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    })()
    return () => abort.abort()
  }, [decodedId])

  const vm = viewModel ?? {
    level: 'subtopic' as const,
    centerNode: {
      id: decodedId,
      label: 'Subtopic',
      group: 'Subtopic' as const,
    },
    nodes: [],
    breadcrumbSegments: [{ label: 'Map of knowledge', link: { kind: 'map' } }],
    backTo: '/map',
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <KnowledgeMapGraph
        viewModel={vm}
        loading={loading}
        error={error}
        onNodeClick={(_id, node) => node && setSelectedQna(node)}
        reducedMotion={reducedMotion}
        toolbar={
          <GraphControls
            embedded
            showListView={showListView}
            onToggleListView={() => setShowListView((v) => !v)}
            reducedMotion={reducedMotion}
            onToggleReducedMotion={() => setReducedMotion((v) => !v)}
            setTheme={theme}
            onToggleTheme={toggleTheme}
          />
        }
      />

      {showListView && viewModel?.centerNode && (
        <GraphSidebar
          variant="qna"
          macroArea={viewModel.centerNode.macroArea}
          subtopic={viewModel.centerNode.label}
          nodes={viewModel.nodes as QnaNode[]}
          onSelectQuestion={(qna) => setSelectedQna(qna)}
        />
      )}

      <QnaDetailPanel qna={selectedQna} onClose={() => setSelectedQna(null)} />
    </div>
  )
}
