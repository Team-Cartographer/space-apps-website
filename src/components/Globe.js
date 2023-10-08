import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import Globe from "react-globe.gl";

const World = ({ isPlaying }) => {
  const globeEl = useRef();

  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("./world_population.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);
      const results = Papa.parse(csv, { header: true });
      setData(results.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!globeEl.current) return;

    globeEl.current.controls().autoRotate = isPlaying;
    globeEl.current.controls().autoRotateSpeed = 1.5;
  }, [globeEl.current, isPlaying]);
  return (
    <Globe
      ref={globeEl}
      globeImageUrl={"../../earth_night.jpg"}
      //   heatmapsData={[data]}
      //   heatmapPointLat="lat"
      //   heatmapPointLng="lng"
      //   heatmapPointWeight="pop"
      //   heatmapBandwidth={0.9}
      //   heatmapColorSaturation={2.8}
      //   onHeatmapRightClick={(e) => {
      //     console.log("RC");
      //   }}
      //   enablePointerInteraction={false}
      onGlobeReady={() => {
        setIsReady(true);
      }}
    />
  );
};

export default World;
