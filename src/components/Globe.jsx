import React, { useState, useEffect, useRef, useMemo } from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3";
import * as THREE from "three";

const N = 300;
const randomData = [
  {
    lat: 0,
    lng: 0,
    alt: 5,
    radius: 10,
    color: "red",
  },
];

const World = ({ isPlaying, setAltitude, setIsReady }) => {
  const globeEl = useRef();

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [data, setData] = useState(randomData);

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

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = isPlaying;
      globeEl.current.controls().autoRotateSpeed = 0.5;
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
      polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN}</b> <br />
        K: <i>${d.GDP_MD_EST}</i><br/>
      `}
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
      onGlobeReady={() => {
        setIsReady(true);
      }}
      onZoom={(e) => {
        setAltitude(e.altitude);
      }}
      customLayerData={data}
      customThreeObject={(d) =>
        new THREE.Mesh(
          new THREE.SphereGeometry(d.radius),
          new THREE.MeshLambertMaterial({ color: d.color })
        )
      }
      customThreeObjectUpdate={(obj, d) => {
        Object.assign(
          obj.position,
          globeEl.current?.getCoords(d.lat, d.lng, d.alt)
        );
      }}
    />
  );
};

export default World;
