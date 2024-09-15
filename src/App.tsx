import React from "react";
import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";
import Friends from "./Friends";
import FloorSelector from "./FloorSelector";

function MyCustomComponent() {
	const { mapView, mapData } = useMap();

	mapView.on("click", async (event) => {
		if (event.models.length > 0) {
			//If a 3D Model was clicked on, remove it.
			mapView.Models.remove(event.models[0]);
		} else {
			//If no model was clicked on, add one at the click coordinate.
			mapView.Models.add(
				{
					target: event.coordinate,
					rotation: [90, 0, 0],
					interactive: true,
				},
				{
					url: "https://6ch8w7.csb.app/plant.glb",
				}
			);
		}
	});

	return mapData.getByType("space").map((space) => {
		return <Label target={space.center} text={space.name} />;
	});
}

export default function App() {
	// See Demo API key Terms and Conditions
	// https://developer.mappedin.com/v6/demo-keys-and-maps/
	const { isLoading, error, mapData } = useMapData({
		key: "mik_S9RVRcel8TAvEvWjK52430765",
		secret: "mis_8KrjxtFflkt8oP91xHCdWBbPq64ajPQSTSfvfysqPJJ973d10c2",
		mapId: "66e5a8f7af770b000b90805d",
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	return mapData ? (
		<MapView mapData={mapData}>
			<MyCustomComponent />
			<Friends />
			<FloorSelector />
		</MapView>
	) : null;
}
