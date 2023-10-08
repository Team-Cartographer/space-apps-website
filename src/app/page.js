"use client";

import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import Papa from "papaparse";

const World = () => {
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
    globeEl.current.controls().autoRotate = true;
  }, []);
  return (
    <>
      {!isReady && (
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          <h1>Loading...</h1>
        </div>
      )}

      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        heatmapsData={[data]}
        heatmapPointLat="lat"
        heatmapPointLng="lng"
        heatmapPointWeight="pop"
        heatmapBandwidth={0.9}
        heatmapColorSaturation={2.8}
        enablePointerInteraction={false}
        onZoom={(e) => {
          console.log(e.altitude);
        }}
        onGlobeReady={() => {
          globeEl.current.toGeoCoords(0, 0, 10);
          setIsReady(true);
        }}
      />
    </>
  );
};

export default World;
