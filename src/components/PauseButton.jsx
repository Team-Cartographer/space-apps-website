"use client";

import { useState } from "react";

import Image from "next/image";

import PauseSVG from "../../public/pause.svg";
import PlaySVG from "../../public/play.svg";

const PauseButton = ({ isPlaying, setIsPlaying }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Image
      src={isPlaying ? PauseSVG : PlaySVG}
      alt="Pause/Play Button"
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
  );
};

export default PauseButton;
