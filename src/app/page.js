"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
const Globe = dynamic(
  () => import("../components/Globe").then((mod) => mod.default),
  {
    ssr: false,
  }
);
import Image from "next/image";

import PauseSVG from "../../public/pause.svg";
import PlaySVG from "../../public/play.svg";

const Main = () => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <>
      <Image
        src={isPlaying ? PauseSVG : PlaySVG}
        width={64}
        height={64}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
        style={{
          zIndex: "10",
          color: "white",
          position: "absolute",
          cursor: isHover ? "pointer" : "default",
          marginLeft: "10px",
          marginTop: "10px",
        }}
      />
      <div
        style={{
          position: "absolute",
          color: "white",
          zIndex: "10",
        }}
      ></div>

      <Globe isPlaying={isPlaying} />
    </>
  );
};

export default Main;
