import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { KnowledgeMapGraph } from '#/components/Map/KnowledgeMapGraph'
import { GraphControls } from '#/components/Map/overlays/GraphControls'
import { knowledgeMapRepository } from '#/features/map-data'
import { toMainGraphViewModel } from '#/features/map-data/viewModels'
import type { MapGraphViewModel } from '#/features/map-data/viewModels/types'
import { useTheme } from '#/lib/ThemeContext'

export const Route = createFileRoute('/map/')({
  component: MapIndexPage,
})

function MapIndexPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [viewModel, setViewModel] = useState<MapGraphViewModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [showLinks, setShowLinks] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const abort = new AbortController()
    knowledgeMapRepository
      .getMainGraph(abort.signal)
      .then((result) => setViewModel(toMainGraphViewModel(result)))
      .catch(() => setViewModel(toMainGraphViewModel({ nodes: [], links: [] })))
      .finally(() => setLoading(false))
    return () => abort.abort()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || reducedMotion) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) setReducedMotion(true)
  }, [reducedMotion])

  const vm =
    viewModel ??
    toMainGraphViewModel({ nodes: [], links: [] })

  return (
    <KnowledgeMapGraph
      viewModel={vm}
      loading={loading}
      onNodeClick={(subtopicId) =>
        navigate({ to: '/map/subtopic/$subtopicId', params: { subtopicId } })
      }
      onMacroAreaClick={(macroAreaId) =>
        navigate({ to: '/map/macroarea/$macroAreaId', params: { macroAreaId } })
      }
      showLinks={showLinks}
      reducedMotion={reducedMotion}
      toolbar={
        <GraphControls
          embedded
          showListView={false}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={() => setReducedMotion((v) => !v)}
          setTheme={theme}
          onToggleTheme={toggleTheme}
          showLinks={showLinks}
          onToggleLinks={() => setShowLinks((v) => !v)}
        />
      }
    />
  )
}
