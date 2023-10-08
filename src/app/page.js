"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  select,
  geoPath,
  geoMercator,
  min,
  max,
  scaleLinear,
  geoCentroid,
} from "d3";
import useResizeObserver from "./useResizeObserver";
import data from "./GeoChart.world.geo.json";

function GeoChart({}) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [K, setK] = useState(0);

  useEffect(() => {
    const svg = select(svgRef.current);

    const minLatitude = min(data.features, (feature) => {
      const [x, y] = geoCentroid(feature);
      return y - 60 + 10 * K;
    });
    const maxLatitude = max(data.features, (feature) => {
      const [x, y] = geoCentroid(feature);
      return y + 100 + -10 * K;
    });

    const colorScale = scaleLinear()
      .domain([minLatitude, 0, maxLatitude])
      .range(["red", "green", "red"]);

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(100);

    const pathGenerator = geoPath().projection(projection);

    svg
      .selectAll(".country")
      .data(data.features)
      .join("path")
      .on("click", (event, feature) => {
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .attr("class", "country")
      .transition()
      .attr("fill", (feature) => {
        const [x, y] = geoCentroid(feature);
        return colorScale(y);
      })
      .attr("d", (feature) => pathGenerator(feature));

    svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text((feature) => feature && feature.name)
      .attr("x", 10)
      .attr("y", 25);
  }, [data, dimensions, selectedCountry, K]);

  return (
    <div>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}></svg>
      </div>
      <button
        onClick={() => {
          if (K < 9) setK(K + 1);
        }}
      >
        +
      </button>
      <p>K: {K}</p>
    </div>
  );
}

export default GeoChart;
