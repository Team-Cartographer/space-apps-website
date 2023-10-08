"use client";

import { useState } from "react";

import Globe from "../components/Globe";
import Image from "next/image";

import PauseSVG from "../../public/pause.svg";
import PlaySVG from "../../public/play.svg";

const Main = () => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const isBrowser = () => typeof window !== "undefined";

  if (!isBrowser()) return null;

  return (
    <>
      <Image
        src={isPlaying ? PauseSVG : PlaySVG}
        alt="Picture of the author"
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
