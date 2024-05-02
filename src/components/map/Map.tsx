import { useState, useEffect, useMemo } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import ControlPanel from "./ControlPanel";
import { heatmapLayer } from "./map-style";
import { FeatureCollection } from "geojson";
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic3RldmVueWFuZ3N4IiwiYSI6ImNsdnBucmI3NjAzdHoycG82NmFieXhmeXcifQ.bjbtUox-EYg-jyKHnl5axw"; // Set your mapbox token here

function filterFeaturesByDay(featureCollection: any, time: any) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter((feature: any) => {
    const featureDate = new Date(feature.properties.time);
    return (
      featureDate.getFullYear() === year &&
      featureDate.getMonth() === month &&
      featureDate.getDate() === day
    );
  });

  return { type: "FeatureCollection", features };
}

export default function Map() {
  const [allDays, useAllDays] = useState(true);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, selectTime] = useState(0);
  const [earthquakes, setEarthQuakes] = useState(null);
  useEffect(() => {
    /* global fetch */
    fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
      .then((resp) => resp.json())
      .then((json) => {
        // Note: In a real application you would do a validation of JSON data before doing anything with it,
        // but for demonstration purposes we ingore this part here and just trying to select needed data...
        const features = json.features;
        const endTime = features[0].properties.time;
        const startTime = features[features.length - 1].properties.time;

        setTimeRange([startTime, endTime]);
        setEarthQuakes(json);
        selectTime(endTime);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  const data = useMemo(() => {
    return allDays
      ? earthquakes
      : (filterFeaturesByDay(earthquakes, selectedTime) as FeatureCollection);
  }, [earthquakes, allDays, selectedTime]);

  return (
    <>
      <div id="map">
        <MapGL
          initialViewState={{
            latitude: 40,
            longitude: -100,
            zoom: 3,
          }}
          mapStyle={`mapbox://styles/mapbox/light-v9`}
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {data && (
            <Source type="geojson" data={data}>
              <Layer {...heatmapLayer} />
            </Source>
          )}
        </MapGL>

        <ControlPanel
          startTime={timeRange[0]}
          endTime={timeRange[1]}
          selectedTime={selectedTime}
          allDays={allDays}
          onChangeTime={selectTime}
          onChangeAllDays={useAllDays}
        />
      </div>
    </>
  );
}
