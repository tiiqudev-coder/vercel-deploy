import { type CSSProperties, type PropsWithChildren, type ReactNode } from "react";

type Props = PropsWithChildren<{
  loading?: boolean;
  error?: string | null;
  overlays?: ReactNode;
}>;

const mapViewportStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  minWidth: 0,
  minHeight: 0,
  overflow: "hidden",
};

export function MapPageShell({ loading, error, overlays, children }: Props) {
  if (loading) {
    return (
      <div style={{ ...mapViewportStyle, display: "grid", placeItems: "center" }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...mapViewportStyle, display: "grid", placeItems: "center" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={mapViewportStyle}>
      {children}
      {overlays}
    </div>
  );
}
