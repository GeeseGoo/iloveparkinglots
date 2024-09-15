import React from "react";
import {FloorSelector} from './FloorSelector';	
import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";
import Friends from './Friends';

function MyCustomComponent() {
	const { mapView, mapData } = useMap();

	// change map space to gray when hovered
	mapData.getByType('space').forEach(space => {
		mapView.updateState(space, {
			interactive: true,
			hoverColor: "#c1c0bf",
		});
	  });


	// path finder
	mapView.on("click", async (event) => {
		mapView.Paths.removeAll();
		
		/* if (event.models.length > 0) {
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
		*/
		const clickedLocation = event.coordinate;
	const destination = mapData.getByType('space').find(s => s.name === '123');
 
		// If the destination is found, navigate to it.
		if (destination) {
			//Ensure that directions could be generated (user clicked on a navigable space).
			const directions = mapView.getDirections(clickedLocation, destination);

			if (directions) {
				// Navigate from the clicked location to the gymnasium.
				mapView.Navigation.draw(directions, {
					pathOptions: {
						nearRadius: 1,
						farRadius: 1,
					},
				});
			}
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
		key: "mik_07gS7hNEnStLQxR1b4f5c0723",
		secret: "mis_ecV58sZM5qwtDTtFXr6pDdZ4MQzn3N2WXsWiJjgiP5v8ef51071",
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
				<MyCustomComponent />
				<Friends/>
			</div>
			<div></div>
			<MyCustomComponent />
			<FloorSelector/>
		</MapView>
					
	) : null;
}
