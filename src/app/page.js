"use client";

import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoMercator, min, max, scaleLinear } from "d3";
import useResizeObserver from "./useResizeObserver";
import data from "./GeoChart.world.geo.json";

const property = "pop_est";

function GeoChart({}) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    const minProp = min(data.features, (feature) => feature["kp"]);
    const maxProp = max(data.features, (feature) => feature["kp"]);
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(["green", "red"]);

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
      .attr("fill", (feature) => colorScale(feature["kp"]))
      .attr("d", (feature) => pathGenerator(feature));

    svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text((feature) => feature && feature.name)
      .attr("x", 10)
      .attr("y", 25);
  }, [data, dimensions, property, selectedCountry]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default GeoChart;
