import React from "react";
import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";

function MyCustomComponent() {
	const { mapData } = useMap();

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
			<MyCustomComponent />
		</MapView>
	) : null;
}
