import { useMap } from "@mappedin/react-sdk";

export default function FloorSelector() {
  const { mapData, mapView } = useMap();

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <select
        defaultValue={mapView.currentFloor.id}
        onChange={(e) => {
          mapView.setFloor(e.target.value);
        }}
      >
        {mapData.getByType("floor").map((floor, idx) => {
          return (
            <option key={idx} value={floor.id}>
              {floor.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
