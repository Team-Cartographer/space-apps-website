import React, { useState, useEffect, useRef, useMemo } from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3";

const World = ({ isPlaying }) => {
  const globeEl = useRef();

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetch("./country.json")
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  const getVal = (feat) =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );
  colorScale.domain([0, maxVal]);

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
      polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
        K: <i>${d.GDP_MD_EST}</i><br/>
      `}
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
      onGlobeReady={() => {
        setIsReady(true);
      }}
    />
  );
};

export default World;
