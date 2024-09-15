import React from "react";
import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";
import Friends from './Friends';

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
		key: "mik_yeBk0Vf0nNJtpesfu560e07e5",
		secret: "mis_2g9ST8ZcSFb5R9fPnsvYhrX3RyRwPtDGbMGweCYKEq385431022",
		mapId: "65c0ff7430b94e3fabd5bb8c",
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	return mapData ? (
		<MapView mapData={mapData}>
			<div>
				<MyCustomComponent />
				<Friends/>
			</div>
			<div></div>
		</MapView>
	) : null;
}
