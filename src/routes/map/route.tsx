import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MapPageShell } from "#/components/Map/layout/MapPageShell";

export const Route = createFileRoute("/map")({
  component: MapRouteShell,
});

function MapRouteShell() {
  return (
    <MapPageShell>
      <Outlet />
    </MapPageShell>
  );
}
