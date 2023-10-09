import React, { useState, useEffect, useRef, useMemo } from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3";

const GlobeView = ({ isPlaying, setAltitude, setIsReady }) => {
  const globeEl = useRef();

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    fetch("./country.json")
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  const getVal = (feat) =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxVal = 9;
  colorScale.domain([0, maxVal]);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = isPlaying;
      globeEl.current.controls().autoRotateSpeed = 0.4;
    }
  }, [globeEl.current, isPlaying]);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl={"../../earth_night.jpg"}
      lineHoverPrecision={0}
      polygonsData={countries.features}
      polygonAltitude={(d) => (d === hoverD ? 0.12 : 0.06)}
      polygonCapColor={(d) =>
        d === hoverD ? "steelblue" : colorScale(getVal(d))
      }
      polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
      polygonStrokeColor={() => "#111"}
      polygonLabel={({ properties: d }) => `<b>${d.ADMIN}</b>`}
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
      onGlobeReady={() => setIsReady(true)}
      onZoom={(e) => setAltitude(e.altitude)}
    />
  );
};

export default GlobeView;
