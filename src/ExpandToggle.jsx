import { useMap } from "@mappedin/react-sdk";

export default function ExpandToggle() {
  const { mapData, mapView } = useMap();

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "100px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <button onClick={(e) => {
          mapView.expand();
        }}>Expand
      </button>
    </div>
  );
}
