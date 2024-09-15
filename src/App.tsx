import React from "react";
import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";
import Friends from "./Friends";
import FloorSelector from "./FloorSelector";
import ExpandToggle from "./ExpandToggle";
import './App.css';
import StatusBar from './StatusBar';
import './StatusBar.css';
import './FloorSelector.css';
import "./ExpandToggle.css";

function MyCustomComponent() {
	const { mapView, mapData } = useMap();

	// set space to turn gray-green when hovering
	mapData.getByType('space').forEach(space => {
		mapView.updateState(space, {
			interactive: true,
			hoverColor: '#E6F3EE',
		});
	});

	let clickCount = 0;
	let destination = "";
	
	mapView.on("click", async (event) => {
		clickCount++;
		
		if (clickCount == 1 && event.models.length == 0) {
			mapView.Paths.removeAll();
			
			destination = event.coordinate;
			mapView.Models.add(
				{
					target: event.coordinate,
					rotation: [90, 0, 0],
					interactive: true,
				},
				{
					url: "https://6ch8w7.csb.app/plant.glb",
				}
			)
		}
		else {
			clickCount = 0;
			mapView.Models.removeAll();
		
			const clickedLocation = event.coordinate;
			//Ensure that directions could be generated (user clicked on a navigable space).
			const directions = mapView.getDirections(clickedLocation, destination);

			if (directions) {
				mapView.Navigation.draw(directions, {
					pathOptions: {
						nearRadius: 1,
						farRadius: 1,
					},
				});
			}
		}
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

function Text() {
	return (
		<h1 className="h1">HELP, we're locked <br></br>in the DP basement!</h1>
	);
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
			<div>
				<Text />
				<StatusBar />

				<MyCustomComponent />
				<Friends/>
				<ExpandToggle />
				<FloorSelector />
			</div>
		</MapView>
	) : null;
}
