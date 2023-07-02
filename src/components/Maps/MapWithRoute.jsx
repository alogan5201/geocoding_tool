import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Polyline, TileLayer, useMapEvents } from "react-leaflet";
import "react-tabs/style/react-tabs.css";
import useStore from "store/mapStore";
import { getDirections } from "util/geocoder";
import LocationButton from "./components/LocationButton";
import Markers from "./components/Markers";

const center = [37.09024, -95.712891];
function MapEventsComponent({ onMoveEnd }) {
  useMapEvents({
    moveend: () => {
      onMoveEnd();
  
    },
  });

  return null;
}
const MapWithRoute = () => {
  const [route, setRoute] = useState(null);

  const [selected, setSelected] = useState();
  const [map, setMap] = useState(null);
  const markerData = useStore((state) => state.markerData);
  const setMapStopped = useStore((state) => state.setMapStopped);

    const handleMoveEnd = () => {
      console.log("Map has stopped moving");
     setMapStopped(true);
    };
  useEffect(() => {
    if (markerData && markerData.length > 1) {
      console.log(markerData[0].lat, markerData[0].lng);
      console.log(markerData[1].lat, markerData[1].lng);
      const fetchRoute = async () => {
        try {
          const data = await getDirections(markerData[0], markerData[1]);
          console.log(data);
          setRoute(data.routes[0].geometry.coordinates);
          setTimeout(() => {
          }, 500);

          //setRoute(data.routes[0].geometry.coordinates);
        } catch (err) {
          console.error("Error fetching route:", err);
        }
      };
      fetchRoute();
    }
    return () => {
      setRoute(null);
      console.log("setRoute", route);
    };
  }, [markerData]);
  return (
    <>
      <MapContainer
        whenCreated={setMap}
        center={center}
        zoom={3}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`}
        />
        <MapEventsComponent onMoveEnd={handleMoveEnd} />
        {route && (
          <Polyline
            positions={route.map((coord) => [coord[1], coord[0]])}
            color={"red"}
            opacity={0.7}
            weight={7}
          />
        )}
        <Markers L={L} />
        <LocationButton L={L} />
        {/* <LocationButton L={L} /> */}
      </MapContainer>
    </>
  );
};

export default MapWithRoute;
