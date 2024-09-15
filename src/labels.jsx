function Labels() {
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
