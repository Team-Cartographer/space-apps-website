import React, { useState, useEffect, useRef, useMemo } from "react";
import Globe from "react-globe.gl";

const SOUTH_AMERICA = {
  0: "#69B34C",
  1: "#69B34C",
  2: "#69B34C",
  3: "#69B34C",
  4: "#ACB334",
  5: "#ACB334",
  6: "#ACB334",
  7: "#FAB733",
  8: "#FAB733",
  9: "#FF8E15",
  10: "#FF4E11",
};

const OCEANIA = {
  0: "#69B34C",
  1: "#69B34C",
  2: "#69B34C",
  3: "#69B34C",
  4: "#ACB334",
  5: "#ACB334",
  6: "#ACB334",
  7: "#FAB733",
  8: "#FAB733",
  9: "#FF8E15",
  10: "#FF4E11",
};

const AFRICA = {
  0: "#69B34C",
  1: "#69B34C",
  2: "#69B34C",
  3: "#ACB334",
  4: "#ACB334",
  5: "#ACB334",
  6: "#FAB733",
  7: "#FAB733",
  8: "#FAB733",
  9: "#FF8E15",
  10: "#FF4E11",
};

const NORTH_AMERICA = {
  0: "#69B34C",
  1: "#69B34C",
  2: "#69B34C",
  3: "#ACB334",
  4: "#FAB733",
  5: "#FAB733",
  6: "#FF8E15",
  7: "#FF4E11",
  8: "#FF4E11",
  9: "#FF0D0D",
  10: "#FF0D0D",
};

const EUROPE = {
  0: "#69B34C",
  1: "#69B34C",
  2: "#ACB334",
  3: "#FAB733",
  4: "#FAB733",
  5: "#FF8E15",
  6: "#FF4E11",
  7: "#FF4E11",
  8: "#FF0D0D",
  9: "#FF0D0D",
  10: "#FF0D0D",
};

const ASIA = {
  0: "#69B34C",
  1: "#69B34C",
  2: "#ACB334",
  3: "#FAB733",
  4: "#FAB733",
  5: "#FF8E15",
  6: "#FF4E11",
  7: "#FF4E11",
  8: "#FF0D0D",
  9: "#FF0D0D",
  10: "#FF0D0D",
};

const GlobeView = ({ isPlaying, setAltitude, setIsReady, timestamp }) => {
  const globeEl = useRef();

  const [countries, setCountries] = useState({ features: [] });
  const [kValues, setKValues] = useState();

  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    fetch("./country.json")
      .then((res) => res.json())
      .then(setCountries);

    fetch("./kp.json")
      .then((res) => res.json())
      .then(setKValues);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = isPlaying;
      globeEl.current.controls().autoRotateSpeed = 0.4;
    }
  }, [globeEl.current, isPlaying]);

  const getCountryColor = (country) => {
    var k = kValues[timestamp];

    switch (country) {
      case "South America":
        return SOUTH_AMERICA[k];
      case "Oceania":
        return OCEANIA[k];
      case "Africa":
        return AFRICA[k];
      case "North America":
        return NORTH_AMERICA[k];
      case "Europe":
        return EUROPE[k];
      case "Asia":
        return ASIA[k];
      default:
        return "white";
    }
  };

  return (
    <Globe
      ref={globeEl}
      globeImageUrl={"../../earth_night.jpg"}
      lineHoverPrecision={0}
      polygonsData={countries.features}
      polygonAltitude={(d) => (d === hoverD ? 0.12 : 0.06)}
      polygonCapColor={(d) =>
        d === hoverD ? "steelblue" : getCountryColor(d.properties.CONTINENT)
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
