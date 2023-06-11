// Material Kit 2 PRO React components
import Box from "components/Box";
// Material Kit 2 PRO React components
import Grid from "@mui/material/Grid";
import AddressInput from "components/AddressInput";
import Button from "components/Button";
import Input from "components/Input";
import Typography from "components/Typography";
import { useEffect, useRef, useState } from "react";
import useStore from "store/mapStore";
import { covertAddressToLatLng } from "util/geocoder";
import { extractWords, test, handleMapInputState } from "util/helpers";
import { useGlobalValue } from "util/mapState";
import LatLngInputs from "components/LatLngInputs";

function Form() {
  useEffect(() => {
    test();
  }, []);
  const handleChild = (callback) => {
    // Here, you have the function from the child.
    callback();
  };
  const [zoomState, setZoomState] = useState();
  const [coords, setCoords] = useGlobalValue();
  const latInputElm = useRef(null);
  const lngInputElm = useRef(null);
  const updateGeoData = useStore((state) => state.setGeoData);
  const updateMarkerData = useStore((state) => state.setMarkerData);
  const resetZoom = useStore((state) => state.resetMapZoom);
  const setUserLocationActive = useStore((state) => state.setUserLocationActive);
  const userLocationActive = useStore((state) => state.userLocationActive);
  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */
  function handleZoomReset(e) {
    e.preventDefault();
    resetZoom(1);
    setTimeout(() => {
      resetZoom(0);
    }, 2000);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const inputOne = e.target[0].value;
    if (inputOne) {
      let extracted = extractWords(inputOne);
      let withPlus = extracted.join("+");
      const mapBoxData = await covertAddressToLatLng(inputOne);
      if (mapBoxData && mapBoxData.features.length > 0) {
        let lat = mapBoxData.features[0].geometry.coordinates[1];
        let lng = mapBoxData.features[0].geometry.coordinates[0];
        setCoords([coords]);
        const address = mapBoxData.features[0].place_name;
        const markerData = [
          {
            id: "1",
            lat: lat,
            lng: lng,
            title: address,
            userLocation: false,
          },
        ];
        handleMapInputState("AddressToLatLng")
        setUserLocationActive(false);
        console.log(userLocationActive);
        updateMarkerData(markerData);
        updateGeoData(mapBoxData.features[0]);
      }
    }
  }
  useEffect(() => {
    if (userLocationActive === false) {
      let leafletBarElement = document.querySelector(".leaflet-bar");
      console.log("location not active");
      if (leafletBarElement) {
        let classes = leafletBarElement.classList;
        // Create an array to store the classes that need to be removed
        let classesToRemove = [];
        // Loop through each class and if it contains 'locateActive', add it to classesToRemove
        for (let i = 0; i < classes.length; i++) {
          if (classes[i].includes("locateActive")) {
            classesToRemove.push(classes[i]);
          }
        }
        // Loop through each class in classesToRemove and remove it from the element
        for (let i = 0; i < classesToRemove.length; i++) {
          leafletBarElement.classList.remove(classesToRemove[i]);
        }
      }
    }
  }, [userLocationActive]);
  return (
    <Box component="form" p={2} method="post" onSubmit={handleSubmit}>
      <Box px={3} py={{ xs: 2, sm: 6 }}>
        <Typography variant="h4" mb={1}>
          Address to Latitude & Longitude
        </Typography>
        <Typography variant="body2" color="text" mb={2}>
          To pinpoint a location, you can type in the name of a place, city, state, or address, or
          click the location on the map to get the coordinates.
        </Typography>
      </Box>
      <Box pt={0.5} pb={3} px={3}>
        <Grid container>
          {/* ============ AddressInput ============ */}
          <AddressInput handleChild={handleChild} />
          {/* ============ Submit ============ */}
          <Grid item xs={12} pr={1} mb={2}>
            <Button type="submit" variant="gradient" color="info">
              Submit
            </Button>
          </Grid>
          {/* ============ LatLngInputs ============ */}
          <LatLngInputs />
          <Grid item xs={12} pr={1} mb={2}>
            <Box></Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default Form;
